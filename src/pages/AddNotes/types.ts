import { ButtonProps } from "antd";
import { Values } from "../../types";

export interface AddNotesProps {
  setNoteList: React.Dispatch<React.SetStateAction<Values[]>>;
  noteList: Values[];
  editIndex?: string;
  cancelClick?: ButtonProps["onClick"];
  setEditIndex?: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}
