import React, { useState, useContext } from "react";
import { ContextProvider } from "../../context/Context";
import { MdFileCopy, MdCall, MdOutlineDone } from "react-icons/md";
import { Card, Form, Button } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { css } from "aphrodite";
import { styles } from "./index";

const FormCard = () => {
  const [idToCall, setIdToCall] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  const { name, setName, me, callUser, callAccepted } = useContext(ContextProvider);

  return (
    <>
      {!callAccepted && (
        <div className={css(styles.formSection)}>
          <Card className={`${css(styles.card)} shadow`}>
            <Form noValidate autoComplete="off">
              <Form.Group controlId="name">
                <Form.Label className={css(styles.formLabel)}>
                  Your Name
                </Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  className={css(styles.formControl)}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Enter your name"
                />
              </Form.Group>
              <CopyToClipboard text={me}>
                <Button
                  className={`${css(styles.mainBtn)} mb-3`}
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
                <Form.Label className={css(styles.formLabel)}>
                  ID to call
                </Form.Label>
                <Form.Control
                  type="text"
                  value={idToCall}
                  className={css(styles.formControl)}
                  onChange={(e) => setIdToCall(e.target.value)}
                  placeholder="Enter the ID you want to call"
                />
              </Form.Group>
              <Button
                className={css(styles.mainBtn)}
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
