import React from "react";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { usePayroll } from "../store";
import "./styles.css"
const Header = ()=>{
    const {showCreate,handleShowCreate,searchValue,setSearchValue} = usePayroll();
    return(
        <div className="payroll-header">
            <Button variant="primary" type={"success"} execute={handleShowCreate} >
                Crear Empleado
            </Button>
            <Input 
                value={searchValue}
                setValue={setSearchValue}
                placeholder="Filtrar por nombre"
                style={{
                    marginLeft:10
                }}
            />
        </div>
    )
}
export default Header;