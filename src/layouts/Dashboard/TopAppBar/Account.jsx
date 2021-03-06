// import { t } from '@lingui/macro'
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import ButtonBase from "@material-ui/core/ButtonBase";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
// import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
// import { useUserDetails } from "src/hooks/api/useUserDetails";
// import { logout } from "src/redux/actions/authActions";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 40,
    width: 40,
    marginRight: theme.spacing(1),
  },
  popover: {
    width: 200,
  },
}));

function Account() {
  const classes = useStyles();

  const ref = useRef(null);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);
  // const userDetails = useUserDetails();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    // try {
    //   handleClose();

    //   await dispatch(logout());

    //   navigate("/");
    // } catch (err) {
    //   enqueueSnackbar("Unable to logout", {
    //     variant: "error",
    //   });
    // }
  };

  // if (userDetails.status === "loading") {
  //   return null;
  // }

  // if (userDetails.error) {
  //   return null;
  // }

  return (
    <>
      <Box
        alignItems="center"
        component={ButtonBase}
        display="flex"
        ref={ref}
        onClick={handleOpen}
      >
        <Avatar
          alt="User avatar"
          className={classes.avatar}
          // src={userDetails.data.avatar_url}
        />
        <Hidden smDown>
          {/* <Typography>{userDetails.data.name}</Typography> */}
          Vimit Athawale
        </Hidden>
      </Box>

      <Menu
        keepMounted
        anchorEl={ref.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        getContentAnchorEl={null}
        open={isOpen}
        PaperProps={{ className: classes.popover }}
        onClose={handleClose}
      >
        <MenuItem component={RouterLink} to="profile" onClick={handleClose}>
          profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default Account;
