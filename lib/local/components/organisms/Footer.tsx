import { Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type LinkConfigKey = {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
};

const LINKS: LinkConfigKey[] = [
  {
    title: "Chat",
    links: [
      {
        label: "Create a chat",
        href: "#",
      },
      {
        label: "Other",
        href: "#",
      },
    ],
  },
  {
    title: "Chat",
    links: [
      {
        label: "Create a chat",
        href: "#",
      },
      {
        label: "Other",
        href: "#",
      },
    ],
  },
  {
    title: "Chat",
    links: [
      {
        label: "Create a chat",
        href: "#",
      },
      {
        label: "Other",
        href: "#",
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="flex flex-col bg-slate-800 p-5 mt-10 justify-center gap-10 items-center">
      <div className="flex flex-col items-center pb-4 border-b-2 border-b-slate-900">
        <Image
          src={"/logo.png"}
          alt="Logo image"
          width={150}
          height={50}
          className="mb-2"
        />
        <Github />
      </div>
      <div className="flex gap-10">
        {LINKS.map((link) => (
          <LinkList key={link.title} {...link} />
        ))}
      </div>
    </footer>
  );
}

function LinkList({ title, links }: LinkConfigKey) {
  return (
    <div>
      <h6 className="text-foreground overwrite text-base">{title}</h6>
      <ul className="mt-4 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>
              <div className="text-sm text-gray-400 transition-colors text-foreground-lighter hover:text-foreground ">
                {link.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
