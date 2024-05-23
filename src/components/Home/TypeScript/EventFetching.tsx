import { useLoginProviderStore } from "../../../store/TypeScript/account";
import SyncEvents from "../TypeScript/SyncEvents";

function EventFetching() {
  const { accountInfo } = useLoginProviderStore();

  return (
    <div className="hidden">
      {accountInfo.map((account) => (
        <SyncEvents key={account.accountId} account={account} />
      ))}
    </div>
  );
}

export default EventFetching;
