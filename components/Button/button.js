import classes from "./button.module.css";
import { AiOutlineLoading } from "react-icons/ai";
function Button({ name, onSubmit, loading, color }) {
  return (
    <button
      style={{ backgroundColor: color }}
      className={classes.button}
      onClick={onSubmit}
    >
      {name}
      {loading && (
        <div style={{ position: "absolute", right: "10px", top: "10px" }}>
          <AiOutlineLoading className={classes.loading} />
        </div>
      )}
    </button>
  );
}

export default Button;
