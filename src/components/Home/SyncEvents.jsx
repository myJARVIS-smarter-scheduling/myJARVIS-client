import useFetchAndSyncEvents from "../../apis/useFetchAndSyncEvents";

function SyncEvents({ account }) {
  return useFetchAndSyncEvents(account);
}

export default SyncEvents;
