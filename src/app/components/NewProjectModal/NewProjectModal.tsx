import Modal from 'react-modal'
import { FieldArray, Form, Formik } from 'formik';
import Image from 'next/image';
import { Input } from '../Input';
import { Select } from '../Select';
import {
    FaPlus as AddIcon,
    FaTrash as RemoveIcon,
    FaTimes as ExitIcon
} from "react-icons/fa"
import { Button } from '../Button';
import defaultImage from "../../../../public/default_profile_image.png"
import { isLink } from '@/app/utils/isLink';
import { api } from '../../../../services/api';
import { ContributorProps, ProjectProps } from '@/app/@types';
import { platforms, status } from './structure';
import { Textarea } from '../Textarea';
import { formatDate } from '@/app/utils/formatDate';
import { useMutation, useQueryClient } from 'react-query';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void
  members: ContributorProps[]
  allUsers?: ContributorProps[]
  project?: ProjectProps
}

export const NewProjectModal = ({ isOpen, onClose, members, project, allUsers }: NewProjectModalProps) => {
    const queryClient = useQueryClient()
    const membersOptions = allUsers
        ?.map(member => ({ value: member.id, name: member.name }))
    const frontEnd = members
        .filter(member => member.roles.includes("front-end"))
        .map(item => ({ value: item.id, name: item.name }))
    const backEnd = members
        .filter(member => member.roles.includes("back-end"))
        .map(item => ({ value: item.id, name: item.name }))
    const gestor = members
        .filter(member => member.roles.includes("gestor"))
        .map(item => ({ value: item.id, name: item.name }))

    const initialValues = project ? {
        name: project.name,
        techs: project.techs,
        status: project.status,
        deadline: formatDate(project.deadline),
        startDate: formatDate(project.startDate),
        platforms: project.platforms,
        description: project.description,
        projectPicture: project.projectPicture
    } : {
        name: "",
        techs: [""],
        status: "in progress",
        deadline: new Date,
        startDate: new Date,
        platforms: ["web"],
        description: "",
        backEnd: backEnd[0].value,
        frontEnd: frontEnd[0].value,
        gestor: gestor[0].value,
        projectPicture: ""
    }

    const { mutate: createProject, isLoading: isCreatingProject } = useMutation(
        async (project: Partial<ProjectProps>) => {
            try {
                await api.post("/api/projects", {
                    name: project.name,
                    users: project.users,
                    techs: project.techs,
                    status: project.status,
                    deadline: project.deadline,
                    platforms: project.platforms,
                    startDate: project.startDate,
                    description: project.description,
                    projectPicture: project.projectPicture
                })
            } catch(err) {
                console.log(err)
            }
            onClose()
        },
        {
            onSuccess: () => queryClient.invalidateQueries("projectsProjects")
        }
    )

    const { mutate: updateProject, isLoading: isUpdatingProject } = useMutation(
        async (projectInfo: Partial<ProjectProps>) => {
            await api.put("/api/projects", {
                id: project?.id,
                name: projectInfo.name,
                techs: projectInfo.techs,
                status: projectInfo.status,
                deadline: projectInfo.deadline,
                platforms: projectInfo.platforms,
                startDate: projectInfo.startDate,
                description: projectInfo.description,
                projectPicture: projectInfo.projectPicture
            })
                
            onClose()
        },
        {
            onSuccess: () => queryClient.invalidateQueries("projectDetails"),
            onError: (err) => console.log(err)
        }
    )

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
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                    border: 'none',
                    background: 'none',
                    height: '900px',
                    minHeight: '480px',
                    minWidth: '320px',
                    margin: '0 auto',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }
            }}
        >
            <div
                className='flex flex-col w-[40rem] h-[900px] items-center
                    justify-center p-3 absolute top-1/2 left-1/2 transform
                    -translate-x-1/2 -translate-y-1/2 overflow-auto max-md:w-[22rem]'
            >
                <Formik
                    initialValues={initialValues}
                    onSubmit={(formValues) => {
                        if (formValues?.backEnd && formValues?.frontEnd && formValues.gestor) {
                            createProject({
                                name: formValues.name,
                                status: formValues.status,
                                techs: formValues.techs,
                                deadline: formValues.deadline,
                                startDate: formValues.startDate,
                                description: formValues.description,
                                projectPicture: formValues.projectPicture,
                                platforms: formValues.platforms,
                                users: [
                                    { userId: Number(formValues?.backEnd) },
                                    { userId: Number(formValues?.frontEnd) },
                                    { userId: Number(formValues.gestor) }
                                ]
                            })
                        } else {
                            updateProject({
                                id: project?.id,
                                name: formValues.name,
                                status: formValues.status,
                                techs: formValues.techs,
                                deadline: new Date(formValues.deadline),
                                startDate: new Date(formValues.startDate),
                                description: formValues.description,
                                projectPicture: formValues.projectPicture,
                                platforms: formValues.platforms
                            })
                        }
                    }}
                    enableReinitialize
                >
                    {({ errors, touched, isSubmitting, values }) => (
                        <Form className="w-full shadow-primary bg-white rounded-lg flex flex-col items-center py-5 relative">
                            <Image
                                alt="Logo do projeto"
                                src={isLink(values.projectPicture) ? values.projectPicture : defaultImage}
                                width={90}
                                height={90}
                                className="rounded-full mb-2"
                            />
                            <div className='flex gap-4 max-md:flex-col max-md:h-[600px] max-md:gap-0 overflow-auto'>
                                <div>
                                    <Input
                                        id="projectPicture"
                                        type="url"
                                        label="Logo do projeto"
                                        isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                        placeholder="URL da logo do projeto"
                                    />
                                    <Input
                                        id="name"
                                        type="text"
                                        label="Nome do projeto"
                                        isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                        placeholder="Nome do projeto"
                                    />
                                    <Textarea
                                        id="description"
                                        type="text"
                                        label="Descrição"
                                        isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                        placeholder="Descrição"
                                    />
                                    <Input
                                        id="deadline"
                                        type="date"
                                        label="Prazo"
                                        isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                    />
                                    <Input
                                        id="startDate"
                                        type="date"
                                        label="Data de ínicio"
                                        isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                    />
                                    <Select
                                        id="status"
                                        label="Status"
                                        options={status}
                                        isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                    />
                                </div>
                                <div>
                                    {
                                        project && membersOptions ?
                                        null
                                        :
                                        <>
                                            <label htmlFor="users" className="text-labelText font-bold">Membros iniciais</label>
                                            <div className="flex flex-col h-18">                         
                                                <Select
                                                    id={"frontEnd"}
                                                    options={frontEnd}
                                                    label="Front-end"
                                                    isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                                />
                                                <Select
                                                    id={"backEnd"}
                                                    options={backEnd}
                                                    label="Back-end"
                                                    isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                                />
                                                <Select
                                                    id={"gestor"}
                                                    options={gestor}
                                                    label="Gestor"
                                                    isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                                />
                                            </div>
                                        </>
                                    }
                                    <div className="flex flex-col w-fit mb-2 relative">
                                        <label htmlFor="platforms" className="text-labelText font-bold">Plataformas</label>
                                        <FieldArray name="platforms">
                                            {({ remove, push }) => 
                                            <div className="flex flex-col max-h-[9rem] overflow-auto">
                                                {
                                                    values.platforms && values.platforms.map((_: any, index: number) => 
                                                        <div className="flex flex-col h-18" key={index}>                         
                                                            <label htmlFor="platforms" className="text-labelText font-bold">
                                                                Plataforma {index + 1}
                                                                {
                                                                    values.platforms.length > 1 &&
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => remove(index)}
                                                                        disabled={isSubmitting || isCreatingProject || isUpdatingProject}
                                                                    >
                                                                        <RemoveIcon className="text-red-500 ml-2 w-3 h-3" />
                                                                    </button>
                                                                }
                                                            </label>
                                                            <Select
                                                                id={`platforms.${index}`}
                                                                options={platforms}
                                                                label={`Plataforma ${index + 1}`}
                                                                isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                                                hasDeleteOption
                                                            />
                                                        </div>
                                                    )
                                                }
                                                <button
                                                    type="button"
                                                    disabled={isSubmitting || isCreatingProject || isUpdatingProject}
                                                    onClick={() => push("web")}
                                                    title="Adicionar plataforma"
                                                    className="absolute top-0 ml-[6.25rem] h-5 w-5 mt-0.5 bg-buttonBg rounded-full flex justify-center items-center hover:opacity-50"
                                                >
                                                    <AddIcon className="w-3 h-3 text-white" />
                                                </button>
                                            </div>
                                            }
                                        </FieldArray>
                                    </div>
                                    <div className="flex flex-col w-fit mb-2 relative">
                                        <label htmlFor="techs" className="text-labelText font-bold">Tecnologias</label>
                                        <FieldArray name="techs">
                                            {({ remove, push }) => 
                                            <div className="flex flex-col max-h-[27rem] overflow-auto">
                                                {
                                                    values.techs && values.techs.map((_: any, index: number) => 
                                                        <div className="flex flex-col h-18" key={index}>                         
                                                            <label htmlFor="techs" className="text-labelText font-bold">
                                                                Tecnologia {index + 1}
                                                                {
                                                                    values.techs.length > 1 &&
                                                                    <button
                                                                        type="button"
                                                                        disabled={isSubmitting || isCreatingProject || isUpdatingProject}
                                                                        onClick={() => remove(index)}
                                                                    >
                                                                        <RemoveIcon className="text-red-500 ml-2 w-3 h-3" />
                                                                    </button>
                                                                }
                                                            </label>
                                                            <Input
                                                                id={`techs.${index}`}
                                                                type="text"
                                                                isLoading={isSubmitting || isCreatingProject || isUpdatingProject}
                                                                placeholder="Tecnologia"
                                                            />
                                                        </div>
                                                    )
                                                }
                                                <button
                                                    type="button"
                                                    onClick={() => push("")}
                                                    title="Adicionar tecnologia"
                                                    disabled={isSubmitting || isCreatingProject || isUpdatingProject}
                                                    className="absolute top-0 ml-[6rem] h-5 w-5 mt-0.5 bg-buttonBg rounded-full flex justify-center items-center hover:opacity-50"
                                                >
                                                    <AddIcon className="w-3 h-3 text-white" />
                                                </button>
                                            </div>
                                            }
                                        </FieldArray>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 w-full flex justify-evenly max-md:justify-center max-md:gap-4">
                                <Button
                                    type="submit"
                                    title={`${project ? "Editar projeto" : "Criar projeto"}`}
                                    disabled={isSubmitting || isCreatingProject || isUpdatingProject}
                                    save
                                />
                                <Button
                                    type="button"
                                    fn={onClose}
                                    title="Fechar"
                                    disabled={isSubmitting || isCreatingProject || isUpdatingProject}
                                    remove
                                />
                            </div>
                            <button
                                className='absolute top-0 right-0 mt-2 mr-2 rounded-full bg-buttonExitBg hover:bg-buttonExitBgHover p-1'
                                onClick={onClose}
                                disabled={isSubmitting || isCreatingProject || isUpdatingProject}
                                type='button'
                            >
                                <ExitIcon />
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </Modal>
    )
}
