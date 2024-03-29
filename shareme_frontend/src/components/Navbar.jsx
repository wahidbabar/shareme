import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();
  if (!user) return;

  return (
    <div className="flex space-y-2 md:gap-5 w-full mt-5">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          className="p-2 w-full rounded-md bg-whtie outline-none"
        />
      </div>
      <div className="flex gap-3 items-center">
        <Link to={`/user-profile/${user?.id}`} className="hidden md:block">
          <img
            src={user?.image}
            alt="userImage"
            className="w-14 h-12 rounded-lg"
          />
        </Link>
        <Link
          to="/create-pin"
          className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-14 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
