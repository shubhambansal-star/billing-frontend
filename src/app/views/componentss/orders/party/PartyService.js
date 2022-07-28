import axios from '../../../../../axios/axios';

export const getAllParty = (party_type, search) => {
    return axios.get(`/api/orders/party-list/all?sort_by__in=name&sort_by__in=email&party_type=${party_type}&search_term=${search}`)
}
export const getPartyByID = (id) => {
    return axios.get("/api/orders/party/" + id)
}
export const deleteParty = (id) => {
    return axios.delete("/api/orders/party/" + id)
}
export const addParty = (broker) => {
    return axios.put("/api/orders/party/0", broker)
}
export const updateParty = (id, company) => {
    return axios.patch("/api/orders/party/" + id, company)
}