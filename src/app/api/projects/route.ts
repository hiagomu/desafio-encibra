import { ProjectProps } from "@/app/@types"
import { prisma } from "../../../../prisma/client"
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const {
            name,
            techs,
            status,
            deadline,
            platforms,
            startDate,
            description,
            projectPicture,
            users
        }: ProjectProps = await req.json()

        await prisma.project.create({
            data: {
                name: name,
                techs: techs,
                status: status,
                deadline: new Date(deadline),
                platforms: platforms,
                startDate: new Date(startDate),
                description: description,
                projectPicture: projectPicture,
                users: {
                    create: users?.map(user => user)
                },
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function GET() {
    try {
        const projects = await prisma.project.findMany({
            include: {
                users: {
                    select: {
                        userId: true
                    }
                }
            }
        });
        return NextResponse.json({ message: "Success", projects }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const {
            id,
            name,
            techs,
            status,
            deadline,
            platforms,
            startDate,
            description,
            projectPicture,
        }: ProjectProps = await req.json()

        await prisma.project.update({
            where: {
                id: id
            },
            data: {
                name: name,
                techs: techs,
                status: status,
                deadline: new Date(deadline),
                platforms: platforms,
                startDate: new Date(startDate),
                description: description,
                projectPicture: projectPicture
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 201 });
        
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}