import { useState } from "react";
import Link from "next/link";
import validator from "validator";
import classes from "./login.module.css";
import Form from "../../components/Form/form";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

// import CloudsSticker from "../../UI/stickers/clouds/clouds";
function Login() {
  let [state, setState] = useState({ email: "", password: "" });
  let [errors, setErrors] = useState({});
  let [loading, setLoading] = useState(false);

  //   const Firebase = useSelector(store=>store.firebase)

  let validate = (type, value) => {
    let obj = {};
    switch (type) {
      case "email":
        if (!validator.isEmail(value)) {
          obj.email = "invalid Email";
        } else {
          obj.email = "";
        }
        if (value === "") {
          obj.email = "";
        }
        break;
      case "password":
        if (!validator.isLength(value, { min: 8 })) {
          obj.password = "short password";
        } else {
          obj.password = "";
        }
        if (value === "") {
          obj.password = "";
        }
        break;
      default:
        break;
    }
    return obj;
  };
  let saveInputData = (type, e) => {
    let value = e.target.value;
    let new_errors = Object.assign(errors, validate(type, value));
    setErrors(new_errors);
    let newState = Object.assign(state, { [type]: value });
    setState({ ...newState });
  };

  let sendData = async (e) => {
    e.preventDefault();
    let validForm = !Object.values(errors).join("");

    if (validForm) {
      setLoading(true);
      try {
        let result = await signInWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );
        const token = result.user.accessToken;
        console.log(token);
        localStorage.setItem("token", token);
        // let res = await fetch("/api/auth/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     Authorization: token + "d",
        //   },
        //   body: JSON.stringify({
        //     email: state.email,
        //     password: state.password,
        //   }),
        //   //   Firebase.doSignInWithEmailAndPassword(state.email , state.password)
        // });
        // res = await res.json();
        // console.log(res);
      } catch (error) {
        console.log("error \n", error);
        if (error.message.match("user")) {
          setErrors({ email: "this email is not registered" });
        } else if (error.message.match("password")) {
          setErrors({ password: "wrong password" });
        }
      }
      setLoading(false);

      // .catch((e) => {
      //   if (e.message.match("user")) {
      //     setErrors({ email: "this email is not registered" });
      //   } else if (e.message.match("password")) {
      //     setErrors({ password: "wrong password" });
      //   }
      // });
    }
  };

  return (
    <div className={classes.container}>
      {/* <h4 className={classes.h4}>
        You can{" "}
        <Link className={classes.link} to="/guest">
          Enter As A guest{" "}
        </Link>
      </h4>
       */}

      <Form
        loading={loading}
        title="Log In"
        items={[
          {
            name: "Email",
            type: "email",
            value: state.email,
            placeholder: "Email address",
            saveInputData,
            errorMsg: errors.email,
          },
          {
            name: "Password",
            type: "password",
            value: state.password,
            placeholder: "your password",
            saveInputData,
            errorMsg: errors.password,
          },
        ]}
        onSubmit={sendData}
      />

      <h4 style={{ textAlign: "center" }}></h4>
      <h4 className={classes.note}>Forget Password?</h4>
      <h4 className={classes.h4}>
        Don’t have an account?{" "}
        <Link className={classes.link} href="/signup">
          <a> Create an Account</a>
        </Link>
      </h4>
    </div>
  );
}

export default Login;
