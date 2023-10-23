import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/client";

export async function GET(req: Request, res: Response) {
    try {
        const id = Number(req.url.split("projects/")[1])

        const project = await prisma.project.findUnique({
            where: {
                id: id
            },
            include: {
                users: {
                    select: {
                        user: true
                    }
                }
            }
        });
        
        return NextResponse.json({ project }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const id = Number(req.url.split("projects/")[1])

        await prisma.project.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}