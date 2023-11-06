import { Listbox } from "@headlessui/react";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { CheckIcon } from "@heroicons/react/24/outline";

const BorderDropbox = ({
  list,
  onSelect,
  currentAttr,
  className = "",
}: {
  list: IDropBoxItem[] | undefined;
  onSelect: (name: string, newVal: string) => void;
  currentAttr: string;
  className?: string;
}) => {
  if (!list) return null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selected, setSelected] = useState(list[0]);

  return (
    <div className="relative">
      <Listbox
        value={selected}
        onChange={(value) => {
          setSelected(value);
          onSelect(currentAttr, value.name);
        }}
      >
        {({ open }) => (
          <>
            <Listbox.Button
              className={`inline-flex cursor-auto items-center justify-between border px-4 py-2 text-xl !font-normal lowercase focus:outline-none sm:cursor-pointer md:tracking-[1px] ${className}`}
            >
              {selected?.name || ""}
              <ChevronDownIcon
                className={`-mr-1 h-5 w-5 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </Listbox.Button>

            <Listbox.Options
              className={`absolute z-10 mt-0 max-h-60 overflow-auto rounded-none border bg-white lowercase focus:outline-none sm:text-sm ${className}`}
            >
              {list
                .filter((item) => item.name !== selected?.name)
                .map((item, index) => (
                  <Listbox.Option
                    key={index}
                    value={item}
                    disabled={item.unavailable}
                    className={` relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-gray-100 ${
                      selected === item ? "hidden" : ""
                    }`}
                  >
                    <span
                      className={`${
                        item.unavailable ? "text-gray-400" : "text-main"
                      } block truncate text-xl !font-normal lowercase md:tracking-[1px]`}
                    >
                      {item.name}
                    </span>
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </>
        )}
      </Listbox>
    </div>
  );
};

export default BorderDropbox;

export interface IDropBoxItem {
  id: number;
  name: string;
  unavailable: boolean;
}
