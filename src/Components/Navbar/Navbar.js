import "./navbar.css"

function Navbar() {
  return (
    <div>    <
      nav>
      {/* Navigation logo section */}
      <div className="nav__logo">
        {/* Link to the home page */}
        <a href="/">
          StayHealthy
          <img src="../pictures/doctor logo.png" height={39} width={39} />
        </a>
      </div>
      <a href="/">
        {/* Navigation icon section with an onClick event listener */}
        <div className="nav__icon" onclick="{handleClick}">
          {/* Font Awesome icon for bars (hamburger menu) */}
          <i className="fa fa-times fa fa-bars" />
        </div>
        {/* Unordered list for navigation links with 'active' class */}
      </a>
      <ul className="nav__links active">
        <a href="/">{/* List item for the 'Home' link */}</a>
        <li className="link">
          <a href="/"></a>
          <a href="../Landing_Page/LandingPage.html">Home</a>
        </li>
        {/* List item for the 'Appointments' link */}
        <li className="link">
          <a href="#">Appointments</a>
        </li>
        {/* List item for the 'Sign Up' link with a button */}
        <li className="link">
          <a href="../Sign_Up//Sign_Up.html">
            <button className="btn1">Sign Up</button>
          </a>
        </li>
        {/* List item for the 'Login' link with a button */}
        <li className="link">
          <a href="../Login/Login.html">
            <button className="btn1">Login</button>
          </a>
        </li>
      </ul>
    </nav></div>
  )
}
export default Navbar;
