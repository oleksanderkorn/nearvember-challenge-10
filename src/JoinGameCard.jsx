import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { useTimeoutFn } from "react-use";

const JoinGameCard = ({ onJoinGame }) => {
  let [isShowing, setIsShowing] = useState(false);
  let [isHovered, setIsHovered] = useState(false);
  let [gameId, setGameId] = useState("");

  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 150);

  useEffect(() => {
    resetIsShowing();
  }, [resetIsShowing]);
  return (
    <Transition
      as={Fragment}
      show={isShowing}
      enter={`transform transition duration-[200ms]`}
      enterFrom="opacity-0 rotate-[-120deg] scale-50"
      enterTo="opacity-100 rotate-0 scale-100"
      leave="transform duration-200 transition ease-in-out"
      leaveFrom="opacity-100 rotate-0 scale-100 "
      leaveTo="opacity-0 scale-95 "
    >
      <div
        className={`w-full bg-gradient-to-r ${
          isHovered
            ? "from-green-300 to-blue-500"
            : "from-green-100 to-blue-300"
        } p-6 mx-auto max-w-sm rounded-xl shadow-md cursor-pointer flex flex-row items-center justify-evenly`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <input
          type="text"
          className="p-2"
          value={gameId}
          placeholder="Enter game id"
          onChange={(e) => setGameId(e.target.value)}
        />
        <button
          onClick={() => onJoinGame(gameId)}
          disabled={!gameId}
          className="inline-flex justify-center ml-2 px-2 py-2 text-sm font-medium border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </button>
      </div>
    </Transition>
  );
};

export default JoinGameCard;
