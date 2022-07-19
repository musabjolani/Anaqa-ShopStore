import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Fragment>
      hello
      <Link to="/productFile">Product File</Link>
    </Fragment>
  );
}
