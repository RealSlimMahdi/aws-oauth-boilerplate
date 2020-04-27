import React, { useState, useReducer, useContext } from "react";
import useAmplifyAuth from "../context/useAmplifyAuth";

const HomeAuth = (props) => {
  const { authstate } = useAmplifyAuth();

  console.log(authstate);

  //   console.log("User: ", user.attributes);
  //   console.log("Name: ", name);

  return (
    !true && (
      <>
        <div>Hello from props: {props.user.attributes.name}</div>
        <div>Hello from context: {true}</div>
      </>
    )
  );
};

export default HomeAuth;
