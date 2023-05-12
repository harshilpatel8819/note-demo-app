import { Values } from "../../types";

export interface NoteListProps {
  noteList: Values[];
  setNoteList: React.Dispatch<React.SetStateAction<Values[]>>;
  searchValues: string;
  modifiedFilter?: string;
  ascDec?: string;
}

export interface DateComponentProps {
  title: string;
  date: Date;
}
