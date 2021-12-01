import {
  PersistentMap,
  PersistentSet,
  PersistentVector,
  RNG,
  u128,
} from "near-sdk-as";
import { AccountId, Timestamp } from "../utils";

@nearBindgen
export class Game {
  private BOARD_SIZE: i16 = 16;

  public ownerFields: string[][];
  public counterpartyFields: string[][];

  constructor(
    public id: u16,
    public ownerId: AccountId,
    public counterpartyId: AccountId
  ) {
    const rng = new RNG<i16>(1, 4);
    this.ownerFields = this.generateBoard(rng.next() + 1);
    this.counterpartyFields = this.generateBoard(rng.next() + 1);
  }

  private generateBoard(variant: i16): string[][] {
    if (variant == 1) {
      return [
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          "*",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          "*",
          ".",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
      ];
    } else if (variant == 2) {
      return [
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
          "*",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
        ],
        [
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
        ],
        [
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          ".",
          ".",
        ],
        [
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
        ],
        [
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
        ],
        [
          "*",
          "*",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
      ];
    } else if (variant == 3) {
      return [
        [
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          "*",
          "*",
          "*",
          ".",
          ".",
          "*",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
      ];
    } else {
      return [
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
        ],
        [
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          ".",
          "*",
        ],
        [
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          "*",
        ],
        [
          ".",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
        ],
        [
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
        ],
        [
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
      ];
    }
  }
}
