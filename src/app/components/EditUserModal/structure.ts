import * as Yup from "yup"

export const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email é obrigatório')
      .email('Insira um e-mail válido'),
    password: Yup.string()
        .min(8, 'Senha deve ter no mínimo 8 caracteres')
        .required('Senha é obrigatória'),
    name: Yup.string()
        .min(4, "Nome deve ter no mínimo 4 caracteres")
        .required("Nome é obrigatório"),
    birthDate: Yup.date()
        .required('Data de nascimento é obrigatória'),
    startDate: Yup.date()
        .required('Data de ínicio é obrigatória'),
    profilePicture: Yup.string()
        .required("Foto de perfil é obrigatória")
        .url('Insira uma URL válida'),
    mainRole: Yup.string()
        .min(4, "Função principal deve ter no mínimo 4 caracteres")
        .required("Função principal é obrigatória"),
    roles: Yup.array()
        .of(Yup.string().required("Função é obrigatória")),
    contractType: Yup.string()
        .required("Regime de contratação é obrigatório")
});