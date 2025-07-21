import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps{
  requiredRole?: string;
}

const ProtectedRoute = ({requiredRole} : ProtectedRouteProps) => {
  const {user} = useAuth();

  //user belum login
  if(!user){
    return <Navigate to="/login" replace/>
  }

  if(requiredRole){
    const userRole = user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if(userRole !== requiredRole){
      // sudah login (karena dapat role dari login) tapi bukan role yang diizinkan
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <Outlet/>
  
}

export default ProtectedRoute