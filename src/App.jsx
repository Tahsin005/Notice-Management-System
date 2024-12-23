import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import UserPannel from "./pages/UserPannel/UserPannel";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
const App = () => {
  const [isLogedIn, setIsLogedIn] = useLocalStorage("isLogedin", false);
  return (
    <>
      <Outlet></Outlet>
      {/* {isLogedIn ? 
          <UserPannel isLogedIn = {isLogedIn} setIsLogedIn = {setIsLogedIn}/>
          : 
          <Login isLogedIn = {isLogedIn} setIsLogedIn = {setIsLogedIn}/> } */}
    </>
  );
};

export default App;
