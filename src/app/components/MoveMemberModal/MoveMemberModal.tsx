import { ProjectProps } from '@/app/@types';
import Modal from 'react-modal'
import { ProjectListItem } from '../ProjectListItem';
import { Search } from '../Search';
import { useState } from 'react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: number
  addToProject: (project: ProjectProps, memberId: number) => void
  projects: ProjectProps[]
}

export const MoveMemberModal = ({ isOpen, onClose, projects, addToProject, memberId }: DialogProps) => {
    const [search, setSearch] = useState("")
    const filteredProjects = projects?.filter(project => project.name.toLowerCase().includes(search.toLowerCase()))

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
            width: '424px',
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
                    justify-start p-3 bg-white rounded-xl absolute
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto'
            >
                <Search
                    setSearch={setSearch}
                    title='projeto'
                />
                <ul className='w-full flex flex-col gap-2'>
                    {
                        filteredProjects.map(project =>
                            <ProjectListItem
                                name={project.name}
                                status={project.status}
                                project_picture={project.project_picture}
                                addToProject={() => addToProject(project, memberId)}
                            />
                        )
                    }
                </ul>
            </div>
        </Modal>
    )
}
