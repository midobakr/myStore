import Image from "next/image";

import { useState } from "react";
import classes from "./productImage.module.css";

export default function ProductImage({ colors, images }) {
  const defaultLink = images[colors[0]][0];
  const [activeLink, setActiveLink] = useState(defaultLink);

  function done(e) {
    setActiveLink(e.currentTarget.getAttribute("url"));
  }
  function off() {
    setActiveLink(defaultLink);
  }
  return (
    <div className={classes.container}>
      <Image
        className={classes.image}
        src={activeLink}
        alt="Vercel Logo"
        width={235}
        height={350}
        layout="responsive"
        placeholder="blur"
        blurDataURL={activeLink}
      />
      <div className={classes.sambles}>
        {colors.length > 1 &&
          colors.map((color, i) => (
            <div
              onMouseOver={done}
              onMouseOut={off}
              url={images[color][0]}
              className={classes.samble}
              key={i}
            >
              <Image
                src={images[color][0]}
                alt="Vercel Logo"
                width={150}
                height={150}
                layout="responsive"
              />
            </div>
          ))}
      </div>
    </div>
  );
}
