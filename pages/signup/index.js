import { useState } from "react";
import validator from "validator";
import Link from "next/link";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import classes from "./signup.module.css";
import Form from "../../components/Form/form";

function SignUp(props) {
  let [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    theKey: "",
  });

  let [errors, setErrors] = useState({});
  let [loading, setLoading] = useState(false);

  // const Firebase = useSelector((store) => store.firebase);

  let validate = (type, value) => {
    let obj = {};
    switch (type) {
      case "username":
        if (!validator.isLength(value, { min: 6 })) {
          obj.username = "too short";
        } else if (!value.match(/\W\w/)) {
          obj.username = "Please enter your right full name";
        } else {
          obj.username = "";
        }
        if (value === "") {
          obj.username = "";
        }
        break;
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

      case "password2":
        if (!(value === state.password)) {
          obj.password2 = "No match";
        } else {
          obj.password2 = "";
        }
        if (value === "") {
          obj.password2 = "";
        }
        break;

      case "theKey":
        if (!validator.equals(value, "123456789")) {
          obj.theKey = "wrong key";
        } else {
          obj.theKey = "";
        }
        if (value === "") {
          obj.theKey = "";
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
        const result = await createUserWithEmailAndPassword(
          auth,
          state.email,
          state.password
        );
        await updateProfile(result.user, { displayName: state.username });

        console.log(result);
        if (result.user) {
          localStorage.setItem("token", result.user.accessToken);

          let res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: result.user.accessToken,
            },
            body: JSON.stringify({
              email: state.email,
              password: state.password,
              username: state.username,
            }),
          });

          if (!res.ok) {
            res = await res.json();
            setErrors({ email: res.e });
          }

          fetch("/api/cartList/setCartlist", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: result.user.accessToken,
            },
          })
            .then((res) => res.json())
            .then(console.log);
        }
      } catch (e) {
        console.log("ee", e);
        if (e.message.match("email")) {
          setErrors({ email: "this email is already in use" });
        } else if (e.message.match("password")) {
          setErrors({ password: "wrong password" });
        }
      }
      setLoading(false);
    }
  };

  return (
    <div className={classes.container}>
      {/* <h4 className={classes.h4}>
        You can{" "}
        <Link className={classes.link} to="/guest">
          Enter As A guest{" "}
        </Link>
      </h4> */}

      <Form
        title="Sign Up"
        id="signUp"
        loading={loading}
        items={[
          {
            name: "full name",
            type: "username",
            value: state.username,
            placeholder: "Enter your full name",
            errorMsg: errors.username,
            saveInputData,
          },
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
          {
            name: "confirm Password",
            type: "password2",
            value: state.password2,
            placeholder: "write password again",
            saveInputData,
            errorMsg: errors.password2,
          },
          // {
          //   name: "Sign UP As Admin",
          //   type: "checkbox",
          //   setAdmin: setAsAdmin,
          // },
          // {
          //   name: "secret key",
          //   type: "theKey",
          //   value: state.theKey,
          //   placeholder: "enter the secret key",
          //   saveInputData,
          //   errorMsg: errors.theKey,
          //   asAdmin: asAdmin,
          // },
        ]}
        onSubmit={sendData}
      />
      {/* <input type='checkBox'/> */}

      <h4 className={classes.h4}>
        Already have an account?{" "}
        <Link className={classes.link} href="/login">
          <a>Log In</a>
        </Link>
      </h4>
    </div>
  );
}

export default SignUp;
