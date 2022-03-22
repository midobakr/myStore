import { useState } from "react";
import validator from "validator";

import Form from "../Form/form";

import classes from "./shippingAddress.module.css";

export default function ShippingAddress({ setShippingAddress }) {
  let [state, setState] = useState({ name: "", phone: "" });
  let [errors, setErrors] = useState({});
  let validate = (type, value) => {
    let obj = {};
    switch (type) {
      case "phone":
        if (!validator.isMobilePhone(value)) {
          obj.phone = "invalid number";
        } else {
          obj.phone = "";
        }
        if (value === "") {
          obj.phone = "";
        }
        break;
      case "name":
        let fullName = value.split(" ").filter((v) => !!v);
        if (fullName.length < 2) {
          obj.name = "short name";
        } else {
          obj.name = "";
        }
        if (value === "") {
          obj.name = "";
        }
        break;
      default:
        // if (value === "") {
        //   obj[type] = "Please Fill This";
        // }
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
      setShippingAddress(state);
    }
  };
  return (
    <div className={classes.container}>
      <Form
        // loading={loading}
        title="Shipping Address"
        items={[
          {
            name: "name",
            type: "name",
            value: state.name,
            placeholder: "Full Name",
            saveInputData,
            errorMsg: errors.name,
          },
          {
            name: "Phone",
            type: "phone",
            value: state.phone,
            placeholder: "Phone Number",
            saveInputData,
            errorMsg: errors.phone,
          },
          {
            name: "building",
            type: "building",
            value: state.building,
            placeholder: "Building",
            saveInputData,
            errorMsg: errors.building,
          },
          {
            name: "apartment",
            type: "apartment",
            value: state.apartment,
            placeholder: "Apartment",
            saveInputData,
            errorMsg: errors.building,
          },
          {
            name: "street",
            type: "street",
            value: state.street,
            placeholder: "Street Name",
            saveInputData,
            errorMsg: errors.region,
          },
          {
            name: "city",
            type: "city",
            value: state.city,
            placeholder: "city",
            saveInputData,
            errorMsg: errors.city,
          },
        ]}
        onSubmit={sendData}
        buttonName="Submit The Address"
      />
    </div>
  );
}
