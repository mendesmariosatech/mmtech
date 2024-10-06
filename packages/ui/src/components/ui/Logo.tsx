import Image from 'next/image'
import Link from 'next/link';

const texts = {
  EN: {
    companyName: "MM Tech",
  },
};

export const Logo = () => {
  return (
    <Link href="/">
      <div className="relative z-20 flex items-center text-lg font-medium">
        <Image src="/marketing/logo.svg"
          alt="Logo"
          className="colo-primary mr-2 h-6 w-6"
          color={"black"}
          width={100} height={100} />
        {texts.EN.companyName}
      </div>
    </Link>
  )
}
