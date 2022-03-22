import classes from "./form.module.css";
import Button from "../Button/button";

function Form({ title, items, onSubmit, id, loading, buttonName }) {
  return (
    <div className={classes.container}>
      <form onSubmit={onSubmit}>
        <h1 className={classes.title}>{title} </h1>
        <h2 id={`${id}title2`} className={classes.title2}>
          Welcome {title === "Log In" ? "back" : ""} to our Store
        </h2>
        <div className={classes.ItemsContainer} id={id}>
          {items.map((item, index) => {
            return (
              <div key={index} className={classes.formgroup}>
                <label htmlFor={item.name} className={classes.label}>
                  {item.name}:
                </label>
                <input
                  disabled={item.asAdmin}
                  value={item.value}
                  style={
                    !!item.errorMsg
                      ? { backgroundColor: "rgba(255 , 0 ,0 ,.2)" }
                      : {}
                  }
                  minLength={item.type === "password" ? "8" : "1"}
                  required
                  onChange={item.saveInputData?.bind(this, item.type)}
                  className={classes.input}
                  type={item.type.search(/pass/) === 0 ? "password" : item.type}
                  placeholder={item.placeholder}
                />
                <input
                  id={classes.checkmark}
                  className={
                    !item.errorMsg && !!item.value ? classes.checked : ""
                  }
                  type="checkbox"
                  checked="checked"
                  readOnly={true}
                />
                <span
                  className={classes.errorMessage}
                  style={
                    !!item.errorMsg
                      ? { transform: "translateY(0px)", opacity: "1" }
                      : {}
                  }
                >
                  {item.errorMsg}
                </span>
              </div>
            );
          })}
        </div>
        <Button name={buttonName || title} loading={loading} color="black" />
      </form>
    </div>
  );
}

export default Form;
