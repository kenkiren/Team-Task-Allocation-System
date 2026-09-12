import { useEffect   ,useState } from "react"
// import "./styles/global.css"
import UserForm from "./UserForm"
// import Navbar from "./components/Navbar"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import Login from "./components/Login"
import ManagerDashboard from "./components/ManagerDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import Register from "./components/Register";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [showRegister, setShowRegister] = useState(false);

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

function handleLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setLoggedInUser(null);
}



  return (
    <>
  {!loggedInUser ? (
  showRegister ? (
    <Register onRegistered={() => setShowRegister(false)} />
  ) : (
    <Login onLogin={setLoggedInUser}
    onRegister={() => setShowRegister(true)} />
  )
) : loggedInUser.role === "manager" ? (
  <ManagerDashboard />
) : (
  <EmployeeDashboard />
)}
    {/* <Navbar/> */}
    {/* < TaskForm/> */}
    {/* <TaskList/> */}
    {/* <h4>this is the data</h4> */}

    

    </>
  )
}

export default App
