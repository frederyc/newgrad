import {DynamicListItemType} from "../../../../types/types/DynamicListItemType";
import {Box} from "@mui/material";
import StyledTextField from "../StyledTextField";
import SquareIconButton from "../../../buttons/structure/SquareIconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import {dynamicListItemSX} from "../../styling/DynamicList/DynamicListItemSX";
import {useEffect, useState} from "react";

type DynamicListItemParams = {
  data: DynamicListItemType,
  deleteItem: (uuid: string) => void,
  editItem: (uuid: string, text: string) => void,
}

const DynamicListItem = (p: DynamicListItemParams) => {
  const [text, setText] = useState<string>(p.data.text);
  const [disabled, setDisabled] = useState<boolean>(true);

  const deleteSelf = () => {
    p.deleteItem(p.data.uuid);
  }

  const editSelf = () => {
    setDisabled(false);
  }

  const saveEdit = () => {
    setDisabled(true);
    p.editItem(p.data.uuid, text);
  }

  useEffect(() => {
    setText(p.data.text);
  }, [p.data]);

  return (
    <Box id={"dynamic-list-item"} sx={dynamicListItemSX}>
      <StyledTextField value={text} setValue={setText} disabled={disabled} />
      {
        disabled
            ? <SquareIconButton icon={<EditIcon />} onClick={editSelf} variant={"theme2"} />
            : <SquareIconButton icon={<CheckIcon />} onClick={saveEdit} variant={"theme2"} />
      }
      <SquareIconButton icon={<DeleteIcon />} onClick={deleteSelf} variant={"theme2"} />
    </Box>
  );
}

export default DynamicListItem;
