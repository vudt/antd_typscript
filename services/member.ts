import { DataMember } from "../interfaces/member"
import { Member } from "../models/Member"
import moment from "moment"

export const prepareListMembers = (listMembers: DataMember[]) : DataMember[] => {
  const result: DataMember[] = listMembers.map((item: any) => {
    const member = new Member(item)
    return {
      id: member.id,
      key: member.id,
      full_name: member.fullname(),
      date_of_birth: moment(item.date_of_birth).format("DD-MM-YYYY"),
      address: '415 tô ngọc vân',
      status: item.status
    }
  })
  return result;
}