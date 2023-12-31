/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  HiChevronRight,
  HiCog,
  HiEye,
  HiLockClosed,
  HiOutlinePencilAlt,
  HiOutlineLogout,
} from "react-icons/hi";
import PrivacyHeader from "../common/PrivacyHeader";
import { BsChat, BsChatFill, BsMessenger } from "react-icons/bs";

//add two div side by side the secondone transparent on key press,chande profile state
export const Profile = ({ setProfilePage, userDetails }) => {
  const { logout } = useContext(AuthContext);
console.log(userDetails);
  return (
    <div className="fixed top-0 z-50 flex w-[100%] bg-[rgba(20,20,20,.3)] ">
      <div className="shadow-[0_0_5px_0px] shadow-[rgba(150,150,105,.4)] flex flex-col justify-between h-[100vh] pt-6 pb-6 w-3/4 bg-black">
        <div>
          <header className="flex flex-col  font-bold items-center">
            <h2 className="text-3xl font-['Playfair_Display',_serif] ml-6 font-bold from-[#f33f5e] via-[#ff008a9e] to-[#b416fe66] bg-gradient-to-r bg-clip-text text-transparent">
              <span className="font-['Over_the_Rainbow',_cursive] font-extrbold text-[2.2rem]">
                J
              </span>
              iggy
            </h2>
            <PrivacyHeader generated_username={userDetails.user.generated_username} />
          </header>
          <section className="flex gap-3 flex-col px-4">
            <Link
              to="/feedback"
              className="flex gap-2 items-center border-b py-2 px-3"
            >
              <p className="text-[#907378]">Feedback</p>
              <span className="text-[1rem]">🗨️</span>
            </Link>
            <Link
              to="/whatsnew"
              className="text-[#907378] flex gap-2 items-center border-b py-2 px-3"
            >
              <p>What's New</p>
              <div className="flex flex-col items-center">
                <div className="flex items-baseline">
                  <span>⭐</span>
                  <span className="text-[.6rem] ml-[-.3rem]">⭐</span>
                </div>
                <span className="text-[.4rem] mt-[-.2rem]">⭐</span>
              </div>
            </Link>

            {/* <Link
              to="/help"
              className="text-[#907378] flex gap-2 items-center border-b py-2 px-3"
            >
              <p>Help</p>
              <span className="text-[1rem]">❔</span>
            </Link> */}
          </section>
        </div>
        <div className="w-full grid place-items-center">
          <button
            className="flex items-center  py-1 px-2 text-black rounded-lg"
            onClick={() => logout()}
          >
            <p className="text-xl mr-2 text-white font-bold">LOG OUT</p>
            <HiOutlineLogout size={25} color="white" />
          </button>
        </div>
      </div>
      <div
        className="h-100% w-1/4"
        onClick={() => setProfilePage(false)}
        onMouseDown={() => setProfilePage(false)}
        onTouchStart={() => setProfilePage(false)}
      ></div>
    </div>
  );
};
