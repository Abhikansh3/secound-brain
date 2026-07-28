import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}
export function Card({ title, link, type }: CardProps) {
  return <div>
    <div className="p-4 bg-white rounded-lg  border-gray-200 border max-w-72">

      <div className="flex justify-between">

        <div className="flex items-center gap-2">
          <div className="text-gray-400">
            <ShareIcon />
          </div>
          {title}
        </div>

        <div className="flex text-gray-400">
          <a href={link} target="_blank">
            <ShareIcon />
          </a>
          <ShareIcon />
        </div>
      </div>


      <div className="pt-4">
        {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
        {type === "twitter" && <blockquote className="twitter-tweet">
          <a href={link}></a>
        </blockquote>
        }
      </div>

    </div>
  </div>
}
