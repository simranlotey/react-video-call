import { StyleSheet } from "aphrodite";

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    width: "95%",
    paddingRight: "1.5rem 0.75rem",
    paddingLeft: "1.5rem 0.75rem",
    marginRight: "auto",
    marginLeft: "auto",
  },

  paper: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "10px",
  },

  name: {
    fontWeight: "bold",
  },

  videoAvatar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },

  video: {
    borderRadius: "10px",
    height: "100%",
    width: "100%",
    objectFit: "cover",
  },

  video1: {
    borderRadius: "10px",
    width: "280px",
  },
  myBtn: {
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    marginLeft: "5px",
    backgroundColor: "#9B1FE8",
    border: "1px solid #9B1FE8",
    ":hover": {
      border: "1px solid #8d00e4",
      backgroundColor: "#8d00e4",
    },
  },
  declineCallBtn: {
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    marginLeft: "5px",
    backgroundColor: "#e72828",
    border: "1px solid #e72828",
    ":hover": {
      border: "1px solid #f14040",
      backgroundColor: "#f14040",
    },
  },
});
