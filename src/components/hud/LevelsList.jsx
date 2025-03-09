import styles from "@/components/hud/PopupMessage.module.css";
import { useRouter } from "next/router";

const LevelsList = () => {
  const route = useRouter();
  

  return (
    <div className={styles.outerContainer}>
      <div
        className={`${styles.popupContainer} w-[200px]  card-container text-sm`}
      >
        {/* <span className="absolute top-0 right-1 cursor-pointer">X</span> */}

        <div
          onClick={() => route.push("/levels")}
          className="bg-tertiary  w-full cursor-pointer rounded-sm text-center text-white p-1"
        >
          Go to Levels
        </div>
      
      </div>
    </div>
  );
};

export default LevelsList;
