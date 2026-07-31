import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

export function CreateContentModal({ open, onClose }: { open: any, onClose: any }) {
  return (
    <div>

      {open && <div className="w-full h-full fixed top-0 left-0 bg-black/50 flex justify-center items-center z-50">

        <div className="bg-white p-6 rounded-md flex flex-col gap-4">

          <div className="flex justify-end cursor-pointer" onClick={onClose}>
            <CrossIcon />
          </div>
          <div className="flex flex-col gap-2">
            <Input placeholder="Title" />
            <Input placeholder="Link" />
          </div>
          <div className="flex justify-center">
            <Button variant="primary" text="Submit" /> </div>
        </div>

      </div>}

    </div>


  )
}

export function Input({ placeholder, onChange }: { placeholder: string, onChange?: () => void }) {

  return (
    <input placeholder={placeholder} type="text" className="px-4 py-2 border" onChange={onChange} >

    </input>
  )
}
