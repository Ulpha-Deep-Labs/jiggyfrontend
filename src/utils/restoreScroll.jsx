import { useLocation } from "react-router-dom"
import { useEffect, useLayoutEffect, useRef } from "react"
import { useHomeTabContext } from '../contexts/homeTabContext'
import {mountScrollListener, unmountScrollListener, scrollPage} from './scrollPage'

export default function RestoreScroll({children, tab='', deps=[]}){
   
    const location= useLocation()
    const { selectedTab }= useHomeTabContext()
    let path=location.pathname
    path= path=='/'? 'home' : path.slice(1)
    path= path + (tab?  '-' + tab : '') 
    

    // useLayoutEffect(()=>{
    //     console.log('path: ', path)
    //     console.log(sessionStorage.getItem(path))

    //     scrollPage(path)
    //     mountScrollListener(path)

    //     return ()=>{ unmountScrollListener() }

    // }, [ selectedTab, path ])


    return <> {children} </>
 }


  

export function useRestoreScroll(tab, deps=[]){
    useLayoutEffect(()=>{
        scrollPage(tab)       
        mountScrollListener(tab)

        return ()=>{ unmountScrollListener() }
  }, [tab, ...deps])
 }


  

  // useLayoutEffect(()=>{
//   const tab='home-'+ selectedTab
//   const top=sessionStorage.getItem(tab)

//   window.requestAnimationFrame(()=>{
//     console.log(top +'test', window)
//     window.scrollTo(0, top)
//   })

// },[selectedTab])