import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGame } from "@/contexts/GameProvider";
import { useRouter } from "next/router";
import { RxCross2 } from "react-icons/rx";

const MyLands = ({ isOpen, setIsOpen }) => {
  const { lands } = useGame();
  const router = useRouter();
  const [landsModal, setLandsModal] = useState(null);

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    setLandsModal(document.getElementById("portal"));
  }, []);

  if (!landsModal) return null;

  return ReactDom.createPortal(
    <>
      {isOpen && (
        <div className="absolute top-0 left-0 h-screen w-screen p-4 flex-center bg-opacity-50 z-[99999]">
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
              <RxCross2 className="text-xl" />
            </span>
            <span className="font-inter font-regular text-lg text-center">
              My Lands
            </span>
            <div className={"w-full h-full flex flex-col gap-y-4"}>
              <div className="w-full flex flex-col my-3 ">
                {lands?.length ? (
                  lands.map(({ name, tokenID, cid }) => {
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
                  <span className="text-center">No lands created</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>,
    landsModal
  );
};

export default MyLands;
