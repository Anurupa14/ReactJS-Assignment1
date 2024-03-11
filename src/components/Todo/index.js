import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

class Todo extends Component {
  state = {todoList: [], searchInputValue: ''}

  onChangeSearchInput = event => {
    this.setState({searchInputValue: event.target.value})
  }

  onClickAddTodo = () => {
    const {searchInputValue} = this.state
    const timesIndex = searchInputValue.lastIndexOf(' ')
    let times = searchInputValue.slice(timesIndex + 1, searchInputValue.length)

    if (timesIndex === -1) {
      const newTodoItem = {
        id: uuid(),
        value: searchInputValue,
        counter: 0,
        isEditing: false,
      }
      this.setState(prevState => ({
        todoList: [...prevState.todoList, newTodoItem],
      }))
    } else {
      while (times > 0) {
        const newTodoItem = {
          id: uuid(),
          value: searchInputValue.slice(0, timesIndex),
          counter: 0,
          isEditing: false,
        }
        this.setState(prevState => ({
          todoList: [...prevState.todoList, newTodoItem],
        }))
        times -= 1
      }
    }

    this.setState({searchInputValue: ''})
  }

  newTodoValue = (id, inputValue) => {
    const {todoList} = this.state
    const oldItem = todoList.filter(each => each.id === id)[0]
    const newItem = {
      id: oldItem.id,
      value: inputValue,
      counter: oldItem.counter,
      isEditing: true,
    }
    console.log(newItem)
    this.setState(prevState => ({
      todoList: [...prevState.todoList.filter(each => each.id !== id), newItem],
    }))
  }

  changeCounter = (id, newValue) => {
    const {todoList} = this.state
    const oldItem = todoList.filter(each => each.id === id)[0]
    const newItem = {
      id: oldItem.id,
      value: newValue,
      counter: oldItem.counter + 1,
      isEditing: false,
    }
    console.log(newItem)
    this.setState(prevState => ({
      todoList: [...prevState.todoList.filter(each => each.id !== id), newItem],
    }))
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList.filter(each => each.id !== id)],
    }))
  }

  render() {
    const {todoList, searchInputValue} = this.state
    return (
      <>
        <div className="main-container">
          <h1>Day Goals!</h1>
          <div className="input-container">
            <input
              placeholder="Write here"
              value={searchInputValue}
              onChange={this.onChangeSearchInput}
            />
            <button
              type="button"
              className="add-button"
              onClick={this.onClickAddTodo}
            >
              Add Todo
            </button>
          </div>
          <ul>
            {todoList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                details={eachTodo}
                changedInput={this.changedInput}
                newTodoValue={this.newTodoValue}
                deleteTodo={this.deleteTodo}
                changeCounter={this.changeCounter}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }
}
export default Todo
