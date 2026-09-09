
import logoImage from "../../assets/img/image12.png";

export default function Header() {


  return (
    <div className="container-fluid d-flex justify-content-between align-items-center py-1 px-2">

      {/* Logo & Brand */}
      <div className="d-flex align-items-center">
        <img
          src={logoImage}
          alt="ZeroBank"
          className="me-2"
          style={{ height: "35px" }}
        />
        <span className="text-dark fs-5 fw-bold">ZeroBank</span>
      </div>
    </div>
  );
}
