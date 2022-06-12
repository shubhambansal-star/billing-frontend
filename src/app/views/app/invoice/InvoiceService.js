import axios from '../../../../axios/axios';
export const getAllInvoice = () => {
    return axios.get("/api/bill-detail-list/all")
}
export const getInvoiceById = async (id) => {
    return await axios.get(`/api/bill-detail/${id}`)
}

export const getBillById = async (id) => {
    return await axios.get(`/api/bill-get/${id}`)
}

export const deleteInvoice = (invoice) => {
    return axios.post("/api/invoices/delete", invoice)
}
export const addInvoice = (invoice) => {
    console.log(invoice)
    return axios.put("/api/bill-detail/0", invoice)
}
export const updateInvoice = (id,invoice) => {
    return axios.patch("/api/bill-detail/"+id, invoice)
}
export const getAllParty = () => {
    return axios.get("/api/bill-to-list/all")
}
export const getAllCompany = () =>{
    return axios.get("/api/bill-by-list/all")
}
export const getAllInvoicebyCompany =(CompanyName,billperpage,pageNumber,year,search) =>{
    return axios.get(`/api/bill-details-list/1?bill_by=${CompanyName}&bw=A&search_year=${year}&limit=${billperpage}&offset=${pageNumber*billperpage}&search_bill=${search}`)
}