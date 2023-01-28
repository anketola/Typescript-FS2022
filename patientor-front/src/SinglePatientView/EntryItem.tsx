import React from "react";
import { EntriesListingPatient, EntriesListingHospital, EntriesListingHealthcheck, EntriesListingOccupational, Entry } from "../types";
import { useStateValue } from "../state";
import { Card, CardContent, Typography } from "@material-ui/core";
import HealingIcon from '@material-ui/icons/Healing';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import LocalPharmacyIcon from '@material-ui/icons/LocalPharmacy';


const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch(entry.type) {
        case "Hospital":
            return <HospitalEntry entryDetails={entry} key={entry.id} />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entryDetails={entry} key={entry.id}/>;
        case "HealthCheck":
            return <HealthCheckEntry entryDetails={entry} key={entry.id}/>;
        default:
            return assertNever(entry);
    }
}; 

const assertNever = (item : never): never => {
    throw new Error(item);
};


const HospitalEntry = ( {entryDetails}: EntriesListingHospital) => { 
    //<p>This is a hospital entry {entryDetails.type}
    const [{ diagnosis }, ] = useStateValue();
    return (
        <Card >
            <CardContent>
                <Typography><b>{entryDetails.date}</b> <HealingIcon /></Typography>
                <Typography><i>{entryDetails.description}</i></Typography>
                <ul> 
                    {entryDetails.diagnosisCodes?.map((code : string) =>
                        <li key={code}> {code}  { diagnosis[code].name }  </li>
                    )
                    }
                </ul>
                <Typography align="center">diagnose by {entryDetails.specialist}</Typography>    
            </CardContent>
        </Card>
        
    );
};

const OccupationalHealthcareEntry = ( {entryDetails}: EntriesListingOccupational) => { 
    const [{ diagnosis }, ] = useStateValue();
    return (
        <Card>
            <CardContent>
                <Typography><b>{entryDetails.date}</b> <LocalHospitalIcon /> {entryDetails.employerName}</Typography>
                <Typography><i>{entryDetails.description}</i></Typography>
                <ul>
                    {entryDetails.diagnosisCodes?.map((code : string) =>
                        <li key={code}> {code}  { diagnosis[code].name }  </li>
                    )
                    }
                </ul>
                <Typography align="center">diagnose by {entryDetails.specialist}</Typography>    
            </CardContent>
        </Card>
    );
};

const HealthCheckEntry = ( {entryDetails}: EntriesListingHealthcheck) => { 
    const [{ diagnosis }, ] = useStateValue();
    return (
        <Card>
            <CardContent>
                <Typography><b>{entryDetails.date} </b><LocalPharmacyIcon /></Typography>
                <Typography><i>{entryDetails.description}</i></Typography>
                <ul>
                    {entryDetails.diagnosisCodes?.map((code : string) =>
                        <li key={code}> {code}  { diagnosis[code].name }  </li>
                    )
                    }
                </ul>
                <Typography>Health check rating: {entryDetails.healthCheckRating}</Typography>
                <Typography align="center">diagnose by {entryDetails.specialist}</Typography>       
            </CardContent>
        </Card>
    );
};


const EntryItem = ({ patient } : EntriesListingPatient) => {
    const [{ diagnosis }, ] = useStateValue();
    console.log(diagnosis);
    if (!patient.entries || patient.entries.length == 0) {
        return (
            <p>The patient has no entries.</p>
        );
    } else {
    
    return (
    <div>
        <h2>entries</h2>
        
        {patient.entries.map((entry) =>
        <EntryDetails entry={entry} key={entry.id}/>
        )
        }
        

    </div>
    
    );
    }
};

//        <p>{entry.date} {entry.description}</p>
//        <ul>
//            {entry.diagnosisCodes?.map((code : string) =>
//                <li key={code}> {code}  { diagnosis[code].name }  </li>
//            )
//            }
//        </ul>
//
//        </div>


export default EntryItem;