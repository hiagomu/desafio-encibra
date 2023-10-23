import { prisma } from "../../../../prisma/client";
import { NextResponse } from "next/server";
import { hash } from "bcrypt"
import { ContributorLoginProps, ContributorProps } from "@/app/@types";

export async function POST(req: Request) {
    try {
        const {
            birthDate,
            name,
            profilePicture,
            mainRole,
            roles,
            startDate,
            contractType,
            email,
            password,
        }: ContributorLoginProps = await req.json()

        const hashedPassword = await hash(password, 10)

        await prisma.user.create({
            data: {
                password: hashedPassword,
                birthDate: new Date(birthDate),
                email: email,
                name: name,
                profilePicture: profilePicture,
                mainRole: mainRole,
                roles: roles,
                startDate: new Date(startDate),
                contractType: contractType,
            }
        })

        return NextResponse.json({ message: "Success" }, { status: 201 });

    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const {
            id,
            birthDate,
            name,
            profilePicture,
            mainRole,
            roles,
            startDate,
            contractType,
            email
        }: ContributorProps = await req.json()

        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                birthDate: new Date(birthDate),
                email: email,
                name: name,
                profilePicture: profilePicture,
                mainRole: mainRole,
                roles: roles,
                startDate: new Date(startDate),
                contractType: contractType
            },
        })

        return NextResponse.json({ message: "Success" }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json({ users }, { status: 200 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}