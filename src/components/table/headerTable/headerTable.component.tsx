import { Link } from "react-router-dom"

interface HeaderPorps {
    LinkRouterCreate: string
}

export default function HeaderTableComponent(props: HeaderPorps) {
    const { LinkRouterCreate } = props
    return (
        <Link to={LinkRouterCreate}>
            <button className='btn btn-primary'>Thêm Học Sinh</button>
        </Link>
    )
}
