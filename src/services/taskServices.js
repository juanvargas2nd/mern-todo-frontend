import axios from 'axios';

const getTasks = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get("http://juan-todo-app.herokuapp.com/api/tasks/", config)
    return response.data
}

const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post("http://juan-todo-app.herokuapp.com/api/tasks/", taskData, config)

    return response.data
}

const deleteTask = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`http://juan-todo-app.herokuapp.com/api/tasks/${id}`, config)

    return response.data
}

const updateTask = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios({
        url: `http://juan-todo-app.herokuapp.com/api/tasks/${id}`,
        headers: config.headers,
        method: 'put',
    });
    
    return response.data
}

const taskServices = {
    getTasks,
    createTask,
    deleteTask,
    updateTask
}

export default taskServices