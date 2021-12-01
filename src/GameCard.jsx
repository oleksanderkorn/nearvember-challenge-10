import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useTimeoutFn } from "react-use";
import { CopyToClipboard } from "react-copy-to-clipboard";

const GameCard = ({
  game,
  index,
  delay,
  contract,
  currentUser,
  nearConfig,
  wallet,
  onLoading,
  onGameSelected,
}) => {
  let [isShowing, setIsShowing] = useState(false);
  let [isHovered, setIsHovered] = useState(false);
  let [isCopied, setIsCopied] = useState(false);

  let [, , resetIsShowing] = useTimeoutFn(
    () => setIsShowing(true),
    index * 200
  );

  let [, , resetIsCopied] = useTimeoutFn(() => setIsCopied(false), 500);

  const showCopied = () => {
    setIsCopied(true);
    resetIsCopied();
  };

  useEffect(() => {
    resetIsShowing();
  }, [resetIsShowing]);

  return (
    <Transition
      as={Fragment}
      show={isShowing}
      enter={`transform transition duration-[${delay}ms]`}
      enterFrom="opacity-0 rotate-[-120deg] scale-50"
      enterTo="opacity-100 rotate-0 scale-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 rotate-0 scale-100 "
      leaveTo="opacity-0 scale-95 "
    >
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`w-full bg-gradient-to-r ${
          isHovered
            ? "from-yellow-500 to-red-600"
            : "from-yellow-400 to-red-500"
        }  p-6 max-w-sm mx-auto rounded-xl flex-col shadow-md flex space-y-2 cursor-pointer`}
      >
        <div className="text-xl font-medium text-black text-center flex items-center justify-center">
          <p onClick={() => onGameSelected(game)}> Game #{game.id}</p>
          <CopyToClipboard text={game.id} onCopy={showCopied}>
            <button className="inline-flex justify-center ml-2 px-2 py-2 text-sm font-medium border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {isCopied && <span>copied</span>}
            </button>
          </CopyToClipboard>
        </div>
        <div
          className="text-md font-medium text-black text flex flex-row items-center"
          onClick={() => onGameSelected(game)}
        >
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <p>
            {game.counterpartyId
              ? `${game.ownerId} - ${game.counterpartyId}`
              : "Share game id with your friend!"}
          </p>
        </div>
      </div>
    </Transition>
  );
};

export default GameCard;
