"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import InventoryIcon from "@mui/icons-material/Inventory";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

export default function Sidebar({
  openSidebar,
  setOpenSidebar,
  path,
  selectNav,
  setSelectNav,
}: Readonly<{
  openSidebar: boolean;
  setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  path: string[];
  selectNav: string;
  setSelectNav: React.Dispatch<React.SetStateAction<string>>;
}>) {
  //   const [dark, setDark] = React.useState(false);

  return (
    <React.Fragment>
      <SwipeableDrawer
        anchor="left"
        open={openSidebar}
        onClose={() => setOpenSidebar(false)}
        onOpen={() => setOpenSidebar(true)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "rgb(17 24 39)", // Set the background color of the drawer
          },
        }}
      >
        <Box sx={{ width: 250, backgroundColor: "rgb(17 24 39)" }}>
          {" "}
          {/* Set the background color of the content */}
          {/* TODO: right side close button  */}
          <ListItemButton
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "8px", // Add padding to the right for space
              color: "white", // Set the text color to white for visibility
            }}
          >
            <ListItemIcon
              onClick={() => {
                setOpenSidebar(!openSidebar);
              }}
              sx={{ color: "white" }} // Set the icon color to white
            >
              <CloseIcon />
            </ListItemIcon>
            {/* {dark ? <DarkModeIcon /> : <LightModeIcon />} */}
          </ListItemButton>
          {path.map((path) => (
            <ListItem
              key={path}
              button
              onClick={() => {
                setSelectNav(path);
                setOpenSidebar(!openSidebar);
              }}
              sx={{
                color: "rgb(248 250 252)",
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                {" "}
                {/* Set the icon color to white */}
                {path === "Home" ? (
                  <HomeIcon />
                ) : path === "Posts" ? (
                  <MailOutlineIcon />
                ) : path === "Add Product" ? (
                  <NoteAltIcon />
                ) : path === "Inventory" ? (
                  <InventoryIcon />
                ) : path === "Add Product" ? (
                  <NoteAltIcon />
                ) : (
                  ""
                )}
              </ListItemIcon>
              <ListItemText primary={path} />
            </ListItem>
          ))}
          {/* <Divider />
          <List>
            {["All mail", "Trash", "Spam"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <HomeIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </Box>
      </SwipeableDrawer>
    </React.Fragment>
  );
}
