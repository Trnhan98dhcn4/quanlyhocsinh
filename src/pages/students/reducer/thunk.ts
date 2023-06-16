import { createAsyncThunk } from "@reduxjs/toolkit"
import {
    deleteStudent,
    getAllStudent,
    getDetailStudent,
    loginStudent,
    postStudent,
    putStudent,
    resultStudent,
} from "../../../api/api.student"

export const getAllStudentThunk = createAsyncThunk(
    "data/getAllStudentThunk",
    getAllStudent
)

export const getDetailStudentThunk = createAsyncThunk(
    "data/getDetailStudentThunk",
    getDetailStudent
)

export const postStudentThunk = createAsyncThunk(
    "data/postStudentThunk",
    postStudent
)

export const putStudentThunk = createAsyncThunk(
    "data/putStudentThunk",
    putStudent
)

export const deleteStudentThunk = createAsyncThunk(
    "data/deleteStudentThunk",
    deleteStudent
)
export const resultStudentThunk = createAsyncThunk(
    "data/resultStudentThunk",
    resultStudent
)

export const loginStudentThunk = createAsyncThunk(
    "data/loginStudentThunk",
    loginStudent
)
