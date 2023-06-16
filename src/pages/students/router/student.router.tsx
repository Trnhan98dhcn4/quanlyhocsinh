import { Navigate } from "react-router-dom"
import { Layout } from "../../../components"
import { PathRouter } from "../../../constant"
import { CreateStudentComponent } from "../create"
import { DetailsComponent, ResultComponent } from "../details"
import { ListComponent } from "../list"

export const RouterStudent = (isAuthenticated: boolean) => [
    {
        path: PathRouter.student.list,
        element: (
            <Layout>
                <ListComponent />
            </Layout>
        ),
    },
    {
        path: PathRouter.student.create,
        element: (
            <Layout>
                <CreateStudentComponent isUpdate={false} />
            </Layout>
        ),
    },
    {
        path: PathRouter.student.update,
        element: isAuthenticated ? (
            <Layout>
                <CreateStudentComponent isUpdate={true} />
            </Layout>
        ) : (
            <Navigate to={"/login"} />
        ),
    },
    {
        path: PathRouter.student.detail,
        element: isAuthenticated ? (
            <Layout>
                <DetailsComponent />
            </Layout>
        ) : (
            <Navigate to={"/login"} />
        ),
    },
    {
        path: PathRouter.student.result,
        element: (
            <Layout>
                <ResultComponent />
            </Layout>
        ),
    },
]
