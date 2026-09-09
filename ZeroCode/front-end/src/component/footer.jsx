import React from "react";
import { FaTwitter, FaYoutube, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import ima12 from "../assets/img/image12.png";

function Footer() {
  return (
    <footer className="bg-light text-dark py-4 mt-5 border-top">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side */}
          <div className="col-md-8">
            <p className="mb-1">
              <img src={ima12} alt="ZeroBank" style={{ height: "33px" }} />
              <strong>© {new Date().getFullYear()} ZeroBank.</strong> All Rights Reserved.<br /><br />
            </p>
            <p className="small mb-1">
              Always use the customer care numbers displayed on Bank&apos;s official website. <br />
              Do not use any other numbers since this may put you at risk of fraud. <br />
              Please be aware of prank and deceptive calls. <br />
              Bank will never ask for sensitive information like Card Number, OTP, Password, CVV etc.
            </p>
          </div>  

          {/* Right Side (Company Info + Social Icons) */}
          <div className="col-md-4 text-md">
             <div className="mt-2 d-flex justify-content-md-end justify-content-start flex-wrap">
              <a href="https://x.com/Basudeb_Bej" aria-label="Twitter" className="mx-2 text-success fs-4"><FaTwitter /></a>
              <a href="https://youtube.com/@Basudeb_Bej" aria-label="YouTube" className="mx-2 text-success fs-4"><FaYoutube /></a>
              <a href="https://m.facebook.com/profile.php?id=100076292148350" aria-label="Facebook" className="mx-2 text-success fs-4"><FaFacebook /></a>
              <a href="http://instagram.com/" aria-label="Instagram" className="mx-2 text-success fs-4"><FaInstagram /></a>
              <a href="https://www.linkedin.com/in/basudeb-bej/" aria-label="LinkedIn" className="mx-2 text-success fs-4"><FaLinkedin /></a>
            </div> <br />
            <p className="small mb-1">
              <strong>ZeroBank Pvt Ltd.</strong> <br />
              Registered Office: 501, Some Tower, Some City - 123456. <br />
              Corporate Identity Number (CIN): U65900DL2020PLC366027 <br />
              Telephone Number: 1800-202-5333 <br />
              Email: customercare@zerobank.com
            </p>
            <p className="small mb-2">
              In case of non-resolution of grievances, please{" "}
              <a href="#!" className="text-decoration-underline">
                click here
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;