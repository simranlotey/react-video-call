import React, { useState, useContext } from "react";
import { VideoCallContext } from "../../context/Context";
import { MdFileCopy, MdCall, MdOutlineDone } from "react-icons/md";
import { Card, Form, Button } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./FormCard.css";

const FormCard = () => {
  const [idToCall, setIdToCall] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const { name, setName, myUserId, callUser, isCallAccepted } =
    useContext(VideoCallContext);

  return (
    <>
      {!isCallAccepted && (
        <div className="form-section">
          <Card className="card">
            <Form noValidate autoComplete="off">
              <Form.Group controlId="name">
                <Form.Label className="form-label">Your Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  className="form-input"
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </Form.Group>
              <CopyToClipboard text={myUserId}>
                <Button
                  className="form-main-btn mb-3"
                  onClick={handleCopyClick}
                >
                  {isCopied ? (
                    <>
                      <MdOutlineDone size={22} /> Copied!
                    </>
                  ) : (
                    <>
                      <MdFileCopy size={22} /> Copy Your ID
                    </>
                  )}
                </Button>
              </CopyToClipboard>
              <Form.Group controlId="idToCall">
                <Form.Label className="form-label">ID to call</Form.Label>
                <Form.Control
                  type="text"
                  value={idToCall}
                  className="form-input"
                  onChange={(e) => setIdToCall(e.target.value)}
                  placeholder="Enter the ID to make a call"
                />
              </Form.Group>
              <Button
                className="form-main-btn"
                onClick={() => callUser(idToCall)}
              >
                <MdCall size={22} /> Call
              </Button>
            </Form>
          </Card>
        </div>
      )}
    </>
  );
};

export default FormCard;
