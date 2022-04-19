import logo from "../../images/logo.svg";

const SignUpLogo = () => {
  return (
    <div className="logIn-image">
    <img src={logo} alt="logo" width="200px" />
    <div className="logIn-title">
      <h4>
        <span className="hi">
          WELCOME BACK!
        </span>
      </h4>
    </div>
  </div>
  )
}

export default SignUpLogo