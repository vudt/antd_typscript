import React from "react";
import { ITodo } from '../interfaces';


interface PropsListTodo {
  items: ITodo[]
}

const ListTodo: React.FC<PropsListTodo> = (props) => {
  const {items} = props
  return(
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  )
}

export default ListTodo;