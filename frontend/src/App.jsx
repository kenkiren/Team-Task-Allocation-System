import { useEffect   ,useState } from "react"
import './App.css'
import UserForm from "./UserForm"
// import Navbar from "./components/Navbar"
import TaskForm from "./TaskForm"
import TaskList from "./components/TaskList"

function App() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    age: ""
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);



  const addUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  function deleteUser(id) {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data)=> {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      })
      .catch((error) => console.error("Error deleting user:", error));
  }

  function updatedUser(id){
    const userToUpdate= users.find((user) => user._id === id);
    setEditingId(id);
    setEditData({
      name: userToUpdate.name,
      email: userToUpdate.email,
      age: userToUpdate.age
    });

  }
  async function saveUser() {
    console.log("Saving user with ID:", editingId);
  try {
    const response = await fetch(
      `http://localhost:5000/api/users/${editingId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editData)
      }
    );

    const updatedUser = await response.json();

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === editingId ? updatedUser : user
      )
    );

    setEditingId(null);
  } catch (error) {
    console.error(error);
  }
}


  return (
    <>
    {/* <Navbar/> */}
    < TaskForm/>
    <TaskList/>
    <h4>this is the data</h4>

    <div>
      {/* adding a delete button */}
      {users.map((user) => (
        <div key={user._id}>
          <p>Name: {user.name}</p>
          
          <p>Email: {user.email}</p> 
          
          <p>Age: {user.age}</p>
          <button  onClick={() => deleteUser(user._id)} >Delete</button>
          <button onClick={() => updatedUser(user._id)}  >Update</button>
        </div>
      ))}
    </div>

      {/* {editingId && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            name="name"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={editData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="number"
            name="age"
            value={editData.age}
            onChange={(e) => setEditData({ ...editData, age: e.target.value })}
            placeholder="Age"
          />
          <button onClick={() => {
              // Handle the update logic here (e.g., send a PUT request to the backend)
              // After updating, reset the editing state
              saveUser();
            }} >
            Save Changes
          </button>
        </div>
      )} */}

      {/* <h2>Add New User</h2> */}
    {/* <UserForm onAddUser={addUser} /> */}

      


    </>
  )
}

export default App
