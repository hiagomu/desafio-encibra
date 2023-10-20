import { SelectProps } from "@/app/@types"
import { Field } from "formik"

export const Select = ({
    id,
    label,
    isLoading,
    options,
    hasDeleteOption
}: SelectProps) => {
    return (
        <div className="flex flex-col w-fit mb-2">
            {
                !hasDeleteOption && <label htmlFor="start" className="text-labelText font-bold">{label}</label>
            }
            <Field
                id={id}
                name={id}
                as="select"
                className="w-[17rem] h-10 rounded-lg bg-inputBg px-2"
                disabled={isLoading}
            >
                {options.map(option => <option value={option.value}>{option.name}</option>)}
            </Field>
        </div>
    )
}