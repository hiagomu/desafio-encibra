import * as Yup from "yup"

export const status = [
    {
        name: "Em andamento",
        value: "in progress"
    },
    {
        name: "Finalizado",
        value: "finished"
    },
    {
        name: "Em espera",
        value: "waiting"
    }
]

export const platforms = [
    {
        name: "Mobile",
        value: "mobile"
    },
    {
        name: "Web",
        value: "web"
    }
]

export const validationSchemaOnEdit = Yup.object().shape({
    name: Yup.string()
        .min(4, "Nome deve ter no mínimo 4 caracteres")
        .required("Nome é obrigatório"),
    deadline: Yup.date()
        .required('Prazo é obrigatório'),
    startDate: Yup.date()
        .required('Data de ínicio é obrigatória'),
    projectPicture: Yup.string()
        .required("Logo do projeto é obrigatória")
        .url('Insira uma URL válida'),
    status: Yup.string()
        .required("Status do projeto é obrigatório"),
    description: Yup.string()
        .min(10, 'Descrição deve ter no mínimo 10 caracteres')
        .required("Status do projeto é obrigatório"),
    techs: Yup.array()
        .of(Yup.string().required("Tecnologia é obrigatória")),
    platforms: Yup.array()
        .of(Yup.string().required("Plataforma é obrigatória")),
});

export const validationSchemaOnCreate = Yup.object().shape({
    name: Yup.string()
        .min(4, "Nome deve ter no mínimo 4 caracteres")
        .required("Nome é obrigatório"),
    deadline: Yup.date()
        .required('Prazo é obrigatório'),
    startDate: Yup.date()
        .required('Data de ínicio é obrigatória'),
    projectPicture: Yup.string()
        .required("Logo do projeto é obrigatória")
        .url('Insira uma URL válida'),
    status: Yup.string()
        .required("Status do projeto é obrigatório"),
    backEnd: Yup.string()
        .required("Desenvolvedor Back-end é obrigatório"),
    frontEnd: Yup.string()
        .required("Desenvolvedor Front-end é obrigatório"),
    gestor: Yup.string()
        .required("Gestor do projeto é obrigatório"),
    description: Yup.string()
        .min(10, 'Descrição deve ter no mínimo 10 caracteres')
        .required("Status do projeto é obrigatório"),
    techs: Yup.array()
        .of(Yup.string().required("Tecnologia é obrigatória")),
    platforms: Yup.array()
        .of(Yup.string().required("Plataforma é obrigatória")),
});