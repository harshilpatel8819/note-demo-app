import { useState } from "react";
import "./App.css";
import AddNotes from "./pages/AddNotes/AddNotes";
import NoteList from "./pages/NoteList/NoteList";
import { Values } from "./types";
import { nanoid } from "nanoid";
import { Button, Col, Dropdown, Input, Row, Select } from "antd";

function App() {
  const [noteList, setNoteList] = useState<Values[]>([
    {
      id: nanoid(),
      title: "Title",
      details: "Detiass",
      isFilter: false,
      created_at: new Date(),
      modified_at: new Date(),
    },
  ]);
  const [searchValues, setSearchValues] = useState("");
  const [ascDec, setAscDec] = useState("asc");
  const [modifiedFilter, setModifiedFilter] = useState("created_at");

  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchValues(e.currentTarget.value);
  };

  const onFilterChangeHandler = (event: string) => {
    setModifiedFilter(event);
  };

  const onSortedHandler = (event: string) => {
    setAscDec(event);
  };

  return (
    <div className="container">
      <AddNotes noteList={noteList} setNoteList={setNoteList} />
      <Row justify="center">
        <Col span={24} xs={24} sm={24} md={24} lg={16} xl={8}>
          <div className="filter-container">
            <Input
              placeholder="Search by title and details"
              onChange={onChangeHandler}
            />
            <div>
              <Select
                defaultValue="created_at"
                style={{ width: 120 }}
                onChange={onFilterChangeHandler}
                className="created-select"
                options={[
                  { value: "created_at", label: "Created at" },
                  { value: "modified_at", label: "Modify at" },
                  { value: "title", label: "Title" },
                ]}
              />
              <Select
                defaultValue="asc"
                style={{ width: 120 }}
                onChange={onSortedHandler}
                options={[
                  { value: "asc", label: "asc" },
                  { value: "dec", label: "dec" },
                ]}
              />
            </div>
          </div>
        </Col>
      </Row>
      <div>
        <NoteList
          noteList={noteList}
          searchValues={searchValues}
          setNoteList={setNoteList}
          ascDec={ascDec}
          modifiedFilter={modifiedFilter}
        />
      </div>
    </div>
  );
}

export default App;
