"use client"

import { InfoCard } from '@/app/components/InfoCard'
import { Search } from '@/app/components/Search'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { api } from '../../../../../services/api'
import { ProjectDetails } from '@/app/components/ProjectDetails'
import { useQuery } from 'react-query'
import { Sidebar } from '@/app/components/Sidebar'
import { Header } from '@/app/components/Header'
import { ContributorProps, ProjectProps } from '@/app/@types'

export default function Project() {
  const { id } = useParams()
  const [users, setUsers] = useState<ContributorProps[]>()
  const [search, setSearch] = useState("")
  const filteredContributors = users?.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))

  const { data: project, isLoading: isLoadingProjectDetails } = useQuery<ProjectProps>(
    ["projectDetails"],
    async () => {
      const res = await api.get(`/api/projects/${id}`)
      setUsers(res.data.project.users.map((user: any) => (user.user)))
      return res.data.project
    }
  )

  return (
    <>
      <Header />
      <div className='flex h-full max-sm:flex-col'>
        <Sidebar />
        <main className="flex items-start justify-center h-full
          w-full gap-12 mt-5 max-lg:flex-col max-lg:justify-start
          max-lg:items-center max-lg:overflow-auto"
        >
          {
            isLoadingProjectDetails ?
              <h2>Carregando...</h2>
              :
              <>
                {
                  project && users &&
                  <ProjectDetails
                    id={project.id}
                    members={users}
                    name={project.name}
                    techs={project.techs}
                    status={project.status}
                    deadline={project.deadline}
                    platforms={project.platforms}
                    startDate={project.startDate}
                    description={project.description}
                    contributorsId={project.contributorsId}
                    projectPicture={project.projectPicture}
                  />
                }
                <div className='flex flex-col items-center'>
                  <Search setSearch={setSearch} title="membro"/>
                  <h2 className='text-secondaryColor font-bold text-xl mb-3'>{filteredContributors?.length} Membro(s)</h2>
                  <div className='flex flex-col w-fit overflow-auto max-h-[32rem] gap-y-5 max-lg:mb-32'>
                    {
                      filteredContributors?.length ?
                        filteredContributors?.map(contributor =>
                          <InfoCard
                            id={contributor.id}
                            key={contributor.id}
                            name={contributor.name}
                            email={contributor.email}
                            roles={contributor.roles}
                            project={project}
                            mainRole={contributor.mainRole}
                            startDate={contributor.startDate}
                            birthDate={contributor.birthDate}
                            contractType={contributor.contractType}
                            profilePicture={contributor.profilePicture}
                          />)
                          : <h3>Nenhum usuário encontrado</h3>
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