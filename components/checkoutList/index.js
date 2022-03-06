import classes from "./checkoutlist.module.css";

export default function CheckoutList({ activeSection, setActiveSection }) {
  return (
    <ul className={classes.stepsList}>
      <li
        className={
          activeSection === 1
            ? classes.stepsListItemActive
            : classes.stepsListItem
        }
        onClick={() => {
          setActiveSection(1);
        }}
      >
        <span>1</span>
        <span>Confirm</span>
      </li>
      <li
        className={
          activeSection === 2
            ? classes.stepsListItemActive
            : classes.stepsListItem
        }
        onClick={() => {
          setActiveSection(2);
        }}
      >
        <span>2</span>
        <span>Shipping Address</span>
      </li>
      <li
        className={
          activeSection === 3
            ? classes.stepsListItemActive
            : classes.stepsListItem
        }
        onClick={() => {
          setActiveSection(3);
        }}
      >
        <span>3</span>
        <span>Payment Method</span>
      </li>
      <li
        className={
          activeSection === 4
            ? classes.stepsListItemActive
            : classes.stepsListItem
        }
        onClick={() => {
          setActiveSection(4);
        }}
      >
        <span>4</span>
        <span>Order placed</span>
      </li>
    </ul>
  );
}
