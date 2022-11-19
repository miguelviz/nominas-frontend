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
    const createWorker = async({names,first_sname,second_sname,userType})=>{
        let r = await PostRequest({
            url:"createWorker",
            postData:{
                names,
                first_sname,
                second_sname,
                userType
            },
            load:handleLoadCreate
        }).catch(e=>{
            toast.error(e.error);
        })
        if(r){
            toast.success("Usuario creado exitosamente");
            handleShowCreate();
            await refreshPageData()
        }
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
            loadCreate,
            searchValue,setSearchValue,
            COLORS,
            createWorker
        })
    },[pageData,pageError,pageLoad,showCreate,searchValue,loadCreate])
    return <Payroll.Provider value={value} {...props}/>
}
export const usePayroll = ()=> React.useContext(Payroll);