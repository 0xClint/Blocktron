import { motion } from "framer-motion";
import { useGame } from "@/contexts/GameProvider";
import { injected, useConnect } from "wagmi";

const WalletConnectModal = () => {
  const { connect } = useConnect();
  const { connectWallet, setConnectWallet } = useGame();

  const variants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };
  return (
    connectWallet && (
      <div className="absolute top-0 left-0 h-screen w-screen p-4 flex-center bg-black bg-opacity-50 z-[99999]">
        <motion.div
          className="md:w-[400px]  card-container border-2 rounded-lg w-full p-6 relative flex flex-col gap-4 overflow-y-auto"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <span
            onClick={() => setConnectWallet(false)}
            className="w-5 h-5 absolute top-[14px] right-4 hover:cursor-pointer"
          >
            X
          </span>
          <span className="font-inter font-regular text-lg text-center">
            Please connect wallet
          </span>
          <button
            className="bg-primary card-container text-[#62832d] px-2 py-1 cursor-pointer hover:bg-primary/80"
            onClick={() => {
              connect({ connector: injected() });
              setConnectWallet(false);
            }}
          >
            Connect
          </button>
        </motion.div>
      </div>
    )
  );
};
export default WalletConnectModal;
