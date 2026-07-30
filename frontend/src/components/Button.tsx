import type { ReactElement } from "react";

interface Buttonprops {
  variant: 'primary' | 'secondary';
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
}

const variantClasses = {
  "primary": "bg-purple-600 text-white",
  "secondary": "bg-purple-200 text-purple-600"
}
const deafultclasses = "cursor-pointer flex px-4 py-2 rounded-md font-light hover:opacity-80 transition-opacity duration-300 justify-center items-center gap-2"


export function Button({ variant, text, startIcon, onClick }: Buttonprops) {
  return <button onClick={onClick} className={variantClasses[variant] + " " + deafultclasses}>
    {startIcon}
    {text}
  </button>
}
