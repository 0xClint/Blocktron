import { injected, useAccount, useConnect, useDisconnect } from "wagmi";
import { TbWalletOff } from "react-icons/tb";
import { shortenAddress } from "@/helpers/convertor";


function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div className="bg-primary card-container text-[#62832d] p-0 flex-center  cursor-pointer ">
      {address && (
        <div className="p-2 flex-center gap-2">
          <img src="/userProfile.png" className="w-10 rounded" />
          {shortenAddress(address)}
        </div>
      )}
      <button
        onClick={() => disconnect()}
        className="h-full border-l-2 p-2 border-black"
      >
        <TbWalletOff className="text-3xl hover:scale-105" />
      </button>
    </div>
  );
}

export function ConnectWallet() {
  const { isConnected } = useAccount();
  const { connect } = useConnect();
  if (isConnected) return <Account />;
  else
    return (
      <button
        className="bg-primary card-container text-[#62832d] px-2 py-1 cursor-pointer hover:bg-primary/80"
        onClick={() => connect({ connector: injected() })}
      >
        Connect
      </button>
    );
}
