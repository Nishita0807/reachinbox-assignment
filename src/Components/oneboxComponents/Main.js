import React from "react";
import "../../styles/main.css";
import mainImage from '../../assets/img/main.png';

const Main = () => {
  return (
    <div className="main">
      {/* Main content */}
      <div className="image-container">
        <img src={mainImage} alt="Image" style={{width: "100%", height: "auto"}} />
      
      </div>
    </div>
  );
}

export default Main;
