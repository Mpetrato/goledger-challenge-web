import axios from "axios"
import { useEffect } from "react"

export const App = () => {
  
  useEffect(() => {


    axios.post('http://ec2-100-25-136-128.compute-1.amazonaws.com/api/query/readAsset', {
      "key": {
        "@assetType": "car",
        "id": 111
      }
    })
    .then((response) => {
      console.log(response.data)
    })
  }, [])
  
  return (
    <div>....</div>
  )
}