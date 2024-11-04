import logoR from "../img/logoR.png";

export default function Header() {
  return (
    <nav>
      <div className="navbar">
        <div
          className="nav_side"
          id="nav_side"
          style={{ backgroundColor: "#ababab", zIndex: "3" }}
        >
          <div className="nav_side_top">
            <a href="#">
              <img
                className="logoImg_side"
                src={logoR}
                style={{ height: "50px" }}
              ></img>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
