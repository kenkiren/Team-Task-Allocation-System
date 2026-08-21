import React from 'react'
import { useState } from 'react'


function UserForm() {
    const[FormData, setFormData] = useState({
        name: "",
        age: "",
        email: ""
    });


    const handleChange = (e) => {
        setFormData({
            ...FormData, [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {  
            const response =await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(FormData)
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
        <form action="">
            <input type="text" placeholder="Name" onChange={handleChange} />
            <input type="number" placeholder="Age" onChange={handleChange} />
            <input type="email" placeholder="Email" onChange={handleChange} />
            <button type="submit" onClick={handleSubmit}   >Add User</button>
        </form>

        </>
    )
}

export default UserForm;