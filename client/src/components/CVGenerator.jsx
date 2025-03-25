import { useState } from "react";
import Button from "./Button";
import axios from "axios";

export default function CVGenerator({selectOptions, auth}) {
    
    const [options, setOptions] = useState([]);
    const generateCV = ()=> {

        axios.post('http://localhost:8000/generateCV',{
            userId : auth.data.id,
            data: options,
        }, 
        {
            headers:{
                "Content-Type":"application/json" // Fixed incorrect header value
            }
        }).then((res)=>{
            console.log(res);
        }).catch((error)=>{
            
        })
    }

    const checkBoxes = ['Educational Details',
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
        'Talks'];

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