import React, { useContext } from "react";
import { ContextProvider } from "../../context/Context";
import { MdMic, MdMicOff, MdVideocam, MdVideocamOff, MdCallEnd } from "react-icons/md";
import { Button } from "react-bootstrap";
import { Avatar } from "antd";
import { FaUserLarge, FaVolumeXmark } from "react-icons/fa6";
import { css } from "aphrodite";
import { Col, Row } from "react-bootstrap";
import { styles } from "./index";
import Loading from "../Loading/Loading";

const Video = () => {
  const { call, callAccepted, myVideo, userVideo, stream, name, callEnded, leaveCall, userName, myVideoStatus, userVideoStatus, updateVideo, myMicStatus, userMicStatus, updateMic } = useContext(ContextProvider);

  return (
    <>
      <div className={css(styles.container)}>
        <Row>
          {stream ? (
            <Col
              xl={callAccepted && 6}
              md={callAccepted && 6}
              sm={callAccepted && 12}
            >
              <div className={`${css(styles.paper)} shadow`}>
                <h5 className={css(styles.name)}>{name || "Name"}</h5>
                <div className={css(styles.videoAvatar)}>
                  <video
                    playsInline
                    muted
                    ref={myVideo}
                    className={
                      !callAccepted ? css(styles.video1) : css(styles.video)
                    }
                    autoPlay
                    style={{
                      opacity: myVideoStatus ? 1 : 0,
                    }}
                  />
                  <Avatar
                    style={{
                      backgroundColor: "#9B1FE8",
                      position: "absolute",
                      fontSize: "45px",
                      opacity: `${myVideoStatus ? "-1" : "2"}`,
                    }}
                    size={100}
                    icon={
                      !name && (
                        <FaUserLarge
                          size={45}
                          style={{ marginBottom: "10px" }}
                        />
                      )
                    }
                  >
                    {name.slice(0, 1).toUpperCase()}
                  </Avatar>
                  {!myMicStatus && (
                    <FaVolumeXmark
                      size={42}
                      style={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        padding: "10px",
                        color: "#e72828",
                      }}
                    ></FaVolumeXmark>
                  )}
                </div>
              </div>
            </Col>
          ) : (
            <Loading />
          )}
          {callAccepted && !callEnded && userVideo && (
            <Col
              xl={callAccepted && 6}
              md={callAccepted && 6}
              sm={callAccepted && 12}
              className="pt-xl-0 pt-lg-0 pt-md-0 pt-3"
            >
              <div className={`${css(styles.paper)} shadow`}>
                <h5
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {call.name || userName || "Name"}
                </h5>
                <div className={css(styles.videoAvatar)}>
                  <video
                    playsInline
                    ref={userVideo}
                    autoPlay
                    className={css(styles.video)}
                    style={{
                      opacity: userVideoStatus ? 1 : 0,
                    }}
                  />
                  <Avatar
                    style={{
                      backgroundColor: "#9B1FE8",
                      position: "absolute",
                      fontSize: "45px",
                      opacity: `${userVideoStatus ? "-1" : "2"}`,
                    }}
                    size={100}
                    icon={
                      !userName &&
                      !call.name && (
                        <FaUserLarge
                          size={45}
                          style={{ marginBottom: "10px" }}
                        />
                      )
                    }
                  >
                    {(userName || call.name)?.slice(0, 1).toUpperCase()}
                  </Avatar>
                  {!userMicStatus && (
                    <FaVolumeXmark
                      size={42}
                      style={{
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        padding: "10px",
                        color: "#e72828",
                      }}
                    ></FaVolumeXmark>
                  )}
                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
      {stream && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
            paddingBottom: "25px",
          }}
        >
          <Button onClick={updateMic} className={`${css(styles.myBtn)} shadow`}>
            {myMicStatus ? <MdMic size={25} /> : <MdMicOff size={25} />}
          </Button>
          <Button onClick={updateVideo} className={`${css(styles.myBtn)} shadow`}>
            {myVideoStatus ? (
              <MdVideocam size={25} />
            ) : (
              <MdVideocamOff size={25} />
            )}
          </Button>
          {callAccepted && !callEnded && (
            <Button
              className={`${css(styles.declineCallBtn)} shadow`}
              onClick={leaveCall}
            >
              <MdCallEnd size={22} />
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Video;
