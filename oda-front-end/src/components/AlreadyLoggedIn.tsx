import React from "react";
import imgUrl from "../assets/something_went_wrong.png";

function AlreadyLoggedIn() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div>
        <img className="w-72 mr-8" src={imgUrl} />
      </div>
      <h1>You are already logged in...</h1>
    </div>
  );
}

export default AlreadyLoggedIn;
