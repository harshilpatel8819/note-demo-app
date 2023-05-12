import { Button, Card, Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { Values } from "../../types";
import "./NoteList.css";
import { DateComponentProps, NoteListProps } from "./types";
import AddNotes from "../AddNotes/AddNotes";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const DateComponent: React.FC<DateComponentProps> = ({ title, date }) => {
  return (
    <div className="date-component-container">
      <span>{title}</span>
      <span>{date.toLocaleString()}</span>
    </div>
  );
};

const NoteList: React.FC<NoteListProps> = ({
  noteList,
  setNoteList,
  searchValues,
  ascDec,
  modifiedFilter,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<string | undefined>(undefined);

  const onEditButtonHandler = (id: string) => {
    setIsModalOpen(true);
    setEditIndex(id);
  };

  const onCancelHandler = () => {
    setIsModalOpen(false);
    setEditIndex(undefined);
  };

  const onDeleteHandler = (id: string) => () => {
    setNoteList(noteList.filter((data) => data.id !== id));
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        footer={null}
        onCancel={onCancelHandler}
      >
        <AddNotes
          noteList={noteList}
          setNoteList={setNoteList}
          editIndex={editIndex}
          cancelClick={onCancelHandler}
          setEditIndex={setEditIndex}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal>
      <Row gutter={[16, 16]} className="note-list">
        {noteList
          .filter(
            (item) =>
              item.title.toLowerCase().includes(searchValues.toLowerCase()) ||
              item.details.toLowerCase().includes(searchValues.toLowerCase())
          )
          .sort((a, b) => {
            if (
              modifiedFilter === "created_at" ||
              modifiedFilter === "modified_at"
            ) {
              if (ascDec === "asc")
                return (
                  b[modifiedFilter].getTime() - a[modifiedFilter].getTime()
                );
              else
                return (
                  a[modifiedFilter].getTime() - b[modifiedFilter].getTime()
                );
            } else {
              if (ascDec === "asc") return a.title.localeCompare(b.title);
              else return b.title.localeCompare(a.title);
            }
          })
          .map((data: Values) => {
            return (
              <Col span={6} key={data.id} xs={24} sm={20} md={12} lg={8} xl={8}>
                <Card
                  title={data.title}
                  actions={[
                    <DateComponent
                      title="Created Date"
                      date={data.created_at}
                    />,
                    <DateComponent
                      title="Modify Date"
                      date={data.modified_at}
                    />,
                  ]}
                  extra={
                    <div className="card-action-button-container">
                      <Button
                        shape="circle"
                        className="delete-btn"
                        icon={<DeleteOutlined />}
                        onClick={onDeleteHandler(data.id)}
                      />
                      <Button
                        shape="circle"
                        onClick={() => onEditButtonHandler(data.id)}
                        icon={<EditOutlined />}
                      />
                    </div>
                  }
                >
                  {data.details}
                </Card>
              </Col>
            );
          })}
      </Row>
    </>
  );
};

export default NoteList;
