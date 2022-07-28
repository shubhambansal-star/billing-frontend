import axios from '../../../../axios/axios';
export const getAllInvoice = () => {
    return axios.get("/api/bill-detail-list/all")
}
export const getInvoiceById = async (id) => {
    if (id !== "create") {
        return await axios.get(`/api/bill-detail/${id}`)
    }
}

export const getBillById = async (id) => {
    return await axios.get(`/api/bill-get/${id}`)
}

export const deleteInvoice = (id) => {
    return axios.delete("/api/bill-detail/" + id)
}
export const addInvoice = (invoice) => {
    return axios.put("/api/bill-detail/0", invoice)
}
export const updateInvoice = (id, invoice) => {
    return axios.patch("/api/bill-detail/" + id, invoice)
}
export const getAllParty = () => {
    return axios.get("/api/bill-to-name-list/all")
}
export const getAllCompany = () => {
    return axios.get("/api/bill-by-name-list/all")
}
export const getAllInvoicebyCompany = (CompanyName, billperpage, pageNumber, year, search, start_date, end_date) => {
    if (CompanyName === 0) {
        return axios.get(`/api/bill-details-list/1?sort_by__in=-date&sort_by__in=bill_to__name&is_active=True&bw=A&search_year=${year}&limit=${billperpage}&offset=${pageNumber * billperpage}&search_bill=${search}${start_date ? "&date__gte=" + start_date : ""}${end_date ? "&date__lte=" + end_date : ""}`)
    } else if (CompanyName === "bw") {
        return axios.get(`/api/bill-details-list/1?sort_by__in=-date&sort_by__in=bill_to__name&is_active=True&bw=B&search_year=${year}&limit=${billperpage}&offset=${pageNumber * billperpage}&search_bill=${search}${start_date ? "&date__gte=" + start_date : ""}${end_date ? "&date__lte=" + end_date : ""}`)
    } else if (CompanyName === "canceled") {
        return axios.get(`/api/bill-details-list/1?sort_by__in=-date&sort_by__in=bill_to__name&is_active=False&search_year=${year}&limit=${billperpage}&offset=${pageNumber * billperpage}&search_bill=${search}${start_date ? "&date__gte=" + start_date : ""}${end_date ? "&date__lte=" + end_date : ""}`)
    }
    return axios.get(`/api/bill-details-list/1?sort_by__in=-date&sort_by__in=-invoice_no&sort_by__in=bill_to__name&is_active=True&bill_by=${CompanyName}&bw=A&search_year=${year}&limit=${billperpage}&offset=${pageNumber * billperpage}&search_bill=${search}${start_date ? "&date__gte=" + start_date : ""}${end_date ? "&date__lte=" + end_date : ""}`)
}