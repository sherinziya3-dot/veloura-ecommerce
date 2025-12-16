import{useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(){
const navigate =useNavigate();

useEffect(()=>{ 
    localStorage.removeItem("Veloura_session");
    localStorage.removeItem("Veloura_cart");
    localStorage.removeItem("Veloura_wishlist");

    navigate("/login",{replace:true});
},[navigate]);
return null;
}
