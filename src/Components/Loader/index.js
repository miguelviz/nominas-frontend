import React from "react";
import { usePayroll } from "../../Payroll/store";
import "./styles.css";

const Loader = ()=>{
    const {COLORS} = usePayroll();
    return(
        <div className="loader-container">
            <span className="loader-text" style={{color:COLORS.primary}}>
                Espere..
            </span>
        </div>
    )
}
export default Loader;