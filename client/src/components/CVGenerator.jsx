import { useState } from "react";
import Button from "./Button";
import axios from "axios";
import filesaver from "file-saver";

export default function CVGenerator({auth}) {
    const [options, setOptions] = useState([]);
    
    const payload = {
        department: auth.data.Department,
        faculty: auth.data.Faculty,
        name: auth.data.Name,
        designation: auth.data.Designation,
        phone: auth.data.PhoneNumber,
        email: auth.data.Email,
    }

    const generateCV = () => {
        const requestBody = {
            userId: auth.data.userid,
            data: options,
            payload: payload
        };

        axios.post('http://localhost:8000/generateCV', requestBody, {
            headers: {
                Accept: 'application/pdf',
                "Content-Type": "application/json",
            },
            responseType: 'arraybuffer'
        }).then((res) => {
            console.log("Response headers:", res.headers);
            console.log("Response data (blob):", res.data);

            if (res.status === 200 && res.data) {
                const contentType = res.headers['content-type'];
                if (contentType === 'application/pdf') {
                    const blob = new Blob([new Uint8Array(res.data)], { type: 'application/pdf' });
                    filesaver.saveAs(blob, 'cv.pdf'); // Use FileSaver.js to save the file
                } else {
                    console.error("Unexpected content type:", contentType);
                }
            } else {
                console.error("Unexpected response status or empty data:", res.status);
            }
        }).catch((error) => {
            console.error("Error generating CV:", error);
        });
    };

    const checkBoxes = [
        'Educational Details',
        'Experience',
        'Research Detail',
        'Ph.D. Guidance Detail',
        'Books Published',
        'Paper Presented',
        'Published Articles/Papers',
        'Refresher Orientation Course',
        'Contribution in Organising Academic Programs',
        'Participation in Academic Bodies of other universities',
        'Participation in committees of University',
        'Performance by Individual/Group',
        'Talks'
    ];

    return (
        <>
            <div className="flex flex-col space-y-2">
                {checkBoxes?.map((option, index) => (
                    <label className="flex items-center gap-2" key={index}>
                        <input 
                            onClick={(e) => {
                                const updatedOptions = e.target.checked
                                    ? [...options, option]
                                    : options.filter((item) => item !== option);
                                setOptions(updatedOptions); 
                            }} 
                            type="checkbox" 
                            value={option} 
                        />
                        {option}
                    </label>
                ))}
            </div>
            <div className="flex justify-center">
                <Button onClick={generateCV} classes={"px-2"} text={"Generate CV"}></Button>
            </div>
        </>
    );
}