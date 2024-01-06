import React, { useContext, useState, useEffect } from "react";
import answercall from "../../assests/answer-call.gif";
import { ContextProvider } from "../../context/Context";
import { Button, Modal } from "react-bootstrap";
import { styles, AnswerCallImage }  from "./index";
import { MdCallEnd } from "react-icons/md";
import { css } from "aphrodite";

const IncomingCall = () => {
  const { answerCall, call, callAccepted, incomingLeaveCall, setOtherUser } = useContext(ContextProvider);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    if (call.isReceivingCall && !callAccepted) {
      incomingLeaveCall();
    }
    window.location.reload();
  };

  const handleCallAnswer = () => {
    answerCall();
    setShowModal(false);
  };

  useEffect(() => {
    if (call.isReceivingCall && !callAccepted) {
      setShowModal(true);
      setOtherUser(call.from);
    }
  }, [call.from, call.isReceivingCall, callAccepted, setOtherUser]);

  return (
    <>
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title className={css(styles.modelTitle)}>
            {call.name ? call.name : "Someone"} is calling:
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button onClick={handleClose} className={css(styles.declineCallBtn)}>
            <MdCallEnd size={25} />
          </Button>
          <AnswerCallImage onClick={handleCallAnswer}>
            <img
              src={answercall}
              alt="Answer Call"
              className={css(styles.answerCallImage)}
            />
          </AnswerCallImage>
        </Modal.Footer>
      </Modal>
    </>
  );
};
// 9B1FE8
export default IncomingCall;
