import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import SendMoney from "./components/SendMoney";
import Header from "./components/UI/Header";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/transfer" element={<SendMoney />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
