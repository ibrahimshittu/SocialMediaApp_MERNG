import { useState } from "react";

export const useForm = (initialState, callback = {}) => { 
    const [values, setValues] = useState(initialState)

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      callback()
        
    }

    return  {
        onChange, handleSubmit, values
    }

}