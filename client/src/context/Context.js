import React, { useState, useEffect, useRef, createContext } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const URL = "http://localhost:5000";
// const URL = "https://video-call-server-gm7i.onrender.com";

const ContextProvider = createContext();
const socket = io(URL);

const SocketContext = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");
  const [userName, setUserName] = useState("");
  const [otherUser, setOtherUser] = useState("");
  const [myVideoStatus, setMyVideoStatus] = useState(true);
  const [userVideoStatus, setUserVideoStatus] = useState();
  const [myMicStatus, setMyMicStatus] = useState(true);
  const [userMicStatus, setUserMicStatus] = useState();

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
      });
    socket.on("me", (id) => setMe(id));

    socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
      if (currentMediaStatus !== null) {
        switch (type) {
          case "video":
            setUserVideoStatus(currentMediaStatus);
            break;
          case "mic":
            setUserMicStatus(currentMediaStatus);
            break;
          default:
            setUserMicStatus(currentMediaStatus[0]);
            setUserVideoStatus(currentMediaStatus[1]);
            break;
        }
      }
    });

    socket.on("endCall", () => {
      window.location.reload();
    });
    socket.on("callUser", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);
    setOtherUser(call.from);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", {
        signal: data,
        to: call.from,
        userName: name,
        type: "both",
        myMediaStatus: [myMicStatus, myVideoStatus],
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    setOtherUser(id);
    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", ({ signal, userName }) => {
      setCallAccepted(true);
      setUserName(userName);
      peer.signal(signal);
      socket.emit("updateMyMedia", {
        type: "both",
        currentMediaStatus: [myMicStatus, myVideoStatus],
      });
    });

    connectionRef.current = peer;
  };

  const updateVideo = () => {
    setMyVideoStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "video",
        currentMediaStatus: !currentStatus,
      });
      stream.getVideoTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
  };

  const updateMic = () => {
    setMyMicStatus((currentStatus) => {
      socket.emit("updateMyMedia", {
        type: "mic",
        currentMediaStatus: !currentStatus,
      });
      stream.getAudioTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });
  };

  const leaveCall = () => {
    setCallEnded(true);
    socket.emit("endCall", { id: otherUser });
    connectionRef.current.destroy();
    window.location.reload();
  };

  const incomingLeaveCall = () => {
    socket.emit("endCall", { id: otherUser });
  };

  return (
    <ContextProvider.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        setOtherUser,
        incomingLeaveCall,
        userName,
        myVideoStatus,
        setMyVideoStatus,
        userVideoStatus,
        setUserVideoStatus,
        updateVideo,
        myMicStatus,
        userMicStatus,
        updateMic,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export { ContextProvider, SocketContext };
