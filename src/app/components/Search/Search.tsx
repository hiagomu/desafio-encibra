import { FaSearch as SearchIcon } from "react-icons/fa"

export const Search = ({ setSearch, title }: { setSearch: (search: string) => void, title: "projeto" | "membro" }) => {
    return (
        <div className="w-[25rem] h-20 mb-2 flex bg-white justify-center items-center shadow-primary rounded-lg">
            <div className="w-[22.5rem] h-10 rounded-lg bg-inputBg px-2 flex justify-center items-center">
                <label
                    htmlFor="search"
                    className="bg-transparent w-[10%] h-full flex justify-center items-center"
                >
                    <SearchIcon className="text-secondaryColor w-5 h-5" />
                </label>
                <input
                    id="search"
                    type="text"
                    placeholder={`Digite o nome do ${title}...`}
                    className="bg-transparent border-none outline-none w-[90%] h-full"
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>
    )
}