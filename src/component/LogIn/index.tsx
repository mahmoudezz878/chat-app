import LogInForm from "./LogInForm/LogInForm";
import LogInLogo from "./LogInLogo/LogInLogo";

const SignUp = () => {
  return (
    <div className="container">
      <div className="logInContainer">
        <LogInLogo />
        <div className="logIn-form">
          <LogInForm />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
