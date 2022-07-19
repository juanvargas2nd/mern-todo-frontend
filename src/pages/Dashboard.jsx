import { useState, useEffect } from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getTask, openModal } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import Task from "../components/Task";
import CompletedTasks from "../components/CompletedTasks";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [completed, setCompleted] = useState([])
  const [pending, setPending] = useState([])
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, isLoading, isSuccess, isError, message, toggleModal } =
    useSelector((state) => state.task);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    
    if (!user) {
      return navigate("/login");
    }
    
    
    setCompleted(tasks.filter(task =>  task.isCompleted === true ? setCompleted(completed.push(task)) : task))
    setPending(tasks.filter(task => task.isCompleted === false ? setPending(pending.push(task)) : task))

    dispatch(getTask());

  }, [user, navigate, isSuccess, isError, message, dispatch, setCompleted]);

  return (
    <>
      <TaskForm show={toggleModal} />

      <Card style={{ width: "70rem" }} className="mb-2 mx-auto my-4">
        <div className="mx-2">
          <Button variant="primary" onClick={() => dispatch(openModal())}>
            Add Task
          </Button>
        </div>
        <Container className="d-flex justify-content-center">
          <Card style={{ width: "30rem" }} className="mb-2 mx-auto my-2">
            <Card.Header>
              <h3>Pending Tasks</h3>
            </Card.Header>
            {pending.length > 0 ? pending.map((task) => (
              <Task key={task._id} task={task} />
            )) : <h3>No Pending Tasks</h3>}
          </Card>
          <Card style={{ width: "30rem" }} className="mb-2 mx-auto my-2">
            <Card.Header>
              <h3>Completed Tasks</h3>
            </Card.Header>
            {completed.length > 0 ? completed.map((task) => (
              <CompletedTasks key={task._id} task={task} />
            )) : <h3>No Completed Tasks</h3>}

          </Card>
        </Container>
      </Card>
    </>
  );
};

export default Dashboard;
