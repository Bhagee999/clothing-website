
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Cloth/Home";
import Signup from "./Cloth/SignUp";
import Cart from "./Cloth/Cart";
import Login from "./Cloth/Login";
import Men from "./Cloth/Men";
import Women from "./Cloth/Women";
import Kids from "./Cloth/Kids";   
import { CartProvider } from "./Cloth/CartContext";
import Navbar from "./Cloth/Navbar";
import Footer from "./Cloth/Footer"
import TraditionalWear from "./Cloth/TraditionalWear";
import Contact from "./Cloth/Contact";
import Products from "./Cloth/ProductCard";

function App() { 
   
  return (
    
    <div>
      <CartProvider>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} /> 
        <Route path="/Signin" element={<Signup/>} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Men" element={<Men/>}/>
        <Route path="/Women" element={< Women/>}/>
        <Route path="/Kids" element={<Kids/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/TraditionalWear" element={< TraditionalWear/>}/>
        <Route path="/products" element={<Products />} />
      </Routes>
      <Footer/>
    </Router>
    
    </CartProvider>
     
    </div>
  );
}

export default App;