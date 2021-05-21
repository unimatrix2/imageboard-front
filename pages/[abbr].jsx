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
import useContainerSize from "../hooks/containerSize";
import PersistentDrawer from "../components/PersistentDrawer";
import { appTheme } from "../utils/theme";
import { calcAppBarSize, handleOverflow } from "../utils/cssUtils";
// Needs change. Prop getting should happen at each request,
// fetching the board data, posts and replies
export const getServerSideProps = (context) => {
  return {
    props: {
      data: context.query,
    },
  };
};

export default function Board({ data }) {
  useDisplay();
  const { state } = useContext(Context);
  const customTheme = createMuiTheme(appTheme);

  return (
    <ThemeProvider theme={customTheme}>
      {state?.deviceWindow ? <PersistentDrawer /> : ""}
      {state?.deviceWindow ? <Typography>{data.abbr}</Typography> : ""}
    </ThemeProvider>
  );
}
