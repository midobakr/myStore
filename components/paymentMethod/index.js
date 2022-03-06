import classes from "./paymentMethod.module.css";

export default function PaymentMethod({ setPayment }) {
  return (
    <div className={classes.container}>
      <h1>Payment Method</h1>
      <div className={classes.group}>
        <input
          value="cash"
          onChange={(e) => {
            if (e.target.checked) {
              setPayment(e.target.value);
              return;
            }
            setPayment("");
          }}
          type="checkbox"
          className={classes.check}
        ></input>

        <div>
          <h2>Cash On Delivery</h2>
          <h6>Pay Cash upon order delivery</h6>
        </div>
      </div>
    </div>
  );
}
