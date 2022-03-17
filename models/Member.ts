import moment from "moment"

export class Member {
  id: number = null
  first_name: string = null
  last_name: string = null
  email: string = null
  gender: number = null
  date_of_birth: any
  country: string 
  city: string
  transfer_history: any[]
  images: any[]

  constructor(memberResponse: any) {
    this.id = memberResponse?.id 
    this.first_name = memberResponse?.first_name
    this.last_name = memberResponse?.last_name
    this.email = memberResponse?.email
    this.gender = memberResponse?.gender
    this.date_of_birth = memberResponse.date_of_birth ? moment(memberResponse.date_of_birth, 'YYYY-MM-DD') : ''
    this.country = memberResponse.country
    this.city = memberResponse.city
    this.transfer_history = this.format_transfer_history(memberResponse?.transfer_history) 
    this.images = memberResponse?.image
  }

  format_transfer_history(data) {
    if (!data) {
      return null
    }
    const result: any[] = data.map((item: any) => {
      return {
        club_name: item.club_name,
        join_date: moment(item.join_date, 'YYYY-MM-DD'),
        fee: item.fee
      }
    })
    return result;
  }

  fullname() {
    return `${this.first_name} ${this.last_name}`
  }
}