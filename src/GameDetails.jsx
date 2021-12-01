import { Fragment, useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useTimeoutFn } from "react-use";

const GameDetails = ({
  currentGame,
  contract,
  currentUser,
  nearConfig,
  wallet,
  onClose,
  onLoading,
  onError,
}) => {
  const [isShowing, setIsShowing] = useState(false);
  const [game, setGame] = useState(currentGame);
  const [closeButtonColor, setCloseButtonColor] = useState("#000");
  const [shouldReloadGame, setShouldReloadGame] = useState(true);

  const canMakeMove = () => {
    return game.counterpartyId; // TODO add current turn
  };

  const onFieldSelected = (row, col) => {
    onLoading(true);
    if (canMakeMove) {
      contract
        .make_move({
          gameId: game.id,
          accountId: currentUser.accountId,
          row: row,
          col: col,
        })
        .then(
          () => {
            onLoading(false);
            setShouldReloadGame(true);
          },
          (err) => {
            onLoading(false);
            onError(`${err && err.kind ? err.kind["ExecutionError"] : err}`);
          }
        );
    }
  };

  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 100);

  useEffect(() => {
    resetIsShowing();
  }, [resetIsShowing]);

  useEffect(() => {
    if (currentUser && currentUser.accountId && onLoading && shouldReloadGame) {
      onLoading(true);
      contract
        .get_game({ gameId: game.id, accountId: currentUser.accountId })
        .then(
          (game) => {
            setGame(game);
            onLoading(false);
            setShouldReloadGame(false);
          },
          (err) => {
            setShouldReloadGame(false);
            onLoading(false);
            onError(`${err && err.kind ? err.kind["ExecutionError"] : err}`);
          }
        );
    }
  }, [game.id, contract, onLoading, onError, currentUser, shouldReloadGame]);

  const isOwner = () =>
    game && game.ownerFields && game.ownerId === currentUser.accountId;

  const isCounterparty = () =>
    game &&
    game.counterpartyFields &&
    game.counterpartyId === currentUser.accountId;

  return (
    <Transition
      as={Fragment}
      show={isShowing}
      enter={`transform transition duration-[250ms]`}
      enterFrom="opacity-0 rotate-[-120deg] scale-50"
      enterTo="opacity-100 rotate-0 scale-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 rotate-0 scale-100 "
      leaveTo="opacity-0 scale-95 "
    >
      <div className="mw-800 bg-gradient-to-r from-indigo-300 to-indigo-500 p-6 rounded-xl flex-col shadow-md flex">
        <div className="text-2xl flex justify-between font-medium items-center mb-4">
          <div className="mx-auto mt-2 text-2xl text-center font-medium text-black">
            Game #{game.id}
          </div>
          <button
            className="font-medium "
            onClick={onClose}
            onMouseEnter={() => setCloseButtonColor("#ddd")}
            onMouseLeave={() => setCloseButtonColor("#000")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke={closeButtonColor}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {isOwner() && (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col">
              <div className="mx-auto mt-2 text-2xl text-center font-medium text-black">
                Own ships
              </div>
              <div className="">
                {game.ownerFields.map((f, i) => (
                  <Board key={`row-${i}`} fields={f} row={i} ownBoard />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mx-auto mt-2 text-2xl text-center font-medium text-black">
                Counterparty Ships
              </div>
              <div className="">
                {game.counterpartyFields.map((f, i) => (
                  <Board
                    key={`row-${i}`}
                    fields={f}
                    row={i}
                    hasCounterparty={
                      game.counterpartyId && game.counterpartyId !== ""
                    }
                    onFieldSelected={onFieldSelected}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        {isCounterparty() && (
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <div className="flex flex-col">
              <div className="mx-auto mt-2 text-2xl text-center font-medium text-black">
                Own ships
              </div>
              <div>
                {game.counterpartyFields.map((f, i) => (
                  <Board key={`row-${i}`} fields={f} row={i} ownBoard />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="mx-auto mt-2 text-2xl text-center font-medium text-black">
                Counterparty Ships
              </div>
              <div>
                {game.ownerFields.map((f, i) => (
                  <Board
                    key={`row-${i}`}
                    fields={f}
                    row={i}
                    onFieldSelected={onFieldSelected}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Transition>
  );
};

const Board = ({ fields, row, onFieldSelected, ownBoard, hasCounterparty }) => {
  return (
    <div className="flex justify-center">
      {fields &&
        fields.map((f, i) =>
          ownBoard ? (
            <Field key={i} field={f} col={i} row={row} ownBoard />
          ) : (
            <Field
              key={i}
              field={f}
              col={i}
              row={row}
              hasCounterparty={hasCounterparty}
              onFieldSelected={onFieldSelected}
            />
          )
        )}
    </div>
  );
};
const Field = ({
  field,
  row,
  col,
  onFieldSelected,
  ownBoard,
  hasCounterparty,
}) => {
  const [fieldHovered, setFieldHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setFieldHovered(true)}
      onMouseLeave={() => setFieldHovered(false)}
      className={`w-10 h-10 ${
        hasCounterparty && !ownBoard && (field === "." || field === "*")
          ? "cursor-pointer border border-transparent rounded-md hover:bg-red-200"
          : ""
      } flex items-center justify-center`}
      onClick={() => {
        if (hasCounterparty && !ownBoard && (field === "." || field === "*")) {
          onFieldSelected(row, col);
        }
      }}
    >
      {!ownBoard && (field === "." || field === "*") && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#333"
        >
          {fieldHovered ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          )}
        </svg>
      )}
      {ownBoard && field === "." && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#333"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      )}
      {field === "-" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 12H6"
          />
        </svg>
      )}
      {ownBoard && field === "*" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {!ownBoard && field === "x" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#000"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
          />
        </svg>
      )}
      {ownBoard && field === "x" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.536 5.879a1 1 0 001.415 0 3 3 0 014.242 0 1 1 0 001.415-1.415 5 5 0 00-7.072 0 1 1 0 000 1.415z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </div>
  );
};

export default GameDetails;
