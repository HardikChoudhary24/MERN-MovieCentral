import React, { useRef, useState } from "react";
import "./header.scss";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosArrowRoundBack, IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [menuState, setMenuState] = useState(false);
  const [inputField, setInputField] = useState("");
  const [searchBarState, setSearchBarState] = useState(false);
  const navigate = useNavigate();

  const styleForContainer = {
    display: searchBarState ? "flex" : "none",
  };
  const styleForInput = {
    width: searchBarState ? "190px" : "0",
  };

  const searchQuery = (e) => {
    if (e.key === "Enter" && inputField !== "") {
      navigate(`/search/${inputField}`);
    }
  };

  const navigatePageHandler = (type) => {
    if (type === "movie") {
      navigate(`/explore/${type}`);
    } else {
      navigate(`/explore/${type}`);
    }
  };

  return (
    <>
      <header className="headerContainer">
        <div className="siteLogo">
          <h1>
            <span>MOVIE</span> CENTRAL
          </h1>
        </div>
        <div className="navItems">
          <button
            className="moviesBtn"
            onClick={() => navigatePageHandler("movie")}
          >
            <p>Movies</p>
          </button>
          <button className="tvBtn" onClick={() => navigatePageHandler("tv")}>
            <p>T.V Shows</p>
          </button>
          {searchBarState && (
            <div className="searchBar" style={styleForContainer}>
              <input
                type="text"
                placeholder="Search for a movie or a tv show..."
                value={inputField}
                onChange={(e) => setInputField(e.target.value)}
                onKeyDown={searchQuery}
                className="searchInput"
                style={styleForInput}
              />
            </div>
          )}
          <button
            className="searchBtn"
            onClick={() => setSearchBarState(!searchBarState)}
          >
            <IconContext.Provider
              value={{
                // color: "white",
                className: "global-class-name searchIcon",
                size: "25px",
              }}
            >
              {searchBarState ? <IoMdClose /> : <AiOutlineSearch />}
            </IconContext.Provider>
          </button>
          <button className="menuBtn" onClick={() => setMenuState(!menuState)}>
            <IconContext.Provider
              value={{
                color: "white",
                className: "global-class-name",
                size: "25px",
              }}
            >
              <RxHamburgerMenu />
            </IconContext.Provider>
          </button>
        </div>
      </header>
      {menuState && (
        <div className="menuContainer">
          <div className="menuContainerHeader">
            <div className="siteLogo">
              <h1>
                <span>MOVIE</span> CENTRAL
              </h1>
            </div>
            <button
              className="backBtn"
              onClick={() => setMenuState(!menuState)}
            >
              <IconContext.Provider
                value={{
                  color: "white",
                  className: "global-class-name",
                  size: "40px",
                }}
              >
                <IoIosArrowRoundBack />
              </IconContext.Provider>
            </button>
          </div>
          <div
            className="menuItem"
            onClick={() => navigatePageHandler("movie")}
          >
            <p>Movies</p>
          </div>
          <div className="menuItem" onClick={() => navigatePageHandler("tv")}>
            <p>T.V Shows</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
