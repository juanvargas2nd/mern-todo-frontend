import { Card, Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postTask, closeModal } from "../features/tasks/taskSlice";

const TaskForm = ({show}) => {
  const [formDate, setFormData] = useState({
    title: "",
    dueDate: "",
  });

  const { title, dueDate } = formDate;

  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      title,
      dueDate,
      isCompleted: false,
    };

    dispatch(postTask(taskData));

    setFormData({
      title: "",
      dueDate: "",
      isCompleted: false,
    });

    dispatch(closeModal())
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => dispatch(closeModal())}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card className="mb-2">
            <Card.Body>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Add title</Form.Label>
                  <Form.Control
                    required={true}
                    type="text"
                    placeholder="Add task"
                    name="title"
                    value={title}
                    onChange={onChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Add Deadline</Form.Label>
                  <Form.Control
                    required={true}
                    type="date"
                    placeholder="date"
                    name="dueDate"
                    value={dueDate}
                    onChange={onChange}
                  />
                </Form.Group>
                <div className="d-grid">
                  <Button
                    variant="success"
                    type="submit"
                  >
                    Create Task
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => dispatch(closeModal())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TaskForm;
