import react, {useState} from "react";
import {AppBar, Box, Palette, useTheme} from "@mui/material";
import {baseSearchBarSX, contentWrapperSX, mainMenuWrapperSX, newgradLogoSX} from "../styling/BaseSearchBarSX";
import SquareIconButton from "../../buttons/structure/SquareIconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import MainMenu from "../../menus/structure/MainMenu";
import logo from "../../../resources/images/newgradeu_logo.jpg";

type BaseSearchBarParams = {
  content: react.ReactNode
}

/**
 * This is a component that is not meant to be used on its own. It acts as a base bar that occupies all the width of
 * the viewport. It's always sticking to the top of the screen and displays its content. The content should have the
 * width and height set to 100%. The components in content should be aligned in the center. Content should also handle
 * media queries for mobile devices. While on 'mobile mode', the component will display a button to display the main
 * menu drawer and a logo
 * @param params - A 'content' which represents the child element this component will render
 */
const BaseSearchBar = (params: BaseSearchBarParams) => {
  const palette: Palette = useTheme().palette;

  const [openMainMenu, setOpenMainMenu] = useState<boolean>(false);

  return (
      <AppBar position={"fixed"} id={'base-search-bar'} sx={baseSearchBarSX(palette)}>
        <Box id={"main-menu-wrapper"} sx={mainMenuWrapperSX}>
          <SquareIconButton icon={<MenuIcon />} onClick={() => setOpenMainMenu(true)} variant={"theme1"} />
          <img id={"newgrad-logo"} src={logo} style={newgradLogoSX}  alt={"cannot load image"}/>
        </Box>
        <Box id={"content-wrapper"} sx={contentWrapperSX}>
          {params.content}
        </Box>
        <MainMenu isOpen={openMainMenu} onClose={() => setOpenMainMenu(false)} />
      </AppBar>
  );
}

export default BaseSearchBar;
