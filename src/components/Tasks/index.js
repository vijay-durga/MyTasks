import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import TaskItem from '../TaskItem'

import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Tasks extends Component {
  state = {
    taskInput: '',
    taskList: [],
    tag: tagsList[0].optionId,
    activeId: 'INITIAL',
  }

  onTaskName = e => {
    this.setState({taskInput: e.target.value})
  }

  onSelectTagName = event => {
    this.setState({tag: event.target.value})
  }

  onAddTask = event => {
    event.preventDefault()
    const {taskInput, tag} = this.state

    const newTask = {
      id: uuidv4(),
      taskInput,
      tag,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, newTask],
      taskInput: '',
      tag: tagsList[0].optionId,
    }))
  }

  onClickTagName = event => {
    this.setState(prevState => ({
      activeId:
        prevState.activeId === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  render() {
    const {taskInput, tag, taskList, activeId} = this.state

    const filterTaskList =
      activeId === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tag === activeId)

    return (
      <div className="main-container">
        <div className="left-container">
          <h1 className="heading">Create a task!</h1>
          <form id="add-task" onSubmit={this.onAddTask}>
            <label htmlFor="taskInput" className="task">
              Task
            </label>
            <br />
            <input
              type="text"
              id="taskInput"
              placeholder="Enter the task here"
              value={taskInput}
              onChange={this.onTaskName}
            />
            <br />
            <label htmlFor="activeTagId" className="task">
              Tags
            </label>
            <br />
            <select
              id="activeTagId"
              value={tag}
              onChange={this.onSelectTagName}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <br />
            <button type="submit">Add Task</button>
          </form>
        </div>
        <div className="right-container">
          <h1 className="tags-heading">Tags</h1>
          <ul className="tags-list-container">
            {tagsList.map(each => {
              const isActive = activeId === each.optionId
              const activeClassName = isActive ? 'active-class' : 'tags-buttons'
              return (
                <li className="tags-list-container" key={each.optionId}>
                  <button
                    type="button"
                    value={each.optionId}
                    className={activeClassName}
                    onClick={this.onClickTagName}
                  >
                    {each.displayText}
                  </button>
                </li>
              )
            })}
          </ul>

          <div>
            <h1 className="task-heading">Tasks</h1>
            <ul>
              {filterTaskList.length === 0 ? (
                <p className="no-view">No Tasks Added Yet</p>
              ) : (
                filterTaskList.map(eachTask => (
                  <TaskItem key={eachTask.id} taskDetails={eachTask} />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Tasks
