import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="w-[175px] my-auto">
      <Link href={"/"}>
        <Image
          src="/logo.png"
          alt="Image"
          className="transition duration-300 hover:scale-105"
          width={175}
          height={40}
        />
      </Link>
    </div>
  );
}
