"use client";
import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { PaletteMode } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { getDesignTokens } from "./theme/theme";
import { ColorModeContext } from "./theme/ColorModeContext";
import AddProduct from "./pages/AddProduct";

const Page = () => {
  const [openSidebar, setOpenSidebar] = React.useState(false);
  const [path, setPath] = useState([
    "Home",
    "Posts",
    "Inventory",
    "Add Product",
  ]);
  const [selectNav, setSelectNav] = React.useState(path[0]);

  const [mode, setMode] = React.useState<PaletteMode>("dark");
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <div>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
          {openSidebar && (
            <Sidebar
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
              path={path}
              selectNav={selectNav}
              setSelectNav={setSelectNav}
            />
          )}
          <div className="">
            {selectNav === "Add Product" && <AddProduct />}
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
};

export default Page;
