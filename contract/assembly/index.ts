import { PersistentSet, context, PersistentMap, RNG } from "near-sdk-core";
import { AccountId, Timestamp } from "../utils";
import { Game } from "./model";
@nearBindgen
export class Contract {
  private games: PersistentMap<u16, Game>;
  private gamesById: PersistentMap<AccountId, PersistentSet<u16>>;
  private joinedGameIds: PersistentMap<AccountId, PersistentSet<u16>>;

  constructor() {
    this.games = new PersistentMap<u16, Game>("games");
    this.gamesById = new PersistentMap<AccountId, PersistentSet<u16>>(
      "gamesById"
    );

    this.joinedGameIds = new PersistentMap<AccountId, PersistentSet<u16>>(
      "joinedGameIds"
    );
  }

  get_games(accountId: AccountId): Game[] {
    let games: Game[] = [];
    if (this.gamesById.contains(accountId)) {
      const gameIds = this.gamesById.getSome(accountId).values();
      for (let i: i32 = 0; i < gameIds.length; i++) {
        const gameId = gameIds[i];
        games.push(this.games.getSome(gameId));
      }
    }
    if (this.joinedGameIds.contains(accountId)) {
      const gameIds = this.joinedGameIds.getSome(accountId).values();
      for (let i: i32 = 0; i < gameIds.length; i++) {
        const gameId = gameIds[i];
        games.push(this.games.getSome(gameId));
      }
    }
    return games;
  }

  get_game(gameId: u16, accountId: AccountId): Game | null {
    if (this.games.contains(gameId)) {
      const game = this.games.getSome(gameId);
      assert(
        game.ownerId == accountId || game.counterpartyId == accountId,
        "You are not participating in this game."
      );
      let fields: string[][];
      if (game.ownerId == accountId) {
        fields = game.counterpartyFields;
      } else {
        fields = game.ownerFields;
      }

      return game;
    }
    return null;
  }

  @mutateState()
  make_move(gameId: u16, row: i16, col: i16): void {
    assert(
      this.games.contains(gameId),
      "Game does not exist. Maybe you mistype game id?"
    );
    const accountId = context.sender;
    const game = this.games.getSome(gameId);
    let fields: string[][];
    if (game.ownerId == accountId) {
      fields = game.counterpartyFields;
    } else {
      fields = game.ownerFields;
    }
    const fieldRow = fields[row];
    const fieldCol = fieldRow[col];
    if (fieldCol == "*") {
      fields[row][col] = "x";
    } else if (fieldCol == ".") {
      fields[row][col] = "-";
    }
    if (game.ownerId == accountId) {
      game.counterpartyFields = fields;
    } else {
      game.ownerFields = fields;
    }
    this.games.set(gameId, game);
  }

  @mutateState()
  create_game(): void {
    const accountId = context.sender;
    const rng = new RNG<u16>(1, u16.MAX_VALUE);
    const newGameId = rng.next();
    const game = new Game(newGameId, accountId, "");
    this.games.set(newGameId, game);
    if (this.gamesById.contains(accountId)) {
      const gameIds = this.gamesById.getSome(accountId);
      gameIds.add(newGameId);
      this.gamesById.set(accountId, gameIds);
    } else {
      const gameIds = new PersistentSet<u16>(`games${accountId}`);
      gameIds.add(newGameId);
      this.gamesById.set(accountId, gameIds);
    }
  }

  @mutateState()
  join_game(gameId: u16): void {
    const accountId = context.sender;
    assert(
      this.games.contains(gameId),
      "Game does not exist. Maybe you mistype game id?"
    );

    const game = this.games.getSome(gameId);

    assert(
      game.counterpartyId == "",
      "Game is already taken by another user. Try creating a new game and ask friend to join."
    );

    assert(game.ownerId != accountId, "Cannot join own game.");

    game.counterpartyId = accountId;

    if (this.joinedGameIds.contains(accountId)) {
      const gameIds = this.joinedGameIds.getSome(accountId);
      gameIds.add(gameId);
      this.joinedGameIds.set(accountId, gameIds);
    } else {
      const gameIds = new PersistentSet<u16>(`joinedGames${accountId}`);
      gameIds.add(gameId);
      this.joinedGameIds.set(accountId, gameIds);
    }

    this.games.set(gameId, game);
  }
}
