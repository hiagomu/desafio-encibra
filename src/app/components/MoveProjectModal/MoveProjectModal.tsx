import Modal from 'react-modal'
import { Search } from '../Search';
import { useState } from 'react';
import { FaTimes as ExitIcon } from "react-icons/fa"
import { MemberListItem } from '../MemberListItem';
import { AddToProjectProps, ContributorProps, ProjectProps } from '@/app/@types';

interface DialogProps {
  project: ProjectProps
  isOpen: boolean
  onClose: () => void
  addToProject: (props: AddToProjectProps) => void
  members: ContributorProps[]
  isLoading: boolean
}

export const MoveProjectModal = ({ isOpen, onClose, members, addToProject, project, isLoading }: DialogProps) => {
    const [search, setSearch] = useState("")
    const filteredMembers = members?.filter(member => member.name.toLowerCase().includes(search.toLowerCase()))
    const filteredMembersById = filteredMembers.filter(member => !project.users?.some(user => user.userId === member.id))

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
                transform: 'translateY(-50%)',
                overflow: 'hidden'
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
                    title='membro'
                />
                <ul className='w-full flex flex-col overflow-auto gap-2 h-[23rem]'>
                    {
                        filteredMembersById.length ?
                            filteredMembersById.map(member =>
                                <MemberListItem
                                    key={member.id}
                                    name={member.name}
                                    mainRole={member.mainRole}
                                    profilePicture={member.profilePicture}
                                    isLoading={isLoading}
                                    addToProject={() => {
                                        addToProject({
                                            projectId: project.id,
                                            userId: member.id
                                        })
                                    }}
                                />
                            )
                            :
                            <div className='w-full flex justify-center max-md:text-sm'>
                                <span>Nenhum usuário encontrado</span>
                            </div>
                    }
                </ul>
            </div>
        </Modal>
    )
}
