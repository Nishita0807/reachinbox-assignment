import React , {useState} from "react";
import "../../styles/replyform.css";
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';



const ReplyForm = ({onClose, threadId }) => {
  
  const [showVariables, setShowVariables] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
console.log(threadId);
  const variables = [
    { name: 'Name', value: 'John Doe' },
    { name: 'Email', value: 'johndoe@example.com' },
    // Add more custom variables as needed
  ];

  const handleVariables = () => {
    setShowVariables(!showVariables);
  };

 


 

  const handleClose = () => {
    onClose();
    
  };
const variablehandleClose=()=>{
  setShowVariables(false);
};



const toggleDropdown = () => {
  setShowDropdown(!showDropdown);
};

const sendhandleClose = () => {
  setShowDropdown(false);
};

const handleScheduleSend = () => {
  // Logic to schedule send
  console.log('Scheduled send');
  sendhandleClose();
};

const handleFastSend = () => {
  // Logic for fast send
  console.log('Fast send');
  sendhandleClose();
};

  return (
    <div className="replyForm" style={{fontFamily: "'Open Sans', sans-serif"}}>
      <div style={{ backgroundColor:"#23272c", padding:"12px", borderBottom:"2px solid #202226" }}>
        <div style={{ color:"#929397", fontSize:"12px" }}>Reply</div>
        <div className="closeButton" onClick={handleClose}>
          <CloseIcon />
        </div>
      </div>
      <div className="addresses">
        <div>
          To: <input className="hiddenInput" type="email" />
        </div>
        <div>
          From: <input className="hiddenInput" type="email"  />
        </div>
        <div>
          Subject: <input className="hiddenInput" type="text" />
        </div>
      </div>
      <div style={{height:"150px",width:"500px",padding:"8px"}} >
      <input className="hiddenInput" type="text" style={{width:"500px"}} />

      </div>
      
     <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px",fontSize:"12px",color:"#626363"}} className="footer-tool">
     <div className="reply-button" style={{display:"flex",alignItems:"center",justifyContent:"center"}} onClick={toggleDropdown}>
       <div>Send</div><div><ArrowDropDownIcon/></div>
      </div>
      {showDropdown && (
        <div style={{ position: "absolute", bottom: "50px", left: "12px", background: "#fff", border: "1px solid #ccc", padding: "10px", borderRadius: "5px", zIndex: "999" }}>
          <div style={{ textAlign: "right"}}>
            <button onClick={sendhandleClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px" }}>&times;</button>
          </div>
         <div className="sent-button">
         <button onClick={handleScheduleSend}>Schedule Send</button>
          <button onClick={handleFastSend}>Fast Send</button>
         </div>
        </div>
      )}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}} onClick={handleVariables}>
<div><FlashOnIcon /></div><div>Variables</div></div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div><RemoveRedEyeOutlinedIcon/></div> <div>Preview Email</div></div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
<div style={{fontSize:"20px"}}>A</div> <div><MoreVertOutlinedIcon/></div></div>
<div><InsertLinkOutlinedIcon/></div>
<div><ImageOutlinedIcon/></div>
<div><SentimentSatisfiedOutlinedIcon/></div>
<div><PersonRemoveOutlinedIcon/></div>
<div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div><KeyboardArrowLeftOutlinedIcon/></div>
    <div><KeyboardArrowRightOutlinedIcon/></div>
</div>
{showVariables && (
        <div style={{ position: "absolute", bottom: "50px", left: "90px", background: "#fff", border: "1px solid #ccc", padding: "3px", borderRadius: "5px", zIndex: "999" }}>
            <div style={{ textAlign: "right" }}>
            <button onClick={variablehandleClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px" }}>&times;</button>
          </div>
          <ul style={{listStyle:"none"}}>
            {variables.map((variable, index) => (
              <li style={{paddingRight:"20px"}} key={index}>{variable.name}: {variable.value}</li>
            ))}
          </ul>
        </div>
      )}
     </div>
    </div>
  );
};

export default ReplyForm;
