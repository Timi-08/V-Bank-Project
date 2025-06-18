import React from "react";
import { Button } from "../components/Button";
import userImg from "../assets/V_homepage_fixed_deposit.jpg";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="text-sec">
        <h1>Digital Banking Re-imagined to get you more</h1>
        <Button name="Get Started" onClick={() => navigate("/signup")} />
        <p>
          We have redefined the meaning of more when it comes to virtual banking
          services in Nigeria.
        </p>
        <p>
          With absolutely zero charge on transactions, free account maintenance
          and monthly interest on savings, what's your excuse again?
        </p>
      </div>
      <div className="image-sec">
        <img src={userImg} alt="Logo" />
      </div>
    </div>
  );
};
