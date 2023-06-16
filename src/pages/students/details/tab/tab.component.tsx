import { Link } from "react-router-dom"
import { PathRouter } from "../../../../constant"
import { useState } from "react"
const TabComponent = (props: { param: string }) => {
    const { param } = props
    const [actionTab, setActionTab] = useState("detail")
    return (
        <ul className='nav nav-tabs'>
            <li className='nav-item'>
                <Link
                    to={PathRouter.student.list + "/" + param + "/detail"}
                    className={`nav-link ${
                        actionTab === `${param}` ? "active" : ""
                    }`}
                    aria-current='page'
                    onClick={() => setActionTab("detail")}
                >
                    Thông Tin Học Sinh
                </Link>
            </li>
            <li className='nav-item'>
                <Link
                    to={PathRouter.student.list + "/" + param + "/result"}
                    className={`nav-link ${
                        actionTab === `${param}` ? "active" : ""
                    }`}
                    aria-current='page'
                    onClick={() => setActionTab("result")}
                >
                    Điểm Học Sinh
                </Link>
            </li>
        </ul>
    )
}

export default TabComponent
