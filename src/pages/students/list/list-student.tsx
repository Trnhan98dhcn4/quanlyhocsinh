import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import * as Components from "../../../components"
import { PathRouter } from "../../../constant"
import { IStudentModel } from "../../../model"
import { setDataAll } from "../reducer/studentslice"
import { deleteStudentThunk, getAllStudentThunk } from "../reducer/thunk"

export default function ListComponent() {
    const Loading = useAppSelector((state) => state.student.loading)
    const error = useAppSelector((state) => state.student.error)
    const dispatch = useAppDispatch()
    // Table
    const dataThead = ["STT", "MSSV", "Họ Tên", "Ngày Tạo", "Action"]
    const studentList = useAppSelector((state) => state.student.studentList)

    //PathLink Router
    const PathCreate = PathRouter.student.create
    const PathLink = PathRouter.student.list

    const handleDeleteStudent = async (id: string) => {
        await dispatch(deleteStudentThunk(id))
    }
    //call Api
    useEffect(() => {
        const CallApi = async () => {
            const promises = [dispatch(getAllStudentThunk())]
            await Promise.all(promises)
                .then(([dataAllStudent]) => {
                    dispatch(
                        setDataAll(dataAllStudent.payload as IStudentModel[])
                    )
                })
                .catch((error) => {
                    throw new Error(error)
                })
        }
        CallApi()
    }, [dispatch])
    if (Loading) {
        return <div>loading...</div>
    }
    if (error) {
        return <div>error: {error}</div>
    }

    return (
        <Components.TableComponent
            dataTbody={studentList}
            dataThead={dataThead}
            //create
            LinkRouterCreate={PathCreate}
            PathLinkUpdate={PathLink}
            handleDelete={handleDeleteStudent}
        />
    )
}
