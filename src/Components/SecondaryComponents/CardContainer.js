import { withStyle } from "styletron-react";
import Card from "./Card";

const CardContainer = withStyle(Card, () => ({
  display: "flex",
  padding: "2rem",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "50%",
  ":first-child": {
    marginRight: "2rem"
  }
}));

export default CardContainer;
