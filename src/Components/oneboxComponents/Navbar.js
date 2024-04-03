// Navbar.js
import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import "../../styles/onebox.css"
const Navbar = ({ toggleTheme, isDarkMode }) => {
    return (
        <div className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`} >
            <div style={{marginLeft:"12px",fontWeight:"bold", color: isDarkMode ?  'black':'white' }}>Onebox</div>
            <div style={{display:"flex",flexDirection:"row",marginRight:"90px",alignItems:"center",justifyContent:"center",gap:"24px"}}>
                <div className={`theme-changes ${isDarkMode ? 'dark-mode' : ''}`} onClick={toggleTheme}>
                    {isDarkMode ? (
                        <>
                            <DarkModeOutlinedIcon style={{color:"orange"}} />
                            <div style={{width:"20px",height:"20px",backgroundColor: isDarkMode ? 'white' : 'grey',borderRadius:"50%"}}></div>
                        </>
                    ) : (
                        <>
                            <div style={{width:"20px",height:"20px",backgroundColor: isDarkMode ? 'white' : 'grey',borderRadius:"50%"}}></div>
                            <LightModeOutlinedIcon style={{color:"orange"}} />
                        </>
                    )}
                </div>
                <div style={{display:"flex",flexDirection:"row",gap:"10px",alignItems:"center",justifyContent:"center"}}>
                    <div style={{color: isDarkMode ? 'black':'white' }}>Tim’s Workspace</div>
                    <div><KeyboardArrowDownIcon  style={{color:"grey"}}/></div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
