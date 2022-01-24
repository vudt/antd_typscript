import axios from "axios"
import api from "../../../api/interceptors";

export default async function handler(req, res) {
  if (req.method == 'POST') {
    try {
      const headers = {
        'Content-Type': 'multipart/form-data',
      }
      const formData = req.body.formData
      const response = await axios.post('https://corecmms.com/api/v1/pictures', formData, {headers: headers})
      res.status(200).json(response.data)
    } catch(err) {
      res.status(200).json(err)
    }
  } else {
    // res.end()
    // const response = await axios.get('https://corecmms.com/api/v1/pictures')
    res.status(200).json(response.data)
  }	
}