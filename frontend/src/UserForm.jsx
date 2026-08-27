import React from 'react'
import { useState } from 'react'


function UserForm( {onAddUser})  {
    const[FormData, setFormData] = useState({
        name: "",
        age: "",
        email: ""
    });


    const handleChange = (e) => {
        // console.log(FormData);
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
            // console.log(data);
            onAddUser(data);
            setFormData({ name: "", age: "", email: "" }); // Clear the form after submission

        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
        <form action="">
            <input name="name" type="text" placeholder="Name" onChange={handleChange} />
            <input name="age" type="number" placeholder="Age" onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" onChange={handleChange} />
            <button type="submit" onClick={handleSubmit}   >Add User</button>   
        </form>

        </>
    )
}

export default UserForm;