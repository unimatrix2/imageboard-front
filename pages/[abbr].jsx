import useDisplay from "../hooks/displayProvider";
import { Context } from "../context/Context";
import { useContext, useEffect, useState } from "react";
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme,
  Typography,
  Container,
} from "@material-ui/core";
import axios from "axios";
import useContainerSize from "../hooks/containerSize";
import PersistentDrawer from "../components/PersistentDrawer";
import { appTheme } from "../utils/theme";
import { calcAppBarSize, handleOverflow } from "../utils/cssUtils";
import { BorderAllTwoTone } from "@material-ui/icons";

// This is using SSR right now, but ideally
// should be incremental static generation
// to limit the number of requests to the server.

// SSR was adopted for the lack of a better solution.
// This will be changed
export const getServerSideProps = async (context) => {
  const board = await axios.get(
    `${process.env.NEXT_PUBLIC_BOARD_ROOT}/${context.query.abbr}`,
    { withCredentials: true }
  );
  return {
    props: {
      board: board.data
    },
  };
};

export default function Board({ board }) {
  useDisplay();
  const { state } = useContext(Context);
  const customTheme = createMuiTheme(appTheme);
  return (
    <ThemeProvider theme={customTheme}>
      {state?.deviceWindow ? <PersistentDrawer /> : ""}
      {state?.deviceWindow ? <Typography>{board.abbr}</Typography> : ""}
      {state?.deviceWindow ? <Typography>{board.title}</Typography> : ""}
    </ThemeProvider>
  );
}
