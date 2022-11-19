import React from "react";
import { usePayroll } from "../../Payroll/store";
import { Input } from '@mui/material';
import "./styles.css";
const CustomInput = ({value,setValue,style,placeholder})=>{
    const {COLORS} = usePayroll();
    return(
        <Input 
            placeholder={placeholder||"Insertar valor"}
            value={value}
            onChange={(e)=>setValue(e.target.value)}
            style={{
                borderColor:COLORS.primary,
                width:"100%",
                ...style
            }}
        />
    )
}
export default CustomInput;