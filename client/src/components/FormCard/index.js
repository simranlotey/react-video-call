import { StyleSheet } from "aphrodite";

export const styles = StyleSheet.create({
  formSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: "35px",
  },
  card: {
    borderRadius: "10px !important",
    padding: "24px",
    width: "280px"
  },
  mainBtn: {
    border: "1px solid #9B1FE8",
    backgroundColor: "#9B1FE8",
    marginTop: "12px",
    width: "100%",
    ":hover": {
      border: "1px solid #8d00e4",
      backgroundColor: "#8d00e4",
    },
  },
  formControl: {
    border: "1px solid #9B1FE8",
    ":focus": {
      outline: "none",
      border: "1px solid #9B1FE8",
      boxShadow: "none",
      WebkitBoxShadow: "none",
    },
  },
  formLabel: {
    fontSize: "17px",
  },
});
