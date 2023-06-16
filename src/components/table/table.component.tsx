import { ContentComponent } from "./contentTable"
import { HeaderTableComponent } from "./headerTable"

interface ITableItem {
    dataTbody: {}[]
    dataThead: string[]
    LinkRouterCreate: string
    PathLinkUpdate: string
    handleDelete: (id: string) => Promise<void>
}

export default function TableComponent(props: ITableItem) {
    const {
        dataThead,
        dataTbody,
        LinkRouterCreate,
        PathLinkUpdate,
        handleDelete,
    } = props
    return (
        <div>
            <HeaderTableComponent LinkRouterCreate={LinkRouterCreate} />
            <ContentComponent
                dataThead={dataThead}
                dataTbody={dataTbody}
                PathLinkUpdate={PathLinkUpdate}
                handleDelete={handleDelete}
            />
        </div>
    )
}
