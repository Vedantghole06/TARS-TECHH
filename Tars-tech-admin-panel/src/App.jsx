import React from 'react';
import { Route, Routes  , Navigate } from 'react-router-dom';
import AdminPanel from './components/admin-panel';
import LoginPage from './components/login/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn)

  const redirectTo = isLoggedIn ? '/admin':'/';

  return (
    // <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={!isLoggedIn ? <LoginPage /> : <Navigate to={redirectTo}/>} />
            {/* Wrap the protected route with ProtectedRoute */}
            {/* <Route element={<ProtectedRoute />}> */}
              <Route path="/admin" element={<ProtectedRoute element={<AdminPanel/>}/>} />
            {/* </Route> */}
          </Routes>
        </main>
      </div>
    // </AuthProvider>
  );
};

// This component decides if the user should go to the login page or admin panel based on token
// const LoginRedirect = () => {
//   const { isLoggedIn } = useAuth();

//   if (isLoggedIn) {
//     return <AdminPanel />;
//   } else {
//     return <LoginPage />;
//   }
// };

export default App;
