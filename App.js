import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask] = useState(null);
  const [editTaskValue, setEditTaskValue] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [taskPriority, setTaskPriority] = useState('Low');

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    // Clear task description and priority when closing the modal
    setTaskDescription('');
    setTaskPriority('Low');
    // Clear edit task data
    setEditTaskValue(null);
  };

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, Description: taskDescription, Priority: taskPriority, completed: false }]);
      setNewTask('');
      closeModal();
    }
  };
  const editTaskValueChange = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditTaskValue(taskToEdit);
    setNewTask(taskToEdit.text);
    setTaskDescription(taskToEdit.Description);
    setTaskPriority(taskToEdit.Priority);
    openModal();
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const saveEdit = (editedTask) => {
    setTasks(tasks.map(task =>
      task.id === editedTask.id ? { ...task, text: newTask, Description: taskDescription, Priority: taskPriority, completed: false  } : task
    ));
    setNewTask('');
    setEditTaskValue(null);
    closeModal();
  };

  return (
    <div className="App">
      <h1 style={{ color: 'blue', textAlign: 'center' }}>Task Manager</h1>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={openModal} style={{ marginBottom: '10px' }}>Add Task</button>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Add Task Modal"
          className="modalPopup"
          ariaHideApp={false} // Fix for accessibility warning
        >
          <h2>{editTaskValue ? 'Edit Task' : 'Add New Task'}</h2>
          <label>Task Name: <input
          type="text"
          placeholder="Task Name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        /></label>
          <label>
            Description:
            <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            rows={4} // Adjust the number of rows as needed
          />
          </label>
          <label>
            Priority:
            <select
              value={taskPriority}
              onChange={(e) => setTaskPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>
          <button onClick={(editTaskValue ? saveEdit(editTaskValue) : addTask)}>
            {editTaskValue ? 'Save Changes' : 'Add Task'}
          </button>
          <button onClick={closeModal}>Cancel</button>
        </Modal>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {editTask === task.id ? (
                  <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                  />
                ) : (
                  task.text
                )}
              </td>
              <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.Description}</td>
              <td style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.Priority}</td>
              <td>
                <button onClick={() => toggleCompletion(task.id)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => editTaskValueChange(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
