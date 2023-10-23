import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/client";

export async function POST(req: Request) {
    try {
        const {
            userId,
            projectId
        } = await req.json()

        const user = await prisma.user.findUnique({ where: { id: userId } });
        const project = await prisma.project.findUnique({ where: { id: projectId } });

        if (!user || !project) {
            return NextResponse.json({ message: "Usuário ou projeto não encontrado" }, { status: 404 });
        }

        await prisma.userProject.create({
            data: {
                projectId: projectId,
                userId: userId
            }
        });

        return NextResponse.json({ message: "Success" }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const {
            userId,
            projectId
        } = await req.json()

        const user = await prisma.user.findUnique({ where: { id: userId } });
        const project = await prisma.project.findUnique({ where: { id: projectId } });

        if (!user || !project) {
            return NextResponse.json({ message: "Usuário ou projeto não encontrado" }, { status: 404 });
        }

        await prisma.userProject.delete({
            where: {
                projectId_userId: {
                    projectId: projectId,
                    userId: userId
                }
            }
        });

        return NextResponse.json({ message: "Success" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}