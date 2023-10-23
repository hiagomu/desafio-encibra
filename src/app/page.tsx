"use client"

import { Form, Formik } from "formik";
import { Button } from "./components/Button";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Input } from "./components/Input";
import { useState } from "react";
import Link from "next/link";
import * as Yup from "yup";
import { LoginProps } from "./@types";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .required('Email é obrigatório')
          .email('Insira um e-mail válido'),
        password: Yup.string().required('Senha é obrigatória')
    });
      
    const onSubmit = async (values: LoginProps) => {
        setIsLoading(true)
        const res = await signIn('credentials', {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/"
        })

        setIsLoading(false)
        if (res?.ok) {
            router.push("/home")
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="rounded-lg bg-white p-12 shadow-primary flex flex-col items-center justify-center max-sm:p-8">
                <h1 className="text-primaryColor font-bold mb-2 text-xl text-center">Login</h1>
                <Formik
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    initialValues={{
                        email: "",
                        password: ""
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Input
                                isLoading={isSubmitting || isLoading}
                                placeholder="E-mail"
                                label="E-mail"
                                type="email"
                                id="email"
                            />
                            <Input
                                isLoading={isSubmitting || isLoading}
                                placeholder="Senha"
                                label="Senha"
                                type="password"
                                id="password"
                            />
                            <div className="flex justify-center mb-2">
                                <Button
                                    disabled={isSubmitting || isLoading}
                                    type="submit"
                                    title={`${isSubmitting || isLoading ? "Carregando..." : "Login"}`}
                                    save
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
                <div className="flex flex-col justify-center gap-2">
                    <Link
                        href="/signup"
                        className="text-sm text-center text-buttonBg font-semibold hover:text-buttonBgHover"
                    >
                        Não possui uma conta? Cadastre-se
                    </Link>

                    <h2 className="text-primaryColor font-bold mb-2 text-xl text-center">Outros métodos</h2>
                    <Button
                        type="button"
                        title="Logar como Gestor"
                        disabled={isLoading}
                        fn={() => onSubmit({
                            email: "gestor@gmail.com",
                            password: "admin123"
                        })}
                    />
                    <Button
                        type="button"
                        disabled={isLoading}
                        title="Logar como Colaborador Comum"
                        fn={() => onSubmit({
                            email: "hiagomurilo.cp@gmail.com",
                            password: "hiagomcp"
                        })}
                    />
                </div>
            </div>
        </div>
    )
} 