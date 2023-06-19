import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { PathRouter } from "../../../constant"
import { Link } from "react-router-dom"
import { setLogout } from "../../../pages/students/reducer/studentslice"
import { useEffect } from "react"
import { getDetailStudentThunk } from "../../../pages/students/reducer/thunk"

export default function HeaderComponent() {
    const userStudent = useAppSelector((state) => state.student.userStudent)
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector((state) => state.student.isAuth)

    useEffect(() => {
        const CallApi = async () => {
            await dispatch(getDetailStudentThunk(userStudent._id))
        }
        CallApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    console.log(userStudent)

    return (
        <nav className='navbar navbar-light bg-light'>
            <div className='container'>
                <div className='navbar-brand'>
                    <Link
                        to={PathRouter.home}
                        style={{ textDecoration: "none", color: "black" }}
                    >
                        <img
                            src='https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg'
                            alt=''
                            width='30'
                            height='24'
                        />
                        Bootstrap
                    </Link>
                </div>
            </div>
            <div className='m-auto'>
                {isAuth ? (
                    <ul className='nav nav-pills'>
                        <div className='d-flex align-items-center'>
                            <li className='nav-item dropdown'>
                                <div
                                    className='nav-link dropdown-toggle'
                                    data-bs-toggle='dropdown'
                                    role='button'
                                    aria-expanded='false'
                                >
                                    <img
                                        src='https://getbootstrap.com/docs/5.1/assets/brand/bootstrap-logo.svg'
                                        alt=''
                                        width='30'
                                        height='24'
                                    />
                                </div>
                                <ul
                                    className='dropdown-menu'
                                    aria-labelledby='dropdownMenu2'
                                >
                                    <li>
                                        <Link
                                            to={
                                                PathRouter.student.list +
                                                `/${userStudent._id}/detail`
                                            }
                                            className='dropdown-item border-bottom black'
                                        >
                                            Thông tin cá nhân
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={"/student"}
                                            className='dropdown-item'
                                            onClick={() =>
                                                dispatch(setLogout())
                                            }
                                        >
                                            logOut
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <h5 className='mr-2'>{userStudent.name}</h5>
                        </div>
                    </ul>
                ) : (
                    <Link to={"/login"} className='btn btn-info'>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}
