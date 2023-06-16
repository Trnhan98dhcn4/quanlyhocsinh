import { ArrayObjectArray, RowsShowTable } from "../../../utils"

interface ITableItem {
    dataTbody: {}[]
    dataThead: string[]
    PathLinkUpdate: string
    handleDelete: (id: string) => Promise<void>
}

export default function ContentComponent(props: ITableItem) {
    const { dataTbody, dataThead, PathLinkUpdate, handleDelete } = props

    const result = ArrayObjectArray(dataTbody)
    const rows = RowsShowTable(result, handleDelete, PathLinkUpdate)
    return (
        <div className='p-3'>
            <div>
                <table className='table table-light mt-3'>
                    <thead>
                        <tr>
                            {dataThead.map((item, index) => (
                                <th key={index}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        </div>
    )
}
