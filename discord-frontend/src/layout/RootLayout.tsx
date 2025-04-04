import { Outlet } from "react-router-dom"
import Sidebar from '../components/navigation/Sidebar' // Ensure the path is correct

function RouteLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default RouteLayout