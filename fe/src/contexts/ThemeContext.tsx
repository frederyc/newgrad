import react, {createContext} from "react";
import {Theme} from "@mui/material";

const ThemeContext = createContext<react.Dispatch<react.SetStateAction<Theme>> | null>(null);
export default ThemeContext;
