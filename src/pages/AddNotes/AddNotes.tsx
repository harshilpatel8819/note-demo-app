import { Button, Card, Col, Form, Input, Row } from "antd";
import "./AddNotes.css";
import useAddNotes from "./useAddNotes";
import { AddNotesProps } from "./types";

const AddNotes: React.FC<AddNotesProps> = ({
  setNoteList,
  noteList,
  editIndex,
  cancelClick,
  setEditIndex,
  setIsModalOpen,
}) => {
  const { onFormSubmitHandler, form, onCancelHandler } = useAddNotes({
    noteList,
    setNoteList,
    editIndex,
    cancelClick,
    setEditIndex,
    setIsModalOpen,
  });

  return (
    <Row align="middle" justify="center">
      <Col span={24} xs={24} sm={24} md={24} lg={16} xl={editIndex ? 24 : 8}>
        <Card className={editIndex ? "form-edit-mode" : "form-card-container"}>
          <Form onFinish={onFormSubmitHandler} form={form}>
            <Form.Item name="title">
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item name="details">
              <Input.TextArea autoSize placeholder="Take a note" />
            </Form.Item>

            <div className="card-button-container">
              <Button className="cancel-button" onClick={onCancelHandler}>
                Clear
              </Button>
              <Button htmlType="submit" type="primary">
                {editIndex ? "Update" : "Add"}
              </Button>
            </div>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default AddNotes;
