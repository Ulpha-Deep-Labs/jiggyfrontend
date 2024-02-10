import { HiOutlineRefresh } from "react-icons/hi";
import profile_pic from "../../../assets/profile_pics/pic1.png";
import { useState } from "react";
import UserAvatar from './userAvatar'

const PrivacyHeader = ({generated_username}) => {
  const [profilePic, setProfilePic] = useState(profile_pic)
  return (
    <section className="flex flex-col items-center my-10">
      {/*<div className="relative h-[120px] w-[120px] rounded-full border-none bg-white flex items-center justify-center">*/}
        {/*<img src={profilePic} alt="" className="h-[100%] w=[100%]" />*/}
        {/* <div className="absolute bottom-0 w-full flex justify-center py-2 bg-[rgba(0,0,0,.6)]">
          <LiaCameraRetroSolid />
        </div>
        <div>
          <input type="file" accept="image/*"  placeholder="change dp" onChange={(e) => setProfilePic(e.target.value)} />
        </div> */}
     {/* <p className="initial text-[#f33f5e] font-bold text-7xl">{generated_username[0]}</p>
      </div>*/}
      <UserAvatar nameInitial={generated_username? generated_username[0]: null} size='30' textSize='7xl' />
      <h4 className="flex items-center gap-2 mt-6">
        <span className="text-2xl">
        {generated_username}
        </span>
          <HiOutlineRefresh fontWeight={"700"} className="text-blue-300" />
      </h4>
      <a href="https://jiggy.com/annoymous" className="text-sm mt-2 text-blue-800">https://jiggy.com/annoymous</a>
    </section>
  );
};

export default PrivacyHeader
