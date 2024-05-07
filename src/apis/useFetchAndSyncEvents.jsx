import { useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { useAccountEventStore } from "../store/account";
import fetchData from "../utils/graphFetch";
import API from "../config/api";
import { protectedResources } from "../config/authConfig";

function useFetchAndSyncEvents(account) {
  const queryClient = useQueryClient();
  const { updateEvent } = useAccountEventStore();
  const provider = account.email.includes("outlook") ? "microsoft" : "google";

  const fetchEvents = async () => {
    const payload = {
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

      queryClient.invalidateQueries(["events"]);
    },
  });

  useEffect(() => {
    handleEventFetching();

    const interval = setInterval(
      () => {
        handleEventFetching();
      },
      // 1000 * 10,
      12 * 60 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return handleEventFetching;
}

export default useFetchAndSyncEvents;
