const ModalComponent = (props: {
    deleteId: string
    handleDelete: (id: string) => Promise<void>
}) => {
    const { deleteId, handleDelete } = props
    return (
        <div
            className='modal fade'
            id='exampleModal'
            tabIndex={-1}
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title' id='exampleModalLabel'>
                            Xóa Học Sinh
                        </h5>
                        <button
                            type='button'
                            className='btn-close'
                            data-bs-dismiss='modal'
                            aria-label='Close'
                        ></button>
                    </div>
                    <div className='modal-body'>
                        Xóa Học Sinh Này sẽ mất vĩnh viễn không thể phục hồi
                        được. Bạn có chắc muốn xóa không?
                    </div>
                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-danger'
                            onClick={() => handleDelete(deleteId)}
                            data-bs-dismiss='modal'
                        >
                            Xóa
                        </button>
                        <button
                            type='button'
                            className='btn btn-secondary'
                            data-bs-dismiss='modal'
                        >
                            Thoát
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent
