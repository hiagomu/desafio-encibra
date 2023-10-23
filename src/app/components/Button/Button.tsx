import React from "react"
import {
    FaPlus as AddIcon,
} from "react-icons/fa"

export const Button = (
    { title, type, fn, icon, save, remove, disabled }:
    { title?: string, type: "submit" | "button", icon?: "add", save?: boolean, remove?: boolean, disabled?: boolean, fn?: () => void }
) => {

    const iconList = [
        {
            name: "add",
            icon: <AddIcon />
        }
    ]

    return (
        <button
            onClick={() => {
                if (fn) fn()
            }}
            disabled={disabled}
            type={type}
            className={`
                flex justify-center gap-2 items-center text-white py-2
                px-5 font-bold text-sm rounded-lg max-sm:text-sm
                ${disabled ?
                    "bg-secondaryColor"
                    : remove ?
                        "bg-buttonRemoveBg  hover:bg-buttonRemoveBgHover" :
                        save ?
                            "bg-buttonSaveBg hover:bg-buttonSaveBgHover"
                            : "bg-buttonBg  hover:bg-buttonBgHover"
                }
            `}
        >
            {icon && iconList.find(iconItem => iconItem.name === icon)?.icon}{title && title}
        </button>
    )
} 