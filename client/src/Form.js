import React, {useState, useEffect} from "react";
import * as Yup from "yup";

export default function Form(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [errors, setErrors] = useState({});

    const formSchema = Yup.object().shape({
        name: Yup
            .string()
            .trim()
            .required("You must enter a name")
            .matches(/^[a-zA-Z]+$/, "Name cannot contain numbers"),
        email: Yup
            .string()
            .trim()
            .email("You must enter a valid email address")
            .required("You must enter an email address"),
        password: Yup
            .string()
            .trim()
            .required("You must enter a password")
            .min(6, "Password must be 6 characters or longer"),
        terms: Yup
            .boolean()
            .oneOf([true], "You must accept the terms of service")
    });

    useEffect(()=>{
        formSchema.isValid(formData).then(valid=>{
            setButtonDisabled(!valid);
        })
    }, [formData])

    function updateFormData(e){
        e.persist();
        const value = e.target.type === "checkbox"? e.target.checked: e.target.value;

        Yup.reach(formSchema, e.target.name)
        .validate(value)
        .then(valid=>{
            setErrors({
                ...errors,
                [e.target.name]: ""
            });
        })
        .catch(error=>{
            setErrors({
                ...errors,
                [e.target.name]: error.message
            })
        })
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    }

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
            <button disabled={buttonDisabled}>Submit</button>
            <div className="error">
                {errors.name && <p>{errors.name}</p>}
                {errors.email && <p>{errors.email}</p>}
                {errors.password && <p>{errors.password}</p>}
                {errors.terms && <p>{errors.terms}</p>}
            </div>
        </form>
    )
}