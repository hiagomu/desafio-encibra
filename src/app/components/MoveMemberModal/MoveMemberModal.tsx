import { AddToProjectProps, ProjectProps } from '@/app/@types';
import Modal from 'react-modal'
import { ProjectListItem } from '../ProjectListItem';
import { Search } from '../Search';
import { useState } from 'react';
import { FaTimes as ExitIcon } from "react-icons/fa"

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: number
  addToProject: (props: AddToProjectProps) => void
  projects: ProjectProps[]
  isLoading: boolean
}

export const MoveMemberModal = ({ isOpen, onClose, projects, addToProject, memberId, isLoading }: DialogProps) => {
    const [search, setSearch] = useState("")
    const filteredProjects = projects?.filter(project => project.name.toLowerCase().includes(search.toLowerCase()))
    const filteredProjectsById = filteredProjects.filter(project => !project.users?.some(user => user.userId === memberId))

    return (
        <Modal
            isOpen={isOpen}
            ariaHideApp={false}
            onRequestClose={(e: React.MouseEvent<Element, MouseEvent>) => {
                e.stopPropagation()
                onClose()
            }}
            contentLabel="Modal"
            style={{
                overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    border: 'none',
                    background: 'none',
                    maxHeight: '576px',
                    minHeight: '480px',
                    margin: '0 auto',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }
            }}
        >
            <div
                className='flex flex-col w-[26.5rem] max-h-[36rem] min-h-[30rem] items-center
                    justify-start py-5 px-3 bg-white rounded-xl absolute
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto
                    max-md:w-[20rem] max-sm:w-[18rem]'
            >
                <button
                    className='absolute top-0 right-0 mt-1 mr-1 rounded-full bg-buttonExitBg hover:bg-buttonExitBgHover p-1'
                    onClick={onClose}
                >
                    <ExitIcon />
                </button>
                <Search
                    setSearch={setSearch}
                    title='projeto'
                />
                <ul className='w-full flex flex-col gap-2'>
                    {
                        filteredProjectsById.length ?
                            filteredProjectsById.map(project =>
                                <ProjectListItem
                                    key={project.id}
                                    name={project.name}
                                    status={project.status}
                                    isLoading={isLoading}
                                    projectPicture={project.projectPicture}
                                    addToProject={() => {
                                        addToProject({
                                            projectId: project.id,
                                            userId: memberId
                                        })
                                    }}
                                />
                            )
                            :
                            <div className='w-full flex justify-center max-md:text-sm'>
                                <span>Nenhum projeto encontrado</span>
                            </div>
                    }
                </ul>
            </div>
        </Modal>
    )
}
