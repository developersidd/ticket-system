import LoginForm from "../components/form/LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h3 className="text-[56px] leading-[67px] mb-6 text-green-400 font-syne font-bold">
        Login
      </h3>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
