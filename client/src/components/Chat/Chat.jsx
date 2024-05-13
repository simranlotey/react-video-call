import React, { useEffect, useRef } from "react";
import notification from "../../assets/notification.mp3";
import { Modal, Button, FormControl } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
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
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
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
      />
      <audio src={notification} ref={notificationSound} />
      <Modal
        className="chat-modal-main"
        show={isVisible}
        onHide={() => toggleModal(false)}
        centered
      >
        <Modal.Header closeButton className="chat-modal-header">
          <Modal.Title className="chat-modal-title">Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body className="chat-modal-body">
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
              onKeyPress={handleKeyPress}
            />
            <Button className="send-message" onClick={handleSend}>
              <IoSend size={22} />
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChatModal;
