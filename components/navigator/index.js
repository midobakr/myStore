import allCategories from "../../categories";
import classes from "./navigator.module.css";

export default function Navigator({ category }) {
  const mainCategories = Object.keys(allCategories);
  let activeCategory = mainCategories.includes(category) && category;
  if (!activeCategory) {
    mainCategories.forEach((cat) => {
      if (allCategories[cat].includes(category)) {
        activeCategory = cat;
      }
    });
  }
  return (
    <div className={classes.navigate}>
      <h4>{activeCategory}</h4>
      <ul className={classes.navigateList}>
        {allCategories[activeCategory].map((item) => (
          <li
            key={item}
            style={{ color: item == category ? "red" : "" }}
            className={classes.navigateListItem}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
