import { SelectProps } from "@/app/@types"
import { ErrorMessage, Field } from "formik"

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
                !hasDeleteOption && <label htmlFor="start" className="text-labelText font-bold max-sm:text-sm">{label}</label>
            }
            <Field
                id={id}
                name={id}
                as="select"
                className="w-[17rem] h-10 rounded-lg bg-inputBg px-2 max-sm:w-[14rem] max-sm:text-sm"
                disabled={isLoading}
            >
                {options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
            </Field>
            {
                id &&
                <p className="text-buttonRemoveBg text-sm font-semibold mt-0.5">
                    <ErrorMessage name={id} />
                </p>
            }
        </div>
    )
}