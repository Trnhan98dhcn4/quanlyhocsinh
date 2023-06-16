import { useState } from "react"
import { ModalComponent } from "../components"
import FormatDate from "./formatdate.utils"
import { Link } from "react-router-dom"

const RowsShowTable = (
    data: {}[],
    handleDelete: (id: string) => Promise<void>,
    PathLinkUpdate?: string
) => {
    const [deleteId, setDeleteId] = useState<string>("")
    const handleDeleteStudent = (key: string) => {
        setDeleteId(key)
    }
    return (
        <>
            {data.length === 0 ? (
                <tr>
                    <td colSpan={5}>Học sinh chưa có trong sanh sách</td>
                </tr>
            ) : (
                data.map(
                    (
                        [
                            result,
                            _id,
                            mssv,
                            password,
                            name,
                            age,
                            gender,
                            address,
                            BDT,
                            Nganh,
                            createdAt,
                            UpdatedAt,
                        ]: any,
                        index
                    ) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{mssv}</td>
                            <td>{name}</td>
                            <td>{FormatDate(createdAt)}</td>
                            <td>
                                <Link to={`${PathLinkUpdate}/${_id}/detail`}>
                                    <button className='btn btn-primary '>
                                        Xem
                                    </button>
                                </Link>
                                <Link to={`${PathLinkUpdate}/${_id}/update`}>
                                    <button className='btn btn-info'>
                                        Cập Nhập
                                    </button>
                                </Link>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => handleDeleteStudent(_id)}
                                    data-bs-toggle='modal'
                                    data-bs-target='#exampleModal'
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    )
                )
            )}
            <ModalComponent deleteId={deleteId} handleDelete={handleDelete} />
        </>
    )
}

export default RowsShowTable
