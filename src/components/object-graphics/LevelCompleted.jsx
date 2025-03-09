import { useRouter } from "next/router";
import React from "react";

const LevelCompleted = ({ handleGoToNextLevel }) => {
  const router = useRouter();
  return (
    <div className="md:w-[400px] card-container border-2 rounded-lg w-full py-4 px-3  relative flex flex-col gap-4 overflow-y-auto">
      <span className="font-inter font-regular  my-4 text-center">
        Level Completed
      </span>
      <div className=" flex justify-between">
        <button
          onClick={() => router.push("/levels")}
          className="btn w-[170px] text-sm"
        >
          Levels
        </button>
        <button
          onClick={() => handleGoToNextLevel()}
             className="btn w-[170px] text-sm"
        >
          Mint & Next
        </button>
      </div>
    </div>
  );
};

export default LevelCompleted;
