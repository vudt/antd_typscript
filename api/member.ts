import axios from 'axios';
import { IMemberParamsRequest, IMemberParamsSubmit } from '../interfaces/member';

export const fetchMember = async (params: IMemberParamsRequest) => {
  try {
    const response = await axios.get('https://corecmms.com/api/v1/members', {params})
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const getMember = async (id: number) => {
  try {
    const response = await axios.get(`https://corecmms.com/api/v1/members/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export const createMember = async(params: any) => {
  try {
    const headers = {'Content-Type': 'multipart/form-data'}
    const response = await axios.post('https://corecmms.com/api/v1/members', params, {headers: headers})
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}