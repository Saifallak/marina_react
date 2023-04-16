import React from "react";
import Navbar from "./layouts/Navbar/index";
function PageUser(props) {
  return (
    <>
      <Navbar colorr={"#0CCEFF"} pos={"relative"} />
      {props.children}
    </>
  );
}

export default PageUser;
