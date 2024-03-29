import { Button, withStyles } from "@material-ui/core";
//rename file
const ColorPicker = (props) => {
  let color = props.color;
  let active = Boolean(props.active);
  if (props.color === "White") {
    color = "rgba(237, 237, 237, 0.4)";
  }

  const handleClick = (e) => {
    if (props.hasOwnProperty("onClick")) {
      props.onClick(props.color);
    }
  };
  const ColorPickerButton = withStyles({
    root: {
      minWidth: "30px",
      height: "30px",
      border: "unset",
      borderRadius: "50%",
      backgroundColor: color,
      "&:hover": {
        backgroundColor: color,
      },
    },
  })(Button);
  return (
    <ColorPickerButton
      className={active ? "color-active" : ""}
      onClick={handleClick}
    ></ColorPickerButton>
  );
};
export default ColorPicker;
