import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, removeTodo } from './redux/slices/todoSlice'
import { FaPlus, FaTrash } from 'react-icons/fa6'

const App = () => {
  const [inputValue, setInputValue] = useState("")
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || []
    savedTodos.forEach(todo => dispatch(addTodo(todo)))
  }, [dispatch])

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue))
      setInputValue('')
    }
  }

  const handleDeleteTodo = index => {
    dispatch(removeTodo(index))
  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  return (
    <div className='w-[400px] h-auto rounded-[20px] bg-neutral-100 m-auto mt-25 border-2 border-[#3d6ff6] p-5'>
      <h1 className='text-4xl font-bold text-[#3d6ff6] mt-2.5'>Todo App</h1>
      <h3 className='text-xl font-bold text-[#3d6ff6] mt-5'>New Todo</h3>
      <div className='flex gap-3.75 mt-5'>
        <input
          className='w-[400px] h-[45px] rounded-[15px] pl-5 outline-none
           border-2 border-[#3d6ff6] text-[16px] font-bold text-[#3d6ff6] placeholder:text-[#3d6ff6]'
          type='text'
          placeholder='Add new todo here'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className='w-15 h-11 cursor-pointer
         rounded-[15px] bg-[#3d6ff6] flex items-center justify-center'
        >
          <FaPlus className='text-white w-6 h-6' />
        </button>
      </div>
      <div className='mt-5'>
        {todos.map((todo, index) => (
          <div
            key={index}
            className='flex justify-between items-center  mt-[20px] bg-[#c9d7fe]  w-[360px] h-[45px] rounded-[15px]'
          >
            <span className='text-[#3d6ff6] font-bold pl-5'>{todo}</span>
            <button
              onClick={() => handleDeleteTodo(index)}
              className='text-[#3d6ff6]  cursor-pointer pr-3.75'
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <h3 className='text-[18px] font-bold text-[#3d6ff6] mt-10'>
        There is 2 pending tasks
      </h3>
    </div>
  )
}

export default App
