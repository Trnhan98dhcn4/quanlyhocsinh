import { IStudentModel } from "../model"
import { apiDelete, apiGet, apiPost, apiPut } from "./api.axios"

const URL = "student"

export const getAllStudent = async () => {
    return apiGet<IStudentModel[]>(URL)
}

export const getDetailStudent = async (id: string) => {
    const _url = URL + "/" + id
    return apiGet<IStudentModel>(_url)
}

export const postStudent = async (body: IStudentModel) => {
    return apiPost<IStudentModel>(URL, body)
}

export const putStudent = async ({
    id,
    body,
}: {
    id: string
    body: IStudentModel
}) => {
    const _url = URL + "/" + id
    return apiPut<IStudentModel>(_url, body)
}

export const deleteStudent = async (id: string) => {
    const _url = URL + "/" + id
    return apiDelete<IStudentModel>(_url)
}

export const resultStudent = async (id: string) => {
    const _url = URL + "/" + id + "/result"
    return apiGet<IStudentModel>(_url)
}

export const loginStudent = async (body: IStudentModel) => {
    const _url = URL + "/login"
    return apiPost<IStudentModel>(_url, body)
}
