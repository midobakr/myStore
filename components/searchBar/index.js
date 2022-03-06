import { useRef } from "react";
import classes from "./searchBar.module.css";
import { MdClose } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
export default function SearchBar() {
  const searchBarRef = useRef();

  function activeSearch() {
    document.querySelector("#closeIcon").style.display = "block";
    searchBarRef.current.classList.add(classes.search_bar_active);
  }

  function closeSearch() {
    document.querySelector("#closeIcon").style.display = "none";

    searchBarRef.current.classList.remove(classes.search_bar_active);
  }

  return (
    <div ref={searchBarRef} className={classes.search_bar}>
      <input
        onFocus={activeSearch}
        type="search"
        placeholder="Search categories or products"
        className={classes.search_field}
      ></input>
      <MdClose
        id="closeIcon"
        className={classes.closeIcon}
        onClick={closeSearch}
      />
      <AiOutlineSearch className={classes.search_icon} />
      {/* <span className={classes.search_icon}>
        <svg
          className={classes.icon}
          style={{ margin: 0 }}
          fill="none"
          viewBox="0 0 24 24"
          // stroke="white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span> */}
    </div>
  );
}
