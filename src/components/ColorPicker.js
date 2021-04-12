import { Button, withStyles } from "@material-ui/core";
//rename file
const ColorPicker = (props) => {
  let color = props.color;
  if (props.color === "White") {
    color = "rgba(237, 237, 237, 0.4)";
  }
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
  return <ColorPickerButton></ColorPickerButton>;
};
export default ColorPicker;