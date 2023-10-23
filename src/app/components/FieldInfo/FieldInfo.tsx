export const FieldInfo = ({
    title, value
}: { title: string, value: any }) => {
    return (
        <div className="flex flex-col w-fit mb-2">
            { title && <h3 className="text-labelText font-bold">{title}</h3> }
            <div className="w-[17rem] py-2 max-h-24 rounded-lg bg-inputBg px-2 flex items-center overflow-auto">
                {value}
            </div>
        </div>
    )
}