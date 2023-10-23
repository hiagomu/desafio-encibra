import { FaSearch as SearchIcon } from "react-icons/fa"

export const Search = ({ setSearch, title, large }: { setSearch: (search: string) => void, title: "projeto" | "membro", large?: boolean}) => {
    return (
        <div
            className={`${large ? "w-[48rem] max-lg:w-[32rem] max-md:w-[20rem]"
            : "w-[25rem] max-lg:w-[22rem] max-md:w-[16rem]"} p-4 mb-2 flex bg-white justify-center items-center shadow-primary rounded-lg max-md:p-3`}
        >
            <div className="w-full h-10 max-md:h-8 rounded-lg bg-inputBg px-2 flex justify-center items-center">
                <label
                    htmlFor="search"
                    className="bg-transparent w-[10%] h-full flex justify-center items-center"
                >
                    <SearchIcon className="text-secondaryColor w-5 h-5 max-md:h-4 max-md:w-4" />
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder={`Digite o nome do ${title}...`}
                    className="bg-transparent border-none outline-none w-[90%] h-full max-md:text-sm"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    )
}