import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerLayout from "./layouts/CustomerLayout";
import MyAccount from "./pages/customer/MyAccount";
import Orders from "./pages/customer/Orders";
import Favorite from "./pages/customer/Favorite";
import CustomerService from "./pages/customer/CustomerService";
import Policy from "./pages/customer/Policy";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<MyAccount />} />
          <Route path="my-accounts" element={<MyAccount />} />
          <Route path="orders" element={<Orders />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="customer-service" element={<CustomerService />} />
          <Route path="policy" element={<Policy />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;