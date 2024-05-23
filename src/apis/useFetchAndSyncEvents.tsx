import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useAccountEventStore } from "../store/TypeScript/account";
import API from "../config/api";
import { protectedResources } from "../config/authConfig";
import { AccountInfo } from "../types/account";
import { MicrosoftEvent } from "../types/microsoft";
import fetchData from "../utils/graphFetch";

interface Payload {
  accountId: string;
  accountEmail: string;
  outlookEvents?: MicrosoftEvent[];
}

function useFetchAndSyncEvents(account: AccountInfo) {
  const queryClient = useQueryClient();
  const { updateEvent } = useAccountEventStore();
  const provider = account.email.includes("outlook") ? "microsoft" : "google";

  const fetchEvents = async () => {
    const payload: Payload = {
      accountId: account.accountId,
      accountEmail: account.email,
    };

    if (provider === "microsoft") {
      const fetchedEvents = await fetchData(
        protectedResources.graphCalendarEvents.endpoint,
        account.accessToken,
      );

      payload.outlookEvents = fetchedEvents.value;
    }

    const response = await axios.post(API.SYNC, payload, {
      withCredentials: true,
    });

    return response.data;
  };

  const { mutateAsync: handleEventFetching } = useMutation({
    mutationFn: fetchEvents,
    onSuccess: (data) => {
      updateEvent(data.accountId, data.events);

      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  useEffect(() => {
    handleEventFetching();

    const interval = setInterval(
      () => {
        handleEventFetching();
      },
      12 * 60 * 60 * 1000,
      // 10 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return handleEventFetching;
}

export default useFetchAndSyncEvents;
