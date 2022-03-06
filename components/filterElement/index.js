import { useState } from "react";
import classes from "./filterElement.module.css";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
export default function FilterElement({ name }) {
  const [isActive, setActive] = useState(false);

  return (
    <li className={classes.list_item}>
      <input type="checkbox" id={name} className={classes.checkbox} />
      <label
        htmlFor={name}
        onClick={() => {
          setActive(!isActive);
        }}
      >
        <div className={classes.group}>
          <span>{name}</span>
          {isActive ? (
            <MdExpandLess className={classes.icon} />
          ) : (
            <MdExpandMore className={classes.icon} />
          )}
        </div>
      </label>

      <div className={classes.options}>
        {/* <input type="range" min="10" step="10" max="1000"></input> */}
      </div>
    </li>
  );
}
