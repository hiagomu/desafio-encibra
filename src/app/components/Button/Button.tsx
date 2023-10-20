import React from "react"
import {
    FaPlus as AddIcon,
} from "react-icons/fa"

export const Button = (
    { title, type, fn, icon, save, remove }:
    { title?: string, type: "submit" | "button", icon?: "add", save?: boolean, remove?: boolean,  fn: () => void }
) => {

    const iconList = [
        {
            name: "add",
            icon: <AddIcon />
        }
    ]

    return (
        <button
            onClick={() => fn()}
            type={type}
            className={`
                flex justify-center gap-2 items-center text-white py-2 px-5 font-bold text-sm rounded-lg
                ${save ?
                    "bg-buttonSaveBg hover:bg-buttonSaveBgHover"
                    : remove ?
                        "bg-buttonRemoveBg  hover:bg-buttonRemoveBgHover" : "bg-buttonBg  hover:bg-buttonBgHover"}
            `}
        >
            {icon && iconList.find(iconItem => iconItem.name === icon)?.icon}{title && title}
        </button>
    )
} 