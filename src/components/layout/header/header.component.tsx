import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { PathRouter } from "../../../constant"
import { Link } from "react-router-dom"
import { setLogout } from "../../../pages/students/reducer/studentslice"

export default function HeaderComponent() {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector((state) => state.student.isAuth)

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
                    <Link
                        to={"/student"}
                        className='btn btn-info'
                        onClick={() => dispatch(setLogout())}
                    >
                        logOut
                    </Link>
                ) : (
                    <Link to={"/login"} className='btn btn-info'>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}
