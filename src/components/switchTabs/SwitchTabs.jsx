import React from 'react'
import "./style.scss"
const SwitchTabs = ({setMediaType,mediaType}) => {
  return (
    <div className="switchBtns">
      <button
        className={mediaType === "movie" ? "switch active" : "switch"}
        onClick={() => {
          setMediaType("movie");
        }}
      >
        Movies
      </button>
      <button
        className={mediaType === "tv" ? "switch active" : "switch"}
        onClick={() => {
          setMediaType("tv");
        }}
      >
        T.V Shows
      </button>
    </div>
  );
}

export default SwitchTabs
