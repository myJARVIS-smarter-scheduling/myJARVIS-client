import { AiFillExclamationCircle } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

import { useLoginProviderStore } from "../../store/TypeScript/account.ts";

import ConflictAlertContent from "./ConflictAlertContent";

function ConflictAlert({ handleConfirmEvent, handleAlertPopUp, conflictList }) {
  const { accountInfo } = useLoginProviderStore();

  const sortedConflictList = conflictList.sort((a, b) => {
    const dateOfA = new Date(a.startAt);
    const dateOfB = new Date(b.startAt);

    const dateStringA = `${dateOfA.getFullYear()}/${dateOfA.getMonth() + 1}/${dateOfA.getDate()}`;
    const dateStringB = `${dateOfB.getFullYear()}/${dateOfB.getMonth() + 1}/${dateOfB.getDate()}`;

    if (dateStringA < dateStringB) return -1;
    if (dateStringA > dateStringB) return 1;

    const indexOfA = accountInfo.findIndex(
      (account) => account.accountId === a.accountId,
    );
    const indexOfB = accountInfo.findIndex(
      (account) => account.accountId === b.accountId,
    );

    return indexOfA - indexOfB;
  });

  return (
    <div className="absolute z-30 flex flex-col items-center p-20 bg-white border border-red-100 rounded-lg shadow-2xl left-60 space-y-15 w-200 min-w-500 max-h-500 top-190">
      <div className="flex justify-end w-full cursor-pointer h-15">
        <IoClose
          size={30}
          onClick={() => handleAlertPopUp(false)}
          className="text-white rounded-full bg-slate-300 hover:bg-slate-600"
        />
      </div>
      <section className="flex flex-col items-center w-full space-y-20">
        <header className="flex items-center w-full mb-10 space-x-10">
          <div className="relative flex">
            <AiFillExclamationCircle size={35} className="text-red-500" />
            <span className="absolute text-20 left-20 top-15">🤔</span>
          </div>
          <p className="text-lg font-semibold text-center">
            There is a conflict with another event!
          </p>
        </header>
        <div className="flex flex-col items-center w-full space-y-10 overflow-y-auto max-h-400">
          {sortedConflictList.map((conflictEvent) => (
            <ConflictAlertContent
              key={conflictEvent.title}
              conflictEvent={conflictEvent}
              handleAlertPopUp={handleAlertPopUp}
            />
          ))}
        </div>
        <nav className="w-80 h-33 mt-10 bg-[#2684fc] rounded-md text-white text-17 flex justify-center items-center font-light">
          <button type="button" onClick={handleConfirmEvent}>
            Confirm
          </button>
        </nav>
      </section>
    </div>
  );
}

export default ConflictAlert;
