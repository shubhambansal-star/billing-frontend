import axios from '../../../../../axios/axios';
const _ = require("lodash");
export const getAllOrderParty = async () => {
    return await axios.get(`/api/orders/party-list/all?party_type__in=mandi-purchase&party_type__in=purchase&party_type__in=broker&party_type__in=bilty`)
}

export const getAllPendingPurchaseOrder = async (partyValue, genes) => {
    let broker = partyValue.filter((party) => {
        return party.val === "broker"
    })
    let party = partyValue.filter((party) => {
        return party.val !== "broker"
    })
    let party_params = party.map((party) => { return "party__in=" + party.value }).join("&")
    let broker_params = broker.map((broker) => { return "broker__in=" + broker.value }).join("&")
    let res1 = party_params ? await axios.get(`/api/orders/purchase-list/all?${party_params}&pending__gt=0&genes=${genes}`) : []
    let res2 = broker_params ? await axios.get(`/api/orders/purchase-list/all?${broker_params}&pending__gt=0&genes=${genes}`) : []
    let result = _.unionBy(res1.data, res2.data, 'id');
    console.log(result)
    return result
}
export const getAllPendingPurchaseOrderUpdate = async (id, partyValue, genes) => {
    let broker = partyValue.filter((party) => {
        return party.val === "broker"
    })
    let party = partyValue.filter((party) => {
        return party.val !== "broker"
    })
    let party_params = party.map((party) => { return "party__in=" + party.value }).join("&")
    let broker_params = broker.map((broker) => { return "broker__in=" + broker.value }).join("&")
    let res1 = party_params ? await axios.get(`/api/orders/get-purchase-orders/${id}?${party_params}&pending__gt=0&genes=${genes}`) : []
    let res2 = broker_params ? await axios.get(`/api/orders/get-purchase-orders/${id}?${broker_params}&pending__gt=0&genes=${genes}`) : []
    let result = _.unionBy(res1.data, res2.data, 'id');
    console.log(result)
    return result
}

export const getAllPendingSalesOrder = async (party, genes) => {
    return await axios.get(`/api/orders/sales-list/all?${party}&pending__gt=0&genes=${genes}`)

}

export const getAllPendingUnloading = async () => {
    return await axios.get('/api/orders/loading-list/all?unloaded=False')
}
export const getAllLoading = (filter, search_term, start_date, end_date, limit, offset) => {
    const genes = filter?.filter((obj) => { return obj.val === "genes" }).map((obj => { return "genes__in=" + obj.value })).join("&")
    const party = filter?.filter((obj) => { return obj.val === "mandi-purchase" || obj.val === "purchase" || obj.val === "broker" }).map((obj => { return "loading_from__in=" + obj.value })).join("&")
    const bill_or_builty = filter?.filter((obj) => { return obj.val === "bilty" }).map((obj) => { return "bill_or_builty__in=" + obj.value }).join("&")
    const url = `/api/orders/loading-list/1?sort_by__in=-date&sort_by__in=id&${"limit=" + limit + "&"}${"offset=" + limit * offset}${search_term ? "&search_term=" + search_term : ""}${genes ? "&" + genes : ""}${party ? "&" + party : ""}${start_date ? "&date__gte=" + start_date : ""}${end_date ? "&date__lte=" + end_date : ""}${bill_or_builty ? "&" + bill_or_builty : ""}`
    return axios.get(url)
}
export const getBrokerByID = (id) => {
    return axios.get("/api/orders/loading/" + id)
}
export const getDetailedUnloadingByID = (id) => {
    return axios.get("/api/orders/detailed-unloading/" + id)
}
export const deleteBroker = (id) => {
    return axios.delete("/api/orders/loading/" + id)
}
export const addLoading = (broker) => {
    return axios.put("/api/orders/loading/0", broker)
}
export const updateBroker = (id, company) => {
    return axios.patch("/api/orders/loading/" + id, company)
}