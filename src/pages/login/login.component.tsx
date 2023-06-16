import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { IStudentModel } from "../../model"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
    getAllStudentThunk,
    loginStudentThunk,
} from "../students/reducer/thunk"
import { useEffect, useState } from "react"
import { PathRouter } from "../../constant"
import { setLogin } from "../students/reducer/studentslice"

interface User {
    payload: {
        mssv: string
        password: string
    }
}

const LoginComponent = () => {
    const navigate = useNavigate()
    const [showText, setShowText] = useState(false)
    const { register, handleSubmit } = useForm<IStudentModel>({
        defaultValues: {
            mssv: "",
            password: "",
        },
    })
    const dispatch = useAppDispatch()
    useEffect(() => {
        const CallApi = async () => {
            await dispatch(getAllStudentThunk())
        }
        CallApi()
    }, [dispatch])

    const SubmitEventLogin = async (event: IStudentModel) => {
        const user = (await dispatch(loginStudentThunk(event))) as User
        if (
            user.payload?.mssv === event.mssv &&
            user.payload?.password === event.password
        ) {
            setShowText(false)
            dispatch(setLogin())
            navigate(PathRouter.student.list)
        } else {
            setShowText(true)
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='h-50 w-50 border border-dark'>
                <div className='d-flex justify-content-center border-bottom border-dark'>
                    <h2 className='text-primary'>Đăng Nhập</h2>
                </div>
                <div className='p-4'>
                    <form onSubmit={handleSubmit(SubmitEventLogin)}>
                        <div className='mb-3'>
                            <label
                                htmlFor='exampleInputEmail1'
                                className='form-label'
                            >
                                MÃ SỐ SINH VIÊN:
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='exampleInputEmail1'
                                aria-describedby='emailHelp'
                                placeholder='Nhập Mã số sinh viên'
                                {...register("mssv", {
                                    required: true,
                                })}
                            />
                            <div id='emailHelp' className='form-text'>
                                We'll never share your email with anyone else.
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label
                                htmlFor='exampleInputPassword1'
                                className='form-label'
                            >
                                MẬT KHẨU:
                            </label>
                            <input
                                type='password'
                                className='form-control'
                                id='exampleInputPassword1'
                                placeholder='Nhập Mật khẩu'
                                {...register("password", {
                                    required: true,
                                })}
                            />
                        </div>

                        <button type='submit' className='btn btn-primary'>
                            Đăng Nhập
                        </button>
                    </form>
                </div>
                {showText && (
                    <div className='p-3'>
                        <p>
                            Xem Lại MSSV và Mật khẩu không đúng, hoặc không tồn
                            tại
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default LoginComponent
