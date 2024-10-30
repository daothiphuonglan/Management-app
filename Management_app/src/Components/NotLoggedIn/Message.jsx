
import React from 'react';
import './Message.css'; 

const Message = ({ message }) => {
  return (
    <div className="custom-message">
      {message}
    </div>
  );
};

export default Message;
