import React from "react";
import { usePayroll } from "../../Payroll/store";
import Button from '@mui/material/Button';
import "./styles.css";
const CustomButton = ({type,execute,load,children,style,disabled})=>{
    const {COLORS} = usePayroll();
    const noExe = ()=>alert("Funcionalidad no definida");
    const btnStyles = {
        backgroundColor: type === "success" ? COLORS.primary : COLORS.secondary,
        color:"#fff",
        ...style
    }
    return(
        <Button className="sizeable" style={btnStyles} onClick={execute||noExe} disabled={load||disabled}>
            {load?"Espere..":children||"Etiqueta no definida."}
        </Button>
    )
}
export default CustomButton;