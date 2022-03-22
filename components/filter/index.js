import { useState, useEffect } from "react";
import classes from "./filter.module.css";
import FilterElement from "../filterElement";

export default function Filter({ setProducts, setLoading }) {
  const [active, setActive] = useState("");
  const [filter, setFilter] = useState("");
  useEffect(() => {
    if (filter) {
      console.log("filter=>", filter);
      // setLoading(true);
      fetch("/api/products/sortProducts?" + new URLSearchParams(filter))
        .then((res) => res.json())
        .then((res) => {
          // setLoading(false);
          console.log("res.products=", res.products);
          setProducts(res.products);
        });
    }
  }, [filter, setProducts, setLoading]);
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        <FilterElement
          name="PRICE"
          active={active}
          setActive={setActive}
          setFilter={setFilter}
          filter={filter}
        />
        <FilterElement
          name="COLOR"
          active={active}
          setActive={setActive}
          setFilter={setFilter}
          filter={filter}
        />
        {/* <FilterElement
          name="BRAND"
          active={active}
          setActive={setActive}
          setFilter={setFilter}
          filter={filter}
        />
        <FilterElement
          name="SORT"
          active={active}
          setActive={setActive}
          setFilter={setFilter}
          filter={filter}
        /> */}
      </ul>
    </div>
  );
}
