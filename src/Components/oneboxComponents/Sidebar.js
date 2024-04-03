import React from "react";
import { Link } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MailIcon from "@mui/icons-material/Mail";
import TelegramIcon from "@mui/icons-material/Telegram";
import ViewListIcon from "@mui/icons-material/ViewList";
import InboxIcon from "@mui/icons-material/Inbox";
import BarChartIcon from "@mui/icons-material/BarChart";

const Sidebar = ({ togglePage, currentPage, mailIconBackground , isDarkMode }) => {
  return (
    <div className={`sidebar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}  >
      
      <div>
        <EmailIcon style={{ fontSize: "36px", color: isDarkMode ? "black":"white"}} />
      </div>
      <div style={{ display: "flex", gap: "12px", flexDirection: "column" }}>
        <div>
          <HomeIcon style={{ fontSize: "36px", color: "#aeaeae" }} />
        </div>
        <div>
          <PersonSearchIcon style={{ fontSize: "36px", color: "#aeaeae" }} />
        </div>
        <div
          style={{
            position: "relative",
            width: "fit-content",
            cursor: "pointer"
          }}
          onClick={togglePage} // Toggle between Main and Main2 on click
        >
          <MailIcon
            style={{
              fontSize: "36px",
              color: "#aeaeae",
              padding: "2px",
              backgroundColor: isDarkMode ?"white" :mailIconBackground
            }}
          />
          {/* Absolute positioned badge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              backgroundColor: "red",
              color: "white",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              fontSize: "12px"
            }}
          >
            12+
          </div>
        </div>
        <div>
          <TelegramIcon style={{ fontSize: "36px", color: "#aeaeae" }} />
        </div>
        <div>
          <ViewListIcon style={{ fontSize: "36px", color: "#aeaeae" }} />
        </div>
        <div>
          <InboxIcon style={{ fontSize: "36px", color: "#aeaeae" }} />
        </div>
        <div>
          <BarChartIcon style={{ fontSize: "36px", color: "#aeaeae" }} />
        </div>
      </div>
      <div
        style={{
          marginBottom: "10px",
          marginTop: "auto",
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          color: "white",
          backgroundColor: "#05f431",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        AS
      </div>
    </div>
  );
};

export default Sidebar;
