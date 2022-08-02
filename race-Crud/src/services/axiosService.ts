import axios from "axios"

export const axiosService = {
    getCar: async () => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/query/search', {
            "query": {
                "selector": {
                    "@assetType": "car"
                }
            }
        })
        const data = response.data.result
        return data
    },
    getDriverName: async (key: string) => {
        const response = await axios.post("http://ec2-100-25-136-128.compute-1.amazonaws.com/api/query/readAsset", {
            "key": {
                "@assetType": "driver",
                "@key": key
            }
        })
        const data = response.data
        return data
    },
}