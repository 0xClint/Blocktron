import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/contexts/GameProvider";
import newLevel from "@/Levels/Lobby";
import { uploadFile } from "@/utils/lighthouse";
import { Loader } from ".";
import { useRouter } from "next/router";
import { LabelIcon } from "@/assets/Icons";
import { RxCross2 } from "react-icons/rx";

const NewGameModal = ({ isOpen, setIsOpen }) => {
  const { createLand, lands } = useGame();
  const [newGameModal, setNewGameModal] = useState(null);
  const [loader, setLoader] = useState(false);
  const [gameName, setGameName] = useState("");
  const router = useRouter();

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const handleCreateLand = async (e) => {
    e.preventDefault();
    setLoader(true);
    const cid = await createLand(gameName, newLevel);
    router.push(`/land/${cid}`);
    setLoader(false);
    setNewGameModal(false);
  };

  useEffect(() => {
    setNewGameModal(document.getElementById("portal"));
  }, []);
  if (!newGameModal) return null;

  return ReactDom.createPortal(
    <>
      {isOpen && (
        <div className="absolute top-0 left-0 h-screen w-screen p-4 flex-center bg-opacity-50 z-[99999]">
          {loader && <Loader />}
          <motion.div
            className="md:w-[400px] min-h-[400px] card-container border-2 rounded-lg w-full p-6 relative flex flex-col gap-4 overflow-y-auto"
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.3 }}
          >
            <span
              onClick={() => setIsOpen(false)}
              className="w-5 h-5 absolute top-[14px] right-4 hover:cursor-pointer"
            >
              <RxCross2 className="text-xl"/>
            </span>
            <span className="font-inter font-regular text-lg text-center">
              Create Land
            </span>

            <form
              onSubmit={handleCreateLand}
              className="h-full flex flex-col justify-between flex-grow"
            >
              <div>
                <div>
                  <label>Name</label>
                  <input
                    className="w-full border-black p-2 mt-1 bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-3">
                  {lands?.length ? (
                    lands.map(({ name, cid }) => {
                      if (cid != null)
                        return (
                          <div
                            key={cid}
                            onClick={() => router.push(`/land/${cid}`)}
                            className="relative flex-center text-center hover:bg-[#af876c] cursor-pointer rounded p-2"
                          >
                            {name}
                          </div>
                        );
                    })
                  ) : (
                    <div className="text-center w-full">No lands created</div>
                  )}
                </div>
              </div>
              <button type="submit" className="btn hover:scale-[101%]">
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>,
    newGameModal
  );
};

export default NewGameModal;
