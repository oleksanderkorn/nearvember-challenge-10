import { RNG } from "near-sdk-as";
import { AccountId } from "../utils";

@nearBindgen
export class Game {
  public ownerFields: string[][];
  public counterpartyFields: string[][];

  constructor(
    public id: u16,
    public ownerId: AccountId,
    public counterpartyId: AccountId
  ) {
    const rng = new RNG<u16>(1, 6);
    const ownerBoardVariant = rng.next() + 1;
    let counterpartyBoardVariant: u16 = 0;
    while (
      counterpartyBoardVariant === 0 &&
      counterpartyBoardVariant !== ownerBoardVariant
    ) {
      counterpartyBoardVariant = rng.next() + 1;
    }
    this.ownerFields = this.generateBoard(ownerBoardVariant);
    this.counterpartyFields = this.generateBoard(counterpartyBoardVariant);
  }

  private generateBoard(variant: u16): string[][] {
    if (variant == 1) {
      return [
        [
          "*",
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
          ".",
          ".",
          ".",
        ],
        [
          "*",
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
          "*",
          ".",
          "*",
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
          "*",
          ".",
          ".",
          "*",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
          "*",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          "*",
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
          "*",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          "*",
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
          "*",
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
          "*",
          ".",
          ".",
          ".",
          "*",
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
          "*",
          "*",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          "*",
          ".",
        ],
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
          "*",
          ".",
          ".",
          ".",
          "*",
        ],
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
          "*",
          "*",
          "*",
          "*",
          "*",
        ],
        [
          ".",
          ".",
          "*",
          "*",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          ".",
          ".",
          ".",
        ],
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
          "*",
          ".",
          "*",
          ".",
          ".",
        ],
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
          "*",
          ".",
          ".",
          "*",
          ".",
        ],
        [
          ".",
          ".",
          "*",
          "*",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
        ],
      ];
    } else if (variant == 2) {
      return [
        [
          ".",
          "*",
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
          ".",
        ],
        [
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
        ],
        [
          ".",
          "*",
          "*",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          ".",
          ".",
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
          "*",
          ".",
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
          "*",
          ".",
          ".",
          "*",
          "*",
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
          "*",
          ".",
          ".",
          ".",
          "*",
        ],
        [
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
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
          "*",
          ".",
          ".",
          ".",
          "*",
        ],
        [
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
          "*",
          "*",
          "*",
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
          "*",
          "*",
          "*",
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
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          "*",
          "*",
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
          "*",
          "*",
          "*",
          "*",
          "*",
          ".",
          ".",
        ],
      ];
    } else if (variant == 3) {
      return [
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
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
          ".",
          ".",
          ".",
          ".",
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
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          "*",
          ".",
          "*",
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
          "*",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          "*",
          "*",
          "*",
          "*",
          "*",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
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
        ],
        [
          ".",
          ".",
          ".",
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
          "*",
          ".",
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
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
        ],
        [
          "*",
          "*",
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
          ".",
        ],
        [
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
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
          "*",
          "*",
          "*",
          "*",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          "*",
          "*",
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
          ".",
        ],
      ];
    } else if (variant == 4) {
      return [
        [
          ".",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
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
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
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
          "*",
          ".",
          "*",
          ".",
          ".",
          "*",
          "*",
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
          "*",
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
          ".",
          ".",
        ],
        [
          "*",
          "*",
          "*",
          "*",
          "*",
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
        ],
        [
          "*",
          ".",
          ".",
          ".",
          "*",
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
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          "*",
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
          "*",
          ".",
          ".",
          ".",
          "*",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          "*",
          "*",
          ".",
          ".",
          "*",
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
          "*",
          ".",
          "*",
          ".",
          "*",
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
          "*",
          ".",
          ".",
          "*",
          "*",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          "*",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
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
          "*",
          ".",
          ".",
          ".",
          "*",
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
          "*",
          ".",
          ".",
          ".",
          "*",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          "*",
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
        ],
      ];
    } else if (variant == 5) {
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
          "*",
          "*",
          "*",
          "*",
          "*",
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
          ".",
          ".",
          "*",
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
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
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
          ".",
          ".",
          "*",
          "*",
          "*",
          "*",
          "*",
        ],
        [
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
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
          ".",
          ".",
          "*",
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
          ".",
          ".",
          "*",
          "*",
          "*",
          "*",
          "*",
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
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
        ],
        [
          "*",
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
          "*",
          ".",
        ],
        [
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
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
          "*",
          "*",
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          ".",
          ".",
          "*",
          "*",
          ".",
        ],
        [
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
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
        ],
        [
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
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
        ],
        [
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
          "*",
          ".",
          ".",
          ".",
          "*",
          ".",
        ],
        [
          "*",
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
          "*",
          ".",
          ".",
          ".",
          "*",
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
          "*",
          "*",
          ".",
          ".",
          "*",
          ".",
          ".",
          ".",
          ".",
        ],
        [
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          "*",
          ".",
          "*",
          ".",
          "*",
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
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          "*",
          "*",
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
          "*",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
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
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
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
          ".",
          "*",
          ".",
          "*",
          ".",
          ".",
          ".",
          "*",
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
          ".",
          ".",
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
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
        ],
        [
          ".",
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
          ".",
        ],
        [
          ".",
          ".",
          ".",
          "*",
          "*",
          "*",
          "*",
          "*",
          ".",
          "*",
          "*",
          "*",
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
          ".",
          ".",
          "*",
          ".",
          "*",
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
          "*",
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
          "*",
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
