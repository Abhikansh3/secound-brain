import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { Logo } from "./Logo";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return <div className="w-76 h-full bg-white border-r  p-4">
    <div className="flex flex-col pl-2 pt-2">
      <div className="flex items-center gap-4">
        <div className="text-purple-600">
          <Logo />
        </div>
        <div className="text-2xl">Brainly</div>
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <SidebarItem text="twitter" icon={<TwitterIcon />}></SidebarItem>
        <SidebarItem text="Youtube" icon={<YoutubeIcon />}></SidebarItem>
      </div>
    </div>

  </div >
}
