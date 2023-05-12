import { nanoid } from "nanoid";
import { Values } from "../../types";
import { ButtonProps, Form } from "antd";
import { useEffect } from "react";
import { AddNotesProps } from "./types";

const useAddNotes = ({
  noteList,
  setNoteList,
  editIndex,
  cancelClick,
  setEditIndex,
  setIsModalOpen,
}: AddNotesProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editIndex)
      form.setFieldsValue(
        noteList[noteList.findIndex((data) => data.id === editIndex)]
      );
  }, [editIndex]);

  const onFormSubmitHandler = (values: Values) => {
    if (editIndex) {
      // edit mode
      const noteListClone = noteList;
      const index = noteList.findIndex((data) => data.id === editIndex);
      noteListClone[index] = {
        ...values,
        id: noteListClone[index].id,
        created_at: noteListClone[index].created_at,
        modified_at: new Date(),
      };
      setNoteList(noteList);
      setEditIndex && setEditIndex(undefined);
      setIsModalOpen && setIsModalOpen(false);
    } else {
      setNoteList([
        ...noteList,
        {
          ...values,
          created_at: new Date(),
          modified_at: new Date(),
          id: nanoid(),
        },
      ]);
      form.resetFields();
    }
  };

  const onCancelHandler = (event: any) => {
    cancelClick && cancelClick(event);
  };

  return { onFormSubmitHandler, form, onCancelHandler };
};

export default useAddNotes;
