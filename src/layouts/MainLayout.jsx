import { Outlet } from "react-router"
import Navbar from "../components/Shared/Navbar/Navbar"
import Footer from "../components/Shared/Footer/Footer"

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 pt-24">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout
