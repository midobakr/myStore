import { useRef, useState } from "react";
import { useRouter } from "next/router";

import classes from "./searchBar.module.css";
import { MdClose } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
export default function SearchBar() {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const router = useRouter();
  function search(e) {
    e.preventDefault();
    inputRef.current.classList.toggle(classes.search_field_active);
    if (value) {
      router.push("/search?keywords=" + value);
      setValue("");
    }
  }

  function activeMobSearch() {
    router.push("/search?keywords=" + value);
  }
  const saveInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={search} className={classes.search_bar}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search categories or products"
        className={classes.search_field}
        value={value}
        onChange={saveInput}
      ></input>
      <div onClick={search}>
        <AiOutlineSearch className={classes.search_icon} />
      </div>
    </form>
  );
}
