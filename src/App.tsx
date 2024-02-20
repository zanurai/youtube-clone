import React from "react";
import { BrowserRouter, Router, Route, Link, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { Watch } from "./pages/Watch";
import { Spinner } from "./component/Spinner";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/spinner" element={<Spinner />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
