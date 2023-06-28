import react, {useContext, useState} from "react";
import {Box} from "@mui/material";
import {DynamicListItemType} from "../../../../types/types/DynamicListItemType";
import uuid from "react-uuid";
import StyledTextField from "../StyledTextField";
import SquareIconButton from "../../../buttons/structure/SquareIconButton";
import AddIcon from '@mui/icons-material/Add';
import DynamicListItem from "./DynamicListItem";
import {dynamicListSX} from "../../styling/DynamicList/DynamicListSX";
import {GlobalAlertType} from "../../../../types/types/GlobalAlertType";
import GlobalAlertContext from "../../../../contexts/GlobalAlertContext";

type DynamicListParams = {
  data: DynamicListItemType[],
  setData: react.Dispatch<react.SetStateAction<DynamicListItemType[]>>,
  placeholder: string
}

const DynamicList = (p: DynamicListParams) => {
  const [text, setText] = useState<string>("");
  const globalAlertContext: react.Dispatch<GlobalAlertType> = useContext(GlobalAlertContext)!;

  const addItem = (text: string) => {
    if (text.trim().length === 0) {
      globalAlertContext({
        severity: "error",
        title: "",
        message: "Field cannot be empty",
        open: true
      });
      return;
    }

    p.setData(
        [
            ...p.data,
            {
              uuid: uuid(),
              text: text,
            }
        ]
    );
    setText("")
  }

  const deleteItem = (uuid: string) => {
    p.setData(p.data.filter(x => x.uuid !== uuid));
  }

  const editItem = (uuid: string, text: string) => {
    p.setData(p.data.map(x => x.uuid !== uuid ? x : {
      uuid: x.uuid,
      text: text
    }));
  }

  const handleEnter = (e: react.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      addItem(text);
    }
  }

  return (
      <Box id={"dynamic-list"} sx={dynamicListSX}>
        {
          p.data.map(x => <DynamicListItem data={x} deleteItem={deleteItem} editItem={editItem} />)
        }
        <Box id={"insert-value-container"}>
          <StyledTextField value={text} setValue={setText} placeHolder={p.placeholder} onKeyUp={handleEnter} />
          <SquareIconButton icon={<AddIcon />} onClick={() => addItem(text)} variant={"theme2"} />
        </Box>
      </Box>
  );
}

export default DynamicList;
