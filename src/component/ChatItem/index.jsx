import React from "react";
import styles from './style.module.css';

const ChatItem = ({ chat, onSelectChat }) => {
  const imageUrl = `http://localhost:3000${chat.dp}`;
  return (
    <div className={styles.chatmain} onClick={() => onSelectChat(chat)}>
      <img 
        src={imageUrl} 
        alt={chat.name} 
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className={styles.nametime}>
          <p className={styles.chatname}>{chat.name}</p>
          <p 
            className={styles.chattime} 
            style={{ color: chat.unreadCount > 0 ? "#25D366" : "inherit" }}
          >
            {chat.chattime}
          </p>
        </div>
        <div className={styles.bot}>
          <p className={styles.lastMessage}>{chat.lastMessage}</p>
          {chat.unreadCount > 0 && (
            <div className={styles.unread}>{chat.unreadCount}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
