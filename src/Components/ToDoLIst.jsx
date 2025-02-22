import { useState } from "react";
import { useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { Formik } from "formik";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [setTask] = useState("");

  const addTask = (taskText) => {
    if (taskText.trim() !== "") {
      const newTasks = [...tasks, { text: taskText, completed: false }];
      setTasks(newTasks);
      localStorage.setItem("notes", JSON.stringify(newTasks));
      setTask("");
    }
  };

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setTasks(savedNotes);
    }
  }, []);

  const toggleTask = (index) => {
    const newTasks = tasks.map((t, i) =>
      i === index ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">To-Do List</h1>
        <Formik
          initialValues={{ task: "" }}
          onSubmit={(values, { resetForm }) => {
            addTask(values.task);
            resetForm();
          }}
        >
          {({ handleChange, handleSubmit, values }) => (
            <form onSubmit={handleSubmit} className="flex mb-4">
              <input
                type="text"
                name="task"
                value={values.task}
                onChange={handleChange}
                className="flex-1 p-2 border rounded-l-lg focus:outline-none"
                placeholder="Add a new task..."
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
              >
                Add
              </button>
            </form>
          )}
        </Formik>

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
              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
