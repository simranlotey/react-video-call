import React, { useEffect, useRef, useState } from "react";
import notification from "../../assets/notification.mp3";
import { Modal, FormControl } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineMessage } from "react-icons/ai";
import { BsSendFill, BsEmojiSmile } from "react-icons/bs";
import Picker from "emoji-picker-react";
import "./Chat.css";

const ChatModal = ({
  isVisible,
  toggleModal,
  chatMessages,
  sendMessage,
  setSendMessage,
  onSearch,
  receivedMessage,
}) => {
  const messagesEndRef = useRef(null);
  const notificationSound = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    if (isVisible) {
      scrollToBottom();
    }

    if (receivedMessage.text && !isVisible) {
      if (notificationSound.current) {
        notificationSound.current.play();
      }

      toast.info(`${receivedMessage.text}`, {
        icon: <AiOutlineMessage className="notification-message" size={30} />,
      });
    }
  }, [receivedMessage, isVisible]);

  const handleSend = () => {
    if (sendMessage.trim()) {
      onSearch(sendMessage);
      setSendMessage("");
      setShowEmojiPicker(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleEmojiSelect = (emojiObject) => {
    setSendMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        toastClassName="custom-toast"
      />
      <audio src={notification} ref={notificationSound} />
      <Modal
        className="chat-modal-main"
        show={isVisible}
        onHide={() => {
          toggleModal(false);
          setShowEmojiPicker(false);
        }}
        centered
      >
        <Modal.Header closeButton className="chat-modal-header">
          <Modal.Title className="chat-modal-title">Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="chat-modal-body"
          onClick={() => setShowEmojiPicker(false)}
        >
          {chatMessages.length ? (
            <div className="message">
              {chatMessages.map((message, index) => (
                <React.Fragment key={index}>
                  <div
                    className={
                      message.type === "sent"
                        ? "message-sent"
                        : "message-reciever"
                    }
                  >
                    {message.message}
                  </div>
                </React.Fragment>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
          ) : (
            <div className="no-message">
              <span>No messages here</span>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="chat-modal-footer">
          <div className="chat-input-section">
            <FormControl
              placeholder="Send a message"
              className="chat-input"
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              onClick={() => setShowEmojiPicker(false)}
              onKeyPress={handleKeyPress}
            />
            <BsEmojiSmile
              className="emoji-toggle"
              size={30}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {showEmojiPicker && (
              <Picker
                searchDisabled={true}
                height={310}
                width={310}
                emojiStyle="google"
                onEmojiClick={handleEmojiSelect}
                className="emoji"
              />
            )}
            <BsSendFill
              className="send-message"
              size={30}
              onClick={handleSend}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatModal;
