const FormatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString("vi", {
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        month: "short",
        year: "numeric",
    })
}

export default FormatDate
