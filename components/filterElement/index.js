import classes from "./filterElement.module.css";
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";

const options = {
  PRICE: ["Most Expensive", "Less Expensive"],
  COLOR: ["red", "white", "blue", "gray"],
  BRAND: ["xoxo", "adidas"],
  SORT: [],
};
export default function FilterElement({
  name,
  active,
  setActive,
  setFilter,
  filter,
}) {
  const isActive = active === name;
  const value = active === name ? "" : name;
  const transformClass = isActive ? classes.optionsActive : classes.options;
  const addFilter = (value) => {
    if (filter[name] === value) {
      value = "";
    }
    setFilter((state) => {
      return { ...state, [name]: value };
    });
  };
  return (
    <li className={classes.list_item}>
      <div
        onClick={() => {
          setActive(value);
        }}
      >
        <div className={classes.group}>
          <div className={classes.name}>
            <span>{name}</span>
            <span className={classes.filterName}>{filter[name]}</span>
            {isActive ? (
              <MdExpandLess className={classes.icon} />
            ) : (
              <MdExpandMore className={classes.icon} />
            )}
          </div>
          <div className={transformClass}>
            {options[name].map((opt) => (
              <div
                onClick={addFilter.bind(null, opt)}
                className={classes.item}
                key={opt}
                style={filter[name] === opt ? { backgroundColor: "gray" } : {}}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
