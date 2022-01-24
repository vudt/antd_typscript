export interface DataMember {
  id: number,
  key: number,
  full_name: string,
  dob: string,
  address: string,
  status: number
}

export interface MemberObj {
  id: number 
  first_name: string
  last_name: string
  email: string 
  gender: number
  date_of_birth: string
  images: IImageMember[]
}

export interface IMemberParamsRequest {
  page: number,
  per_page: number,
  sort: string,
  status?: any
}

export interface IImageMember {
  id: number,
  url: string
}

export interface IMemberParamsSubmit {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  confirm_password: string,
  gender: string,
  date_of_birth: string,
  images: IImageMember[],
  status: number | 0
}