import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", image: null });
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://tars-tech-backend.vercel.app/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setNewProduct({ ...newProduct, image: files[0] });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("image", newProduct.image);

    try {
      const response = await fetch("https://tars-tech-backend.vercel.app/api/products", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        fetchProducts();
        setNewProduct({ name: "", description: "", image: null });
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const confirmDelete = (id) => {
    setSelectedProductId(id);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://tars-tech-backend.vercel.app/api/products/${selectedProductId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchProducts();
        setShowModal(false);
        setSelectedProductId(null);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Manage Products</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Enter product name"
            required
            className="block w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Product Image
          </label>
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

        <div className="mb-6">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <ReactQuill
            value={newProduct.description}
            onChange={(description) => setNewProduct({ ...newProduct, description })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gray-600 text-white rounded-md font-medium hover:bg-gray-700 transition duration-200"
        >
          Add Product
        </button>
      </form>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <table className="w-full table-auto text-gray-700">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Image</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Description</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">{product.name}</td>
                <td className="py-4 px-4">
                  <img
                    src={`${product.image}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-4 px-4 max-w-md hover:whitespace-normal hover:overflow-auto">
                  {product.description.substring(0, 100)}...
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => confirmDelete(product._id)}
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
