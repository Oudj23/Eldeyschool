import React from "react";
import './Footer.css';
import footer_Logo from './../../../public/Icon.png';
const Footer = () => {
   return (
     <footer className="footer">
       <div className="footer-container">
         
         {/* Column 1 - About */}
         <div className="footer-column">
          <img className="footer-logo" src={footer_Logo} alt="Logo" />
         </div>
 
         {/* Column 2 - Quick Links */}
         <div className="footer-column">
          
           <ul>
               <h2>Contact us</h2>
            
             <li><a href="#">Numéro telephone : 0782670093</a></li>
             <li><a href="https://maps.app.goo.gl/KJBgCeEhxDPWnD1k9">Localistaion</a></li>
           </ul>
         </div>
 
         {/* Column 3 - Social Media */}
         <div className="footer-column">
          
           <ul>
                <h2>Follow Us</h2>
             <li><a href="https://www.instagram.com/el_dey_school/">Instagram</a></li>
             <li><a href="https://www.facebook.com/EDeySc/">Facebook</a></li>
            
           </ul>
         </div>
 
       </div>
 
       {/* Copyright Section */}
       <div className="footer-bottom">
         © {new Date().getFullYear()} El dey school. All Rights Reserved.
       </div>
     </footer>
   );
 };
 
 export default Footer;