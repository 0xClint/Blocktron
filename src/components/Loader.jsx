// import Lottie from "react-lottie-player";
import loader from "@/assets/loader.json";

const Loader = () => {
  return (
    <div
      className="fixed z-10 top-0 w-screen h-screen flex justify-center items-center"
      style={{ background: "rgba(223, 223, 223, 0.22)" }}
    >
LOADING
      {/* <Lottie
        loop
        animationData={loader}
        play
        style={{
          width: 200,
          height: 200,
          position: "absolute",
        }}
      /> */}
    </div>
  );
};

export default Loader;
