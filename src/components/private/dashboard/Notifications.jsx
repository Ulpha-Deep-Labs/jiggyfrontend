// import {FaBell as BellIcon}   from  'react-icons/fa'
import HomeFooter from "../../public/home/homeFooter";
import Spinner from "../../common/Spinner";
import ErrorOccurred from "../../error/ErrorOccurred";
import { useRestoreScroll } from "../../../utils/restoreScroll";
import GoBackButton from '../../public/home/goBackButton'

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { getNotifications } from "../../../utils/user";
import { getNotificationDate } from "../../../utils/formatNotifications";


import { useErrorContext } from "../../../contexts/ErrorContext";
import { useAuthContext } from "../../../contexts/AuthContext";

// icons import
import comments from "../../../assets/message.svg";
// import flames from '../../../assets/flames.svg'
// import heart from '../../../assets/heart.svg'
// import upvote from '../../../assets/upvote.svg'

export default function Notiifications() {
  const restoreScroll = useRestoreScroll("notifications");
  const { key: token } = useAuthContext();
  const { setAppError } = useErrorContext();
  const navigate = useNavigate();
  const {
    data: notifications,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications", token],
    queryFn: getNotifications,
  });
  console.log(notifications)

  // {"data":{"count":4,"next":null,"previous":null,"results":[{"notifications":[{"user":"Samantha_359","notification_text":"Samantha_359 commented on post 98"}]},{"notifications":[{"user":"Samantha_359","notification_text":"Samantha_359 commented on post 98"}]},{"notifications":[{"user":"Samantha_359","notification_text":"Samantha_359 commented on post 100"}]},{"notifications":[{"user":"Samantha_359","notification_text":"Samantha_359 commented on post 100"}]}]},

  useEffect(() => {
    if (token == null) {
      navigate("/login");
    }
    if (!error) {
      setAppError(null);
    } else {
      setAppError(error);
    }

    if(notifications){
    	console.log(notifications)
    }
  }, [error, token, notifications]);

  return (
    <>
      <header className="fixed  top-0 w-full h-20 bg-black flex items-center justify-between px-4 ">
      <div className="left flex gap-2 items-center">
      		<GoBackButton />
        	<h1 className="nav text-2xl font-bold bg-gradient-to-l from-[#B416FE40] via-[#FF008A62] to-[#F33F5E] bg-clip-text text-transparent font-openSans ">
          	Notifications
        	</h1>
      </div>
      <div className="right">
      	<p className="mark-all text-xs text-[#B20000] font-poppins ">
            Mark all as read
          </p>
      </div>
       {/* <div className="flex justify-between items-center px-4 py-6">
        
          
        </div>*/}
      </header>
      <main className="w-full  pt-20 pb-24">
        {error ? (
          <ErrorOccurred />
        ) : isLoading ? (
          <Spinner />
        ) : notifications.data && notifications.data.results.length == 0 ? (
          <p className=" text-center text-base">
            I'm Sorry you do not have any new notification
          </p>
        ) : (
          notifications.data.results
            .map((item, index) => {
           		const [el]= item
           
              	const postId = el.notification_text.split(',')[0].split(' ').at(-1) || el.notification_text.split(' ').at(-1)
            	// let commentId=  	el.notification_text.split(',').at(-1).split(' ').at(-1)
              	let commentId
				const time=getNotificationDate(el.created_at)	

              

              return (
              	<div className="flex justify-between border-b-[1px] border-slate-400 py-2 px-4"  key={el.notification_text + index}>
	                <Link
	                  className="flex items-center"
	                  to={"/comments/" + postId + (commentId? 'tag?=' + commentId:'')}
	                 
	                >
	                  <img className="w-6" src={comments} alt="comments" />
	                  {}
	                  <p className="grow text-sm pl-2"> {el.notification_text}</p>
	                </Link>
	               <p className="time text-[.7rem]">{time}</p>
              	</div>
              );
            })
            .reverse()
        )}
      </main>
      <HomeFooter />
    </>
  );
}

{
  /*
<main className="grow mb-20  flex flex-col  w-full px-3 sm:px-8">
				{
					error ? <ErrorOccurred />
					:isLoading? <Spinner />
					:notifications.data && notifications.data.results.length==0? <p className="font-bold text-center text-base">I'm Sorry you do not have any new  notification</p>
					:notifications.data.results.map((el, index)=>{
						 	const {notification_type:type, created_at}=el
							const time=getNotificationDate(created_at)	


							const Notification=	(
							<div 
								className="notification flex space-between gap-2 items-center w-full px4 py-4 border-b-[1px] border-[#F2F4F5]"
								onClick={handleClick}
							>
								<img 
									src={
										type=='comment'? comments
										:type=='fun trend'? heart
										:type=='hot trend'? flames
										:type=='upvote'? upvote
										:comments
									}
									alt='comment' />
								<div className=" font-sfProDisplay grow">
									<p className=" text-[#505353]">{type=='fun trend'|| type=='hot trend'? 'trending' : type}</p>
									<p className=" text-[#FFFBFB] text-xs">
										{
											type=='comment'? 'Someone commented on your post: '
											:type=='fun trend' ? 'Your posts is trending in the fun section' 
											:type=='hot trend' ? 'Your posts is trending in the hot section' 
											:type=='upvote'? 'Someone made an upvote on your post: '
											: 'new notification'
										}
									</p>	
								</div>
								<p className="time text-[8px] text-right ">{time}</p>
							</div>
						)
						

						// return Notification
						return (
							<Link className="flex items-center py-2 border-b-[1px] border-white" to={'/comments/'+el.split(' ').at(-1)} key={el+index}>
								<img src={comments} alt="comments" />
								{
									item.notifications[1]	
								}
								<p className="grow text-sm pl-2"> {el}</p>
							</Link>
						)
					})
				}
				{/* <div className=" test-div-remove-if-you-want h-[500px] w-full text-white">hello
				</div>
				 */
}
// </main>*/}
