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
  const [token] = useState(  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoic2hhaGFuZXByaXlhbmthczAxQGdtYWlsLmNvbSIsImlkIjo5LCJmaXJzdE5hbWUiOiJQcml5YW5rYSIsImxhc3ROYW1lIjoiU2hhaGFuZSJ9LCJpYXQiOjE3MTEzODYwMzUsImV4cCI6MTc0MjkyMjAzNX0.aawIHorCsYmq5bCQViAo7oEmEvwBHl_LhBq-Hh3sYGc");
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showDeleteBox, setShowDeleteBox] = useState(false);
  const [backgroundOpacity, setBackgroundOpacity] = useState(false); // State to control background opacity
  const [replyThreadId, setReplyThreadId] = useState(null); // State to hold the threadId for replying

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'd' || event.key === 'D') {
        setShowDeleteBox(true);
        setBackgroundOpacity(true); // Turn on background opacity when delete box is open
      }
    };
  
    document.addEventListener('keydown', handleKeyPress);
  
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Empty dependency array to run the effect only once after initial render
  
  const handleReplyClick = (threadId) => {
    setReplyThreadId(threadId); // Set the threadId to reply to
    setShowReplyForm(true);
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
      if (activeThreadIndex !== null) {
        const threadIdToDelete = data[activeThreadIndex].threadId;
        const response = await axios.delete(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadIdToDelete}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(response.data);
        // Optionally handle success message
      } else {
        console.error('No active thread selected.');
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
  const [showAllReplies, setShowAllReplies] = useState(false);

  const toggleShowAllReplies = () => {
    setShowAllReplies(!showAllReplies);
  };

  const [clickedIndex, setClickedIndex] = useState(null);




  return (
    <div className={`main-2 ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>

      
      <div className={`mails-grid ${backgroundOpacity ? 'background-opacity' : ''}`}>
        <div className={`left-column ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            <div style={{margin:"12px",gap:"12px",display:"flex",flexDirection:"column",paddingBottom:"12px", borderBottom: isDarkMode ? "2px solid grey":"2px solid #0f0f0f" }}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row"}}>
                    <div style={{display:"flex",flexDirection:"row"}}>
                    <div style={{color:"#3368be",fontSize:"20px",fontWeigth:"bold"}}>All inbox(s)</div>
                    <div><KeyboardArrowDownIcon style={{color:"#3368be"}}/></div>
                    </div>
                    <div><RefreshIcon style={{backgroundColor:"#23272c",padding:"12px",borderRadius:"4px"}}/></div>
                </div>
                <div style={{color: isDarkMode ? "black" : "white"}}>25/25 <span style={{color:"#383838"}}>Inboxes selected</span></div>
                <div style={{display:"flex",flexDirection:"row"}}><SearchIcon 
                style={{display:"flex",
                alignItems:"center",color:"#35383d",
                justifyContent:"center",borderTopLeftRadius:"4px",borderBottomLeftRadius:"4px",
                padding:"8px",borderRight:"none",backgroundColor:isDarkMode?"#f4f6f8":"#23272c",borderLeft:"1px solid #16181a",borderBottom:"1px solid #16181a",borderTop:"1px solid #16181a"}}/><input type="text" placeholder='Search' style={{color:"#35383d",width:"93%",paddingLeft:"0",paddingRight:"8px",backgroundColor:isDarkMode?"#f4f6f8":"#23272c",borderRight:"1px solid #16181a",borderBottom:"1px solid #16181a",borderTop:"1px solid #16181a",borderLeft:"none",borderTopRightRadius:"4px",borderBottomRightRadius:"4px"}}/></div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row"}}>
<div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:"5px"}}>
    <div style={{color:"#3368be",padding:"8px 12px",borderRadius:"16px",backgroundColor:"#23272c"}}>26</div>
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
        borderBottom: isDarkMode ? "2px solid grey" : "2px solid #0f0f0f",
        borderLeft: clickedIndex === index ? "2px solid blue" : "none"
      }}
      onClick={() => handleCardClick(index,item.threadId)}
    >      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
            <div style={{ backgroundColor: "yellow", width: "6px", height: "6px", borderRadius: "50%" }}></div>
            <div style={{ color: isDarkMode ? "black" : "white" }}>{item.fromEmail}</div>
          </div>
          <div style={{ color: "#3b3b3b", fontSize: "12px" }}>Mar 7</div>
        </div>
        <div style={{ paddingLeft: "16px", color: "#434343", fontSize: "16px" }}>{item.subject}</div>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px", paddingLeft: "16px" }}>
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
         <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexDirection:"row",padding:"24px" }}>
<div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
<div style={{color:isDarkMode ? "black":"white"}}>Orlando</div>
<div style={{color:"#494949",fontSize:"12px"}}>orlandom@gmail.com</div>
</div>
<div style={{display:"flex",alignItems:"center",flexDirection:"row",gap:"12px"}}>
    <div style={{display:"flex",alignItems:"center",backgroundColor:isDarkMode ? "silver":"#202123",flexDirection:"row",gap:"5px",padding:"5px",borderRadius:"8px",border:"2px solid #2d3135 "}}>
    <div style={{ backgroundColor: "yellow", width: "6px", height: "6px", borderRadius: "50%", border: "4px solid #444234"}}></div>
        <div >Meeting Completed</div>
        
        <KeyboardArrowDownIcon/>
    </div>
    
    <div style={{display:"flex",alignItems:"center",flexDirection:"row",gap:"5px",padding:"5px",borderRadius:"8px",border:"2px solid #2d3135 ",backgroundColor:isDarkMode ? "silver":"#202123"}}>        <div>Move</div>
        
        <KeyboardArrowDownIcon/>
    </div>
    <div style={{display:"flex",alignItems:"center",backgroundColor:isDarkMode ? "silver":"#202123",flexDirection:"row",gap:"5px",padding:"5px",borderRadius:"8px",border:"2px solid #2d3135 "}}>
<MoreHorizOutlinedIcon/>
</div>
</div>

         </div>
         <div style={{margin:"24px"}}>
         <div className="line" style={{marginBottom:"24px"}}>
  <div className="box" style={{backgroundColor:isDarkMode ? "silver":"#202123"}} >Today</div>
</div>
<div className='open-mail div-with-scroll' style={{ height: showAllReplies ? "380px" : "250px", overflow: "scroll" }}>
        {messages.slice(0, showAllReplies ? messages.length : 1).map((message, index) => (
          <div key={index} className="mail-tool" style={{ border: "2px solid #202327", width: "600px", height: "230px", padding: "12px",marginBottom:"12px" }}>
            <div className="sender-receiver-address" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: isDarkMode ? "black" : "white" }}>
                <div>{message.subject}</div>
                <div style={{ color: "#535455" }}>{new Date(message.sentAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              </div>
              <div style={{ color: "#AEAEAE" }}>from: {message.fromEmail} cc: {message.cc}</div>
              <div style={{ color: "#AEAEAE" }}>to: {message.toEmail}</div>
              <div style={{ width: "500px" }}>
                <div style={{ color: isDarkMode ? "black" : "white" }}>
                  Hi "FIRST_NAME",
                </div><br />
                <div style={{ marginTop: "12px", color: isDarkMode ? "black" : "white" }}>
                {message.body.replace(/<[^>]+>/g, ' ')}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!showAllReplies && (
        <div style={{ width: "100%", height: "2px", backgroundColor: "#1a1a1a", display: "flex", alignItems: "center", justifyContent: "center", marginTop: "28px" }}>
          <div className="box-1" style={{ backgroundColor: isDarkMode ? "silver" : "#202123" }} onClick={toggleShowAllReplies}>
            <div style={{ borderTop: "2px solid white", borderBottom: "2px solid white" }}><HeightOutlinedIcon style={{ color: "white" }} /></div>
            <div>View all <span style={{ color: "blue", padding: "3px" }}>{messages.length}</span> replies</div>
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
<div style={{backgroundColor:"#23272C",padding:"8px",borderRadius:"8px",margin:"8px",width:"250px"}} >Lead Details</div>
<table style={{width:"280px",padding:"12px",color:"#B9B9B9"}}>
<tbody>
    <tr>
        <td>Name</td>
        <td style={{textAlign:"right"}}>Orlando</td>
    </tr>
    <tr>
        <td>Contact No</td>
        <td style={{textAlign:"right"}}>+54-9062827869</td>
    </tr>
    <tr>
        <td>    Email ID</td>
        <td style={{textAlign:"right"}}>orlando@gmail.com</td>
    </tr>
    <tr>
        <td>LinkedIn</td>
        <td style={{textAlign:"right"}}>linkedin.com/in/<br/>timvadde/</td>
    </tr>
    <tr>
        <td>Company Name</td>
        <td style={{textAlign:"right"}}>Reachinbox</td>
    </tr>
    </tbody>
</table>
</div>



<div>
<div style={{backgroundColor:"#23272C",padding:"8px",borderRadius:"8px",margin:"8px",width:"250px",marginTop:"24px"}} >Activities</div>
<div style={{margin:"24px"}}>
    <div style={{marginBottom:"5px",fontSize:"15px" ,color:isDarkMode?"black":"white"}}>Campaign Name</div>
    <div style={{marginBottom:"5px",fontSize:"12px",color:isDarkMode?"black":"white"}}>3 Steps <span style={{padding:"4px"}}>|</span>5 days in sequence</div>
    <div style={{display:"flex",alignItems:"center",flexDirection:"row",color:"#787878"}}>
        <div style={{backgroundColor:"#41464B",padding:"6px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%"}}><EmailOutlinedIcon/></div>
        <div style={{marginLeft:"12px"}}>
            <div style={{fontSize:"13px"}}>Step 1 : Email</div>
            <div style={{fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}><TelegramIcon/><div>Sent 3rd,Feb</div></div>
        </div>
    </div>
    <div style={{width:"18px",height:"25px",borderRight:"2px solid #41464B",marginTop:"0"}}></div>
    <div style={{display:"flex",alignItems:"center",flexDirection:"row",color:"#787878"}}>
        <div style={{backgroundColor:"#41464B",padding:"6px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%"}}><EmailOutlinedIcon/></div>
        <div style={{marginLeft:"12px"}}>
            <div style={{fontSize:"13px"}}>Step 2 : Email</div>
            <div style={{fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}><DraftsOutlinedIcon style={{color:"orange"}}/><div>Opened 5th,Feb</div></div>
        </div>
    </div>
    <div style={{width:"18px",height:"25px",borderRight:"2px solid #41464B",marginTop:"0"}}></div>
    <div style={{display:"flex",alignItems:"center",flexDirection:"row",color:"#787878"}}>
        <div style={{backgroundColor:"#41464B",padding:"6px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%"}}><EmailOutlinedIcon/></div>
        <div style={{marginLeft:"12px"}}>
            <div style={{fontSize:"13px"}}>Step 1 : Email</div>
            <div style={{fontSize:"10px",display:"flex",alignItems:"center",justifyContent:"center"}}><DraftsOutlinedIcon style={{color:"orange"}}/><div>Opened 5th,Feb</div></div>
        </div>
    </div>
   

</div>
</div>
        </div>
      </div>
      {showDeleteBox && (
        <div className="delete-box" style={{ display:"flex",padding:"24px",lignItems:"center",flexDirection:"column",justifyContent:"center",position: 'fixed', top: '50%', left: '50%',opacity:1, transform: 'translate(-50%, -50%)', backgroundColor: 'black', padding: '20px', borderRadius: '10px', color: '#fff' }}>
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
