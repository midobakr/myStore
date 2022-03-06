import classes from "./filter.module.css";
import FilterElement from "../filterElement";

export default function Filter() {
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        <FilterElement name="PRICE" />
        <FilterElement name="COLOR" />
        <FilterElement name="BRAND" />
        <FilterElement name="SORT" />
      </ul>
    </div>
  );
}
