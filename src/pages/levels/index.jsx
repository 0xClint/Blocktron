import { Header } from "@/components";
import { useRouter } from "next/router";
import React from "react";
import { LockIcon } from "@/assets/Icons/";
import { useGame } from "@/contexts/GameProvider";

const Levels = () => {
  const route = useRouter();
  const { userLevels, gameLevels } = useGame();

  return (
    <>
      <div className="">
        <div
          className={`absolute w-screen h-screen -z-10 bg-[url('../assets/bg.png')] bg-no-repeat bg-cover bg-center opacity-70`}
        ></div>

        <div className=" w-screen h-screen flex-col">
          <Header />
          <div className="h-full flex-center pb-10">
            <div className="w-[300px] card-container text-[#8A664E]  p-4">
              <h2 className="w-full bg-tertiary text-white py-2  rounded text-center">
                Levels
              </h2>
              <div className="w-full flex flex-col my-3 ">
                {gameLevels?.map(({ itemURI }, index) => {
                  return (
                    <button
                      key={itemURI}
                      disabled={userLevels < index}
                      onClick={() => route.push(`/levels/${itemURI}`)}
                      className="relative flex-center text-center hover:bg-[#e2995c] cursor-pointer rounded p-2"
                    >
                      Level {index + 1}
                      {userLevels < index && (
                        <LockIcon className="absolute right-1 top-2 h-5" />
                      )}
                    </button>
                  );
                })}
                {/* <button onClick={() => handleGo()}>Hello</button> */}
              </div>
              <button
                onClick={() => route.push(`/`)}
                className="w-full border-2 border-tertiary hover:scale-[105%] text-white py-1  rounded text-center"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Levels;
