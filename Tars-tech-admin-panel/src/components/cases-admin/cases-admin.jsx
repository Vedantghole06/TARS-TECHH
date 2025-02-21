import { useState, useEffect } from "react";
import 'react-quill/dist/quill.snow.css';

export const CasesAdmin = () => {
  const [cases, setCases] = useState([]);
  const [newCase, setNewCase] = useState({
    title: "",
    technologies: "",
    figmaProvider: "",
    whatWasBuild: "",
    whatWeAdded: "",
    problemSolved: "",
    problemBefore: "",
    author: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [selectedCasesId, setSelectedCasesId] = useState(null);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://tars-tech-backend.vercel.app/api/cases");
      const data = await response.json();
      setCases(data);
      setShowModal(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cases:", error);
      setMessage({ type: "error", text: "Failed to load cases." });
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewCase({ ...newCase, image: files[0] });
    } else {
      setNewCase({ ...newCase, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newCase.title ||
      !newCase.technologies ||
      !newCase.figmaProvider ||
      !newCase.whatWasBuild ||
      !newCase.whatWeAdded ||
      !newCase.problemBefore ||
      !newCase.problemSolved ||
      !newCase.author ||
      !newCase.image
    ) {
      setMessage({ type: "error", text: "All fields are required." });
      return;
    }

    const formData = new FormData();
    formData.append("title", newCase.title);
    formData.append("technologies", newCase.technologies);
    formData.append("figmaProvider", newCase.figmaProvider);
    formData.append("whatWasBuild", newCase.whatWasBuild);
    formData.append("whatWeAdded", newCase.whatWeAdded);
    formData.append("problemBefore", newCase.problemBefore);
    formData.append("problemSolved", newCase.problemSolved);
    formData.append("author", newCase.author);
    formData.append("image", newCase.image);

    try {
      setLoading(true);
      const response = await fetch("https://tars-tech-backend.vercel.app/api/cases",
        {
          method: "POST",
          body: formData,
        });

      if (response.ok) {
        fetchCases();  // Reload the cases list
        setNewCase({
          title: "",
          technologies: "",
          figmaProvider: "",
          whatWasBuild: "",
          whatWeAdded: "",
          problemSolved: "",
          problemBefore: "",
          author: "",
          image: null,
        });
        setMessage({ type: "success", text: "Case added successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to add case." });
      }
    } catch (error) {
      console.error("Error adding case:", error);
      setMessage({ type: "error", text: "Error occurred while adding the case." });
    } finally {
      setLoading(false);
    }
  };
  const confirmDelete = (id) => {
    setSelectedCasesId(id);
    setShowModal(true);
  };
  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://tars-tech-backend.vercel.app/api/cases/${selectedCasesId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCases();
        setMessage({ type: "success", text: "Case deleted successfully!" });
      } else {
        setMessage({ type: "error", text: "Failed to delete case." });
      }
    } catch (error) {
      console.error("Error deleting case:", error);
      setMessage({ type: "error", text: "Error occurred while deleting the case." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
        Manage Cases
      </h2>

      {message.text && (
        <div
          className={`p-4 mb-6 text-white rounded ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newCase.title}
            onChange={handleInputChange}
            placeholder="Case title"
            required
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="technologies" className="block text-gray-700 font-medium mb-2">Technologies Used:</label>
          <input
            type="text"
            id="technologies"
            name="technologies"
            value={newCase.technologies}
            onChange={handleInputChange}
            placeholder="Technologies"
            required
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="figmaProvider" className="block text-gray-700 font-medium mb-2">Figma Provider:</label>
          <input
            type="text"
            id="figmaProvider"
            name="figmaProvider"
            value={newCase.figmaProvider}
            onChange={handleInputChange}
            placeholder="Figma Provider"

            className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="whatWasBuild" className="block text-gray-700 font-medium mb-2">What Was Built:</label>
          <input
            type="text"
            id="whatWasBuild"
            name="whatWasBuild"
            value={newCase.whatWasBuild}
            onChange={handleInputChange}
            placeholder="What Was Build"
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="whatWeAdded" className="block text-gray-700 font-medium mb-2">What We Added</label>
          <textarea
            id="whatWeAdded"
            name="whatWeAdded"
            value={newCase.whatWeAdded}
            onChange={handleInputChange}
            placeholder="What We Added"

            className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="problemBefore" className="block text-gray-700 font-medium mb-2">Problem Before</label>
          <textarea
            id="problemBefore"
            name="problemBefore"
            value={newCase.problemBefore}
            onChange={handleInputChange}
            placeholder="Problem Before"

            className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="problemSolved" className="block text-gray-700 font-medium mb-2">Problem Solved</label>
          <textarea
            id="problemSolved"
            name="problemSolved"
            value={newCase.problemSolved}
            onChange={handleInputChange}
            placeholder="Problem Solved"

            className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={newCase.author}
            onChange={handleInputChange}
            placeholder="Case author"
            required
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
            accept="image/*"
            required
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition duration-200"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Case"}
        </button>
      </form>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        {loading && !cases.length ? (
          <p className="text-center text-gray-500">Loading cases...</p>
        ) : (
          <table className="w-full table-auto text-gray-700">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold">Title</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Technologies</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Figma Provider</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">What Was Build</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">What We Added</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Problem Before</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Problem Solved</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Author</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Image</th>
                <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem) => (
                <tr key={caseItem._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">{caseItem.title}</td>
                  <td className="py-4 px-4">{caseItem.technologies}</td>
                  <td className="py-4 px-4">{caseItem.figmaProvider}</td>
                  <td className="py-4 px-4">{caseItem.whatWasBuild}</td>
                  <td className="py-4 px-4">{caseItem.whatWeAdded}</td>
                  <td className="py-4 px-4">{caseItem.problemBefore}</td>
                  <td className="py-4 px-4">{caseItem.problemSolved}</td>
                  <td className="py-4 px-4">{caseItem.author}</td>
                  <td className="py-4 px-4">
                    <img src={`${caseItem.image}`} alt={caseItem.title} className="w-16 h-16 object-cover rounded-md" />
                  </td>
                  <td className="py-4 px-4">
                    <button
                      onClick={() => confirmDelete(caseItem._id)}
                      className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                      disabled={loading}
                    >
                      {loading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default CasesAdmin;
