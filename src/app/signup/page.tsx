"use client"

import { FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import { ContributorLoginProps } from "../@types";
import { api } from "../../../services/api";
import Image from "next/image";
import { isLink } from "../utils/isLink";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { contracts, roles } from "../components/ContributorDetails/structure";
import defaultImage from "../../../public/default_profile_image.png"
import { Button } from "../components/Button";
import {
    FaPlus as AddIcon,
    FaTrash as RemoveIcon,
} from "react-icons/fa"
import { initialValues, validationSchema } from "./structure";

export default function SignUp() {
    const router = useRouter()

    const { mutate: createUser, isLoading: isCreatingUser } = useMutation(
        async (formMember: Partial<ContributorLoginProps>) => {
            await api.post("/api/users", {
                name: formMember.name,
                email: formMember.email,
                roles: formMember.roles,
                mainRole: formMember.mainRole,
                password: formMember.password,
                startDate: formMember.startDate,
                birthDate: formMember.birthDate,
                contractType: formMember.contractType,
                profilePicture: formMember.profilePicture,
            })
        },
        {
            onSuccess: () => router.push("/"),
            onError: (err) => console.log(err)
        }
    )

    return (
        <div
            className='flex flex-col w-[45rem] max-sm:w-[22rem] h-[900px] max-sm:h-[900px] items-center
                justify-center p-3 absolute
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto mt-4'
        >
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(formValues) => createUser({
                    email: formValues.email,
                    password: formValues.password,
                    name: formValues.name,
                    birthDate: new Date(formValues.birthDate),
                    profilePicture: formValues.profilePicture,
                    mainRole: formValues.mainRole,
                    roles: formValues.roles,
                    startDate: new Date(formValues.startDate),
                    contractType: formValues.contractType,
                })}
                enableReinitialize
            >
                {({ errors, touched, isSubmitting, values }) => (
                    <Form className="w-full shadow-primary bg-white rounded-lg flex flex-col items-center py-5 relative justify-center max-sm:py-3">
                        <h1 className="text-primaryColor font-bold text-2xl mb-4 max-sm:text-1xl max-sm:mb-2">Cadastro</h1>
                        <Image
                            alt="Foto de perfil"
                            src={isLink(values.profilePicture) ? values.profilePicture : defaultImage}
                            width={90}
                            height={90}
                            className="rounded-full mb-2 max-sm:h-16 max-sm:w-16"
                        />
                        <div className="flex gap-4 max-sm:flex-col max-sm:gap-0">
                            <div>
                                <Input
                                    id="profilePicture"
                                    type="url"
                                    label="Foto de perfil"
                                    isLoading={isSubmitting || isCreatingUser}
                                    placeholder="URL da foto de perfil"
                                />
                                <Input
                                    id="name"
                                    type="text"
                                    label="Nome completo"
                                    isLoading={isSubmitting || isCreatingUser}
                                    placeholder="Nome completo"
                                />
                                <Input
                                    id="email"
                                    type="email"
                                    label="E-mail"
                                    isLoading={isSubmitting || isCreatingUser}
                                    placeholder="E-mail"
                                />
                                <Input
                                    id="password"
                                    type="password"
                                    label="Senha"
                                    isLoading={isSubmitting || isCreatingUser}
                                    placeholder="Senha"
                                />
                                <Input
                                    id="mainRole"
                                    type="text"
                                    label="Função principal"
                                    isLoading={isSubmitting || isCreatingUser}
                                    placeholder="Função principal"
                                />
                            </div>
                            <div>
                                <Input
                                    id="birthDate"
                                    type="date"
                                    label="Data de nascimento"
                                    isLoading={isSubmitting || isCreatingUser}
                                />
                                <Input
                                    id="startDate"
                                    type="date"
                                    label="Data de ínicio"
                                    isLoading={isSubmitting || isCreatingUser}
                                />
                                <Select
                                    id="contractType"
                                    label="Contrato"
                                    options={contracts}
                                    isLoading={isSubmitting || isCreatingUser}
                                />
                                <div className="flex flex-col w-fit mb-2 relative">
                                    <label htmlFor="roles" className="text-labelText font-bold">Funções</label>
                                    <FieldArray name="roles">
                                        {({ remove, push }) => 
                                        <div className="flex flex-col max-h-[7rem] overflow-auto">
                                            {
                                                values.roles && values.roles.map((_, index) => 
                                                    <div className="flex flex-col h-18" key={index}>                         
                                                        <label htmlFor="roles" className="text-labelText font-bold">
                                                            Função {index + 1}
                                                            {
                                                                values.roles.length > 1 &&
                                                                <button
                                                                    type="button"
                                                                    onClick={() => remove(index)}
                                                                    disabled={isSubmitting || isCreatingUser}
                                                                >
                                                                    <RemoveIcon className="text-red-500 ml-2 w-3 h-3" />
                                                                </button>
                                                            }
                                                        </label>
                                                        <Select
                                                            id={`roles.${index}`}
                                                            options={roles}
                                                            label={`Função ${index + 1}`}
                                                            isLoading={isSubmitting || isCreatingUser}
                                                            hasDeleteOption
                                                        />
                                                    </div>
                                                )
                                            }
                                            <button
                                                type="button"
                                                onClick={() => push("front-end")}
                                                disabled={isSubmitting || isCreatingUser}
                                                title="Adicionar função"
                                                className="absolute top-0 ml-[4.25rem] h-5 w-5 mt-0.5 bg-buttonBg rounded-full flex justify-center items-center hover:opacity-50"
                                            >
                                                <AddIcon className="w-3 h-3 text-white" />
                                            </button>
                                        </div>
                                        }
                                    </FieldArray>
                                </div>
                            </div>
                        </div>
                        <div className="mt-2 w-full flex justify-center gap-4">
                            <Button
                                type="submit"
                                title={`${isSubmitting || isCreatingUser ? "Carregando..." : "Criar colaborador"}`}
                                disabled={isSubmitting || isCreatingUser}
                                save
                            />
                            <Button
                                type="button"
                                title="Ir para o login"
                                disabled={isSubmitting || isCreatingUser}
                                fn={() => router.push("/")}
                            />
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}