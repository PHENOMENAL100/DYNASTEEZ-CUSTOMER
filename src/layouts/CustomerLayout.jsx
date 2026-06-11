import { Outlet } from "react-router-dom";
import CustomerSidebar from "../components/CustomerSidebar";
import Topbar from "../components/Topbar";
import ChatWidget from "../components/ChatWidget";

function CustomerLayout() {
  return (
    <div className="min-h-screen bg-[#E5EBF0]">
      <CustomerSidebar />
      <div className="md:ml-[250px] ml-[70px]">
        <Topbar />
        <main className="p-4 md:p-8 bg-gray-50 min-h-[calc(100vh-55px)]">
          <Outlet />
        </main>
      </div>

      <ChatWidget context="user" position="bottom-right" />
    </div>
  );
}

export default CustomerLayout;