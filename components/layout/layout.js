import { useEffect, useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Nav from "../nav";
import classes from "./layout.module.css";
import myStoreContext from "../../store/storeContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { getIdToken } from "firebase/auth";
export default function Layout({ children }) {
  const { setUser } = useContext(myStoreContext);
  const router = useRouter();

  useEffect(() => {
    let SID = "";
    onAuthStateChanged(auth, (user) => {
      setUser(user?.displayName);
      localStorage.setItem("token", user?.accessToken);

      if (user) {
        SID = setInterval(() => {
          getIdToken(auth.currentUser).then((token) => {
            localStorage.setItem("token", token);
          });
        }, 60 * 1000);
      } else {
        clearInterval(SID);
      }
    });
  }, [setUser]);
  return (
    <div className={classes.container}>
      <Head>
        <meta name="viewport" content="width=device-width,intial-scale=1.0" />
      </Head>
      <Nav />
      {children}
    </div>
  );
}
