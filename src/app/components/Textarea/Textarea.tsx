import { Field } from "formik"
import { InputHTMLAttributes } from "react"

interface TextareaProps extends InputHTMLAttributes<HTMLInputElement> {
    isLoading: boolean
    label: string
}

export const Textarea = ({
    isLoading,
    placeholder,
    label,
    id
}: TextareaProps) => {
    return (
        <div className="flex flex-col w-fit mb-2">
            <label htmlFor={id} className="text-labelText font-bold max-sm:text-sm">{label}</label>
            <Field
                id={id}
                name={id}
                placeholder={placeholder}
                as="textarea"
                className="w-[17rem] h-20 rounded-lg bg-inputBg px-2 max-sm:w-[14rem] max-sm:text-sm"
                disabled={isLoading}
            />
        </div>
    )
}