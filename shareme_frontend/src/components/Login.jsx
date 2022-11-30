import React from "react";

import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import { client } from "../client";
import jwt_decode from "jwt-decode";

function Login() {
  const navigate = useNavigate();

  const responseGoogle = (response) => {
    const decodeHeader = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(decodeHeader));

    const { name, sub, picture } = decodeHeader;

    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="h-full w-full relative">
        <video
          src={shareVideo}
          autoPlay
          loop
          muted
          controls={false}
          type="video/mp4"
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                responseGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
