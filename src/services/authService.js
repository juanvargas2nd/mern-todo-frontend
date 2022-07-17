import axios from "axios";

const register = async (userData) => {
  const response = await axios.post(
    "http://localhost:8001/api/users/register",
    userData
  );
    console.log('services')
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async(user) => {
        const response = await axios.post("http://localhost:8001/api/users/login", user)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const authServices = {
  register,
  login
};

export default authServices;
