import React from 'react';
import { toast } from 'react-hot-toast';
import Constants from '../Utils/Constants';
import PostRequest from '../Utils/PostRequest';
const Payroll = React.createContext();
export const PayrollProvider = (props)=>{
    const {COLORS} = Constants;
    //Page States
    const [pageData,setPageData] = React.useState(null);
    const [pageError,setPageError] = React.useState(null);
    const [pageLoad,setPageLoad] = React.useState(false);
    const handlePageLoad = ()=>setPageLoad(!pageLoad);
    const [showCreate,setShowCreate] = React.useState(false);
    const handleShowCreate = ()=>setShowCreate(!showCreate);
    const [loadCreate,setLoadCreate] = React.useState(false);
    const handleLoadCreate = (arg)=>setLoadCreate(arg);
    const [loadPackage,setLoadPackage] = React.useState(false);
    const handleLoadPackage = (arg)=>setLoadPackage(arg);
    const [loadRestartPackage,setLoadRestartPackage] = React.useState(false);
    const handleLoadRestartPackage = (arg)=>setLoadRestartPackage(arg);
    const [searchValue,setSearchValue] = React.useState("");

    //Page Functions
    const refreshPageData = async()=>{
        let r = await PostRequest({
            url:"getWorkers",
            postData:{

            },
            load:handlePageLoad
        }).catch(e=>{
            console.log(e);
            toast.error(e.error);
        })
        console.log(r);
        if(r&&r.result){
            setPageData(r.result);
        }
    }
    const createWorker = async({names,first_sname,second_sname,userType,workNumber})=>{
        return new Promise((resolve,reject)=>{
            (async()=>{
                let r = await PostRequest({
                    url:"createWorker",
                    postData:{
                        names,
                        first_sname,
                        second_sname,
                        userType,
                        workNumber
                    },
                    load:handleLoadCreate
                }).catch(e=>{
                    toast.error(e.error);
                    setTimeout(()=>reject(),500);
                })
                if(r){
                    await refreshPageData();
                    handleShowCreate();
                    resolve();
                }
            })()
        })
    }
    const addPackages = async({userID,packages})=>{
        return new Promise((resolve,reject)=>{
            (async()=>{
                let r = await PostRequest({
                    url:"addPackages",
                    postData:{
                        userID,
                        packages
                    },
                    load:handleLoadPackage
                }).catch(e=>{
                    toast.error(e.error);
                    setTimeout(()=>reject(),500);
                })
                if(r){
                    await refreshPageData();
                    resolve();
                }
            })()
        })
    }
    const restartPackages = async()=>{
        return new Promise((resolve,reject)=>{
            (async()=>{
                let r = await PostRequest({
                    url:"restartPackages",
                    postData:{},
                    load:handleLoadRestartPackage
                }).catch(e=>{
                    toast.error(e.error);
                    setTimeout(()=>reject(),500);
                })
                if(r){
                    await refreshPageData();
                    resolve();
                }
            })()
        })
    }
    React.useEffect(()=>{
        if(!pageData){
            refreshPageData()
        }
    },[])
    const value = React.useMemo(()=>{
        return({
            pageData,
            pageError,
            pageLoad,
            showCreate,handleShowCreate,
            loadCreate,loadPackage,loadRestartPackage,
            searchValue,setSearchValue,
            COLORS,
            createWorker,addPackages,restartPackages
        })
    },[pageData,pageError,pageLoad,showCreate,searchValue,loadCreate,loadPackage,loadRestartPackage])
    return <Payroll.Provider value={value} {...props}/>
}
export const usePayroll = ()=> React.useContext(Payroll);