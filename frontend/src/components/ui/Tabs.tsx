import { Fragment, ReactNode } from "react";
import { Tab } from "@headlessui/react";

interface MyTabs {
  tabsArr: string[];
  c1: ReactNode;
  c2: ReactNode;
  c3: ReactNode;
}
export default function MyTabs({ tabsArr, c1, c2, c3 }: MyTabs) {
  return (
    <Tab.Group>
      <Tab.List
        className={
          " flex justify-between  lg:justify-start bg-black-100 w-full"
        }
      >
        {tabsArr.map((link) => {
          return (
            <Tab as={Fragment} key={link}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={`py-1 px-5 w-full lg:w-auto border-b-2 hover:bg-blue-400 hover:text-white transition-all 
                    ${
                      selected
                        ? "bg-blue-500  text-white border-white"
                        : " text-black border-black-300"
                    }
                    `}
                >
                  {link}
                </button>
              )}
            </Tab>
          );
        })}

        {/* ...  */}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>{c1}</Tab.Panel>
        <Tab.Panel>{c2}</Tab.Panel>
        <Tab.Panel>{c3}</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}
