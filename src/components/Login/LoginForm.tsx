import API from "../../config/api";

interface LoginFormProps {
  onClickOutlookLogin: () => void;
  handleLoginStatus: (status: boolean) => void;
}

function LoginForm({ onClickOutlookLogin, handleLoginStatus }: LoginFormProps) {
  async function handleGoogleButtonClick(
    ev: React.MouseEvent<HTMLButtonElement>,
  ) {
    ev.preventDefault();
    handleLoginStatus(true);

    window.location.href = API.AUTH.GOOGLE;
  }

  return (
    <form className="flex flex-col space-y-20">
      <div>
        <button
          type="button"
          id="google"
          className="login-button"
          onClick={handleGoogleButtonClick}
        >
          <img
            src="/assets/google_calendar_logo.png"
            alt="google_calendar_logo"
            className="h-auto w-50"
          />
          <p className="font-thin ">Start with Google Calendar</p>
        </button>
      </div>
      <button
        id="outlook"
        className="login-button"
        onClick={onClickOutlookLogin}
      >
        <img
          src="/assets/outlook_calendar_logo.png"
          alt="outlook_calendar_logo"
          className="h-auto w-50"
        />
        <p className="font-thin">Start with Outlook Calendar</p>
      </button>
    </form>
  );
}

export default LoginForm;
