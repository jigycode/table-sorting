import { useState, useEffect } from "react";
import {} from "react-icons/fa";

const ToDo = () => {
  const [notes, setNotes] = useState([]);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNoteColor, setNewNoteColor] = useState("bg-blue-500");

  // Load saved notes from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  // Save notes to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes));
  // }, [notes]);

  // Add a new note
  const addNote = () => {
    if (newNoteTitle.trim() === "") return;
    setNotes([
      ...notes,
      { title: newNoteTitle, color: newNoteColor, tasks: [] },
    ]);
    localStorage.setItem("notes", JSON.stringify(notes));
    setNewNoteTitle("");
  };

  // Add a task to a specific note
  const addTask = (noteIndex, task) => {
    if (task.trim() === "") return;
    const updatedNotes = [...notes];
    updatedNotes[noteIndex].tasks.push({ text: task, completed: false });
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  // Toggle task completion
  const toggleTask = (noteIndex, taskIndex) => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex].tasks[taskIndex].completed =
      !updatedNotes[noteIndex].tasks[taskIndex].completed;
    setNotes(updatedNotes);
  };

  // Remove a task from a specific note
  const removeTask = (noteIndex, taskIndex) => {
    const updatedNotes = [...notes];
    updatedNotes[noteIndex].tasks = updatedNotes[noteIndex].tasks.filter(
      (_, i) => i !== taskIndex
    );
    setNotes(updatedNotes);
  };

  // Remove an entire note section
  const removeNote = (noteIndex) => {
    setNotes(notes.filter((_, i) => i !== noteIndex));
  };

  return (
    <div className="min-h-screen bg-purple-200 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">To-Do List</h1>

      {/* Note Creation Section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
          placeholder="New Note Title..."
          className="w-full p-2 border rounded-md bg-gray-800 text-white focus:outline-none"
        />
        <select
          className="p-2 border rounded-md bg-gray-800 text-white"
          onChange={(e) => setNewNoteColor(e.target.value)}
        >
          <option value="bg-blue-500">Blue</option>
          <option value="bg-yellow-500">Yellow</option>
          <option value="bg-red-500">Red</option>
          <option value="bg-green-500">Green</option>
        </select>
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>

      {/* Display Notes in Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes?.map((note, noteIndex) => (
          <div
            key={noteIndex}
            className={`${note.color} p-4 rounded-lg shadow-md`}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <button
                onClick={() => removeNote(noteIndex)}
                className="text-white hover:text-gray-200"
              >
                🗑
              </button>
            </div>

            {/* Task Input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="New Task..."
                className="w-full p-2 border rounded-md bg-gray-200 text-black focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === "Enter") addTask(noteIndex, e.target.value);
                }}
              />
            </div>

            {/* Task List */}
            <ul>
              {note?.tasks?.map((task, taskIndex) => (
                <li
                  key={taskIndex}
                  className={`flex justify-between items-center p-2 mb-1 rounded-md ${
                    task.completed
                      ? "bg-green-200 line-through"
                      : "bg-white text-black"
                  }`}
                >
                  <span
                    className="cursor-pointer"
                    onClick={() => toggleTask(noteIndex, taskIndex)}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => removeTask(noteIndex, taskIndex)}
                    className="text-red-500 hover:text-blue-700 font-bold"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToDo;
