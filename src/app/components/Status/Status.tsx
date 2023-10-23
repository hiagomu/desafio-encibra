export const Status = ({ status }: { status: string}) => {
    return (
        <span
            className={`font-semibold
                ${status === "in progress" ?
                    "text-inProgressColor"
                        : status === "waiting" ?
                            "text-waitingColor" : "text-finishedColor"
                }`
            }
        >
            {
                status === "in progress" ?
                    "Em andamento"
                        : status === "waiting" ? "Em espera"
                            : "Finalizado"
            }
        </span>
    )
}