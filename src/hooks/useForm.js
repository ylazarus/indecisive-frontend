import { useState } from "react"
import { useEffectUpdate } from "./useEffectUpdate"

export const useForm = (initialState, cb = () => { }) => {

    const [fields, setFields] = useState(initialState)

    useEffectUpdate(() => {
        cb(fields)
    }, [fields])

    const handleChange = ({ target }) => {
        const field = target.name
        let value = target.type === 'number' ? (+target.value || '') : target.value
        if (value === "true" || value == "false") {
            value = JSON.parse(value);
        }
        setFields(prevFields => ({ ...prevFields, [field]: value }))
    }

    return [fields, handleChange, setFields]
}