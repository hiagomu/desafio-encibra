"use client"

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import useCheckAuth from "../hooks/useCheckAuth";

export default function PrivateLayout({ children }: { children: ReactNode}) {
    if (!useCheckAuth()) redirect("/")

    return <>{children}</>
} 