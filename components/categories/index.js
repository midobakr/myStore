import classes from "./categories.module.css";
import { BsPercent } from "react-icons/bs";
import { AiOutlineFire } from "react-icons/ai";
import { GiClothes, GiBallerinaShoes, GiJewelCrown } from "react-icons/gi";
import { IoBag } from "react-icons/io5";
export default function Categories({ isMobile }) {
  return (
    <div className={classes.categories}>
      <ul className={classes.categories_list}>
        <li>
          <span className={classes.icon}>
            <BsPercent />
          </span>
          SALE
        </li>
        <li>
          <span className={classes.icon}>
            <AiOutlineFire />
          </span>
          NEW
        </li>
        <li>
          <span className={classes.icon}>
            <GiClothes />
          </span>
          CLOTHING
        </li>
        <li>
          <span className={classes.icon}>
            <GiBallerinaShoes />
          </span>
          SHOES
        </li>
        <li>
          <span className={classes.icon}>
            <IoBag />
          </span>
          BAGS
        </li>
        <li>
          <span className={classes.icon}>
            <GiJewelCrown />
          </span>
          JEWELRY
        </li>
      </ul>
    </div>
  );
}
