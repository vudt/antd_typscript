import moment from "moment"

export class Member {
  id: number = null
  first_name: string = null
  last_name: string = null
  email: string = null
  gender: number = null
  date_of_birth: any
  images: any[]

  constructor(memberResponse: any) {
    this.id = memberResponse?.id 
    this.first_name = memberResponse?.first_name
    this.last_name = memberResponse?.last_name
    this.email = memberResponse?.email
    this.gender = memberResponse?.gender
    this.date_of_birth = memberResponse.date_of_birth ? moment(memberResponse.date_of_birth, 'YYYY-MM-DD') : ''
    this.images = memberResponse?.image
  }

  fullname() {
    return `${this.first_name} ${this.last_name}`
  }
}