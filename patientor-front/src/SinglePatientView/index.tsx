import React from "react";
import { useParams } from "react-router";
import { Container, Button } from "@material-ui/core";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, addIndividualData } from "../state";
import EntryItem from "./EntryItem";
import { EntryFormValues } from "./NewEntryForm";
import AddEntryModal from "./EntryModal";

const SinglePatientView = () => {
    const [{ individualPatients }, dispatch ] = useStateValue();
    const { id } = useParams<{ id: string }>(); 
    console.log(individualPatients);
    const patientExists: Patient = individualPatients[id];

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
          const { data: newEntryData } = await axios.post<Patient>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );
          const fetchPatientDetails = async () => {
            try {
                const { data: patientDetails } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(addIndividualData(patientDetails));
                } catch (e) {
                console.error(e);
              }
            };
            void fetchPatientDetails();
          closeModal();
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            console.error(e?.response?.data || "Unrecognized axios error");
            setError(String(e?.response?.data?.error) || "Unrecognized axios error");
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }

      };


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
        console.log(patientExists);
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
                    <br />
                    <EntryItem patient={patientExists} />
                </div>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    error={error}
                    onClose={closeModal}
                />
                <Button variant="contained" onClick={() => openModal()}>
                    Add Entry
                </Button>
            </Container>
            
        );
    } else {
        return (<div></div>);
    }
    
};
    


export default SinglePatientView;