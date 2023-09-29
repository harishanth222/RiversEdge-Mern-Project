import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";


import PaymentList from "./components/PaymentList";
import PayScreen from "./screens/PayScreen";
import AddPayment from "./screens/AddPayment";
import ViewPayment from "./screens/ViewPayment";
import Updatepay from "./screens/Updatepay";

export const URL = process.env.REACT_APP_URL;

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/payment" element={<PayScreen />} />
          <Route path="/addpay" element={<AddPayment />} />
          <Route path="/view/:id" element={<ViewPayment />} />
          <Route path="/update/:id" element={<Updatepay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
