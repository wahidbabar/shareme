import React, { useState, useEffect } from "react";

import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";

const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeBtn, setActiveBtn] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1506765515384-028b60a970df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80"
              alt="banner-pic"
              className="w-full h-370 xl:h-510 shadow-lg object-cover"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user?.image}
              alt="user-pic"
            />
            <h1 className="font-bold text-3xl mt-3 text-center">
              {user?.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <div
                  onClick={logout}
                  className="flex space-x-2 justify-center items-center bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                >
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                    className="h-10 w-10 object-cover"
                  />
                  <h1 className="font-bold">Logout</h1>
                  <img
                    src={user.image}
                    className="w-8 h-8 rounded-full"
                    alt="user-profile"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length > 0 ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex jsutify-center font-bold items-center w-full text-xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
