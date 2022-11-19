import React from "react";
import Loader from "../Components/Loader";
import { PayrollProvider } from "./store";
import Model from "./model";
import Grid from "@mui/material/Grid";
import {Toaster} from "react-hot-toast";
const Payroll = (props)=>{
    return(
        <PayrollProvider>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Grid container>
                <Grid item xs={12}>
                    <PayrollTunnel />
                </Grid>
            </Grid>
        </PayrollProvider>
    )
}
export default Payroll;
const PayrollTunnel = (props)=>{
    return <Model />;
}