import { useGoogleLogin } from "@react-oauth/google";
import "../../App.css";
import logo from "../../assets/logo.png";
import { Send } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function SignIn() {
  const navigate = useNavigate();
  const links = [
    {
      title: "FLASH MENTORSHIP",
      link: "#",
    },
    {
      title: "NEWS & STORIES",
      link: "#",
    },
    {
      title: "EVENTS",
      link: "#",
    },
    {
      title: "BATCHMATES",
      link: "#",
    },
    {
      title: "ABOUT",
      link: "#",
    },
  ];
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
              Accept: "application/json",
            },
          }
        );
        if (response.data) {
          console.log(response.data);

          const responsearaha = await axios.post(
            "https://alumni-site.onrender.com/api/auth/google",
            {
              email: response.data.email,
              name: response.data.name,
              picture: response.data.picture,
            }
          );
          if (responsearaha.data.user) {
            localStorage.setItem("userId", responsearaha.data.user._id);
            console.log(responsearaha.data.user._id);

            toast.info(responsearaha.data.message);

            navigate("/roles");
          }
        }
      } catch (err) {
        console.error(err); // Use console.error for error messages
      }
    },
  });
  return (
    <>
      <main className="h-full md:h-screen flex flex-col   w-full">
        <div className="">
          <header
            className="
     w-full flex flex-col h-fit md:h-36 md:flex-row md:px-8 items-center justify-center md:items-center md:justify-between p-4 gap-8"
          >
            <img src={logo} alt="Logo" className="w-full max-w-sm" />
            <button className="w-fit border hidden md:flex rounded-md px-4 py-3 bg-blue-500 text-white gap-1 items-center  text-xs font-semibold">
              {" "}
              LOGIN / SIGNUP
            </button>
          </header>
          <div className="h-fit w-full  flex items-center justify-center bg-blue-500 ">
            <div className="h-full w-full ">
              <div className="  w-fit max-w-7xl px-2 mx-auto hidden md:flex bg-blue-500 gap-12">
                {links.map((link, index) => (
                  <a
                    key={index}
                    href={link.link}
                    className="text-white hover:text-white font-bold p-3"
                  >
                    {link.title}
                  </a>
                ))}
              </div>
              <div className="  w-full px-4 py-2 max-w-7xl  md:hidden items-center justify-between flex bg-blue-500 gap-12">
                <button className="w-fit border  flex rounded-md px-4 py-2.5 bg-blue-500 text-white gap-1 items-center  text-xs font-semibold">
                  {" "}
                  LOGIN / SIGNUP
                </button>
                <span className="text-white">MENU</span>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex-1">
          <div className="h-40 w-full bg-black"></div>
          <div className="h-full md:h-fit w-full px-4 py-6">
            <div className="h-auto shadow-md py-8 px-4 w-full gap-6 md:gap-0 flex flex-col md:flex-row items-center justify-center max-w-3xl md:mx-auto -mt-16 bg-white rounded-md z-20 ">
              <div className="flex-1 border-b md:border-r md:px-2 py-2 md:py-0 space-y-4">
                <img src={logo} alt="Logo" className="w-full max-w-xs" />
                <p className="text-neutral-600 text-center">
                  Sign up or log in to stay connected with your community{" "}
                </p>
              </div>
              <div className="flex-1 md:px-12 flex flex-col gap-4">
                <h2 className="font-medium text-lg text-center">
                  Choose any one of the following to Signup/Login
                </h2>
                <div className="space-y-4">
                  <button
                    onClick={googleLogin}
                    className=" w-full px-2 py-2 shadow-md rounded-sm bg-blue-600"
                  >
                    <p className="text-center text-sm text-white">
                      CONNECT WITH FACEBOOK
                    </p>
                  </button>
                  <button
                    onClick={googleLogin}
                    className=" w-full px-2 py-2 shadow-md rounded-sm bg-red-500"
                  >
                    <p className="text-center text-sm text-white">
                      CONNECT WITH GOOGLE
                    </p>
                  </button>

                  <button
                    onClick={googleLogin}
                    className=" w-full px-2 py-2 shadow-md rounded-sm bg-blue-400"
                  >
                    <p className="text-center text-sm text-white">
                      CONNECT WITH LINKEDIN
                    </p>
                  </button>
                </div>
                <div className="relative w-full h-fit flex gap-1 items-center">
                  <hr className="w-full" />
                  <p className="text-[10px] font-semibold p-2 text-white rounded-full bg-neutral-400 ">
                    OR
                  </p>
                  <hr className="w-full" />
                </div>
                <div className="flex gap-3 items-center">
                  <div className="relative z-0 -mt-2 w-full">
                    <input
                      type="text"
                      id="email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute text-xl text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 text-blackpeer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-50 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      Enter your Email
                    </label>
                  </div>
                  <Send className="h-5 w-6 rotate-45  text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-12   bottom-0 w-full bg-black flex items-center justify-end">
          Need help?
        </div>
      </main>
    </>
  );
}

export default SignIn;
