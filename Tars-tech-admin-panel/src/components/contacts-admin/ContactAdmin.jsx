import { useState, useEffect } from 'react';

export const ContactsAdmin = () => {
  const [contacts, setContacts] = useState([]);
  const [showModal , setShowModal] = useState(false);
  const [selectedContactId , setSelectedContactId ]  =useState(null)

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch('https://tars-tech-backend.vercel.app/api/contacts');
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };
  const confirmDelete = (id) => {
    setSelectedContactId(id);
    setShowModal(true);
  };
  const deleteContact = async () => {
    try {
      const response = await fetch(`https://tars-tech-backend.vercel.app/api/contacts/${selectedContactId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setContacts(contacts.filter(contact => contact._id !== selectedContactId));
        setShowModal(false)
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Contact Submissions</h2>

      <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
        <table className="w-full table-auto text-gray-700">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-semibold">Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Email</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Number</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Message</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Date</th>
              <th className="py-3 px-4 text-left text-sm font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">{contact.name}</td>
                <td className="py-4 px-4">{contact.email}</td>
                <td className="py-4 px-4">{contact.number}</td>
                <td className="py-4 px-4 max-w-xs overflow-hidden hover:whitespace-normal hover:overflow-auto">{contact.message}</td>
                <td className="py-4 px-4">{new Date(contact.createdAt).toLocaleString()}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => confirmDelete(contact._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
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
                onClick={deleteContact}
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