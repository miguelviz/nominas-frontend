import { Grid } from "@mui/material";
import { useConfirm } from "material-ui-confirm";
import React from "react";
import { toast } from "react-hot-toast";
import Button from "../../Components/Button";
import Input from "../../Components/Input";
import { usePayroll } from "../store";
import "./styles.css"
const Header = ()=>{
    const confirm = useConfirm();
    const {restartPackages,handleShowCreate,searchValue,setSearchValue} = usePayroll();
    const onRestartBtn = ()=>{
        confirm({
            title:"¡Precaución!",
            description: `¿Estás seguro que deseas reiniciar todos los paquetes?`,
            confirmationText:"Si",
            cancellationText:"No"
        }).then(()=>{
            toast.promise(
                restartPackages(),
                {
                    loading: `Reiniciando..`,
                    success: <b>Paquetes reiniciados con éxito!</b>,
                    error: <b>Error al reiniciar los paquetes.</b>,
                }
            );
        })
    }
    return(
        <Grid container>
            <Grid item style={{padding:10}}>
                <Button  type={"success"} execute={handleShowCreate} >
                    Crear Empleado
                </Button>
            </Grid>
            <Grid item style={{padding:10}}>
                <Button type={"danger"} execute={onRestartBtn} >
                    Reiniciar Paquetes
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Input 
                    value={searchValue}
                    setValue={setSearchValue}
                    placeholder="Filtrar por nombre"
                    style={{
                        marginLeft:10
                    }}
                />
            </Grid>
        </Grid>
    )
}
export default Header;