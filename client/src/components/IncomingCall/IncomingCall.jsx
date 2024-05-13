import React, { useContext, useState, useEffect, useRef } from "react";
import answercall from "../../assets/answer-call.gif";
import { VideoCallContext } from "../../context/Context";
import { Button, Modal } from "react-bootstrap";
import { MdCallEnd } from "react-icons/md";
import ringtone from "../../assets/ringtone.ogg";
import "./IncomingCall.css";

const IncomingCall = () => {
  const {
    receiveCall,
    call,
    isCallAccepted,
    endIncomingCall,
    setPartnerUserId,
  } = useContext(VideoCallContext);
  const [showModal, setShowModal] = useState(false);
  const audioRef = useRef();

  const handleClose = () => {
    setShowModal(false);
    if (call.isReceivingCall && !isCallAccepted) {
      endIncomingCall();
    }
    window.location.reload();
  };

  const handleCallAnswer = () => {
    receiveCall();
    setShowModal(false);
  };

  useEffect(() => {
    if (call.isReceivingCall && !isCallAccepted) {
      setShowModal(true);
      setPartnerUserId(call.from);
    }
  }, [call.from, call.isReceivingCall, isCallAccepted, setPartnerUserId]);

  useEffect(() => {
    if (showModal && audioRef.current) {
      audioRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [showModal]);

  return (
    <>
      <audio src={ringtone} loop ref={audioRef} />
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header className="call-modal-header" closeButton>
          <Modal.Title className="call-modal-title">
            {call.name ? call.name : "Someone"} is calling:
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer className="call-modal-footer">
          <Button onClick={handleClose} className="decline-call-btn">
            <MdCallEnd size={25} />
          </Button>
          <div className="answer-call-image" onClick={handleCallAnswer}>
            <img src={answercall} alt="Answer Call" />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default IncomingCall;
