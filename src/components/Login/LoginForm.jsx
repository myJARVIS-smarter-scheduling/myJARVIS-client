import axios from "axios";
import useLoginProviderStore from "../../store";

import API from "../../config/api";

function LoginForm() {
  const { setProvider } = useLoginProviderStore();

  async function handleGoogleButtonClick(ev) {
    ev.preventDefault();
    setProvider("google");

    try {
      const response = await axios.post(API.AUTH.GOOGLE, {
        withCredentials: true,
      });

      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
    }
  }

  async function handleOutlookButtonClick(ev) {
    ev.preventDefault();
    setProvider("outlook");

    try {
      // TODO: 써드파티 쿠키 이슈로 인해 프록시 서버로 요청을 보내도록 수정했습니다.
      // TODO: 배포이후 주석을 해제합니다.
      /*    const response = await axios.post(API.AUTH.OUTLOOK, {
        withCredentials: true,
      });

      window.location.href = response.data.url; */
      window.location.href = API.AUTH.OUTLOOK_PROXY;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className="flex flex-col space-y-20">
      <div>
        <button
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
        onClick={handleOutlookButtonClick}
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
