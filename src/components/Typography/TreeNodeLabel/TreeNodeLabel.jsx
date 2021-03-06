import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { createElement } from "react";

const useStyles = makeStyles((theme) => ({
  distributer: {
    cursor: "pointer",
    ...theme.typography.body1,
    color: theme.palette.text.distributer,
    fontWeight: 700,
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
  user: {
    cursor: "pointer",
    ...theme.typography.body1,
    color: theme.palette.text.user,
    fontWeight: 700,
    "&:hover": {
      color: theme.palette.primary.main,
      textDecoration: "none",
    },
  },
}));

function TreeNodeLabel({ className, component, value, distributer, ...props }) {
  const classes = useStyles();
  const elProps = {
    className: clsx(distributer ? classes.distributer : classes.user, className),
    ...props,
  };

  return createElement(component, elProps, value);
}

TreeNodeLabel.propTypes = {
  className: PropTypes.string,
  component: PropTypes.oneOf(["span", "div"]),
  value: PropTypes.string,
  distributer: PropTypes.bool,
};

TreeNodeLabel.defaultProps = {
  component: "span",
};

export default TreeNodeLabel;
