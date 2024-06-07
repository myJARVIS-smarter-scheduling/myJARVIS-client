import { useEffect } from "react";
import useFetchAndSyncEvents from "../../apis/useFetchAndSyncEvents";

import { AccountInfo } from "../../types/account";

interface AccountProps {
  account: AccountInfo;
}

function SyncEvents({ account }: AccountProps) {
  const fetchAndSyncEvents = useFetchAndSyncEvents(account);

  useEffect(() => {
    fetchAndSyncEvents();
  }, [fetchAndSyncEvents]);

  return null;
}

export default SyncEvents;
