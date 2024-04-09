import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../../styles/onebox.css"
import "../../styles/main2.css"
import RefreshIcon from '@mui/icons-material/Refresh';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import TelegramIcon from '@mui/icons-material/Telegram';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import ReplyIcon from '@mui/icons-material/Reply';
import ReplyForm from './ReplyForm';
const Main2 = ({ isDarkMode}) => {

  const [mails, setMails] = useState([]);
  const [data, setData] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [token] = useState(  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoic3N1dGc5N0BnbWFpbC5jb20iLCJpZCI6NjIsImZpcnN0TmFtZSI6IlVtZXNoIiwibGFzdE5hbWUiOiJHb2xhbmkifSwiaWF0IjoxNzEyNjA5NjE3LCJleHAiOjE3NDQxNDU2MTd9.EYhDi2nv5V8DGmaHuVBgAy748rSFpSuoVIIK3DnNGP0");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(false); // State to control background opacity
  const [replyThreadId, setReplyThreadId] = useState(null); // State to hold the threadId for replying
  const [showAllReplies, setShowAllReplies] = useState(true);
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (!showReplyForm && (event.key === 'd' || event.key === 'D')) {
        setShowDeleteBox(true);
        setBackgroundOpacity(true);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [showReplyForm]);
  const handleReplyClick = async () => {
    try {
      // Fetch threadId from session or storage
      const threadId = sessionStorage.getItem('threadId'); // Example of fetching from sessionStorage
  
  
      const response = await axios.post(
        `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${threadId}`,
        {
          toName: "Mitrajit",
          to: "chandra.rupam@gmail.com",
          from: "mitrajit2022@gmail.com",
          fromName: "Mitrajit",
          subject: "Optimize Your Recruitment Efforts with Expert Support",
          body: "<p>Hello how are you</p>",
          references: [
            "<dea5a0c2-336f-1dc3-4994-191a0ad3891a@gmail.com>",
            "<CAN5Dvwu24av80BmEg9ZVDWaP2+hTOrBQn9KhjfFkZZX_Do88FA@mail.gmail.com>",
            "<CAN5DvwuzPAhoBEpQGRUOFqZF5erXc=B98Ew_5zbHF5dmeKWZMQ@mail.gmail.com>",
            "<a1383d57-fdee-60c0-d46f-6bc440409e84@gmail.com>"
          ],
          inReplyTo: "<a1383d57-fdee-60c0-d46f-6bc440409e84@gmail.com>"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Successfully posted reply:", response.data);
    } catch (error) {
      console.error("Error posting reply:", error);
    }
    const threadId = sessionStorage.getItem('threadId'); // Example of fetching from sessionStorage

    setShowReplyForm(true);
    setReplyThreadId(threadId);
  };
  
  

  const handleCloseReplyForm = () => {
    setShowReplyForm(false);
  };

  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await axios.get('https://hiring.reachinbox.xyz/api/v1/onebox/list', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log("Response data:", response.data); // Log the response data
        if (Array.isArray(response.data.data)) {
          setData(response.data.data); // Set data only if it's an array
          
          // Fetch messages of the first email thread
          if (response.data.data.length > 0) {
            const firstThread = response.data.data[0]; // Get the first email thread
            fetchMessages(firstThread.threadId); // Fetch messages for the first thread
            sessionStorage.setItem('threadId', firstThread.threadId); // Store threadId in sessionStorage
            setReplyThreadId(firstThread.threadId); // Set the replyThreadId
            setShowAllReplies(false); // Display only the first reply
            setClickedIndex(0); // Set the clicked index to the first email thread
          }
        } else {
          console.error("Response data is not an array:", response.data.data); // Log an error if data is not an array
        }
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred"); // Set error message
      }
    };
  
    fetchMails();
  }, [token]);
  

  const fetchMessages = async (threadId) => {
    try {
      const response = await axios.get(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log(response.data.data)
     
      setMessages(response.data.data); // Set messages
      setReplyThreadId(threadId);
      console.log("messages",messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError(error.message);
    }
  };

  const handleCardClick = (index,threadId) => {
    fetchMessages(threadId); // Fetch messages when card is clicked
    setShowAllReplies(false); // Reset showAllReplies when clicking on a card
    setClickedIndex(index);
    sessionStorage.setItem('threadId', threadId);


  };

  
  
    useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'r' || event.key === 'R') {
        handleReplyClick();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  
  const [activeThreadIndex, setActiveThreadIndex] = useState(null); // State to hold the index of the active thread

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'd' || event.key === 'D') {
        if (activeThreadIndex !== null) {
          handleDeleteConfirm();
        }
      }
    };
  
    document.addEventListener('keydown', handleKeyPress);
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [activeThreadIndex]); // Effect depends on activeThreadIndex

  const handleDeleteConfirm = async () => {
    try {
      const threadIdToDelete = sessionStorage.getItem('threadId'); // Get threadId from sessionStorage
      if (threadIdToDelete) {
        const response = await axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadIdToDelete}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response.data);
        // Optionally handle success message
      } else {
        console.error('No threadId found in sessionStorage.');
      }
    } catch (error) {
      console.error('Error deleting email thread:', error);
    } finally {
      setShowDeleteBox(false);
      setBackgroundOpacity(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteBox(false);
    setBackgroundOpacity(false); // Turn off background opacity when delete box is closed
  };


  const toggleShowAllReplies = () => {
    setShowAllReplies(!showAllReplies);
  };

  const [clickedIndex, setClickedIndex] = useState(null);


  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    const hours = new Date(date).getHours();
    const minutes = new Date(date).getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = hours % 12 + ':' + (minutes < 10 ? '0' : '') + minutes + ampm;
    return `${formattedDate} : ${formattedTime}`;
  };
  

  return (
    <div className={`main-2 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>

      
      <div className={`mails-grid ${backgroundOpacity ? 'background-opacity' : ''}`}>
        <div className={`left-column ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div style={{margin:"12px",gap:"12px",display:"flex",flexDirection:"column",paddingBottom:"12px", borderBottom: isDarkMode ? "none":"2px solid #0f0f0f" }}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row"}}>
                    <div style={{display:"flex",flexDirection:"row"}}>
                    <div style={{color:"#3368be",fontSize:"20px",fontWeigth:"bold",fontFamily: "'Inter', sans-serif"}}>All inbox(s)</div>
                    <div><KeyboardArrowDownIcon style={{color:"#3368be"}}/></div>
                    </div>
                    <div><RefreshIcon style={{color:isDarkMode && "#172b4d",border:isDarkMode && "1px solid #dfe3e8",backgroundColor:isDarkMode?"white":"#23272c",padding:"12px",borderRadius:"4px"}}/></div>
                </div>
                <div style={{color: isDarkMode ? "black" : "white",fontFamily: "'Open Sans', sans-serif"}}>25/25 <span style={{color:"#383838"}}>Inboxes selected</span></div>
                <div style={{display:"flex",flexDirection:"row"}}><SearchIcon 
                style={{display:"flex",
                alignItems:"center",color:"#35383d",
                justifyContent:"center",borderTopLeftRadius:"4px",borderBottomLeftRadius:"4px",
                padding:"8px",borderRight:"none",backgroundColor:isDarkMode?"#f4f6f8":"#23272c",borderLeft:isDarkMode?"1px solid grey":"1px solid #16181a",borderBottom:isDarkMode?"1px solid grey":"1px solid #16181a",borderTop:isDarkMode?"1px solid grey":"1px solid #16181a"}}/><input type="text" placeholder='Search' style={{color:"#35383d",width:"93%",paddingLeft:"0",paddingRight:"8px",backgroundColor:isDarkMode?"#f4f6f8":"#23272c",borderRight:isDarkMode?"1px solid grey":"1px solid #16181a",borderBottom:isDarkMode?"1px solid grey":"1px solid #16181a",borderTop:isDarkMode?"1px solid grey":"1px solid #16181a",borderLeft:"none",borderTopRightRadius:"4px",borderBottomRightRadius:"4px"}}/></div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row",fontFamily: "'Inter', sans-serif"}}>
<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:"5px"}}>
    <div style={{color:"#3368be",padding:"8px 12px",borderRadius:"16px",backgroundColor:isDarkMode?"#ececec":"#23272c"}}>26</div>
    <div style={{color: isDarkMode ? "black" : "white"}}>New Replies</div>

</div>
<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:"5px"}}>
    <div style={{color: isDarkMode ? "black" : "white"}}>Newest</div>
    <div style={{color: isDarkMode ? "black" : "white"}}><KeyboardArrowDownIcon/></div>

</div>

                </div>
            </div>
            <div className="div-with-scroll" style={{ margin: "12px", gap: "12px", display: "flex", flexDirection: "column", height: "350px", overflowY: "scroll" }}>
  {data.length === 0 ? (
    <div>No data available</div>
  ) : (
    data.map((item, index) => (
      <div
      key={index}
      className='mails'
      style={{
        gap: "12px",
        display: "flex",
        flexDirection: "column",
        paddingBottom: "12px",
        paddingLeft:"4px",
        borderBottom: isDarkMode ? "none" : "2px solid #0f0f0f",
        borderLeft: clickedIndex === index ? "2px solid blue" : "none"
      }}
      onClick={() => handleCardClick(index,item.threadId)}
    >      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",fontFamily: "'Inter', sans-serif" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
            <div style={{ backgroundColor: "yellow", width: "6px", height: "6px", borderRadius: "50%" }}></div>
            <div style={{ color: isDarkMode ? "black" : "white" }}>{item.fromEmail}</div>
          </div>
          <div style={{ color: "#3b3b3b", fontSize: "12px" }}>Mar 7</div>
        </div>
        <div style={{ paddingLeft: "16px", color: "#434343", fontSize: "16px" }}>{item.subject}</div>
        <div style={{ fontFamily: "'Open Sans', sans-serif",display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", paddingLeft: "16px" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", backgroundColor: isDarkMode ? "#f0f0f0" : "#202123", padding: "10px", borderRadius: "12px", color: "#449c78" }}>
            <div style={{ backgroundColor: "#449c78", width: "6px", height: "6px", borderRadius: "50%" }}></div>
            <div>Interested</div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", backgroundColor: isDarkMode ? "#f0f0f0" : "#202123", padding: "5px", borderRadius: "12px", color: "#a3a4a5" }}>
            <div><TelegramIcon /></div>
            <div>Campaign Name</div>
          </div>
        </div>
      </div>
    ))
  )}
</div>

          {/* Left column content */}
        </div>
        <div className={`middle-column ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row",padding:"24px",borderBottom:isDarkMode?"2px solid #e0e0e0":"2px solid #202327" }}>
<div style={{display:"flex",flexDirection:"column",gap:"8px",fontFamily: "'Inter', sans-serif"}}>
<div style={{color:isDarkMode ? "black":"white"}}>Orlando</div>
<div style={{color:"#494949",fontSize:"12px"}}>orlandom@gmail.com</div>
</div>
<div style={{display:"flex",alignItems:"center",flexDirection:"row",gap:"12px",color:"#D3D7DB" ,fontFamily: "'Open Sans', sans-serif"}}>
    <div style={{color:isDarkMode && "black",display:"flex",alignItems:"center",backgroundColor:isDarkMode ? "#ffffff":"#202123",flexDirection:"row",gap:"5px",padding:"5px",borderRadius:"8px",border:isDarkMode?"2px solid #eff1f3": "2px solid #2d3135 "}}>
    <div style={{ backgroundColor: "yellow", width: "6px", height: "6px", borderRadius: "50%", border: isDarkMode ? "4px solid #fbf9d5":"4px solid #444234"}}></div>
        <div  >Meeting Completed</div>
        
        <KeyboardArrowDownIcon/>
    </div>
    
    <div style={{color:isDarkMode && "black",display:"flex",alignItems:"center",flexDirection:"row",gap:"5px",padding:"5px",borderRadius:"8px",border:isDarkMode?"2px solid #eff1f3": "2px solid #2d3135 ",backgroundColor:isDarkMode ? "#ffffff":"#202123"}}>        <div>Move</div>
        
        <KeyboardArrowDownIcon/>
    </div>
    <div style={{color:isDarkMode && "black",display:"flex",alignItems:"center",backgroundColor:isDarkMode ? "#ffffff":"#202123",flexDirection:"row",gap:"5px",padding:"5px",borderRadius:"8px",border:isDarkMode?"2px solid #eff1f3": "2px solid #2d3135 "}}>
<MoreHorizOutlinedIcon/>
</div>
</div>

         </div>
         <div style={{margin:"24px"}}>
         <div className="line" style={{marginBottom:"24px",backgroundColor:isDarkMode?"#e0e0e0":"#202327"}}>
  <div className="box" style={{backgroundColor:isDarkMode ? "#eef1f4":"#202123",fontFamily: "'Open Sans', sans-serif",color:isDarkMode && "#74838f"}} >Today</div>
</div>
<div className='open-mail div-with-scroll' style={{ height: showAllReplies ? "380px" : "250px", overflow: "scroll" }}>
        {messages.slice(0, showAllReplies ? messages.length : 1).map((message, index) => (
          <div key={index} className="mail-tool" style={{ borderRadius:"12px",border: isDarkMode?"2px solid #e0e0e0":"2px solid #202327", width: "600px", height: "210px", padding: "12px",marginBottom:"12px" }}>
            <div className="sender-receiver-address" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: isDarkMode ? "black" : "white" }}>
                <div style={{fontFamily: "'Open Sans', sans-serif",color:isDarkMode?"black":"#F8FAFC",fontSize:"14px"}}>{message.subject}</div>
                <div style={{ color: "#7F7F7F", fontFamily: "'SF Pro', sans-serif" ,fontSize:"13px"}}>
  {formatDate(message.sentAt)}
</div>              </div>
              <div style={{ color: "#AEAEAE",fontFamily: "'SF Pro', sans-serif",fontSize:"14px" }}>from: {message.fromEmail} cc: {message.cc}</div>
              <div style={{ color: "#AEAEAE",fontFamily: "'SF Pro', sans-serif",fontSize:"16px" }}>to: {message.toEmail}</div>
              <div style={{ width: "500px",fontFamily: "'Open Sans', sans-serif",fontSize:"14px" }}>
                <div style={{ color: isDarkMode ? "black" : "#E1E0E0" }}>
                  Hi "FIRST_NAME",
                </div><br />
                <div style={{ marginTop: "12px", color: isDarkMode ? "black" : "#E1E0E0" }}>
                {message.body.replace(/<[^>]+>/g, ' ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAllReplies && (
        <div style={{ width: "100%", height: "2px", backgroundColor: isDarkMode?"#e0e0e0":" #202327", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "28px" }}>
          <div className="box-1" style={{ backgroundColor: isDarkMode ? "#eef1f4" : "#202123" }} onClick={toggleShowAllReplies}>
            <div style={{ borderTop: isDarkMode?"2px solid #454f5b":"2px solid white", borderBottom: isDarkMode?"2px solid #454f5b":"2px solid white" }}><HeightOutlinedIcon style={{ color: isDarkMode?"#454f5b":"white" }} /></div>
            <div style={{fontFamily: "'Open Sans', sans-serif",color:isDarkMode && "#74838f"}}>View all <span style={{ color: "blue", padding: "3px" }}>{messages.length}</span> replies</div>
          </div>
        </div>
      )}

    <div className="replyButton" onClick={handleReplyClick}>
        <ReplyIcon/>Reply
      </div>
      {showReplyForm && <ReplyForm onClose={handleCloseReplyForm} threadId={replyThreadId} />}
         </div>
        </div>
        <div className={`right-column ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
<div>
<div style={{color:isDarkMode && "#454f5b",backgroundColor:isDarkMode?"#eceff3":"#23272C",padding:"8px",borderRadius:"8px",margin:"8px",width:"250px",fontFamily: "'Inter', sans-serif"}} >Lead Details</div>
<table style={{width:"280px",padding:"12px",color:"#B9B9B9"}}>
<tbody>
    <tr>
        <td>Name</td>
        <td style={{textAlign:"right",color:isDarkMode && "black"}}>Orlando</td>
    </tr>
    <tr>
        <td>Contact No</td>
        <td style={{textAlign:"right",color:isDarkMode && "black"}}>+54-9062827869</td>
    </tr>
    <tr>
        <td>    Email ID</td>
        <td style={{textAlign:"right",color:isDarkMode && "black"}}>orlando@gmail.com</td>
    </tr>
    <tr>
        <td>LinkedIn</td>
        <td style={{textAlign:"right",color:isDarkMode && "black"}}>linkedin.com/in/<br/>timvadde/</td>
    </tr>
    <tr>
        <td>Company Name</td>
        <td style={{textAlign:"right",color:isDarkMode && "black"}}>Reachinbox</td>
    </tr>
    </tbody>
</table>
</div>



<div>
<div style={{fontFamily: "'Inter', sans-serif",color:isDarkMode && "#454f5b",backgroundColor:isDarkMode?"#eceff3":"#23272C",padding:"8px",borderRadius:"8px",margin:"8px",width:"250px",marginTop:"24px"}} >Activities</div>
<div style={{margin:"24px",fontFamily: "'Open Sans', sans-serif" }}>
    <div style={{marginBottom:"5px",fontSize:"15px" ,color:isDarkMode?"black":"white"}}>Campaign Name</div>
    <div style={{marginBottom:"5px",fontSize:"12px",color:isDarkMode?"#9499a0":"white"}}><span style={{color:isDarkMode && "#4f454b"}}>3</span> Steps <span style={{padding:"4px"}}>|</span><span style={{color:isDarkMode && "#4f454b"}}>5</span> days in sequence</div>
    <div style={{display:"flex",alignItems:"center",flexDirection:"row",color:"#787878"}}>
    <div style={{backgroundColor:isDarkMode?"#eef1f4":"#23272c",border:isDarkMode && "1px solid #e1e4ea",padding:"6px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%"}}><EmailOutlinedIcon/></div>
        <div style={{marginLeft:"12px"}}>
            <div style={{fontSize:"13px",color:isDarkMode && "#172b4d"}}>Step 1 : Email</div>
            <div style={{fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}><TelegramIcon style={{color:isDarkMode && "#637381"}}/><div>Sent <span style={{color:isDarkMode?"#637381":"#b9b9b9"}}>3rd,Feb</span></div></div>
        </div>
    </div>
    <div style={{width:"18px",height:"25px",borderRight:isDarkMode?"2px solid #eceef0":"2px solid #41464B",marginTop:"0"}}></div>
    <div style={{display:"flex",alignItems:"center",flexDirection:"row",color:"#787878"}}>
    <div style={{backgroundColor:isDarkMode?"#eef1f4":"#23272c",border:isDarkMode && "1px solid #e1e4ea",padding:"6px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%"}}><EmailOutlinedIcon/></div>
        <div style={{marginLeft:"12px"}}>
            <div style={{fontSize:"13px",color:isDarkMode && "#172b4d"}}>Step 2 : Email</div>
            <div style={{fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}><DraftsOutlinedIcon style={{color:"orange"}}/><div>Opened <span style={{color:isDarkMode?"#637381":"#b9b9b9"}}>5th,Feb</span></div></div>
        </div>
    </div>
    <div style={{width:"18px",height:"25px",borderRight:isDarkMode?"2px solid #eceef0":"2px solid #41464B",marginTop:"0"}}></div>
    <div style={{display:"flex",alignItems:"center",flexDirection:"row",color:"#787878"}}>
    <div style={{backgroundColor:isDarkMode?"#eef1f4":"#23272c",border:isDarkMode && "1px solid #e1e4ea",padding:"6px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%"}}><EmailOutlinedIcon/></div>
        <div style={{marginLeft:"12px"}}>
            <div style={{fontSize:"13px",color:isDarkMode && "#172b4d"}}>Step 3 : Email</div>
            <div style={{fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}><DraftsOutlinedIcon style={{color:"orange"}}/><div>Opened <span style={{color:isDarkMode?"#637381":"#b9b9b9"}}>5th,Feb</span></div></div>
        </div>
    </div>
   

</div>
</div>
        </div>
      </div>
      {showDeleteBox && (
        <div className="delete-box" style={{ display:"flex",alignItems:"center",flexDirection:"column",justifyContent:"center",position: 'fixed', top: '50%', left: '50%',opacity:1, transform: 'translate(-50%, -50%)', backgroundColor: 'black', padding: '20px', borderRadius: '10px', color: '#fff' }}>
          <h3 style={{textAlign:"center"}}>Are you sure?</h3>
          <p style={{textAlign:"center"}}>Your selected email will be deleted.</p>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"row",gap:"8px"}}>
           
            <button onClick={handleDeleteCancel} style={{borderRadius:"4px",backgroundColor:"#25262b",padding:"12px",border:"none",color:"white"}}>Cancel</button>
            <button onClick={handleDeleteConfirm} style={{borderRadius:"4px",backgroundColor:"red",padding:"12px",border:"none",color:"white"}}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Main2;
