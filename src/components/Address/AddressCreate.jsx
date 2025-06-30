import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { addressCreate } from "../../lib/api/AddressApi";
import { alertError, alertSuccess } from "../../lib/alert";
import { contactDetail } from "../../lib/api/ContactApi";

export default function AddressCreate() {
    const [token, _] = useLocalStorage("token", "");
    const {id} = useParams();
    const [contact, setContact] = useState({});
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [country, setCountry] = useState('');
    const [postal_code, setPostalCode] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        const response = await addressCreate(token, id, {street, city, province, country, postal_code});
        const responseBody = await response.json();
        console.log(responseBody);

        if(response.status === 200) {
            await alertSuccess("Berhasil menambahkan alamat");
            await navigate({
                pathname: `/dashboard/contacts/${id}`
            });
        }
    }

    async function fetchContact() {
        const response = await contactDetail(token, id);
        const responseBody = await response.json();

        if(response.status === 200) {
            setContact(responseBody.data)
        } else {
            await alertError(responseBody.errors);
        }
    }

    useEffectOnce(() => {
        fetchContact()
        .then(() => console.log("Berhasil fetching data kontak"))
    })

    return <>
    <div className="flex items-center mb-6">
      <Link to={`/dashboard/contacts/${id}`}
            className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
        <i className="fas fa-arrow-left mr-2"></i> Kembali ke detail kontak
      </Link>
      <h1 className="text-2xl font-bold text-white flex items-center">
        <i className="fas fa-plus-circle text-blue-400 mr-3"></i> Buat alamat baru
      </h1>
    </div>

    <div
      className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
      <div className="p-8">
        <div className="mb-6 pb-6 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4 shadow-md">
              <i className="fas fa-user text-white"></i>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">{contact.first_name} {contact.last_name}</h2>
              <p className="text-gray-300 text-sm">{contact.email} • {contact.phone}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="street" className="block text-gray-300 text-sm font-medium mb-2">Jalan</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-road text-gray-500"></i>
              </div>
              <input type="text" id="street" name="street"
                     className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                     placeholder="Masukkan nama jalan" required
                     value={street} onChange={(e) => setStreet(e.target.value)}/>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label htmlFor="city" className="block text-gray-300 text-sm font-medium mb-2">Kota</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-city text-gray-500"></i>
                </div>
                <input type="text" id="city" name="city"
                       className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                       placeholder="Masukkan kota" required
                       value={city} onChange={(e) => setCity(e.target.value)}/>
              </div>
            </div>
            <div>
              <label htmlFor="province" className="block text-gray-300 text-sm font-medium mb-2">Provinsi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-map text-gray-500"></i>
                </div>
                <input type="text" id="province" name="province"
                       className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                       placeholder="Masukkan provinsi" required
                       value={province} onChange={(e) => setProvince(e.target.value)}/>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label htmlFor="country" className="block text-gray-300 text-sm font-medium mb-2">Negara</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-flag text-gray-500"></i>
                </div>
                <input type="text" id="country" name="country"
                       className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                       placeholder="Masukkan Negara" required
                       value={country} onChange={(e) => setCountry(e.target.value)}/>
              </div>
            </div>
            <div>
              <label htmlFor="postal_code" className="block text-gray-300 text-sm font-medium mb-2">Kode Pos</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-mail-bulk text-gray-500"></i>
                </div>
                <input type="text" id="postal_code" name="postal_code"
                       className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                       placeholder="Masukkan kode pos" required
                       value={postal_code} onChange={(e) => setPostalCode(e.target.value)}/>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link to={`/dashboard/contacts/${id}`}
                  className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
              <i className="fas fa-times mr-2"></i> Cancel
            </Link>
            <button type="submit"
                    className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
              <i className="fas fa-plus-circle mr-2"></i> Buat Alamat
            </button>
          </div>
        </form>
      </div>
    </div>
    
    </>
}