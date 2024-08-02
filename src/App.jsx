import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import Loader from "./components/Loader/Loader";
import { lazy, Suspense } from "react";

const MainPage = lazy(() => import("./pages/MainPage/MainPage"));
const ContactDetail = lazy(() => import("./pages/ContactDetails/ContactDetails"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
