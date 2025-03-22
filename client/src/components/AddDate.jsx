import { useState } from 'react';
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import  {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFnsV3';

export default function AddDate({ cellId, rowId, handleinputChange }) {

    const [date, setSelectedDate] = useState(null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
        handleinputChange(newDate, cellId, rowId);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label || "Select Date"}
                value={date}
                onChange={handleDateChange((e) => e.target.value)}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
