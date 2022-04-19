import logo from "../../images/logo.svg";

const LogInLogo = () => {
  return (
    <div className="logIn-image">
    <img src={logo} alt="logo" width="200px" />
    <div className="logIn-title">
      <h4>
        <span className="hi">
          Hi, <br /> Let's
        </span>
        Conn<span className="ect">ect</span>
      </h4>
    </div>
  </div>
  )
}

export default LogInLogo