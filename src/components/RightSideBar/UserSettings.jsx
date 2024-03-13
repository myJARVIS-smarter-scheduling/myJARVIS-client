import DropdownMenu from "../../shared/DropdownMenu";

import TIMEZONE_LIST from "../../constant/timezone";

function UserSettings() {
  const viewOptions = [
    { label: "all-in-one", value: "all-in-one" },
    { label: "multiple", value: "multiple" },
  ];
  const timezone = TIMEZONE_LIST;

  return (
    <main className="flex flex-col items-start justify-center w-full p-10 my-15">
      <nav className="w-full h-150">
        <p className="flex mb-10 font-light text-center text-20">
          Calendar View
        </p>
        <DropdownMenu options={viewOptions} />
      </nav>
      <nav className="w-full h-150">
        <p className="flex mb-10 font-light text-center text-20">
          Select Timezone
        </p>
        <DropdownMenu options={timezone} className="text-10" />
      </nav>
    </main>
  );
}

export default UserSettings;
