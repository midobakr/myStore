import { useState, useRef } from "react";
import Link from "next/link";

import { CSSTransition } from "react-transition-group";
import { MdMenu } from "react-icons/md";
import { MdArrowBack } from "react-icons/md";

import SearchBar from "../searchBar";
import Categories from "../categories";
import Controllers from "../controllers";
import classes from "./nav.module.css";

export default function Nav() {
  const [activeMobNav, setActiveMobNav] = useState(false);

  const transitionRef = useRef();
  return (
    <div className={classes.container}>
      <div className={classes.adjust}>
        <div className={classes.main}>
          <MdMenu
            className={classes.hope}
            onClick={() => {
              setActiveMobNav(true);
            }}
          />
          <div className={classes.brand}>
            <Link href="/">
              <a>STORE</a>
            </Link>
          </div>
          <SearchBar />
          <Controllers />
        </div>

        <CSSTransition
          in={activeMobNav}
          timeout={500}
          nodeRef={transitionRef}
          classNames={{
            enter: classes.alertEnter,
            enterActive: classes.alertEnterActive,
            enterDone: classes.alertEnterDone,

            exit: classes.alertExit,
            exitActive: classes.alertExitActive,
          }}
        >
          <div ref={transitionRef} className={classes.group}>
            <div className={classes.group2}>
              <MdArrowBack
                className={classes.leftArrow}
                onClick={() => {
                  setActiveMobNav(false);
                }}
              />
              <div className={classes.logSignin}>
                <a href="#">Log in </a>
                <a href="#">Sign up </a>
              </div>
            </div>
            <Categories />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
