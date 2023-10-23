"use client"

import { Search } from '@/app/components/Search'
import { ContributorDetails } from '@/app/components/ContributorDetails'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { ProjectCard } from '@/app/components/ProjectCard'
import { api } from '../../../../services/api'
import { ContributorProps, ProjectProps } from '@/app/@types'
import { useQuery } from 'react-query'
import { Header } from '@/app/components/Header'
import { Sidebar } from '@/app/components/Sidebar'

export default function Contributor() {
  const { id } = useParams()
  const [projects, setProjects] = useState<ProjectProps[]>()
  const [search, setSearch] = useState("")
  const filteredProjects = projects?.filter(project => project.name.toLowerCase().includes(search.toLowerCase()))

  const { data: user, isLoading: isLoadingUserDetails } = useQuery<ContributorProps>(
    ["userDetails"],
    async () => {
      const res = await api.get(`/api/users/${id}`)
      setProjects(res.data.user.projects.map((project: any) => (project.project)))
      return res.data.user
    }
  )

  return (
    <>
      <Header />
      <div className='flex h-full max-sm:flex-col'>
        <Sidebar />
        <main className="flex items-start justify-center h-full w-full
          gap-12 mt-5 max-lg:flex-col max-lg:justify-start max-lg:items-center max-lg:overflow-auto">
          {
            isLoadingUserDetails ?
            <h2>Carregando...</h2>
            :
            <>
              {
                user &&
                <ContributorDetails
                  id={user.id}
                  email={user.email}
                  name={user.name}
                  roles={user.roles}
                  mainRole={user.mainRole}
                  startDate={user.startDate}
                  birthDate={user.birthDate}
                  contractType={user.contractType}
                  profilePicture={user.profilePicture}
                />
              }
              <div className='flex flex-col items-center'>
                <Search setSearch={setSearch} title='projeto' />
                <h2 className='text-secondaryColor font-bold text-xl mb-3'>{filteredProjects?.length} Projeto(s)</h2>
                <div className='flex flex-col w-fit overflow-auto max-h-[31.5rem] gap-y-5 max-lg:mb-32'>
                  {
                    filteredProjects?.length ?
                      filteredProjects?.map(project =>
                        <ProjectCard
                          id={project.id}
                          key={project.id}
                          name={project.name}
                          techs={project.techs}
                          status={project.status}
                          memberId={user?.id}
                          deadline={project.deadline}
                          platforms={project.platforms}
                          startDate={project.startDate}
                          description={project.description}
                          contributorsId={project.contributorsId}
                          projectPicture={project.projectPicture}
                        />
                      )
                    : <h2>Nenhum projeto encontrado</h2>
                  }
                </div>
              </div>
            </>
          }

        </main>
      </div>
    </>
  )
}