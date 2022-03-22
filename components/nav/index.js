import { useState, useRef, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { CSSTransition } from "react-transition-group";
import { MdArrowBack, MdMenu, MdLogout } from "react-icons/md";
import { RiUser3Fill } from "react-icons/ri";

import SearchBar from "../searchBar";
import Categories from "../categories";
import Controllers from "../controllers";

import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import myStoreContext from "../../store/storeContext";

import classes from "./nav.module.css";

export default function Nav() {
  const [activeMobNav, setActiveMobNav] = useState(false);
  const { user } = useContext(myStoreContext);
  const router = useRouter();
  const closeCart = () => {
    setActiveMobNav(false);
  };
  const transitionRef = useRef();

  const doSignOut = async () => {
    console.log("IN");
    const res = await signOut(auth);
    router.push("/");
    closeCart();
    console.log("out=", res);
  };
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
              <MdArrowBack className={classes.leftArrow} onClick={closeCart} />
              <div className={classes.logSignin}>
                {user ? (
                  <div style={{ textAlign: "center" }}>
                    <Link href="/myOrders">
                      <a onClick={closeCart}>
                        <RiUser3Fill className={classes.userIcon} />
                      </a>
                    </Link>
                    <div>{user}</div>
                  </div>
                ) : (
                  <>
                    <Link href="/signup">
                      <a onClick={closeCart}>SIGN UP</a>
                    </Link>
                    <Link href="/login">
                      <a onClick={closeCart}>LOG IN</a>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <Categories closeCart={closeCart} />
            {user ? (
              <MdLogout className={classes.icon} onClick={doSignOut} />
            ) : (
              ""
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
