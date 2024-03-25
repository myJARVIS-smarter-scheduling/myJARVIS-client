import { useEffect } from "react";

import LoginForm from "./LoginForm";
import IntroBox from "./IntroBox";

import { useLoginProviderStore } from "../../store/account";

function LoginPage({ onClickOutlookLogin, handleLoginStatus }) {
  const { setProvider, setUser } = useLoginProviderStore();

  useEffect(() => {
    setProvider("");
    setUser("");
  }, []);

  return (
    <main className="animate-linear mb-20 bg-gradient-to-r from-rose-100 via-teal-100 to-rose-100 bg-[length:200%_auto] flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl space-y-50 min-w-550 min-h-600">
        <IntroBox />
        <LoginForm
          onClickOutlookLogin={onClickOutlookLogin}
          handleLoginStatus={handleLoginStatus}
        />
      </div>
    </main>
  );
}

export default LoginPage;
