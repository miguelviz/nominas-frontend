import React from "react";
import { usePayroll } from "../store";
import { Icon, IconButton, Typography } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const Table = ()=>{
    const {COLORS,pageData} = usePayroll();
    const filteredList = ()=>{
        if(pageData&&pageData.list){
            return pageData.list;
        }
        return null;
    }
    return(
        <table className="custom-table">
            <thead>
                <tr className="custom-tr" style={{backgroundColor:COLORS.primary}}>
                    <th className="custom-th" style={{color:"#fff",padding:10}} align="center">
                        Nombre(s)
                    </th>
                    <th className="custom-th" style={{color:"#fff",padding:10}} align="center">
                        Apellido Paterno
                    </th>
                    <th className="custom-th" style={{color:"#fff",padding:10}} align="center">
                        Apellido Materno
                    </th>
                    <th className="custom-th" style={{color:"#fff",padding:10}} align="center">
                        Opciones
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    !filteredList() ?
                    <tr>
                        <td colSpan={4} align="center">
                            Sin resultados.
                        </td>
                    </tr> :
                    filteredList().map((worker,indexWorker)=>(
                        <CustomTr worker={worker} key={indexWorker} />
                    ))
                }
            </tbody>
        </table>
    )
}
const CustomTr = ({worker})=>{
    const [showMoney,setShowMoney] = React.useState(false);
    const handleShowMoney = ()=>setShowMoney(!showMoney);
    return(
        <React.Fragment>
            <tr>
                <td align="center">
                    <Typography>
                        {worker.names}
                    </Typography>
                </td>
                <td align="center">
                    <Typography>
                        {worker.first_sname}
                    </Typography>
                </td>
                <td align="center">
                    <Typography>
                        {worker.second_sname}
                    </Typography>
                </td>
                <td align="center">
                    <IconButton onClick={handleShowMoney}>
                        <AttachMoneyIcon />
                    </IconButton>
                </td>
            </tr>
            {
                showMoney ? 
                <tr>
                    <td colSpan={4} align="center">
                        Show Money
                    </td>
                </tr> : null
            }
        </React.Fragment>
    )
}
export default Table;