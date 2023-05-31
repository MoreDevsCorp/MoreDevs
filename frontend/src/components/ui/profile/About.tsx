import { HiOutlinePencilAlt } from "react-icons/hi";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Button from "../Button";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);
  const [bio, setBio] = useState(
    "I'm more experienced in eCommerce web projects and mobile banking apps, but also like to work with creative projects, such as landing pages or unusual corporate websites."
  );

  return (
    <div className=" p-6 space-y-4 border border-gray-100 rounded">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-2xl text-black-900">About</h1>
        <HiOutlinePencilAlt
          onClick={() => setIsOpen(true)}
          size={24}
          className="hover:opacity-50 cursor-pointer"
        />
      </div>
      <div className="flex flex-wrap space-x-2 bg-white  py-6 ">
        <p className="font-xl tracking-normal text-black-900">{bio}</p>
      </div>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50 "
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="fixed inset-0 bg-black-900 opacity-30"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-10">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="flex flex-col space-y-5 w-1/2 mx-auto max-w-sm rounded bg-white p-4">
            <Dialog.Title>Edit your bio</Dialog.Title>

            <TextareaAutosize
              maxRows={8}
              minRows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-[100%] outline-none resize-none min-h-1 max-h-20 bg-gray-50 h-auto rounded placeholder-zinc-400 py-2 px-4 text-sm"
              aria-label="maximum height"
              placeholder="Edit you bio"
            />
            <Button onClick={() => setIsOpen(false)}>Submit</Button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
