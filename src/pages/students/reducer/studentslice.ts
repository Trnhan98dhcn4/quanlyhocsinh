import { AsyncThunk, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IStudentModel } from "../../../model"
import {
    deleteStudentThunk,
    getAllStudentThunk,
    getDetailStudentThunk,
    loginStudentThunk,
    postStudentThunk,
    putStudentThunk,
    resultStudentThunk,
} from "./thunk"

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>

type PendingAction = ReturnType<GenericAsyncThunk["pending"]>
type RejectedAction = ReturnType<GenericAsyncThunk["rejected"]>
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>

interface IStudentState {
    studentList: IStudentModel[]
    studentDetail: IStudentModel
    studentResult: IStudentModel
    userStudent: IStudentModel
    isAuth: boolean
    loading: boolean
    error: null | string
    currentRequestId: undefined | string
}

const initialState: IStudentState = {
    studentList: [],
    studentDetail: {} as IStudentModel,
    studentResult: {} as IStudentModel,
    userStudent: {} as IStudentModel,
    isAuth: false,
    loading: false,
    error: null,
    currentRequestId: undefined,
}

const studentSlice = createSlice({
    name: "student",
    initialState,
    reducers: {
        setDataAll: (state, action: PayloadAction<IStudentModel[]>) => {
            state.studentList = action.payload
        },
        setDetail: (state, action: PayloadAction<IStudentModel>) => {
            state.studentDetail = action.payload
        },
        setResult: (state, action: PayloadAction<IStudentModel>) => {
            state.studentResult = action.payload
        },
        setUser: (state, action: PayloadAction<IStudentModel>) => {
            state.userStudent = action.payload
        },
        setLogin: (state) => {
            state.isAuth = true
        },
        setLogout: (state) => {
            state.isAuth = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginStudentThunk.fulfilled, (state, action) => {
                state.userStudent = action.payload
            })
            .addCase(resultStudentThunk.fulfilled, (state, action) => {
                state.studentResult = action.payload
            })
            .addCase(deleteStudentThunk.fulfilled, (state, action) => {
                const student_ = action.meta.arg
                const index = state.studentList.findIndex(
                    (f) => f._id === student_
                )
                if (index !== -1) {
                    state.studentList.splice(index, 1)
                }
            })
            .addCase(putStudentThunk.fulfilled, (state, action) => {
                const student_ = action.payload
                const index = state.studentList.findIndex(
                    (f) => f._id === student_._id
                )
                state.studentList[index] = student_
            })
            .addCase(postStudentThunk.fulfilled, (state, action) => {
                state.studentList.push(action.payload)
            })
            .addCase(getAllStudentThunk.fulfilled, (state, action) => {
                state.studentList = action.payload
            })
            .addCase(getDetailStudentThunk.fulfilled, (state, action) => {
                state.studentDetail = action.payload
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith("/pending"),
                (state, action) => {
                    state.loading = true
                    state.currentRequestId = action.meta.requestId
                    state.error = null
                }
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.endsWith("/fulfilled"),
                (state, action) => {
                    if (
                        state.loading &&
                        state.currentRequestId === action.meta.requestId
                    ) {
                        state.loading = false
                        state.currentRequestId = undefined
                        state.error = null
                    }
                }
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith("/rejected"),
                (state, action) => {
                    if (
                        state.loading &&
                        state.currentRequestId === action.meta.requestId
                    ) {
                        state.loading = false
                        state.currentRequestId = undefined
                        state.error = "Error Server Page"
                    }
                }
            )
    },
})

const { reducer, actions } = studentSlice
export const {
    setDataAll,
    setDetail,
    setResult,
    setUser,
    setLogin,
    setLogout,
} = actions
export default reducer
