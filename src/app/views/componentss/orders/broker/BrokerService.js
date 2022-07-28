import axios from '../../../../../axios/axios';

export const getAllBroker = () => {
    return axios.get("/api/orders/party-list/all?party_type=broker")
}
export const getBrokerByID = (id) => {
    return axios.get("/api/orders/party/" + id)
}
export const deleteBroker = (id) => {
    return axios.delete("/api/orders/party/" + id)
}
export const addBroker = (broker) => {
    return axios.put("/api/orders/party/0", broker)
}
export const updateBroker = (id, company) => {
    return axios.patch("/api/orders/party/" + id, company)
}

export const getAllOrdersByBroker = async (id) => {
    const res1 = await axios.get(`/api/orders/purchase-list/all?broker=${id}`)
    const res2 = await axios.get(`/api/orders/sales-list/all?broker=${id}`)
    return { purchaseOrder: res1.data, salesOrder: res2.data }
}