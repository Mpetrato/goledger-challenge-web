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
    getDrivers: async () => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/query/search', {
            "query": {
                "selector": {
                    "@assetType": "driver"
                }
            }
        })
        const data = response.data.result
        return data
    },
    getEvents: async () => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/query/search', {
            "query": {
                "selector": {
                    "@assetType": "event"
                }
            }
        })
        const data = response.data.result
        return data
    },
    getDriverName: async (key: string) => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/query/readAsset', {
            "key": {
                "@assetType": "driver",
                "@key": key
            }
        })
        const data = response.data
        return data
    },
    getTeamName: async (key: string) => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/query/readAsset', {
            "key": {
                "@assetType": "team",
                "@key": key
            }
        })
        const data = response.data
        return data
    },
    getEventName: async (key: string) => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/query/readAsset', {
            "key": {
                "@assetType": "event",
                "@key": key
            }
        })
        const data = response.data
        return data
    },
    registerACar: async (model: string, key: string) => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/createAsset', {
            "asset": [
                {
                    "@assetType": "car",
                    "id": (Math.random() * 10000).toFixed(0),
                    "model": model,
                    "driver": {
                        "@key": key
                    }
                }
            ]
        })
        const data = response.data
        return data
    },
    registerADriver: async (name: string, key: string) => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/createAsset', {
            "asset": [
                {
                    "@assetType": "driver",
                    "id": (Math.random() * 10000).toFixed(0),
                    name,
                    "team": {
                        "@key": key
                    }
                }
            ]
        })
        const data = response.data
        return data
    },
    registerATeam: async (name: string, ) => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/createAsset', {
            "asset": [
                {
                    "@assetType": "team",
                    "id": (Math.random() * 10000).toFixed(0),
                    name,
                }
            ]
        })
        const data = response.data
        return data
    },
    registerAEvent: async (name: string, prize: number, winner: string) => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/createAsset', {
            "asset": [
                {
                  "@assetType": "event",
                  name,
                  "date": new Date(),
                  prize,
                  "winner": {
                    "@key": winner
                  }
                }
              ]
        })
        const data = response.data
        return data
    },
    deleteCar: async (id: number) => {
        try{
            const response = await axios.delete('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/deleteAsset', { data: {
                    "key": {
                        "@assetType": "car",
                        "id": id
                    }
                }
            })
            return response.data
        }
        catch{
            alert('Could not delete, because it is linked to another item')
        }
    },
    deleteDriver: async (id: number) => {
        try{
            const response = await axios.delete('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/deleteAsset', { data: {
                    "key": {
                        "@assetType": "driver",
                        "id": id
                    }
                }
            })
            return response.data
        }
        catch{
            alert('Could not delete, because it is linked to another item')
        }
    },
    deleteTeam: async (id: number) => {
        try{
            const response = await axios.delete('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/deleteAsset', { data: {
                    "key": {
                        "@assetType": "team",
                        "id": id
                    }
                }
            })
            return response.data

        }
        catch{
            alert('Could not delete, because it is linked to another item')
        }
    },
    deleteEvent: async (id: number) => {
        try{
            const response = await axios.delete('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/deleteAsset', { data: {
                    "key": {
                        "@assetType": "event",
                        "id": id
                    }
                }
            })
            return response.data
        }
        catch{
            alert('Could not delete, because it is linked to another item')
        }
    },
    updateCar: async (model: string, key: string, id: number) => {
        const response = await axios.put('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/updateAsset', {
            "update": {
                "@assetType": "car",
                model,
                "driver": {
                    "@key": key
                },
                id
            }
        })
        return response.data
    },
    updatedDriver: async (name: string, key: string, id: number) => {
        const response = await axios.put('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/updateAsset', {
            "update": {
                "@assetType": "driver",
                name,
                "team": {
                    "@key": key
                },
                id
            }
        })
        return response.data
    },
    updateTeam: async (name: string, id: number) => {
        const response = await axios.put('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/updateAsset', {
            "update": {
                "@assetType": "team",
                name,
                id
            }
        })
        return response.data
    },
    updateEvent: async (name: string, prize: number, winner: string) => {
        const response = await axios.put('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/invoke/updateAsset', {
            "update": {
                "@assetType": "event",
                "name": name,
                "date": "2022-08-03T12:34:04.175Z",
                "prize": prize,
                "winner": {
                  "@key": winner
              }
            }
        })
        return response.data
    },
    getTeams: async () => {
        const response = await axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/query/search', {
            "query": {
                "selector": {
                    "@assetType": "team"
                }
            }
        })
        const data = response.data.result
        return data
    },
}