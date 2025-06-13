import { useState } from "react";
import { useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert";
import { contactCreate } from "../../lib/api/ContactApi";
import { Link } from "react-router";

export default function ContactCreate() {
    const [token, _] = useLocalStorage("token", "");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await contactCreate(token, {first_name, last_name, email, phone});
        const responseBody = await response.json();
        console.log(responseBody);

        if(response.status === 200) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setPhone('');
            await alertSuccess("Contact berhasil di tambahkan");
        } else{
            await alertError(responseBody.errors);
        }
    }

    return <>
    <header className="bg-gradient shadow-lg">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link
        to="/dashboard/contacts"
        className="flex items-center hover:opacity-90 transition-opacity duration-200">
        <i className="fas fa-address-book text-white text-2xl mr-3" />
        <div className="text-white font-bold text-xl">Contact Management</div>
      </Link>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <a
              href="profile.html"
              className="text-gray-100 hover:text-white flex items-center transition-colors duration-200"
            >
              <i className="fas fa-user-circle mr-2" />
              <span>Profile</span>
            </a>
          </li>
          <li>
            <a
              href="index.html"
              className="text-gray-100 hover:text-white flex items-center transition-colors duration-200"
            >
              <i className="fas fa-sign-out-alt mr-2" />
              <span>Logout</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
  <main className="container mx-auto px-4 py-8 flex-grow">
    <div className="flex items-center mb-6">
      <a
        href="dashboard.html"
        className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
      >
        <i className="fas fa-arrow-left mr-2" /> Back to Contacts
      </a>
      <h1 className="text-2xl font-bold text-white flex items-center">
        <i className="fas fa-user-plus text-blue-400 mr-3" /> Create New Contact
      </h1>
    </div>
    <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
      <div className="p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label
                htmlFor="first_name"
                className="block text-gray-300 text-sm font-medium mb-2">First Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user-tag text-gray-500" />
                </div>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter first name"
                  required=""
                  value={first_name} onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Last Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user-tag text-gray-500" />
                </div>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter last name"
                  required=""
                  value={last_name} onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-500" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter email address"
                required=""
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-300 text-sm font-medium mb-2"
            >
              Phone
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-phone text-gray-500" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter phone number"
                required=""
              />
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <a
              href="dashboard.html"
              className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
            >
              <i className="fas fa-times mr-2" /> Cancel
            </a>
            <button
              type="submit"
              className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
            >
              <i className="fas fa-plus-circle mr-2" /> Create Contact
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className="mt-10 mb-6 text-center text-gray-400 text-sm animate-fade-in">
      <p>© 2025 Contact Management. All rights reserved.</p>
    </div>
  </main>
    </>
}