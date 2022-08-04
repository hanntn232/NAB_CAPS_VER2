import React from "react";
import Checkout from "./pages/checkout";
import { Owner } from "./pages/owner";
import { Link, Routes, Route,BrowserRouter } from "react-router-dom";
import CheckOutUI from "./pages/checkout/UI";

export default function AppRoutes() {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/owner ">owner</Link>
          <span>{"   |    "}</span>
          <Link to="/bao-an">bao an</Link>
        </nav>
        <Routes>
          <Route path="/owner" element={<Owner />} />
          <Route path="/bao-an/*" element={<CheckOutUI />}></Route>
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
