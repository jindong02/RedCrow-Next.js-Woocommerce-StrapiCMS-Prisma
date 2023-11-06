import { useState } from "react";
import { Tab } from "@headlessui/react";
import ReviewTab from "./ReviewTab";
import Image from "next/image";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs() {
  interface ITab {
    title: string;
    jsx: JSX.Element;
  }
  const [categories] = useState<ITab[]>([
    {
      title: "Description",
      jsx: (
        <div className="mt-4 text-base font-normal">
          <p>Застежка на магнитах.</p>
          <p>Внутри подклад из сатина, один отдел</p>
          <ul className="mt-6">
            <li>Повседневный женский клатч</li>
            <li>Размер: 21х20 см</li>
            <li>Материал: дерево, эко-кожа</li>
            <li>Цвет: черный</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Size Guide",
      jsx: (
        <Image
          alt="size img"
          src="https://d-themes.com/react/porto/demo3/images/products/single/body-shape.png"
          width={161}
          height={296}
        ></Image>
      ),
    },
    {
      title: "Additional Information",
      jsx: (
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-200 bg-white">
            <tr className="bg-[#F9F9F9]">
              <td className="px-6 py-4 font-bold">Weight</td>
              <td className="px-6 py-4">23 kg</td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4 font-bold">Dimensions</td>
              <td className="px-6 py-4">12 × 24 × 35 cm</td>
            </tr>
            <tr className="bg-[#F9F9F9]">
              <td className="px-6 py-4 font-bold">Color</td>
              <td className="px-6 py-4">Black, Green, Indigo</td>
            </tr>
            <tr className="bg-white">
              <td className="px-6 py-4 font-bold">Size</td>
              <td className="px-6 py-4">Large, Medium, Small</td>
            </tr>
          </tbody>
        </table>
      ),
    },
    {
      title: "Delivery",
      jsx: <ReviewTab />,
    },
  ]);

  return (
    <div className="w-full px-2 py-6 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex justify-start space-x-3 md:space-x-10">
          {categories.map((category, i) => (
            <Tab
              key={i}
              className={({ selected }) =>
                classNames(
                  "w-fit whitespace-nowrap py-2.5 text-xs font-medium tracking-normal focus:outline-none md:text-base md:tracking-[1.5px]",
                  selected
                    ? "border-b border-[#838383]"
                    : "text-mygray hover:border-b hover:border-[#838383] hover:transition hover:duration-300 hover:ease-in-out"
                )
              }
            >
              {category.title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map((category, idx) => (
            <Tab.Panel key={idx}>{category.jsx}</Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
