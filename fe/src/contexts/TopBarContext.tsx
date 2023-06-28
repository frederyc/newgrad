import react, {createContext} from "react";

const TopBarContext = createContext<react.Dispatch<react.ReactNode> | null>(null);
export default TopBarContext;
