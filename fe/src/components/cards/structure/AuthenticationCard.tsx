import React, {useState} from "react";
import ReactCardFlip from "react-card-flip";
import RegisterCard from "./RegisterCard";
import LoginCard from "./LoginCard";
const AuthenticationCard = () => {
  const [isFlipped, setIsFlipper] = useState<boolean>(false);

  return (
      <ReactCardFlip isFlipped={isFlipped} flipDirection={"horizontal"} children={[
        <LoginCard switchToRegister={setIsFlipper} />,
        <RegisterCard switchFromLogin={setIsFlipper} />
      ]}></ReactCardFlip>
  );
}

export default AuthenticationCard;
