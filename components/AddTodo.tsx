import React, { useRef } from "react";

interface PropsAddTodo {
  handleAddTodo: (title: string) => void
}

const AddTodo: React.FC<PropsAddTodo> = (props) => {
  console.log(props)
  
  const inputText = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const title = inputText.current?.value
    if (title) {
      props.handleAddTodo(title)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input type="text" ref={inputText} />
      <button>Add</button>
    </form>
  )
}

export default AddTodo;