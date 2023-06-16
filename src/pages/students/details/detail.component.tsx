import { useEffect } from "react"
import TabComponent from "./tab/tab.component"
import { useParams, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { getDetailStudentThunk } from "../reducer/thunk"
import { setDetail } from "../reducer/studentslice"
import { IStudentModel } from "../../../model"
import { FormatDate } from "../../../utils"

const DetailsComponent = () => {
    const { detail } = useParams()
    const studentDetail = useAppSelector((state) => state.student.studentDetail)
    const Loading = useAppSelector((state) => state.student.loading)
    const error = useAppSelector((state) => state.student.error)
    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector((state) => state.student.isAuth)
    const navigate = useNavigate()
    useEffect(() => {
        const CallApi = async () => {
            const promises = [dispatch(getDetailStudentThunk(detail as string))]
            await Promise.all(promises)
                .then(([dataDetail]) => {
                    setDetail(dataDetail.payload as IStudentModel)
                })
                .catch((error) => {
                    throw new Error(error)
                })
        }
        CallApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, detail])

    if (Loading) {
        return <div>loading...</div>
    }
    if (error) {
        return <div>error: {error}</div>
    }
    return (
        <div>
            <TabComponent param={detail as string} />
            <div className='p-3 d-flex'>
                <table className='table table-bordered'>
                    <tbody>
                        <tr>
                            <th>MSSV:</th>
                            <td>{studentDetail.mssv}</td>
                        </tr>
                        <tr>
                            <th>Họ Tên:</th>
                            <td>{studentDetail.name}</td>
                        </tr>
                        <tr>
                            <th>tuổi:</th>
                            <td>{studentDetail.age}</td>
                        </tr>
                        <tr>
                            <th>giới tính:</th>
                            <td>{studentDetail.gender}</td>
                        </tr>
                    </tbody>
                </table>
                <table className='table table-bordered'>
                    <tbody>
                        <tr>
                            <th>Địa chỉ:</th>
                            <td>{studentDetail.address}</td>
                        </tr>
                        <tr>
                            <th>Bậc Đào Tạo:</th>
                            <td>{studentDetail.BDT}</td>
                        </tr>
                        <tr>
                            <th>Chuyên Ngành</th>
                            <td>{studentDetail.Nganh}</td>
                        </tr>
                        <tr>
                            <th>Ngày Tạo:</th>
                            <td>{FormatDate(studentDetail.createdAt)}</td>
                        </tr>
                        <tr>
                            <th>Ngày Cập Nhập:</th>
                            <td>{FormatDate(studentDetail.updatedAt)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-primary'>
                    Cập Nhập Lại Thông Tin
                </button>
            </div>
        </div>
    )
}

export default DetailsComponent
