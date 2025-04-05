import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function AddDate({ handleinputChange, cellId, rowId, val }) {
  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD'); // MongoDB-friendly format
    handleinputChange({ target: { value: formattedDate } }, cellId, rowId);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Add Date"
        value={val ? dayjs(val, 'YYYY-MM-DD') : null} // Ensure proper format
        onChange={handleDateChange}
        format="YYYY-MM-DD" // Display only year, month, and day
        sx={{ minWidth: 145 }}
      />
    </LocalizationProvider>
  );
}