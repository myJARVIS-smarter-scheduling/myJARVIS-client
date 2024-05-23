import {
  InteractionRequiredAuthError,
  PublicClientApplication,
  AccountInfo,
} from "@azure/msal-browser";
import { loginRequest } from "../../config/authConfig";

async function getAccessTokenForAccount(
  msalInstance: PublicClientApplication,
  account: AccountInfo,
) {
  const silentRequest = {
    ...loginRequest,
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
