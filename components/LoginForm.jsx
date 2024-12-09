"use client";
import LeftSide from './LeftSide'
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [error, setError] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        return;
      }
      console.log("correct")

      router.replace("dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <div>
      <div className="font-[sans-serif] h-screen grid grid-cols-2">
        {/* left side */}
        <div className="bg-white text-gray-400 flex justify-center items-center text-[12rem] font-extrabold">
          <LeftSide />
        </div>

        {/* Right side */}
        <div className="bg-gray-600 ">

          <div className="grid lg:grid-cols gap-4 max-lg:gap-12 absolute inset-y-0  right-40 top-60 h-[320px] ">
            <div className=" sm:px-6 px-4 py-8 w-[500px] max-xl:mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="mb-6 text-center">
                  <h3 className="text-6xl font-extrabold  text-orange-400">Pawsome</h3><span className="absolute text-l text-orange-400 font-semibold top-9 right-[103px]">™</span>
                  <h4 className="text-sm font-extrabold text-gray-300 mt-4 ">Log in to PawSome</h4>
                </div >
                <div className="md:flex sm:items-start space-x-10 max-sm:space-y-4 mb-8">
                  <button type="button" className="py-2.5 px-4 text-sm font-semibold rounded-sm text-blue bg-blue-100 hover:bg-orange-200 focus:outline-none w-32">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" className="inline mr-4" viewBox="0 0 512 512">
                      <path fill="#000"
                        d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                        data-original="#fbbd00" />
                      <path fill="#000"
                        d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                        data-original="#0f9d58" />
                      <path fill="#000"
                        d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                        data-original="#31aa52" />
                      <path fill="#000"
                        d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                        data-original="#3c79e6" />
                      <path fill="#000"
                        d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                        data-original="#cf2d48" />
                      <path fill="#000"
                        d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                        data-original="#eb4132" />
                    </svg>
                  </button>
                  <button type="button" className="py-2.5 px-4 text-sm font-semibold rounded-sm text-blue-500 bg-blue-100 hover:bg-orange-200 focus:outline-none w-32 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#000" viewBox="0 0 48 50" className="inline mr-2">

                      <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>

                    </svg>
                  </button>
                  <button type="button" className="w-32 py-2.5 px-4 text-sm font-semibold rounded-sm text-blue-500 bg-blue-100  hover:bg-orange-200 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#000" viewBox="0 0 50 50" className="inline mr-2">

                      <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"></path>

                    </svg>
                  </button>
                </div>
                <div>
                  {/* <label className="text-gray-800 text-sm mb-2 block">User name</label> */}
                  <div className="relative flex items-center">
                    <input onChange={e => setEmail(e.target.value)} name="email" type="email" required className="w-full rounded-sm text-sm text-gray-800 border border-gray-300 px-4 py-3  outline-blue-600" placeholder="Enter email" />
                   
                  </div>
                </div>
                <div className="mt-7">
                  {/* <label className="text-gray-800 text-sm mb-2 block">Password</label> */}
                  <div className="relative flex items-center">
                    <input onChange={e=>setPassword(e.target.value)} autoComplete="password" name="password" type="password" required className="w-full rounded-sm text-sm text-gray-800 border border-gray-300 px-4 py-3  outline-blue-600" placeholder="Enter password" />
                    {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M112 64A48 48 0 0 0 16 64c0 4.854 0 16 48 16s48-11.146 48-16zm16 0c0 7.29-5.828 13.7-17.16 18.289A60.221 60.221 0 0 1 64 88a60.221 60.221 0 0 1-46.84-5.711C5.828 77.7 0 71.29 0 64c0-7.254 5.738-13.639 16.172-18.172C24.918 25.6 41.527 16 64 16c22.473 0 39.082 9.6 47.828 29.828C122.262 50.361 128 56.746 128 64zm-64 4c19.621 0 36.328-3.782 44.047-9.6C92.329 41.2 79.777 32 64 32S35.671 41.2 19.953 58.4C27.672 64.218 44.379 68 64 68zm8-12a8 8 0 0 0-16 0 8 8 0 0 0 16 0z" data-original="#000000"></path>
                  </svg> */}
                  </div>
                </div>

                <div className="mt-4">
                  <button type="submit" className="w-full shadow-xl py-4 px-6 text-sm font-semibold rounded-sm text-white bg-orange-400 hover:bg-yellow-600 focus:outline-none">Log in</button>
                </div>
                {error && (
                  <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                    {error}
                  </div>
                )}  </form>
                <p className="text-sm mt-8 text-center text-gray-800"><Link href={"/register"} className="text-gray-300 font-semibold hover:underline ml-1 whitespace-nowrap">Create an account</Link></p>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



