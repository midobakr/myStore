import { useRouter } from "next/router";
import Gallery from "../../components/gallery";
import classes from "./search.module.css";

export default function Category() {
  const { keywords } = useRouter().query;

  return (
    <div className={classes.mainContainer}>
      <Gallery category={keywords} search={true} />
    </div>
  );
}
