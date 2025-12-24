import BG from '@/public/img/bg-login.jpg'
import Image from "next/image";
import {FormsLogin} from "@/app/login/components/forms";

const LoginPage = () => {
  return (
    <>
      <div className={'w-full h-dvh relative'}>
        <div
          className={`absolute z-10 w-full h-full
            bg-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]
            backdrop-blur-[14.7px] flex items-center justify-center`}
        >
          <FormsLogin/>
        </div>
        <Image
          src={BG}
          alt={'Logo'}
          width={1920}
          height={1080}
          className={'object-cover w-full h-full'}
        />
      </div>
    </>
  )
}
export default LoginPage