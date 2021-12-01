import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import JoinGameCard from "./JoinGameCard";
import AddGameCard from "./AddGameCard";
import GameDetails from "./GameDetails";

const Games = ({
  contract,
  currentUser,
  nearConfig,
  wallet,
  onLoading,
  onError,
}) => {
  const [games, setGames] = useState();
  const [shouldReloadGames, setShouldReloadGames] = useState(true);
  const [selectedGame, setSelectedGame] = useState();

  const activateGame = (election) => {
    localStorage.setItem("activeGame", election.id);
    setSelectedGame(election);
  };

  const deactivateGame = () => {
    localStorage.removeItem("activeGame");
    setSelectedGame(null);
  };

  const addGame = () => {
    if (onLoading) {
      onLoading(true);
      contract.create_game().then(
        () => {
          setShouldReloadGames(true);
          onLoading(false);
        },
        (err) => {
          onLoading(false);
          onError(`${err && err.kind ? err.kind["ExecutionError"] : err}`);
        }
      );
    }
  };

  const joinGame = (gameId) => {
    if (onLoading) {
      onLoading(true);
      contract.join_game({ gameId: parseInt(gameId) }).then(
        () => {
          setShouldReloadGames(true);
          onLoading(false);
        },
        (err) => {
          onLoading(false);
          onError(`${err && err.kind ? err.kind["ExecutionError"] : err}`);
        }
      );
    }
  };

  useEffect(() => {
    if (games && games.length > 0) {
      const gameId = localStorage.getItem("activeGame");
      games
        .filter((e) => `${e.id}` === gameId)
        .forEach((e) => {
          setSelectedGame(e);
        });
    }
  }, [games]);

  useEffect(() => {
    if (
      currentUser &&
      currentUser.accountId &&
      onLoading &&
      shouldReloadGames
    ) {
      onLoading(true);
      contract.get_games({ accountId: currentUser.accountId }).then(
        (games) => {
          onLoading(false);
          setGames(games);
          setShouldReloadGames(false);
        },
        (err) => {
          setShouldReloadGames(false);
          onLoading(false);
          onError(`${err && err.kind ? err.kind["ExecutionError"] : err}`);
        }
      );
    }
  }, [contract, onLoading, onError, currentUser, shouldReloadGames]);

  return (
    <div className="container mx-auto flex-row">
      {!selectedGame && (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 xs:grid-cols-1 gap-4">
          <AddGameCard onAddGame={addGame} />
          <JoinGameCard onJoinGame={joinGame} />
          {games &&
            games.map((game, index) => {
              return (
                <GameCard
                  key={index}
                  game={game}
                  index={index}
                  contract={contract}
                  currentUser={currentUser}
                  nearConfig={nearConfig}
                  wallet={wallet}
                  onLoading={onLoading}
                  onGameSelected={activateGame}
                />
              );
            })}
        </div>
      )}
      {selectedGame && (
        <div className="grid grid-cols-1">
          <GameDetails
            currentGame={selectedGame}
            contract={contract}
            currentUser={currentUser}
            nearConfig={nearConfig}
            wallet={wallet}
            onLoading={onLoading}
            onError={onError}
            onClose={deactivateGame}
          />
        </div>
      )}
    </div>
  );
};

export default Games;
