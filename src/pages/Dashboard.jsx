import {useEffect } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getTask, openModal } from "../features/tasks/taskSlice";
import { useNavigate } from "react-router-dom";
import Task from "../components/Task";
import CompletedTasks from "../components/CompletedTasks";
import TaskForm from "../components/TaskForm";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tasks, isSuccess, isError, message, toggleModal }=useSelector((state) => state.task);

  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }
    
    dispatch(getTask());

  }, [user, navigate, isSuccess, isError, message, dispatch, ]);

  return (
    <>
      <Container >
        <Card className="mb-2 mx-auto my-4 p-4">
          <Row className="justify-content-center">
            <div className="d-flex justify-content-end">
              <Button variant="success" onClick={() => dispatch(openModal())}>
                Add Task
              </Button>
            </div>
            <Col className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-10">
              <Card bg="light" text="dark" className="mb-2 mx-auto my-2">
                <Card.Header>
                  <h3>Pending Tasks</h3>
                </Card.Header>
                {tasks.length > 0 ? (tasks.filter(task => {
                  return !task.isCompleted
                }).map((task) => (<Task key={task._id} task={task} />))
                ) : (
                  <h3>No Pending Tasks</h3>
                )}
              </Card>
            </Col>
            <Col className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-10">
              <Card bg="light" text="dark" className="mb-2 mx-auto my-2">
                <Card.Header>
                  <h3>Completed Tasks</h3>
                </Card.Header>
                {tasks.length > 0 ? (tasks.filter(task => {
                  return task.isCompleted
                }).map((task) => (<CompletedTasks key={task._id} task={task} />))
                ) : (
                  <h3>No Pending Tasks</h3>
                )}
              </Card>
            </Col>
          </Row>
        </Card>
      </Container>
      <TaskForm show={toggleModal} />
    </>
  );
};

export default Dashboard;
