import axios from '../../../../../axios/axios';

export const createParty = async (inputValue) => {
    return await axios.put("/api/orders/party/0", inputValue)
}
export const createBroker = async (inputValue) => {
    return await axios.put("/api/orders/broker/0", { name: inputValue })
}
export const getAllOrderParty = async (party_type) => {
    return await axios.get(`/api/orders/party-list/all?party_type=${party_type}`)
}
export const getAllParty = async () => {
    return await axios.get('/api/orders/party-list/all?party_type__in=mandi-purchase&party_type__in=purchase&party_type__in=broker')
}
export const getAllBroker = () => {
    return axios.get("/api/orders/broker-list/all")
}
export const getPurchaseOrderByID = (id) => {
    return axios.get("/api/orders/purchase/" + id)
}
export const getDetailedPurchaseOrderByID = (id) => {
    return axios.get("/api/orders/detailed-purchase/" + id)
}
export const getAllPurchaseOrder = (limit, offset, purchase_type, search, start_date, end_date, pending) => {
    const url = `/api/orders/purchase-list/1?limit=${limit}&offset=${limit * offset}&${purchase_type ? "purchase_type=" + purchase_type + "&" : ""}${search ? "search_term=" + search + "&" : ""}${start_date ? "date__gte=" + start_date + "&" : ""}${end_date ? "date__lte=" + end_date + "&" : ""}${pending ? pending : ""}`
    return axios.get(url)
}
export const deletePurchaseOrder = (id) => {
    return axios.delete("/api/orders/purchase/" + id)
}
export const addPurchaseOrder = (purchase) => {
    return axios.put("/api/orders/purchase/0", purchase)
}
export const updatePurchaseOrder = (id, company) => {
    return axios.patch("/api/orders/purchase/" + id, company)
}