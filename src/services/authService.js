import axios from "axios";

const register = async (userData) => {
  const response = await axios.post(
    "http://juan-todo-app.herokuapp.com/api/tasks/users/register",
    userData
  );
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async(user) => {
        const response = await axios.post("http://juan-todo-app.herokuapp.com/api/tasks/api/users/login", user)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = async() => {
    return localStorage.removeItem('user')
}

const authServices = {
  register,
  login,
  logout
};

export default authServices;
