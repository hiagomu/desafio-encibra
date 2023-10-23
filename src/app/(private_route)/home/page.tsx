"use client"

import { useState } from 'react'
import { InfoCard } from '@/app/components/InfoCard'
import { api } from '../../../../services/api'
import { MoveMemberModal } from '@/app/components/MoveMemberModal'
import { Search } from '@/app/components/Search'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Header } from '@/app/components/Header'
import { Sidebar } from '@/app/components/Sidebar'
import { AddToProjectProps, ContributorProps, ProjectProps } from '@/app/@types'

export default function Home() {
  const [isMoveMemberModalOpen, setIsMoveMemberModalOpen] = useState(false)
  const [memberId, setMemberId] = useState<number>()
  const queryClient = useQueryClient()
  const [search, setSearch] = useState("")

  const { data: users, isLoading: isLoadingUsers } = useQuery<ContributorProps[]>(
    ["usersHome"],
    async () => {
      const res = await api.get("/api/users")
      return res.data.users
    },
    {
      onError: (err) => console.log(err)
    }
  )

  const { data: projects } = useQuery<ProjectProps[]>(
    ["projectsHome"],
    async () => {
      const res = await api.get("/api/projects")
      return res.data.projects
    },
    {
      onError: (err) => console.log(err)
    }
  )

  const { mutate: addToProject, isLoading: isAddingToProject } = useMutation(
    async (props: AddToProjectProps) => {
      await api.post("/api/members", {
        projectId: props.projectId,
        userId: props.userId
      })
    },
    {
      onSuccess: () => queryClient.invalidateQueries("projectsHome"),
      onError: (err) => console.log(err)
    }
  )

  const filteredUsers = users?.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Header />
      <div className='flex h-full max-sm:flex-col'>
        <Sidebar />
        <main className="flex flex-col items-center justify-start h-full w-full pt-3">
          {
            projects && memberId &&
            <MoveMemberModal
              isLoading={isAddingToProject}
              memberId={memberId}
              addToProject={addToProject}
              projects={projects}
              isOpen={isMoveMemberModalOpen}
              onClose={() => setIsMoveMemberModalOpen(false)}
            />
          }
          <Search
            setSearch={setSearch}
            title='membro'
            large
          />
          <div className='flex justify-center items-start w-full flex-wrap gap-x-14 gap-y-3 mt-3 overflow-auto max-h-[75%] pb-4'>
            {
              filteredUsers?.length ?
                filteredUsers.map(user =>
                  <InfoCard
                    id={user.id}
                    key={user.id}
                    name={user.name}
                    email={user.email}
                    roles={user.roles}
                    birthDate={user.birthDate}
                    mainRole={user.mainRole}
                    startDate={user.startDate}
                    contractType={user.contractType}
                    profilePicture={user.profilePicture}
                    setIsMoveMemberModalOpen={setIsMoveMemberModalOpen}
                    setMemberId={setMemberId}
                  />
                )
                : isLoadingUsers ?
                <h2>Carregando...</h2>
                : <h2>Nenhum usuário encontrado</h2>
            }
          </div>
        </main>
      </div>
    </>
  )
}