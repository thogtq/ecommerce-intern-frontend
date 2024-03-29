import { makeStyles } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
  },
  pageNumber: {
    margin: "0 8px",
    padding: "3px",
    fontFamily: "Montserrat-Medium",
    fontSize: "14px",
    color: "#202124",
    lineHeight: "22px",
  },
  navIcon: {
    cursor: "pointer",
  },
});
export default function SimplePagination(props) {
  let { page, onChange, max } = props;
  const handleNext = () => {
    if (page === max) return;
    onChange(page + 1);
  };
  const handleBack = () => {
    if (page === 1) return;
    onChange(page - 1);
  };
  const classes = useStyles();
  return (
    <span className={classes.root}>
      <NavigateBeforeIcon className={classes.navIcon} onClick={handleBack} />
      <span className={classes.pageNumber}>
        {page}/{max}
      </span>
      <NavigateNextIcon className={classes.navIcon} onClick={handleNext} />
    </span>
  );
}
