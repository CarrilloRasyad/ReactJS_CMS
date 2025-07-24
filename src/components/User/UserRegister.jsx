import { useState } from "react"
import { alertError, alertSuccess } from "../../lib/alert.js";
import { userRegister } from "../../lib/api/UserApi.js";
import { Link, useNavigate } from "react-router";

export default function UserRegister () {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        // kondisi pengecekan password apakah sama dengan konfirmasi password
        if(password !== confirmPassword) {
            await alertError("Password tidak sesuai");
            return;
        }

        if(password.length < 6) {
            await alertError("Panjang password tidak boleh kurang dari 6 karakter");
            return;
        }

        const response = await userRegister({
            username: username,
            name: name,
            password: password
        });

        // variable untuk mengambil response json
        const responseBody = await response.json();
        console.log(responseBody);

        if(response.status === 200) {
            await alertSuccess("User berhasil dibuat!");
            await navigate({
                pathname: "/login"
            })
        } else {
            // responseBody variable yang sudah di deklarasikan
            // errors diambil dari api backend
            await alertError(responseBody.errors);
        }
    }

    return <>
        <div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
            <div className="text-center mb-8">
                <div className="inline-block p-3 bg-gradient rounded-full mb-4">
                    <i className="fas fa-user-plus text-3xl text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white">Manajemen Kontak</h1>
                <p className="text-gray-300 mt-2">Buat akun baru</p>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-300 text-sm font-medium mb-2">Username</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-user text-gray-500" />
                        </div>
                        <input type="text" id="username" name="username" 
                        className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                        placeholder="Masukkan Username anda" 
                        required
                        value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">Nama Lengkap</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-id-card text-gray-500" />
                        </div>
                        <input type="text" id="name" name="name" 
                        className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                        placeholder="Masukkan nama lengkap anda" 
                        required
                        value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-lock text-gray-500" />
                        </div>
                        <input type="password" id="password" name="password" 
                        className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                        placeholder="Masukkan password anda" 
                        required
                        value={password}onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="confirm_password" className="block text-gray-300 text-sm font-medium mb-2">Konfirmasi Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <i className="fas fa-check-double text-gray-500" />
                        </div>
                        <input type="password" id="confirm_password" name="confirm_password" 
                        className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" 
                        placeholder="Masukkan Konfirmasi Password anda" 
                        required
                        value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                </div>
                <div className="mb-6">
                    <button type="submit" className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
                        <i className="fas fa-user-plus mr-2" /> Daftar
                    </button>
                </div>
                <div className="text-center text-sm text-gray-400">
                    Sudah memiliki akun? 
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">Masuk
                    </Link>
                </div>
            </form>
        </div>
    </>
}