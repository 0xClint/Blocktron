import App from "@/App";
import { Loader } from "@/components";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Level = () => {
  const router = useRouter();
  const [levelData, setLevelData] = useState(null);
  const [loader, setLoader] = useState(true);

  const fetchLevelData = async () => {
    const cid = router.query.id;
    if (cid) {
      setLoader(true);
      console.log(router.query.id);
      try {
        const res = await axios.get(
          `https://gateway.lighthouse.storage/ipfs/${cid}/`
        );
        console.log(res.data);
        setLevelData(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchLevelData();
  }, [router.query.id]);

  return loader ? (
    <Loader />
  ) : levelData ? (
    <>
      <App gameData={levelData} />
    </>
  ) : (
    <div>Something Went Wrong! Please Go to Home</div>
  );
};

export default Level;
