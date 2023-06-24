// rafce
import React, { useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import {Button} from '@mui/material'
import { Link } from "react-router-dom";
import { Appstate } from "../App";
import LoginIcon from "@mui/icons-material/Login";

const Header = () => {
    const useAppState = useContext(Appstate)
    console.log(useAppState)
    return (
      <div className="sticky top-0 z-10 opacity-100 header text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500">
        <Link to="/">
          <span>
            Ent<span className="text-white">Wise</span>
          </span>
        </Link>
        {/* <Link to="/addmovie">
          <h1 className="text-lg text-white flex items-center cursor-pointer">
            <Button class="hover:bg-gray-500 pr-2">
              <AddIcon className="mr-2" color="secondary" />
              <span className="text-white">Add New </span>
            </Button>
          </h1>
        </Link> */}
        {useAppState.login ? (
          <Link to="/addmovie">
            <h1 className="text-lg text-white flex items-center cursor-pointer">
              <Button class="hover:bg-gray-500 pr-2">
                <AddIcon className="mr-2" color="secondary" />
                <span className="text-white">Add New </span>
              </Button>
            </h1>
          </Link>
        ) : (
          <Link to="/login">
            <h1 className="text-lg text-white flex items-center cursor-pointer">
              <Button class="hover:bg-gray-500 pr-2">
                <LoginIcon className="mr-2" color="secondary" />
                <span className="text-white">Login </span>
              </Button>
            </h1>
          </Link>
        )}
      </div>
    );
};

export default Header;
