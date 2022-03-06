import { db } from "../../firebaseAdminConfig";

import { useRouter } from "next/router";
import Gallery from "../../components/gallery";
import Navigator from "../../components/navigator";
import classes from "./index.module.css";
import allCatgoriese from "../../categories";

export default function Category({ products }) {
  const { category } = useRouter().query;

  return (
    <div className={classes.mainContainer}>
      <Navigator category={category.toUpperCase()} />
      <Gallery category={category} products={products} />
    </div>
  );
}

export async function getServerSideProps(context) {
  let allPaths = Object.keys(allCatgoriese);
  allPaths.forEach((cat) => {
    allPaths = allPaths.concat(allCatgoriese[cat]);
  });

  const path = context.query.category.toUpperCase();
  const isValidPath = allPaths.includes(path);
  if (!isValidPath) {
    return {
      notFound: true,
    };
  }

  const querySnapshot = await db.collection("products").limit(10).get();
  let products = [];
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });
  console.log(products);

  return { props: { products: products } };
}
