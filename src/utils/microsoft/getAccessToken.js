import { InteractionRequiredAuthError } from "@azure/msal-browser";

async function getAccessTokenForAccount(msalInstance, account) {
  const silentRequest = {
    scopes: ["User.Read", "Calendars.ReadWrite", "MailboxSettings.Read"],
    account,
  };

  try {
    const response = await msalInstance.acquireTokenSilent(silentRequest);

    return response.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      try {
        const response = await msalInstance.acquireTokenPopup(silentRequest);

        return response.accessToken;
      } catch (err) {
        console.error(err);

        throw err;
      }
    }

    return null;
  }
}

export default getAccessTokenForAccount;
