import { useLoadingStore } from "../../../store/navbar";

import API from "../../../config/api";

function AsanaLogin() {
  const { isLoading, setIsLoading } = useLoadingStore();

  function handleAsanaLoginClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setIsLoading(true);

    window.location.href = API.AUTH.ASANA;
  }

  return (
    <>
      <header className="flex items-center justify-center w-full pr-10 h-80">
        <img
          src="/assets/asana_logo_name.png"
          alt="asana logo"
          className="w-2/4 h-auto"
        />
      </header>
      {!isLoading ? (
        <form className="flex items-center justify-center w-full">
          <button
            onClick={handleAsanaLoginClick}
            className="cursor-pointer flex items-center justify-center bg-gradient-to-r from-[#fe6f73] to-[#F1B0AF] h-50 w-200 rounded-lg"
          >
            <p className="text-xl font-light text-white">Login with asana</p>
          </button>
        </form>
      ) : null}
    </>
  );
}

export default AsanaLogin;
