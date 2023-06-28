import { useState, useEffect } from "react";
import WindowDimensions from "../types/interfaces/WindowDimensions";

const getWindowDimensions = (): WindowDimensions => {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
