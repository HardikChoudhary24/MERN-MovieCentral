import React from "react";
import Img from "../image/Img";
import { IconContext } from "react-icons/lib";
import { BsStarFill } from "react-icons/bs";
import alternate from "../../assets/no-poster.png";
import { useSelector } from "react-redux";
import "./style.scss"
import { useNavigate } from "react-router-dom";
const Card = ({item}) => {
  const navigate = useNavigate();

  const { url } = useSelector((state) => state?.home);
  const title = item?.original_title || item?.name;
  const wordsArray = title?.split(" ");
  const nameToDisplay =
    wordsArray?.length < 3
      ? title
      : wordsArray[0] + " " + wordsArray[1] + " " + "...";
  return (
    <div
      className="itemContainer"
    //   style={itemContainerStyle}
      key={item.id}
      onClick={() => {
        navigate(
          `/MERN-MovieCentral/${item.media_type || mediaType}/${item.id}`
        );
      }}
    >
      <div className="itemPhoto">
        <Img
          src={item.poster_path ? url.poster + item.poster_path : alternate}
        />
      </div>
      <div className="rating">
        <IconContext.Provider
          value={{
            color: "yellow",
            className: "global-class-name ratingStar",
            size: "18px",
          }}
        >
          <BsStarFill />
          <span>{item.vote_average?.toFixed(1)}</span>
        </IconContext.Provider>
      </div>
      <p className="itemTitle">{nameToDisplay}</p>
    </div>
  );
};

export default Card;
