import {GrEdit} from 'react-icons/gr'
import {RxCross2} from 'react-icons/rx'

import './index.css'

const TodoItem = props => {
  const {details, deleteTodo, newTodoValue, changeCounter} = props
  const {id, value, counter} = details
  let isEditing = true
  const isEditingInputClassName = isEditing ? ' inputDisplay' : 'inputHide'
  const isEditingPara = isEditing ? 'paraHide' : 'paraDisplay'

  const onChangeTodoItem = event => {
    newTodoValue(id, event.target.value)
  }
  const onBlurInput = event => {
    changeCounter(id, event.target.value)
  }

  const onClickUpdate = () => {
    isEditing = true
  }

  const onClickDelete = () => {
    deleteTodo(id)
  }

  return (
    <>
      <li>
        <input
          value={value}
          onChange={onChangeTodoItem}
          onBlur={onBlurInput}
          className={`${isEditingInputClassName} todoItemInput`}
        />
        <p className={`${isEditingPara}`}>{value}</p>
        <span>(Updated {counter} Times)</span>
        <div className="todo-item-edits">
          <button type="button" onClick={onClickUpdate}>
            <GrEdit />
          </button>

          <button type="button" className="cross-icon" onClick={onClickDelete}>
            <RxCross2 />
          </button>
        </div>
      </li>
    </>
  )
}

export default TodoItem
