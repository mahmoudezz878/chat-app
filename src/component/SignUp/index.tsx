import SignUpForm from "./SignUpForm/SignUpForm";
import SignUpLogo from "./SignUpLogo/SignUpLogo";

const LogIn = () => {
  return (
    <div className="container">
      <div className="logInContainer">
        <SignUpLogo />
        <div className="logIn-form">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
};

export default LogIn;
