import axios from '../../../../axios/axios';

export const getAllParty = (limit,offset,search_s) => {
    return axios.get(`/api/bill-to-list/1?limit=${limit}&offset=${limit*offset}&search_term=${search_s}`)
}
export const getPartyByID = (id) => {
    return axios.get("/api/bill-to/"+id)
}
export const deleteParty = (id) => {
    return axios.delete("/api/bill-to/"+id)
}
export const addParty = (party) => {
    return axios.put("/api/bill-to/0", party)
}
export const updateParty = (id,party) => {
    return axios.patch("/api/bill-to/"+id, party)
}