import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { IStudentModel } from "../../../model"
import { setResult } from "../reducer/studentslice"
import { resultStudentThunk } from "../reducer/thunk"
import TabComponent from "./tab/tab.component"

const ResultComponent = () => {
    const { result } = useParams()
    const studentResult = useAppSelector((state) => state.student.studentResult)
    const Loading = useAppSelector((state) => state.student.loading)
    const error = useAppSelector((state) => state.student.error)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const CallApi = async () => {
            const promises = [dispatch(resultStudentThunk(result as string))]
            await Promise.all(promises)
                .then(([dataResult]) => {
                    setResult(dataResult.payload as IStudentModel)
                })
                .catch((error) => {
                    throw new Error(error)
                })
        }
        CallApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, result])
    if (Loading) {
        return <div>loading...</div>
    }
    if (error) {
        return <div>error: {error}</div>
    }
    console.log(studentResult)
    return (
        <div>
            <TabComponent param={result as string} />
            <div className='p-3'>
                <table className='table table-bordered'>
                    <tbody>
                        <tr>
                            <th>Môn học</th>
                            <th>Kiểm Tra 15 phút</th>
                            <th>Kiểm Tra 1 Tiết</th>
                            <th>Kiểm Tra Cuối Kì</th>
                            <th>Tổng</th>
                        </tr>
                        <tr>
                            <th>Toán</th>
                            <td>{studentResult.Toan?.KT_15p}</td>
                            <td>{studentResult.Toan?.KT_1T}</td>
                            <td>{studentResult.Toan?.KT_CK}</td>
                            <th>
                                {(+studentResult.Toan?.KT_15p +
                                    +studentResult.Toan?.KT_1T * 2 +
                                    +studentResult.Toan?.KT_CK * 3) /
                                    6}
                            </th>
                        </tr>
                        <tr>
                            <th>Lý</th>
                            <td>{studentResult.Ly?.KT_15p}</td>
                            <td>{studentResult.Ly?.KT_1T}</td>
                            <td>{studentResult.Ly?.KT_CK}</td>
                            <th>
                                {(+studentResult.Ly?.KT_15p +
                                    +studentResult.Ly?.KT_1T * 2 +
                                    +studentResult.Ly?.KT_CK * 3) /
                                    6}
                            </th>
                        </tr>
                        <tr>
                            <th>Hóa</th>
                            <td>{studentResult.Hoa?.KT_15p}</td>
                            <td>{studentResult.Hoa?.KT_1T}</td>
                            <td>{studentResult.Hoa?.KT_CK}</td>
                            <th>
                                {(+studentResult.Hoa?.KT_15p +
                                    +studentResult.Hoa?.KT_1T * 2 +
                                    +studentResult.Hoa?.KT_CK * 3) /
                                    6}
                            </th>
                        </tr>
                        <tr>
                            <th>Văn</th>
                            <td>{studentResult.Van?.KT_15p}</td>
                            <td>{studentResult.Van?.KT_1T}</td>
                            <td>{studentResult.Van?.KT_CK}</td>
                            <th>
                                {(+studentResult.Van?.KT_15p +
                                    +studentResult.Van?.KT_1T * 2 +
                                    +studentResult.Van?.KT_CK * 3) /
                                    6}
                            </th>
                        </tr>
                        <tr>
                            <th>Tiếng Anh</th>
                            <td>{studentResult.TA?.KT_15p}</td>
                            <td>{studentResult.TA?.KT_1T}</td>
                            <td>{studentResult.TA?.KT_CK}</td>
                            <th>
                                {(+studentResult.TA?.KT_15p +
                                    +studentResult.TA?.KT_1T * 2 +
                                    +studentResult.TA?.KT_CK * 3) /
                                    6}
                            </th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ResultComponent
