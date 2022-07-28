import axios from '../../../../axios/axios';

export const getAllCompany = () => {
    return axios.get("/api/bill-by-list/all")
}
export const getCompanyByID = (id) => {
    return axios.get("/api/bill-by/" + id)
}
export const deleteCompany = (id) => {
    return axios.delete("/api/bill-by/" + id)
}
export const addCompany = (company) => {
    return axios.put("/api/bill-by/0", company)
}
export const updateCompany = (id, company) => {
    return axios.patch("/api/bill-by/" + id, company)
}