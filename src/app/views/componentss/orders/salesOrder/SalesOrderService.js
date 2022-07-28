import axios from '../../../../../axios/axios';

export const createParty = async (inputValue) => {
    return await axios.put("/api/orders/party/0", inputValue)
}
export const getAllOrderParty = async (value) => {
    return await axios.get(`/api/orders/party-list/all?party_type=${value}`)
}
export const getAllParty = async () => {
    return await axios.get('/api/orders/party-list/all?party_type__in=mandi-sales&party_type__in=sales&party_type__in=broker')
}
export const getAllSalesOrder = (limit, offset, sales_type, search, start_date, end_date, pending) => {
    const url = `/api/orders/sales-list/1?limit=${limit}&offset=${limit * offset}&${sales_type ? "sales_type=" + sales_type + "&" : ""}${search ? "search_term=" + search + "&" : ""}${start_date ? "date__gte=" + start_date + "&" : ""}${end_date ? "date__lte=" + end_date + "&" : ""}${pending ? pending : ""}`
    return axios.get(url)
}
export const getSalesOrderByID = (id) => {
    return axios.get("/api/orders/sales/" + id)
}
export const getDetailedSalesOrderByID = (id) => {
    return axios.get("/api/orders/detailed-sales/" + id)
}
export const deleteSalesOrder = (id) => {
    return axios.delete("/api/orders/sales/" + id)
}
export const addSalesOrder = (sales) => {
    return axios.put("/api/orders/sales/0", sales)
}
export const updateSalesOrder = (id, sales) => {
    return axios.patch("/api/orders/sales/" + id, sales)
}