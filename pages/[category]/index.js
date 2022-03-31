import { useRouter } from "next/router";
import Gallery from "../../components/gallery";
import Navigator from "../../components/navigator";
import classes from "./index.module.css";

export default function Category() {
  const { category } = useRouter().query;

  return (
    <div className={classes.mainContainer}>
      {/* <Navigator category={category?.toUpperCase()} /> */}
      <Gallery category={category} search={false} />
    </div>
  );
}
