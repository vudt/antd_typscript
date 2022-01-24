// export interface Todo {
//   id: number,
//   name: string
// }
import { ITodo } from "../interfaces"
export class Todo {
  id: number
  name: string

  constructor({id, name} : ITodo) {
    this.id = id 
    this.name = name
  }
}
