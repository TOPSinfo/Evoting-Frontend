import React from 'react'
import NavbarAdmin from '../components/NavbarAdmin';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  breadcum: {
    marginLeft: "260px",
    fontSize: "25px",
    fontWeight: "bold",
  },
  logutBtn: {
    float: "right",
    marginRight: "15px",
    paddingLeft: "15px",
    paddingRight: "15px",
    borderRadius: "15px",
    backgroundColor: "rgba(10, 126, 28)",
    color: "white",
  },
  headerContent: {
    flexDirection: "row",
  }
});


function AdminHome() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.headerContent}>
        <div className={classes.breadcum}>Dashboard</div>
        <button className={classes.logutBtn}>Logout</button>
      </div>
      <NavbarAdmin />
    </>
  )
}

export default AdminHome