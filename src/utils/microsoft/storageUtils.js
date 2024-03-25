/* eslint-disable */
import { msalConfig } from "../../config/authConfig";

export const addClaimsToStorage = (claimsChallenge, claimsChallengeId) => {
  sessionStorage.setItem(claimsChallengeId, claimsChallenge);
};

export const getClaimsFromStorage = (claimsChallengeId) => {
  return sessionStorage.getItem(claimsChallengeId);
};

export const clearStorage = (account) => {
  for (const key in sessionStorage) {
    if (
      key.startsWith(
        `cc.${msalConfig.auth.clientId}.${account.idTokenClaims.oid}`,
      )
    )
      sessionStorage.removeItem(key);
  }
};
