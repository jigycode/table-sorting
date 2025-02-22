import { useState } from "react";
import { useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setTasks(savedNotes);
    }
  }, []);

  const addTask = () => {
    if (task.trim() !== "") {
      if (isEditing) {
        const updatedTasks = tasks.map((t, i) =>
          i === currentTaskIndex ? { ...t, text: task } : t
        );
        setTasks(updatedTasks);
        setIsEditing(false);
        setCurrentTaskIndex(null);
        toast.success("Task updated successfully!"); // ✅ Toast for edit
      } else {
        setTasks([...tasks, { text: task, completed: false }]);
        toast.success("Task added successfully!"); // ✅ Toast for add
      }
      setTask("");
    } else {
      toast.error("Task cannot be empty!"); // ❌ Error Toast
    }
    localStorage.setItem("notes", JSON.stringify(tasks));
  };

  const editTask = (index) => {
    setTask(tasks[index].text);
    setIsEditing(true);
    setCurrentTaskIndex(index);
  };

  const toggleTask = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
    toast.success("Task deleted successfully!"); // ✅ Toast for delete
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTask();
          }}
          className="flex mb-4"
        >
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            placeholder="Add a new task..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </form>
        <ul>
          {tasks.map((t, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b"
            >
              <span
                onClick={() => toggleTask(index)}
                className={`flex-1 cursor-pointer ${
                  t.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {t.text}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => editTask(index)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
}
