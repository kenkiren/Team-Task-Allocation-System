import { useEffect   ,useState } from "react"
import './App.css'
import UserForm from "./UserForm"

function App() {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <>
    <h1>this is the data</h1>

    <div>
      {users.map((user) => (
        <div key={user._id}>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Age: {user.age}</p>
        </div>
      ))}
    </div>
    <UserForm />

    </>
  )
}

export default App
