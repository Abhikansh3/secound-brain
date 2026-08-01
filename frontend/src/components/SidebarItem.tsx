import type { ReactElement } from "react";

export function SidebarItem({ text, icon }: { text: string, icon: ReactElement }) {
  return <div className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors duration-300">
    <div>
      {icon}
    </div>
    <div>
      {text}
    </div>

  </div>
}
