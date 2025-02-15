import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [editingUser, setEditingUser] = useState(null); // Track the user being edited
  const api = "https://testmernapp.onrender.com/users";
  const Name = useRef();
  const Email = useRef();
  const Age = useRef();
  const Gender = useRef();
  const Address = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${api}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`${api}/${userId}`);
      console.log("User deleted:", response.data);
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  };

  const deleteHandler = (id) => {
    if (id && window.confirm("Are you sure?")) {
      deleteUser(id);
    }
  };

  const createUser = () => {
    const obj = {
      name: Name.current.value,
      email: Email.current.value,
      age: Age.current.value,
      gender: Gender.current.value,
      address: Address.current.value,
    };
    axios.post(`${api}`, obj).then((res) => console.log(res.data));
  };

  const editUser = (user) => {
    setEditingUser(user); // Set the user to be edited
    Name.current.value = user.name;
    Email.current.value = user.email;
    Age.current.value = user.age;
    Gender.current.value = user.gender;
    Address.current.value = user.address;
  };

  const updateUser = async () => {
    const updatedUser = {
      name: Name.current.value,
      email: Email.current.value,
      age: Age.current.value,
      gender: Gender.current.value,
      address: Address.current.value,
    };

    try {
      const response = await axios.put(
        `${api}/${editingUser._id}`,
        updatedUser
      );
      console.log("User updated:", response.data);
      setEditingUser(null); // Clear the editing state
      Name.current.value = "";
      Email.current.value = "";
      Age.current.value = "";
      Gender.current.value = "";
      Address.current.value = "";
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Hello All Users:</h1>
      <hr />
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((el, pos) => (
                <tr key={pos}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.age}</td>
                  <td>{el.gender}</td>
                  <td>{el.address}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editUser(el)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteHandler(el._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading or No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <hr />
      <h1 className="text-center mb-4">
        {editingUser ? "Edit User" : "Add User"}
      </h1>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input ref={Name} type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input ref={Email} type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Age</label>
        <input ref={Age} type="number" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Gender</label>

        <select ref={Gender}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input ref={Address} type="text" className="form-control" />
      </div>
      {editingUser ? (
        <button className="btn btn-success" onClick={updateUser}>
          Update User
        </button>
      ) : (
        <button className="btn btn-primary" onClick={createUser}>
          Add User
        </button>
      )}
    </div>
  );
};

export default App;
