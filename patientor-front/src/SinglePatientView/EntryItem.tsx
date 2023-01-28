import React from "react";
import { EntriesListingPatient } from "../types";
import { useStateValue } from "../state";

const EntryItem = ({ patient } : EntriesListingPatient) => {
    const [{ diagnosis }, ] = useStateValue();
    console.log(diagnosis);
    if (!patient.entries) {
        return (
            <p>The patient has no entries.</p>
        );
    } else {
    
    return (
    <div>
        <h2>entries</h2>
        {patient.entries.map((entry) =>
        <div key={entry.id}>
        <p>{entry.date} {entry.description}</p>
        <ul>
            {entry.diagnosisCodes?.map((code : string) =>
                <li key={code}> {code}  { diagnosis[code].name }  </li>
            )
            }
        </ul>

        </div>
        )
        }
        

    </div>
    
    );
    }
};

export default EntryItem;