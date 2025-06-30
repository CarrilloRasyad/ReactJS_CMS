import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLocalStorage } from 'react-use';

export default function AuthRedirect() {
  const navigate = useNavigate();
  const [token, _] = useLocalStorage("token", ""); 

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      if (token) {
        navigate({
            pathname: "/dashboard/contacts"
        });
      } else {
        navigate({
            pathname: "/login"
        });
      }
    }, 100); 

    return () => clearTimeout(redirectTimer); 
  }, [token, navigate]); 

  return  <>
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <p className="text-xl">Mengarahkan Anda...</p>
    </div>
  </>
}