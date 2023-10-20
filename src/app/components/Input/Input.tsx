import { Field } from "formik"
import { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    isLoading: boolean
    label: string
}

export const Input = ({
    isLoading,
    placeholder,
    label,
    type,
    id
}: InputProps) => {
    return (
        <div className="flex flex-col w-fit mb-2">
            <label htmlFor={id} className="text-labelText font-bold">{label}</label>
            <Field
                id={id}
                name={id}
                type={type}
                placeholder={placeholder}
                className="w-[17rem] h-10 rounded-lg bg-inputBg px-2"
                disabled={isLoading}
            />
        </div>
    )
}