import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader } from ".";
import { useGame } from "@/contexts/GameProvider";
import { getContractByAddress } from "@/helpers/convertor";
import axios from "axios";
import { WORLD_SPACE_CONTRACT_ADDRESS } from "@/contracts/conts";

const TranferNFTModal = ({ isOpen, setIsOpen }) => {
  const [transferNFTModal, setTransferNFTModal] = useState(null);
  const [landTokenID, setLandTokenID] = useState("");
  const [toAddress, SetToAddress] = useState("");
  const { lands, transferNFT, getAllLands } = useGame();
  const [loader, setLoader] = useState(false);

  const handleTransferNFT = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      await transferNFT(toAddress, landTokenID);
    } catch (error) {
      console.log(error);
    }
    setIsOpen(false);
    setLoader(false);
  };
  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    setTransferNFTModal(document.getElementById("portal"));
  }, []);

  if (!transferNFTModal) return null;
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
              X
            </span>
            <span className="font-inter font-regular text-lg text-center">
              Transfer Land NFT
            </span>
            <form
              onSubmit={handleTransferNFT}
              className="h-full flex flex-col justify-between flex-grow"
            >
              <div>
                <div>
                  <label>Receipent Address</label>
                  <input
                    className="w-full border-black p-2 mt-1 bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
                    value={toAddress}
                    onChange={(e) => SetToAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="mt-5 w-full">
                  <select
                    required
                    value={landTokenID}
                    onChange={(e) => setLandTokenID(e.target.value)}
                    className="w-full border-black p-1.5 mt-1 bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block "
                  >
                    <option value="" disabled>
                      Select a land
                    </option>
                    {lands?.length ? (
                      lands.map(({ name, uri, identifier }) => {
                        // console.log(identifier);
                        if (uri != null)
                          return (
                            <option key={uri} value={identifier}>
                              {name}
                            </option>
                          );
                      })
                    ) : (
                      <div className="text-center w-full">No lands created</div>
                    )}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full border-2 border-tertiary hover:scale-[101%] text-white py-1  rounded text-center"
              >
                Submit
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </>,
    transferNFTModal
  );
};

export default TranferNFTModal;
