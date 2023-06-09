import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {taskInput, tag} = taskDetails

  return (
    <li className="list-item">
      <p className="task-heading">{taskInput}</p>
      <p className="button-task">{tag}</p>
    </li>
  )
}
export default TaskItem
