import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ControlsModal = ({ isOpen, setIsOpen }) => {
  const [controlModal, setControlModal] = useState(null);

  useEffect(() => {
    setControlModal(document.getElementById("portal"));
  }, []);

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  if (!controlModal) return null;
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
              X
            </span>
            <span className="font-inter font-regular text-lg text-center">
              Controls
            </span>

            <ul className="h-full mt-5 w-full flex flex-col gap-4 justify-between">
              <li className=" flex justify-between  ">
                <div className="">W</div>
                <div className="">Upward</div>
              </li>
              <li className=" flex justify-between ">
                <div className="">A</div>
                <div className="">Leftward</div>
              </li>
              <li className=" flex justify-between ">
                <div className="">D</div>
                <div className="">Rightward</div>
              </li>
              <li className=" flex justify-between ">
                <div className="">S</div>
                <div className="">Downward</div>
              </li>

              <li className=" flex justify-between ">
                <div className="">Click</div>
                <div className="">Build/Destroy</div>
              </li>
            </ul>
          </motion.div>
        </div>
      )}
    </>,
    controlModal
  );
};

export default ControlsModal;
