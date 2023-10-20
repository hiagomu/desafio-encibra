export interface ContributorProps {
    id: number
    name: string
    profile_picture: string
    age: number,
    main_role: string,
    roles: string[],
    start_date: Date
    contract_type: "CLT" | "PJ"
    is_admin: boolean
    alocated_projects: number[]
}

export interface ContributorCardProps extends ContributorProps {
    setMemberId: (memberId: number) => void
    setIsMoveMemberModalOpen: (isMoveMemberModalOpen: boolean) => void
}

export interface ProjectProps {
    id: number
    name: string
    platforms: string[]
    project_picture: string
    status: string,
    start_date: Date
    end_date: Date
    deadline: Date
    description: string,
    techs: string[],
    contributorsId: number[]
}

export interface ProjectItemProps extends Pick<ProjectProps, "project_picture" | "name" | "status"> {
    addToProject: () => void
}

export interface ProjectCardProps extends ProjectProps {
    setIsMoveMemberModalOpen: (isMoveMemberModalOpen: boolean) => void
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