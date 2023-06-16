import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { PathRouter } from "../../../constant"
import { IStudentModel } from "../../../model"
import { setDataAll } from "../reducer/studentslice"
import {
    getAllStudentThunk,
    postStudentThunk,
    putStudentThunk,
} from "../reducer/thunk"

interface CreateProps {
    isUpdate: boolean
}

const CreateStudentComponent = (props: CreateProps) => {
    const { isUpdate } = props

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors },
    } = useForm<IStudentModel>({
        defaultValues: {
            mssv: "",
            name: "",
            address: "",
            age: "",
            BDT: "",
            gender: "",
            Nganh: "",
            TableResult: {
                Toan: {
                    KT_15p: "",
                    KT_1T: "",
                    KT_CK: "",
                    Tong: "",
                },
                Ly: {
                    KT_15p: "",
                    KT_1T: "",
                    KT_CK: "",
                    Tong: "",
                },
                Hoa: {
                    KT_15p: "",
                    KT_1T: "",
                    KT_CK: "",
                    Tong: "",
                },
                Van: {
                    KT_15p: "",
                    KT_1T: "",
                    KT_CK: "",
                    Tong: "",
                },
                TA: {
                    KT_15p: "",
                    KT_1T: "",
                    KT_CK: "",
                    Tong: "",
                },
            },
        },
    })
    const { key } = useParams()
    const navigate = useNavigate()
    const AllStudentList = useAppSelector((state) => state.student.studentList)
    const exitEdit = AllStudentList.filter((f) => f._id === key)
    const dispatch = useAppDispatch()
    const Loading = useAppSelector((state) => state.student.loading)
    const error = useAppSelector((state) => state.student.error)

    useEffect(() => {
        const CallApi = async () => {
            const promises = [dispatch(getAllStudentThunk())]
            await Promise.all(promises)
                .then(([dataGetAllStudent]) => {
                    dispatch(
                        setDataAll(dataGetAllStudent.payload as IStudentModel[])
                    )
                })
                .catch((error) => {
                    throw new Error(error)
                })
        }
        if (isUpdate) {
            CallApi()
        }

        if (exitEdit[0]) {
            setValue("mssv", exitEdit[0].mssv)
            setValue("name", exitEdit[0].name)
            setValue("age", exitEdit[0].age)
            setValue("BDT", exitEdit[0].BDT)
            setValue("Nganh", exitEdit[0].Nganh)
            setValue("gender", exitEdit[0].gender)
            setValue("address", exitEdit[0].address)
            setValue("TableResult", exitEdit[0].TableResult)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, setValue])
    const onSubmitEvent = async (event: IStudentModel) => {
        if (!isUpdate) {
            const isDuplicate = AllStudentList.some(
                (student) => student.mssv === event.mssv
            )
            if (isDuplicate) {
                setError("mssv", {
                    type: "manual",
                    message: "Giá trị đã tồn tại trong danh sách.",
                })
                return
            }

            await dispatch(postStudentThunk(event))
        } else {
            await dispatch(putStudentThunk({ id: key as string, body: event }))
        }
        navigate(PathRouter.student.list)
    }
    if (Loading) {
        return <div>loading...</div>
    }
    if (error) {
        return <div>error: {error}</div>
    }

    return (
        <div className='container p-5'>
            <div className='d-flex justify-content-center'>
                <h2 className='text-primary'>
                    {!isUpdate ? "Thêm Học Sinh" : "Cập Nhập Học Sinh"}
                </h2>
            </div>
            <form onSubmit={handleSubmit(onSubmitEvent)}>
                <div className='mb-3'>
                    <label htmlFor='mssv' className='form-label'>
                        Mã Số Sinh Viên:
                    </label>
                    <input
                        type='number'
                        className={`form-control ${
                            errors.mssv ? "is-invalid" : "is-valid"
                        }`}
                        id='mssv'
                        placeholder='Nhập Mã số học sinh'
                        autoComplete='off'
                        {...register("mssv", {
                            required: {
                                value: true,
                                message: "Vui lòng nhập MSSV",
                            },
                        })}
                    />
                    <div className='form-text text-danger'>
                        {errors.mssv?.message}
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>
                        Họ tên:
                    </label>
                    <input
                        type='text'
                        className={`form-control ${
                            errors.name ? "is-invalid" : "is-valid"
                        }`}
                        id='name'
                        placeholder='Nhập Họ Tên của học sinh'
                        autoComplete='off'
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Vui lòng ghi nhập vào ô Họ tên",
                            },
                            maxLength: {
                                value: 16,
                                message: "Nhập họ tên không quá 16 ký tự",
                            },
                            minLength: {
                                value: 6,
                                message: "Nhập họ tên trên 6 ký tự",
                            },
                        })}
                    />
                    <div className='form-text text-danger'>
                        {errors.name?.message}
                    </div>
                </div>

                <div className='d-flex justify-content-center'>
                    <button type='submit' className='btn btn-primary'>
                        {!isUpdate ? "Xác Nhận" : "Cập Nhập "}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreateStudentComponent
