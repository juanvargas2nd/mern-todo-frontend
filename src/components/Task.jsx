import { useEffect } from "react";
import { getTask, deleteTasks, updateTask } from "../features/tasks/taskSlice";
import { Card } from "react-bootstrap";
import { FaCheck, FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

const Task = ({ task }) => {

  const dispatch = useDispatch();

  const cursor = {
    cursor: 'pointer',
  }

  return (
    <>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between">
          {task.title}
          <span>
            <FaCheck style={cursor} className="mx-3" onClick={() => dispatch(updateTask(task._id))} />
            <FaTrashAlt style={cursor} onClick={() => dispatch(deleteTasks(task._id))} />
          </span>
        </Card.Title>
        <Card.Text> Deadline: {task.dueDate}</Card.Text>
      </Card.Body>
    </>
  );
};

export default Task;
