import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to={"/color-picker"}>Color Picker</Link>
    </div>
  );
};

export default Navbar;