import React, { useContext, useState, useEffect } from "react";
import { VideoCallContext } from "../../context/Context";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdCallEnd, MdOutlineMessage, MdIosShare } from "react-icons/md";
import { Button, Col, Row } from "react-bootstrap";
import { Avatar } from "antd";
import { FaUserLarge, FaVolumeXmark } from "react-icons/fa6";
import { socket } from "../../config/config";
import Loading from "../Loading/Loading";
import ChatModal from "../Chat/Chat";
import "./Video.css";

const Video = () => {
  const {
    call,
    isCallAccepted,
    myVideoRef,
    partnerVideoRef,
    userStream,
    name,
    isCallEnded,
    sendMessage: sendMessageFunc,
    receivedMessage,
    chatMessages,
    setChatMessages,
    endCall,
    opponentName,
    isMyVideoActive,
    isPartnerVideoActive,
    toggleVideo,
    isMyMicActive,
    isPartnerMicActive,
    toggleMicrophone,
    toggleFullScreen,
    toggleScreenSharingMode,
  } = useContext(VideoCallContext);

  const [sendMessage, setSendMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  useEffect(() => {
    const handleMessage = ({ message, senderName }) => {
      const newMessage = {
        message,
        type: "received",
        senderName,
        timestamp: Date.now(),
      };

      setChatMessages((prev) => [...prev, newMessage]);
      if (!isModalVisible) {
        setHasUnreadMessages(true);
      }
    };

    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("receiveMessage", handleMessage);
    };
  }, [setChatMessages, isModalVisible]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    if (!isModalVisible) {
      setHasUnreadMessages(false);
    }
  };

  const onSearch = (message) => {
    if (message) {
      sendMessageFunc(message);
      setSendMessage("");
    }
  };

  return (
    <>
      <div className="video-container">
        <Row>
          {userStream ? (
            <Col
              xl={isCallAccepted && 6}
              md={isCallAccepted && 6}
              sm={isCallAccepted && 12}
            >
              <div className="video-paper">
                <h5 className="video-name">{name || "Name"}</h5>
                <div className="video-avatar">
                  <video
                    playsInline
                    muted
                    ref={myVideoRef}
                    onClick={toggleFullScreen}
                    autoPlay
                    className={isCallAccepted ? "video-main" : "video-small"}
                    style={{ opacity: isMyVideoActive ? 1 : 0 }}
                  />
                  <Avatar
                    className={`avatar-background ${
                      isMyVideoActive ? "avatar-hidden" : "avatar-visible"
                    }`}
                    size={100}
                    icon={
                      !name && (
                        <FaUserLarge
                          size={45}
                          style={{ marginBottom: "8px" }}
                        />
                      )
                    }
                  >
                    {name?.[0]?.toUpperCase()}
                  </Avatar>
                  {!isMyMicActive && (
                    <FaVolumeXmark className="mic-off-icon" size={42} />
                  )}
                </div>
              </div>
            </Col>
          ) : (
            <Loading />
          )}
          {isCallAccepted && !isCallEnded && partnerVideoRef && (
            <Col
              xl={isCallAccepted && 6}
              md={isCallAccepted && 6}
              sm={isCallAccepted && 12}
              className="pt-xl-0 pt-lg-0 pt-md-0 pt-3"
            >
              <div className="video-paper">
                <h5 className="video-name">
                  {call.name || opponentName || "Name"}
                </h5>
                <div className="video-avatar">
                  <video
                    playsInline
                    ref={partnerVideoRef}
                    onClick={toggleFullScreen}
                    autoPlay
                    className="video-main"
                    style={{ opacity: isPartnerVideoActive ? 1 : 0 }}
                  />
                  <Avatar
                    className={`avatar-background ${
                      isPartnerVideoActive ? "avatar-hidden" : "avatar-visible"
                    }`}
                    size={100}
                    icon={
                      !opponentName &&
                      !call.name && (
                        <FaUserLarge
                          size={45}
                          style={{ marginBottom: "8px" }}
                        />
                      )
                    }
                  >
                    {(opponentName || call.name)?.slice(0, 1).toUpperCase()}
                  </Avatar>
                  {!isPartnerMicActive && (
                    <FaVolumeXmark className="mic-off-icon" size={42} />
                  )}
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
      {userStream && (
        <div className="video-controls">
          <Button onClick={toggleMicrophone} className="video-control-btn">
            {isMyMicActive ? <MdMic size={25} /> : <MdMicOff size={25} />}
          </Button>
          <Button onClick={toggleVideo} className="video-control-btn">
            {isMyVideoActive ? (
              <MdVideocam size={25} />
            ) : (
              <MdVideocamOff size={25} />
            )}
          </Button>
          {isCallAccepted && !isCallEnded && (
            <Button
              className="video-control-btn"
              onClick={toggleScreenSharingMode}
            >
              <MdIosShare size={23} />
            </Button>
          )}
          {isCallAccepted && !isCallEnded && (
            <Button className="video-control-btn" onClick={toggleModal}>
              <MdOutlineMessage size={22} />
              {hasUnreadMessages && <div className="notification-dot" />}
            </Button>
          )}
          {isCallAccepted && !isCallEnded && (
            <Button className="decline-call-btn" onClick={endCall}>
              <MdCallEnd size={22} />
            </Button>
          )}
        </div>
      )}
      <ChatModal
        isVisible={isModalVisible}
        toggleModal={toggleModal}
        chatMessages={chatMessages}
        sendMessage={sendMessage}
        setSendMessage={setSendMessage}
        onSearch={onSearch}
        receivedMessage={receivedMessage}
      />
    </>
  );
};

export default Video;
