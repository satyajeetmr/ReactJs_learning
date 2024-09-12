import React from "react";
import HeaderImg from "../../assets/react-core-concepts.png";
import "./style.css";

const HeaderData = {
  title: "React Essentials",
  content:
    "Fundamental React concepts you will need for almost any app you are going to build!",
};

const Header = () => {
  return (
    <header>
      <img src={HeaderImg} alt="Stylized atom" />
      <h1>{HeaderData.title}</h1>
      <p>{HeaderData.content}</p>
    </header>
  );
};

export default Header;
