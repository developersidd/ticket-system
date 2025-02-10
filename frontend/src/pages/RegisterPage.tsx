import RegisterForm from "../components/form/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h3 className="text-[56px] leading-[67px] mb-6 text-green-400 font-syne font-bold">
        Register
      </h3>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
