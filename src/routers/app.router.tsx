import { useRoutes, Navigate } from "react-router-dom"
import * as Page from "../pages"
import * as Components from "../components"
import { PathRouter } from "../constant"
import { useAppSelector } from "../app/hooks"

export default function AppRouter() {
    const isAuthenticated = useAppSelector((state) => state.student.isAuth)
    const studentRoutes = Page.Student.RouterStudent(isAuthenticated)
    const routes = [
        {
            path: PathRouter.default,
            element: (
                <Components.Layout>
                    <Page.Home />
                </Components.Layout>
            ),
        },
        ...studentRoutes,
        {
            path: "/login",
            element: isAuthenticated ? (
                <Navigate to='/student' />
            ) : (
                <Page.LoginComponent />
            ),
        },
        { path: "*", element: <h1>Page not Error 404!!!</h1> },
    ]
    const routing = useRoutes(routes)
    return routing
}
