import LoginForm from "./LoginForm";
import IntroBox from "./IntroBox";

function LoginPage() {
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center rounded-lg shadow-2xl space-y-50 min-w-550 min-h-600">
        <IntroBox />
        <LoginForm />
      </div>
    </main>
  );
}

export default LoginPage;
