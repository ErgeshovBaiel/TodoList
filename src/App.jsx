import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addTodo, removeTodo } from './redux/slices/todoSlice'
import { FaPlus, FaTrash } from 'react-icons/fa6'

const App = () => {
  const [inputValue, setInputValue] = useState('')
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue))
      setInputValue('')
    }
  }

  const handleDeleteTodo = index => {
    dispatch(removeTodo(index))
  }

  return (
    <div className='w-[500px] h-auto rounded-[20px] bg-neutral-100 m-auto mt-25 border-2 border-[#9448db] p-5'>
      <h1 className='text-4xl font-bold text-[#9448db] mt-2.5'>Todo App</h1>
      <h3 className='text-xl font-bold text-[#9448db] mt-5'>New Todo</h3>
      <div className='flex gap-3.75 mt-5'>
        <input
          className='w-[400px] h-[45px] rounded-[15px] pl-5 outline-none
           border-2 border-[#9448db] text-[16px] font-bold text-[#9448db] placeholder:text-[#9448db]'
          type='text'
          placeholder='Add new todo here'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <button
          onClick={handleAddTodo}
          className='w-11.25 h-11.25 cursor-pointer
         rounded-[15px] bg-[#9448db] flex items-center justify-center'
        >
          <FaPlus className='text-white w-6 h-6' />
        </button>
      </div>
      <div className='mt-5'>
        {todos.map((todo, index) => (
          <div
            key={index}
            className='flex justify-between items-center  mt-[20px] bg-pink-100  w-[460px] h-[45px] rounded-[15px]'
          >
            <span className='text-[#9448db] font-bold pl-5'>{todo}</span>
            <button
              onClick={() => handleDeleteTodo(index)}
              className='text-[#9448db]  cursor-pointer pr-3.75'
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <h3 className='text-xl font-bold text-[#9448db] mt-10'>
        There is 2 pending tasks
      </h3>
    </div>
  )
}

export default App
