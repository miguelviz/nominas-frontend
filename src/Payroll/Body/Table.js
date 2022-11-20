import React from "react";
import { usePayroll } from "../store";
import { Card, CardContent, Grid, Typography } from '@mui/material';
import Input from "../../Components/Input";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import FadeIn from 'react-fade-in';
import CustomButton from "../../Components/Button";
import { toast } from "react-hot-toast";
import { useConfirm } from "material-ui-confirm";
import {number_format} from "locutus/php/strings";
const Table = ()=>{
    const {COLORS,pageData,searchValue} = usePayroll();
    const filteredList = ()=>{
        if(pageData&&pageData.list){
            let search = searchValue.toLowerCase();
            if(search){
                return pageData.list.filter(user=>`${user.names} ${user.first_sname} ${user.second_sname}`.toLowerCase().indexOf(search)!==-1);
            }else{
                return pageData.list;
            }
        }
        return null;
    }
    return(
        <table className="custom-table">
            <thead>
                <tr className="custom-tr" style={{backgroundColor:COLORS.primary}}>
                    <th className="custom-th" style={{color:"#fff",padding:10}} align="center">
                        Nombre completo
                    </th>
                    <th className="custom-th" style={{color:"#fff",padding:10}} align="center">
                        Tipo de usuario
                    </th>
                    <th className="custom-th" style={{color:"#fff",padding:10}} align="center">
                        Sueldo mensual
                    </th>
                    <th className="custom-th" style={{color:"#fff",padding:10}} align="center">
                        Paquetes entregados
                    </th>
                    <th className="custom-th" style={{color:"#fff",padding:10}} align="center">
                        Detalle
                    </th>
                </tr>
            </thead>
            <tbody>
                {
                    !filteredList() ?
                    <tr>
                        <td colSpan={5} align="center">
                            Sin resultados.
                        </td>
                    </tr> :
                    filteredList().map((worker,indexWorker)=>(
                        <CustomTr worker={worker} key={indexWorker} index={indexWorker} />
                    ))
                }
            </tbody>
        </table>
    )
}
const CustomTr = ({worker,index})=>{
    const {COLORS} = usePayroll();
    const [showMoney,setShowMoney] = React.useState(false);
    const handleShowMoney = ()=>setShowMoney(!showMoney);
    return(
        <React.Fragment>
            <tr>
                <td align="center">
                    <FadeIn delay={index*100}>
                        <Typography style={{color:COLORS.secondary}}>
                            {worker.names} {worker.first_sname} {worker.second_sname} ({worker.work_number})
                        </Typography>
                    </FadeIn>
                </td>
                <td align="center">
                    <FadeIn delay={index*100}>
                        <Typography style={{color:COLORS.secondary}}>
                            {worker.name_user_type}
                        </Typography>
                    </FadeIn>
                </td>
                <td align="center">
                    <FadeIn delay={index*100}>
                        <Typography style={{color:COLORS.secondary}}>
                            $ {number_format(worker.salary_total,2)}
                        </Typography>
                    </FadeIn>
                </td>
                <td align="center">
                    <FadeIn delay={index*100}>
                        <Typography style={{color:COLORS.secondary}}>
                            {worker.month_packages}
                        </Typography>
                    </FadeIn>
                </td>
                <td onClick={handleShowMoney} style={{cursor:"pointer"}} align="center">
                    {
                        !showMoney ? <ArrowCircleDownIcon style={{color:COLORS.primary,fontSize:50}} /> : <ArrowCircleUpIcon style={{color:COLORS.secondary,fontSize:50}} />
                    }
                </td>
            </tr>
            {
                showMoney ? 
                <tr>
                    <td colSpan={5} align="center">
                        <WorkerSalaryDetails worker={worker} />
                    </td>
                </tr> : null
            }
        </React.Fragment>
    )
}
const WorkerSalaryDetails = ({worker})=>{
    const confirm = useConfirm();
    const {COLORS,loadPackage,addPackages} = usePayroll();
    const [quantity,setQuantity] = React.useState("");
    const checkQuantity = ()=>{
        if(quantity){
            if(!isNaN(quantity)){
                return false;
            }
        }
        return true;
    }
    const checkForm = ()=>{
        if(!checkQuantity()){
            return false;
        }
        return true;
    }
    const onClickBtn = ()=>{
        if(!checkForm()){
            confirm({ 
                title:"¡Precaución!",
                description: `¿Estás seguro que deseas agregar ${quantity} a '${worker.names}'?`,
                confirmationText:"Si",
                cancellationText:"No"
            }).then(() => {
                toast.promise(
                    addPackages({
                        userID:worker.ID,
                        packages:quantity
                    }),
                    {
                        loading: `agregando ${quantity} paquetes a: '${worker.names}'`,
                        success: <b>Paquetes agregados con éxito!</b>,
                        error: <b>Error al agregar los paquetes.</b>,
                    }
                );
            })
            .catch(() => {
                
            });
        }else{
            toast.error("La cantidad debe ser un número entero.");
        }
    }
    return(
        <Grid container style={{paddingLeft:"3%",paddingRight:"3%",backgroundColor:COLORS.background}}>
            <Grid item xs={12} md={3} style={{padding:10}}>
                <FadeIn>
                    <Card sx={{minWidth:"100%",borderColor:COLORS.primary}}>
                        <CardContent>
                            <Typography style={{fontSize:20,textAlign:"left"}}>
                                Desgloce de sueldo
                            </Typography>
                            <Grid container>
                                <Grid item xs={8}>
                                    <Typography style={{fontSize:15,textAlign:"left",color:COLORS.primary}}>
                                        Sueldo base:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography style={{fontSize:15,textAlign:"right",color:COLORS.secondary}}>
                                        $ {number_format(worker.salary,2)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography style={{fontSize:15,textAlign:"left",color:COLORS.primary}}>
                                        Bono por horas:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography style={{fontSize:15,textAlign:"right",color:COLORS.secondary}}>
                                        $ {number_format(worker.hour_bonus,2)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography style={{fontSize:15,textAlign:"left",color:COLORS.primary}}>
                                        Bono por entregas:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography style={{fontSize:15,textAlign:"right",color:COLORS.secondary}}>
                                        $ {number_format(worker.package_bonus,2)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography style={{fontSize:15,textAlign:"left",color:COLORS.primary}}>
                                        Total:
                                    </Typography>
                                </Grid>
                                <Grid item xs={4}>
                                    <Typography style={{fontSize:15,textAlign:"right",color:COLORS.secondary}}>
                                        $ {number_format(worker.full_salary,2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </FadeIn>
            </Grid>
            <Grid item xs={12} md={3} style={{padding:10}}>
                <FadeIn delay={300}>
                    <Card sx={{minWidth:"100%",borderColor:COLORS.primary}}>
                        <CardContent>
                            <Typography style={{fontSize:20,textAlign:"left"}}>
                                Descuentos
                            </Typography>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography style={{fontSize:15,textAlign:"left",color:COLORS.primary}}>
                                        Porcentaje ISR:
                                    </Typography>
                                    <Typography style={{fontSize:15,textAlign:"left",color:COLORS.primary}}>
                                        Total ISR:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography style={{fontSize:15,textAlign:"right",color:COLORS.secondary}}>
                                         {worker.isr_porcent}%
                                    </Typography>
                                    <Typography style={{fontSize:15,textAlign:"right",color:COLORS.secondary}}>
                                        $ {number_format(worker.isr_total,2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </FadeIn>
            </Grid>
            <Grid item xs={12} md={3} style={{padding:10}}>
                <FadeIn delay={600}>
                    <Card sx={{minWidth:"100%",borderColor:COLORS.primary}}>
                        <CardContent>
                            <Typography style={{fontSize:20,textAlign:"left"}}>
                                Totales
                            </Typography>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography style={{fontSize:15,textAlign:"left",color:COLORS.primary}}>
                                        Salario Completo:
                                    </Typography>
                                    <Typography style={{fontSize:15,textAlign:"left",color:COLORS.primary}}>
                                        Total descuentos:
                                    </Typography>
                                    <Typography style={{fontSize:15,textAlign:"left",color:COLORS.primary}}>
                                        Total a pagar:
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography style={{fontSize:15,textAlign:"right",color:COLORS.secondary}}>
                                        $ {number_format(worker.full_salary,2)}
                                    </Typography>
                                    <Typography style={{fontSize:15,textAlign:"right",color:COLORS.secondary}}>
                                        $ {number_format(worker.isr_total,2)}
                                    </Typography>
                                    <Typography style={{fontSize:15,textAlign:"right",color:COLORS.secondary}}>
                                        $ {number_format(worker.salary_total,2)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </FadeIn>
            </Grid>
            <Grid item xs={12} md={3} style={{padding:10}}>
                <FadeIn delay={900}>
                    <Card sx={{minWidth:"100%",borderColor:COLORS.primary}}>
                        <CardContent>
                            <Typography style={{fontSize:20,textAlign:"left"}}>
                                Agregar Paquetes
                            </Typography>
                            <Grid container>
                                <Grid item>
                                    <Input 
                                        value={quantity}
                                        setValue={setQuantity}
                                        placeholder="Número de paquetes"
                                        style={{
                                            marginLeft:10
                                        }}
                                    />
                                </Grid>
                                <Grid item>
                                    <CustomButton 
                                        type="success"
                                        execute={onClickBtn}
                                        load={loadPackage}
                                        style={{
                                            marginLeft:15
                                        }}
                                    >
                                        Agregar
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </FadeIn>
            </Grid>
        </Grid>
    )
}
export default Table;