import Tolbar from "../container/Tolbar";
import Slidebar from "../container/Slidebar";
import Chatbox from "../container/Chatbox";
import Defchatbox from "../component/Defchatbox";
import Status from "../container/Status";
import Channels from "../container/Channels";
import Settingcon from "../container/Settingcon";
import Profile from "../container/Profile";
import Community from "../container/Community";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import "./home.css";
const socket = io("https://wback-06q5.onrender.com");
import { ToastContainer, toast } from "react-toastify"; 
import { useNavigate } from "react-router-dom";
import { tokencheck } from "../API/tokencheck";
import { logoutUser } from '../API/logout';

function Home() {
      const navigate = useNavigate();

    const metaurl = "https://www.meta.ai/";
      const [showProfile, setProfile] = useState(false);
      const [showChannel, setChannel] = useState(false);
      const [showSidebar, setShowSidebar] = useState(true);
      const [showStatus, setShowStatus] = useState(false);
      const [selectedChat, setSelectedChat] = useState(null);
      const [showCommunity, setCommunity] = useState(false);
      const [showSetting, setSetting] = useState(false);
      const [reciverId, setreciverId] = useState(null);
      let intervalid ;
    
      const checkToken = async () => {
        try {
            console.log("Checking token...");
            let data = await tokencheck(); // Ensure this function is properly handling errors
      
            const MyId = localStorage.getItem("userId");
      
            if (data?.message === "Unauthorized") {
                if (MyId) {
                    socket.emit("offline", { MyId });
                }
                
                await logoutUser(2);
      
                toast.error("Account logged out due to unauthorized access.", { position: "top-center" });
      
                localStorage.clear();
      
                if (typeof intervalid !== "undefined") {
                    clearInterval(intervalid); // Ensure intervalid exists before clearing
                }
      
                navigate("/login"); // Navigate immediately instead of using setTimeout
            }
        } catch (error) {
            console.error("Error in checkToken:", error);
        }
      };
      
            useEffect(() => {
              intervalid = setInterval(checkToken, 10000);
              return () => clearInterval(intervalid);
            }, []);
      
      
       const handleMetaAI = () => window.open(metaurl, "_blank");
    
      const handleProfile = () => {
        setProfile(true);
        setSetting(false);
        setShowSidebar(false);
        setShowStatus(false);
        setChannel(false);
        setCommunity(false);
        setSelectedChat(null);
      };
    
      const handleSettingClick = () => {
        setProfile(false);
        setSetting(true);
        setShowSidebar(false);
        setShowStatus(false);
        setChannel(false);
        setCommunity(false);
        setSelectedChat(null);
      };
    
      const handleCommunityClick = () => {
        setProfile(false);
        setSetting(false);
        setCommunity(true);
        setChannel(false);
        setShowSidebar(false);
        setShowStatus(false);
        setSelectedChat(null);
      };
    
      const handleChannelClick = () => {
        setProfile(false);
        setSetting(false);
        setChannel(true);
        setCommunity(false);
        setShowSidebar(false);
        setShowStatus(false);
        setSelectedChat(null);
      };
    
      const handleStatusClick = () => {
        setProfile(false);
        setSetting(false);
        setCommunity(false);
        setChannel(false);
        setShowSidebar(false);
        setShowStatus(true);
        setSelectedChat(null);
      };
    
      const handleChatClick = () => {
        setProfile(false);
        setSetting(false);
        setChannel(false);
        setCommunity(false);
        setShowSidebar(true);
        setShowStatus(false);
        setSelectedChat(null);
      };
    
      const handleChatSelection = (chat) => {
        setSelectedChat(chat);
        setreciverId(chat._id);
      };

  return (
    <div className="app">
        <ToastContainer/>
      <div className="app_body">
        <Tolbar
          onStatusClick={handleStatusClick}
          onChatClick={handleChatClick}
          onchannelclick={handleChannelClick}
          oncommunityclick={handleCommunityClick}
          onmetaclick={handleMetaAI}
          onsettingclick={handleSettingClick}
          onProfileClick={handleProfile}
        />
        {showSidebar && <Slidebar onChatSelect={handleChatSelection} />}
        {showStatus && <Status />}
        {showChannel && <Channels />}
        {showCommunity && <Community />}
        {showSetting && <Settingcon />}
        {showProfile && <Profile />}
        {selectedChat ? <Chatbox reciverId={reciverId} selectedChat={selectedChat} /> : <Defchatbox />}
      </div>
    </div>
  );
}

export default Home;
