import { Dispatch, SetStateAction } from "react"

export interface ContributorProps {
    id: number
    email: string
    name: string
    profilePicture: string
    birthDate: Date,
    mainRole: string,
    roles: string[],
    startDate: Date
    contractType: string
}

export interface ContributorLoginProps extends ContributorProps{
    password: string
}
export interface ContributorCardProps extends ContributorProps {
    project?: ProjectProps
    setUpdateMembers?: Dispatch<SetStateAction<boolean>>
    setMemberId?: (memberId: number) => void
    setIsMoveMemberModalOpen?: (isMoveMemberModalOpen: boolean) => void
}

export interface ContributorItemProps extends Pick<ContributorProps, "profilePicture" | "name" | "mainRole"> {
    addToProject: () => void
    isLoading: boolean
}

export interface ProjectProps {
    id: number
    name: string
    platforms: string[]
    projectPicture: string
    status: string,
    startDate: Date
    endDate: Date
    deadline: Date
    description: string,
    techs: string[],
    contributorsId: number[]
    users?: {
        userId: number
    }[]
}

export interface ProjectItemProps extends Pick<ProjectProps, "projectPicture" | "name" | "status"> {
    addToProject: () => void
    isLoading: boolean
}

export interface ProjectCardProps extends ProjectProps {
    setIsMoveProjectModalOpen?: (isMoveProjectModalOpen: boolean) => void
    setProjectId?: (projectId) => void
    memberId?: number
}

export interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
    id: string
    isLoading: boolean
    label: string
    options: {
        name: string | number
        value: string | number
    }[]
    hasDeleteOption?: boolean
}

export interface AddToProjectProps {
    projectId: number
    userId: number
}

export interface RemoveOfProjectProps {
    projectId: number
    userId: number
}