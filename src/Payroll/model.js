import React from "react";
import Body from "./Body";
import Header from "./Header";
import { usePayroll } from "./store";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import "./styles.css";
import { Select, MenuItem } from "@mui/material";
import CustomButton from "../Components/Button";
import Input from "../Components/Input";
import { toast } from "react-hot-toast";
import Footer from "./Footer";
const Model = ()=>{
    return(
        <div className="payroll-principal">
            <ModalCreate />
            <Header />
            <Body />
            <Footer />
        </div>
    )
}
const ModalCreate = ()=>{
    const {showCreate,handleShowCreate,createWorker,loadCreate} = usePayroll();
    const [names,setNames] = React.useState("");
    const [first_sname,setFirst_sname] = React.useState("");
    const [second_sname,setSecond_sname] = React.useState("");
    const [userType,setUserType] = React.useState(0);

    const checkForm = ()=>{
        let errors = [];
        let errorName = checkString(names,"el nombre");
        let errorSname = checkString(first_sname,"el primer apellido");
        let errorSname2 = checkString(second_sname,"el segundo apellido");
        if(errorName){
            errors.push(errorName);
        }
        if(errorSname){
            errors.push(errorSname);
        }
        if(errorSname2){
            errors.push(errorSname2);
        }
        if(!userType){
            errors.push("Seleccione un tipo de usuario.")
        }
        if(errors.length===0){
            return null;
        }else{
            return errors;
        }
    }
    const checkString = (value,label)=>{
        if(value){
            if(value.length>=3){
                return null;
            }
            return `${label} debe contener al menos 3 dígitos.`;
        }
        return `Insertar ${label} del trabajador.`;
    }
    const Create = ()=>{
        let errors = checkForm();
        if(!errors){
            toast.promise(
                createWorker({names,first_sname,second_sname,userType}),
                {
                    loading: 'Creando Empleado...',
                    success: <b>Empleado Creado!</b>,
                    error: <b>Error al crear el empleado.</b>,
                }
            );
        }else{
            toast.error(errors[0]);
        }
    }
    const Cancel = ()=>{
        setNames("");
        setFirst_sname("");
        setSecond_sname("");
        setUserType(0);
        handleShowCreate()
    }
    return(
        <Modal
        open={showCreate}
        onClose={Cancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box style={{backgroundColor:"#fff",padding:20}}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography style={{textAlign:"right",fontSize:20}}>
                        Crear Empleado
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{padding:5}}>
                    <Input 
                        value={names}
                        setValue={setNames}
                        style={{width:"100%"}}
                        placeholder="Nombre(s)"
                    />
                </Grid>
                <Grid item xs={12} md={6} style={{padding:5}}>
                    <Input 
                        value={first_sname}
                        setValue={setFirst_sname}
                        style={{width:"100%"}}
                        placeholder="Primer Apellido"
                    />
                </Grid>
                <Grid item xs={12} md={6} style={{padding:5}}>
                    <Input 
                        value={second_sname}
                        setValue={setSecond_sname}
                        style={{width:"100%"}}
                        placeholder="Segundo Apellido"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        labelId="select-user-type"
                        id="select-user-type"
                        value={userType}
                        onChange={(e)=>setUserType(e.target.value)}
                        style={{width:"100%",marginTop:10}}
                    >
                        <MenuItem value={0}>Seleccionar tipo de usuario</MenuItem>
                        <MenuItem value={1}>Chofer</MenuItem>
                        <MenuItem value={2}>Cargador</MenuItem>
                        <MenuItem value={3}>Auxiliar</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={12} style={{justifyContent:"center",alignItems:"center",display:"flex",padding:20}}>
                    <div>
                        <CustomButton 
                            type="danger"
                            execute={Cancel}
                        >
                            Cancelar
                        </CustomButton>
                        <CustomButton 
                            type="success"
                            execute={Create}
                            load={loadCreate}
                            style={{
                                marginLeft:15
                            }}
                        >
                            Crear
                        </CustomButton>
                    </div>
                </Grid>
            </Grid>
        </Box>
        </Modal>
    )
}
export default Model;