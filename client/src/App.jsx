import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const App = () => {
  const api =process.env.REACT_APP_API_URL
console.log(api);

  const [data, setData] = useState([]);
  const Name = useRef();
  const Email = useRef();
  const Age = useRef();
  const Gender = useRef();
  const Address = useRef();
  const Createdat = useRef();
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

  const createUser = () => {
    const obj = {
      name: Name.current.value,
      email: Email.current.value,
      age: Age.current.value,
      gender: Gender.current.value,
      address: Address.current.value,
      createdAt: Createdat.current.value,
    };
    axios.post(`${api}`, obj).then((res) => console.log(res.data));
  };
  return (
    <div style={{ padding: "80px" }}>
      <h1>Hello All Users:</h1>
      <hr />
      <div style={{ display: "flex" }}>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Created At</th>
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
                  <td>{el.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Loading or No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <hr />
      <h1>Add User:</h1>
      <div>
        Name <input ref={Name} type="text" />
        Email <input ref={Email} type="text" />
        Age <input ref={Age} type="number" />
        Gender <input ref={Gender} type="text" />
        Address <input ref={Address} type="text" />
        Created At <input ref={Createdat} type="text" />
      </div>
      <button onClick={createUser}>Add</button>
    </div>
  );
};

export default App;


// npm install env-cmd --save-dev