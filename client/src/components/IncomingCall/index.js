import { StyleSheet } from "aphrodite";
import styled from 'styled-components';

export const styles = StyleSheet.create({
  declineCallBtn: {
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    backgroundColor: "#e72828",
    border: "1px solid #e72828",
    ":hover": {
      border: "1px solid #f14040",
      backgroundColor: "#f14040",
    },
  },
  answerCallImage: {
    height: "70px",
  },
  modalBody: {
    fontWeight: "bold",
    fontSize: "27px",
    padding: "30px",
    display: "flex"
  },
  modelTitle: {
    fontWeight: "bold",
    fontSize: "27px" 
  },
});

export const AnswerCallImage = styled.div`
  cursor: pointer;
`;
