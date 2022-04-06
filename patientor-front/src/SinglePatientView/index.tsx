import React from "react";
import { useParams } from "react-router";
import { Container } from "@material-ui/core";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addIndividualData } from "../state";

const SinglePatientView = () => {
    const [{ individualPatients }, dispatch ] = useStateValue();
    const { id } = useParams<{ id: string }>(); 
    console.log(individualPatients);
    const patientExists: Patient = individualPatients[id];

    React.useEffect(() => {
        if (patientExists) {
            return;
        }
        const fetchPatientDetails = async () => {
        try {
            const { data: patientDetails } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            //dispatch({ type: "ADD_INDIVIDUALDATA", payload: patientDetails });
            dispatch(addIndividualData(patientDetails));
            //console.log(patientDetails);
            } catch (e) {
            console.error(e);
          }
        };
        void fetchPatientDetails();
    }, [id]);

    if (patientExists) {
        let gen = "";
        switch (patientExists.gender) {
            case "male":
                gen = String.fromCharCode(9794);
                break;
            case "female":
                gen = String.fromCharCode(9792);
                break;
            default:
                gen = String.fromCharCode(9893);
        }
        return (
            <Container>
                <div>
                    <h2>{patientExists.name} {gen} </h2>
                    
                    <p>ssn: {patientExists.ssn}<br />
                    occupation: {patientExists.occupation}
                    </p>
                    
                </div>
            </Container>
                
        );
    } else {
        return (<div></div>);
    }
    
};
    


export default SinglePatientView;