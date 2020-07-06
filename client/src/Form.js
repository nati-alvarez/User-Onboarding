import React, {useState} from "react";

export default function Form(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });

    function updateFormData(e){
        const value = e.target.type === "checkbox"? e.target.checked: e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

    console.log(formData)

    return (
        <form>
            <label>
                Name: <input onChange={updateFormData} name="name" type="text"/>
            </label>
            <label>
                Email: <input onChange={updateFormData} name="email" type="email"/>
            </label>
            <label>
                Password: <input onChange={updateFormData} name="password" type="password"/>
            </label>
            <label>
                Do you accept the terms of service? <input onChange={updateFormData} name="terms" type="checkbox"/>
            </label>
            <button>Submit</button>
        </form>
    )
}