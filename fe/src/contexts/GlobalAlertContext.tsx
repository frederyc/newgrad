import react, {createContext} from "react";
import {GlobalAlertType} from "../types/types/GlobalAlertType";

const GlobalAlertContext = createContext<react.Dispatch<GlobalAlertType> | null>(null);
export default GlobalAlertContext;
