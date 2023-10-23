import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET(req: Request, res: Response) {
    try {
        const id = Number(req.url.split("users/")[1])

        const user = await prisma.user.findUnique({
            where: {
                id: id
            },
            include: {
                projects: {
                    select: {
                        project: true
                    }
                }
            }
        });
        
        return NextResponse.json({ user }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const id = Number(req.url.split("users/")[1])

        await prisma.user.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}