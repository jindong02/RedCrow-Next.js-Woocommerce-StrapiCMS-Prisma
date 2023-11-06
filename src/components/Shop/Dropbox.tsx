import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { CheckIcon } from "@heroicons/react/24/outline";

const Dropbox = ({
  list,
  onSelect,
  hasBorder = false,
  className = "",
}: {
  list: IDropBoxItem[];
  onSelect: (value: { id: number; name: string; unavailable: boolean }) => void;
  hasBorder?: boolean;
  className?: string;
}) => {
  const [selected, setSelected] = useState(list[0]);
  if (!list) return null;

  return (
    <div className="relative">
      <Listbox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          onSelect(value);
        }}
      >
        <Listbox.Button
          className={`${
            hasBorder ? "border px-4 py-2" : " px-2 py-1"
          } inline-flex items-center justify-center text-base font-semibold uppercase md:tracking-[1.5px] ${className}`}
        >
          {selected?.name || ""}
          <ChevronDownIcon className=" -mr-1 h-4 w-4 " aria-hidden="true" />
        </Listbox.Button>

        <Listbox.Options
          className={`absolute z-10 max-h-60 overflow-auto bg-white focus:outline-none sm:text-sm ${
            hasBorder
              ? "mt-0 w-full rounded-none border lowercase"
              : "mt-1 w-fit rounded-md text-base shadow-lg ring-1 ring-black ring-opacity-5"
          }`}
        >
          {list.map((item, index) => (
            <Listbox.Option
              key={item.id}
              value={item}
              disabled={item.unavailable}
              className={`${
                selected === item ? "bg-gray-900 text-white" : ""
              } relative cursor-default select-none py-2 pl-3 pr-9 ${
                selected !== item ? "hover:bg-gray-100 hover:text-gray-900" : ""
              } ${index === 0 ? "rounded-t-md" : ""} ${
                index === list.length - 1 ? "rounded-b-md" : ""
              } ${selected === item && index === 0 ? "rounded-t-md" : ""} ${
                selected === item && index === list.length - 1
                  ? "rounded-b-md"
                  : ""
              }`}
            >
              <span
                className={`${
                  item.unavailable
                    ? "text-gray-400"
                    : selected === item
                    ? "text-white"
                    : "text-gray-900"
                } block truncate`}
              >
                {item.name}
              </span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default Dropbox;

export interface IDropBoxItem {
  id: number;
  name: string;
  unavailable: boolean;
  justLabel?: boolean;
}
