import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import './styles/sass/index.scss';
import "./styles/custom-field.scss";
import "./styles/global.css";
import "./styles/home.scss";
import "./styles/index.scss";
import "./styles/product.scss";

import { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ButtonChat from './components/ButtonChat';
import Footer from './components/Footer';
import Header from './components/Header';
import PopupChatBot from './components/PopupChatBot/PopupChatBot';

import Accessory from "pages/Accessary";
import Cart from "pages/Cart";
import MyMoto from "pages/MyMoto";
import MyOrder from "pages/MyOrder";
import NotFound from 'pages/NotFound';
import Profile from "pages/Profile";
import Home from './pages';
import CatalogAccessory from "./pages/CatalogAccessory";
import CatalogMoto from "./pages/CatalogMoto";
import Product from "./pages/Product";
import Maintenance from 'pages/Maintenance';
import MaintenanceHistory from 'pages/MaintenanceHistory';
import VehicleRegistration from 'pages/VehicleRegistration';
import Rescue from 'pages/Rescue';
import VehicleRegistrationHistory from 'pages/VehicleRegistrationHistory';

function App() {
  const [style, setStyle] = useState({ display: "none" })
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/accessory/:id" element={<Accessory />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/rescue" element={<Rescue />} />
        <Route path="/vehicle-registration" element={<VehicleRegistration />} />
        <Route path="/vehicle-registration-history" element={<VehicleRegistrationHistory />} />
        <Route path="/maintenance-history" element={<MaintenanceHistory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-order" element={<MyOrder />} />
        <Route path="/my-moto" element={<MyMoto />} />
        <Route path="/catalog-moto" element={<CatalogMoto />} />
        <Route path="/catalog-accessory" element={<CatalogAccessory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ButtonChat setStyle={setStyle} />
      <div className="" style={style}>
        <PopupChatBot setStyle={setStyle} />
      </div>
      <Footer />
      <ToastContainer style={{ fontSize: 15 }} />
    </div>
  );
}

export default App;
