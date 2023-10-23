"use client"

import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function PrivateLayout({ children }: { children: ReactNode}) {
    if (!isAuthenticated()) redirect("/")

    return <>{children}</>
} 