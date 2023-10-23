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
import { contracts, roles } from '../ContributorDetails/structure';
import defaultImage from "../../../../public/default_profile_image.png"
import { isLink } from '@/app/utils/isLink';
import { api } from '../../../../services/api';
import { ContributorProps } from '@/app/@types';
import { formatDate } from '@/app/utils/formatDate';
import { useMutation, useQueryClient } from 'react-query';
import { validationSchema } from './structure';

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void
  member?: ContributorProps
}

export const EditUserModal = ({ isOpen, onClose, member }: EditUserModalProps) => {
    const queryClient = useQueryClient()
    const { mutate: mutateMember, isLoading: isMutatingMember } = useMutation(
        async (formMember: Partial<ContributorProps>) => {
            if (member) {
                await api.put(`/api/users`, {
                    id: member.id,
                    name: formMember.name,
                    email: formMember.email,
                    roles: formMember.roles,
                    mainRole: formMember.mainRole,
                    startDate: formMember.startDate,
                    birthDate: formMember.birthDate,
                    contractType: formMember.contractType,
                    profilePicture: formMember.profilePicture,
                })
            } else {
                await api.post("/api/users", {
                    name: formMember.name,
                    email: formMember.email,
                    roles: formMember.roles,
                    mainRole: formMember.mainRole,
                    startDate: formMember.startDate,
                    birthDate: formMember.birthDate,
                    contractType: formMember.contractType,
                    profilePicture: formMember.profilePicture,
                })
            }
            onClose()
        },
        {
            onSuccess: () => {
                if (member) {
                    queryClient.invalidateQueries("userDetails")
                } else {
                    queryClient.invalidateQueries("usersHome")
                }
            }
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
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                    border: 'none',
                    background: 'none',
                    minWidth: '320px',
                    width: '320px',
                    height: '1000px',
                    minHeight: '480px',
                    margin: '0 auto',
                    top: '50%',
                    transform: 'translateY(-50%)'
                }
            }}
        >
            <div
                className='flex flex-col w-[26.5rem] h-[900px] items-center
                    justify-center p-3 absolute
                    top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                    max-md:w-[20rem]'
            >
                <Formik
                    initialValues={{
                        name: member?.name || "",
                        email: member?.email || "",
                        contractType: member?.contractType || "CLT",
                        roles: member?.roles || ["front-end"],
                        mainRole: member?.mainRole || "",
                        birthDate: formatDate(member?.birthDate) || new Date,
                        startDate: formatDate(member?.startDate) || new Date,
                        profilePicture: member?.profilePicture || "",
                    }}
                    onSubmit={(formValues) => mutateMember({
                        email: formValues.email,
                        name: formValues.name,
                        birthDate: new Date(formValues.birthDate),
                        profilePicture: formValues.profilePicture,
                        mainRole: formValues.mainRole,
                        roles: formValues.roles,
                        startDate: new Date(formValues.startDate),
                        contractType: formValues.contractType,
                    })}
                    validationSchema={validationSchema}
                    enableReinitialize
                >
                    {({ isSubmitting, values }) => (
                        <Form className="w-[24rem] shadow-primary bg-white rounded-lg flex flex-col items-center py-5 relative">
                            <Image
                                alt="Foto de perfil"
                                src={isLink(values.profilePicture) ? values.profilePicture : defaultImage}
                                width={90}
                                height={90}
                                className="rounded-full mb-2"
                            />
                            <Input
                                id="profilePicture"
                                type="url"
                                label="Foto de perfil"
                                isLoading={isSubmitting || isMutatingMember}
                                placeholder="URL da foto de perfil"
                            />
                            <Input
                                id="name"
                                type="text"
                                label="Nome completo"
                                isLoading={isSubmitting || isMutatingMember}
                                placeholder="Nome completo"
                            />
                            <Input
                                id="email"
                                type="email"
                                label="E-mail"
                                isLoading={isSubmitting || isMutatingMember}
                                placeholder="E-mail"
                            />
                            <Input
                                id="mainRole"
                                type="text"
                                label="Função principal"
                                isLoading={isSubmitting || isMutatingMember}
                                placeholder="Função principal"
                            />
                            <Input
                                id="birthDate"
                                type="date"
                                label="Data de nascimento"
                                isLoading={isSubmitting || isMutatingMember}
                            />
                            <Input
                                id="startDate"
                                type="date"
                                label="Data de ínicio"
                                isLoading={isSubmitting || isMutatingMember}
                            />
                            <Select
                                id="contractType"
                                label="Contrato"
                                options={contracts}
                                isLoading={isSubmitting || isMutatingMember}
                            />
                            <div className="flex flex-col w-fit mb-2 relative">
                                <label htmlFor="roles" className="text-labelText font-bold">Funções</label>
                                <FieldArray name="roles">
                                    {({ remove, push }) => 
                                    <div className="flex flex-col max-h-[12rem] overflow-auto">
                                        {
                                            values.roles && values.roles.map((_, index) => 
                                                <div className="flex flex-col h-18" key={index}>                         
                                                    <label htmlFor="roles" className="text-labelText font-bold">
                                                        Função {index + 1}
                                                        {
                                                            values.roles.length > 1 &&
                                                            <button
                                                                type="button"
                                                                disabled={isSubmitting || isMutatingMember}
                                                                onClick={() => remove(index)}
                                                            >
                                                                <RemoveIcon className="text-red-500 ml-2 w-3 h-3" />
                                                            </button>
                                                        }
                                                    </label>
                                                    <Select
                                                        id={`roles.${index}`}
                                                        options={roles}
                                                        label={`Função ${index + 1}`}
                                                        isLoading={isSubmitting || isMutatingMember}
                                                        hasDeleteOption
                                                    />
                                                </div>
                                            )
                                        }
                                        <button
                                            type="button"
                                            onClick={() => push("front-end")}
                                            title="Adicionar função"
                                            disabled={isSubmitting || isMutatingMember}
                                            className="absolute top-0 ml-[4.25rem] h-5 w-5 mt-0.5 bg-buttonBg rounded-full flex justify-center items-center hover:opacity-50"
                                        >
                                            <AddIcon className="w-3 h-3 text-white" />
                                        </button>
                                    </div>
                                    }
                                </FieldArray>
                                <div className="mt-2 w-full flex justify-between">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting || isMutatingMember}
                                        title={member ? "Editar colaborado" : "Criar colaborador"}
                                        save
                                    />
                                    <Button
                                        disabled={isSubmitting || isMutatingMember}
                                        type="button"
                                        fn={onClose}
                                        title="Fechar"
                                        remove
                                    />
                                </div>
                            </div>
                            <button
                                className='absolute top-0 right-0 mt-2 mr-2 rounded-full bg-buttonExitBg hover:bg-buttonExitBgHover p-1'
                                disabled={isSubmitting || isMutatingMember}
                                onClick={onClose}
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
