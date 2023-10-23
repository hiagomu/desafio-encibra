"use client"

import { useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { api } from '../../../services/api'
import { AddToProjectProps, ContributorProps, ProjectProps } from '../@types'
import { Button } from '../components/Button'
import { Search } from '../components/Search'
import { NewProjectModal } from '../components/NewProjectModal'
import { MoveProjectModal } from '../components/MoveProjectModal'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useSession } from 'next-auth/react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'

export default function Projects() {
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false)
  const [isMoveProjectModalOpen, setIsMoveProjectModalOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [projectId, setProjectId] = useState<number>()
  const queryClient = useQueryClient()
  const session = useSession()
  const isAdmin = session.data?.user.user.roles.includes("gestor")

  const { data: users } = useQuery<ContributorProps[]>(
    ["usersProjects"],
    async () => {
      const res = await api.get("/api/users")
      return res.data.users
    },
    {
      onError: (err) => console.log(err)
    }
  )

  const { data: projects, isLoading: isLoadingProjects } = useQuery<ProjectProps[]>(
    ["projectsProjects"],
    async () => {
      const res = await api.get("/api/projects")
      return res.data.projects
    },
    {
      onError: (err) => console.log(err)
    }
  )

  const { mutate: addToProject, isLoading } = useMutation(
    async (props: AddToProjectProps) => await api.post("/api/members", {
      projectId: props.projectId,
      userId: props.userId
    }),
    {
      onSuccess: () => queryClient.invalidateQueries("projectsProjects"),
      onError: (err) => console.log(err)
    }
  )

  const filteredProjects = projects?.filter(project => project.name.toLowerCase().includes(search.toLowerCase()))
  const selectedProject = projects?.find(project => project.id === projectId)
  
  return (
    <>
      <Header />
      <div className='flex h-full max-sm:flex-col'>
        <Sidebar />
        <main className="flex flex-col items-center justify-start h-full w-full pt-3">
          {
            users &&
            <NewProjectModal
              members={users}
              isOpen={isNewProjectModalOpen}
              onClose={() => setIsNewProjectModalOpen(false)}
            />
          }
          {
            users && projects && selectedProject &&
            <MoveProjectModal
              isLoading={isLoading}
              project={selectedProject}
              addToProject={addToProject}
              members={users}
              isOpen={isMoveProjectModalOpen}
              onClose={() => setIsMoveProjectModalOpen(false)}
            />
          }
          <Search
            setSearch={setSearch}
            title='projeto'
            large
          />
          {
            isAdmin &&
            <Button
              icon='add'
              type='button'
              title='Novo projeto'
              fn={() => setIsNewProjectModalOpen(true)}
            />
          }
          <div className='flex justify-center items-start w-full flex-wrap gap-x-16 gap-y-3 mt-3 overflow-auto max-h-[65%] pb-4'>
            {
              filteredProjects?.length ?
                filteredProjects.map(project =>
                  <ProjectCard
                    id={project.id}
                    key={project.id}
                    name={project.name}
                    techs={project.techs}
                    status={project.status}
                    deadline={project.deadline}
                    platforms={project.platforms}
                    startDate={project.startDate}
                    description={project.description}
                    contributorsId={project.contributorsId}
                    projectPicture={project.projectPicture}
                    setProjectId={setProjectId}
                    setIsMoveProjectModalOpen={setIsMoveProjectModalOpen}
                  />
                )
                : isLoadingProjects ?
                <h2>Carregando...</h2>
                : <h2>Nenhum projeto encontrado</h2>
            }
          </div>
        </main>
      </div>
    </>
  )
}