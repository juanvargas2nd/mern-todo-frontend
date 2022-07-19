import axios from 'axios';

const getTasks = async(token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get("http://localhost:8000/api/tasks/", config)
    return response.data
}

const createTask = async (taskData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post("http://localhost:8000/api/tasks/", taskData, config)

    return response.data
}

const deleteTask = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`http://localhost:8000/api/tasks/${id}`, config)

    return response.data
}

const updateTask = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios({
        url: `http://localhost:8000/api/tasks/${id}`,
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