import soundsManager, { SFX } from "@/classes/Sounds";
import {
  ControlsModal,
  Header,
  MyLands,
  NewGameModal,
  TranferNFTModal,
} from "@/components";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {
  const [landsModal, setLandsModal] = useState(false);
  const [newGameModal, setNewGameModal] = useState(false);
  const [controlModal, setControlModal] = useState(false);
  const [transferNFTModal, setTransferNFTModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="">
        <div
          className={`absolute w-screen h-screen -z-10 bg-[url('../assets/bg.png')] bg-no-repeat bg-cover bg-center opacity-70`}
        ></div>

        <div className=" w-screen h-screen flex-col">
          <Header />
          <MyLands isOpen={landsModal} setIsOpen={setLandsModal} />
          <NewGameModal isOpen={newGameModal} setIsOpen={setNewGameModal} />
          <TranferNFTModal
            isOpen={transferNFTModal}
            setIsOpen={setTransferNFTModal}
          />
          <ControlsModal isOpen={controlModal} setIsOpen={setControlModal} />
          {/* <div className="h-full flex-center justify-center flex-col"> */}
          <div className="relative h-full flex-center gap-10 flex-col pb-10">
            <img
              src="./blocktron.png"   
              className="absolute top-48 h-10 mx-auto"
            />
            <div className="w-full flex-center flex-col gap-3 text-[#866149]">
              <button
                onClick={() => setNewGameModal(true)}
                onMouseEnter={() => soundsManager.playSfx(SFX.MENU)}
                className="w-[300px] pixelated flex-center bg-tertiary p-3 border-2 text-white border-black rounded-md hover:scale-[102%] duration-100 ease-in"
              >
                Play
              </button>
              <button
                onClick={() => setLandsModal(true)}
                onMouseEnter={() => soundsManager.playSfx(SFX.MENU)}
                className="w-[300px] pixelated flex-center bg-tertiary p-3 border-2 text-white border-black rounded-md hover:scale-[102%] duration-100 ease-in"
              >
                My Lands
              </button>
              <button
                onClick={() => router.push("/levels")}
                onMouseEnter={() => soundsManager.playSfx(SFX.MENU)}
                className="w-[300px] pixelated flex-center bg-tertiary p-3 border-2 text-white border-black rounded-md hover:scale-[102%] duration-100 ease-in"
              >
                Challenges
              </button>
              <button
                onClick={() => setTransferNFTModal(true)}
                className="w-[300px] pixelated flex-center bg-tertiary p-3 border-2 text-white border-black rounded-md hover:scale-[102%]"
              >
                Transfer
              </button>
              <button
                onClick={() => setControlModal(true)}
                onMouseEnter={() => soundsManager.playSfx(SFX.MENU)}
                className="w-[300px] pixelated flex-center bg-tertiary p-3 border-2 text-white border-black rounded-md hover:scale-[102%] duration-100 ease-in"
              >
                Controls
              </button>
              {/* <button
                onClick={() => handleExceute()}
                className="w-[300px] pixelated flex-center bg-secondary p-3 border-2 border-black rounded-md hover:scale-[102%] duration-100 ease-in"
              >
                TEMP
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
