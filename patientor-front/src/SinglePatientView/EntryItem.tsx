import React from "react";
import { EntriesListingPatient } from "../types";

const EntryItem = ({ patient } : EntriesListingPatient) => {
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
            {entry.diagnosisCodes?.map((diag) =>
                <li key={diag}>{diag}</li>
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