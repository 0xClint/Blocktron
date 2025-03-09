import App from "@/App";
import { Loader } from "@/components";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Land = () => {
  const router = useRouter();
  const [gameData, setGameData] = useState(null);
  const [loader, setLoader] = useState(true);

  const fetchGameData = async () => {
    const cid = router.query.id;
    if (cid) {
      setLoader(true);
      console.log(router.query.id);
      try {
        const res = await axios.get(
          `https://gateway.lighthouse.storage/ipfs/${cid}/`
        );
        console.log(res.data);
        setGameData(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, [router.query.id]);

  return loader ? (
    <Loader />
  ) : gameData ? (
    <>
      {/* <App gameData={tempData} /> */}
      <App gameData={gameData} />
    </>
  ) : (
    <div>Something Went Wrong! Please Go to Home</div>
  );
};

export default Land;
