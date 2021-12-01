import { Fragment, useState, useEffect } from "react";
import { useTimeoutFn } from "react-use";
import { Transition } from "@headlessui/react";

const Authorization = ({ contract, currentUser, nearConfig, wallet }) => {
  const signIn = () => {
    wallet.requestSignIn(nearConfig.contractName, "NEAR Battle Ships");
  };

  const signOut = () => {
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  };

  let [isShowing, setIsShowing] = useState(true);
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);

  useEffect(() => {
    resetIsShowing();
  }, [resetIsShowing]);

  return (
    <>
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transform transition duration-[500ms]"
        enterFrom="opacity-0 rotate-[-120deg] scale-50"
        enterTo="opacity-100 rotate-0 scale-100"
        leave="transform duration-200 transition ease-in-out"
        leaveFrom="opacity-100 rotate-0 scale-100 "
        leaveTo="opacity-0 scale-95 "
      >
        <div className="flex justify-between bg-gradient-to-r from-green-400 to-blue-500 mt-6 p-2 mx-auto rounded-xl shadow-md items-center">
          <img
            className="h-14 w-20"
            src="https://docs.near.org/img/near_logo.svg"
            alt="NEAR Logo"
          />

          <div
            className={`text-xl ${
              currentUser && currentUser.accountId ? "md:pl-60" : ""
            } font-medium text-black uppercase`}
          >
            Near BattleShips
          </div>
          <div className="flex justify-between">
            {currentUser && (
              <div className="mr-8">
                <p className="text-black-500">
                  Account ID: {currentUser.accountId}
                </p>
              </div>
            )}
            {currentUser ? (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right"
                onClick={signOut}
              >
                Logout
              </button>
            ) : (
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded float-right"
                onClick={signIn}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Authorization;
