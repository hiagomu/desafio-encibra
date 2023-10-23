import { Dropdown } from "../Dropdown"

export const Header = () => {
    return (
        <header className="h-20 w-[100vw] flex items-center justify-between bg-buttonBg">
            <div className="h-full w-[14rem] bg-buttonBg flex justify-center items-center text-white font-bold text-3xl">
                ColPainel
            </div>
            <Dropdown />
        </header>
    )
}