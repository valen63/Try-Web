import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserRank } from "../../../../redux/actions";
import gold from "/img/gold.png"
import silver from "/img/silver.png"
import bronze from "/img/bronze.png"

// styles
import style from "./userRank.module.css";

const UserRank = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((store) => store.isLogged);
  const user = useSelector((store) => store.user);
  const [userRank, setUserRank] = useState();
  const [errorRank, setErrorRank] = useState({});

  useEffect(() => {

    async function axiosReq() {
      const data = await dispatch(getUserRank(user._id));
      if (data.success) {
        setUserRank(data.response);
      } else {
        setErrorRank({ err: data.info });
      }
    }
    if (isLogged) {
      axiosReq();
    }
  }, [dispatch]);

  if (isLogged) {
    return (
      <div className={style.flexContainer}>
        <div className={style.imgContainer}>
          <img
            src={user.Image}
            className={style.userPicture}
          />
          <img
            src={userRank === 0 ? gold: userRank === 1 ? silver: userRank=== 2? bronze:null}
            className={style.frame}
          />
        </div>
        <div className={style.userRankContainer}>
          <label>{user.username.split(" ")[0]}</label>
          <div className={style.userRank}>
            <h3> Posicion actual</h3>
            <h1>#{userRank + 1}</h1>
          </div>
          {errorRank.err && (
            <label className={style.err}>{errorRank.err}</label>
          )}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default UserRank;
