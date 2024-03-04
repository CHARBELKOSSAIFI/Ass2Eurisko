
import React, { useState } from 'react';
import { Tab, Tabs, Spinner, Form, Button } from 'react-bootstrap';

interface Task {
  id: number;
  name: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleCreateTask = () => {
    if (newTaskName.trim() === '') return;

    const newTask: Task = {
      id: Date.now(),
      name: newTaskName,
      completed: false,
    };

    setActiveTasks([...activeTasks, newTask]);
    setNewTaskName('');
  };

  const handleTaskStatusToggle = (taskId: number) => {
    const updatedTasks = activeTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setActiveTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId: number, isCompleted: boolean) => {
    if (isCompleted) {
      const filteredTasks = completedTasks.filter(task => task.id !== taskId);
      setCompletedTasks(filteredTasks);
    } else {
      const filteredTasks = activeTasks.filter(task => task.id !== taskId);
      setActiveTasks(filteredTasks);
    }
  };

  return (
    <div className="container">
      <Tabs defaultActiveKey="active" id="tasks-tab" className="mb-3">
        <Tab eventKey="active" title="Active Tasks">
          {loading && <Spinner animation="border" />}
          {!loading && (
            <>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Enter task name"
                  value={newTaskName}
                  onChange={(e) => setNewTaskName(e.target.value)}
                />
                <Button
                  variant="primary"
                  onClick={handleCreateTask}
                  disabled={!newTaskName.trim()}
                >
                  Create
                </Button>
              </Form.Group>
              {activeTasks.length === 0 && <p>No Active tasks.</p>}
              {activeTasks.map(task => (
                <div key={task.id} className="task">
                  <Form.Check
                    type="checkbox"
                    label={task.name}
                    checked={task.completed}
                    onChange={() => handleTaskStatusToggle(task.id)}
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteTask(task.id, false)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </>
          )}
        </Tab>
        <Tab eventKey="completed" title="Completed Tasks">
          {loading && <Spinner animation="border" />}
          {!loading && (
            <>
              {completedTasks.length === 0 && <p>No Completed Tasks.</p>}
              {completedTasks.map(task => (
                <div key={task.id} className="task">
                  <Form.Check
                    type="checkbox"
                    label={task.name}
                    checked={task.completed}
                    onChange={() => handleTaskStatusToggle(task.id)}
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteTask(task.id, true)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </>
          )}
        </Tab>
      </Tabs>
    </div>
  );
};

export default App;
