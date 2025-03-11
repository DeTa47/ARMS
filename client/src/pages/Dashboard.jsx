import axios from 'axios';
import Box from '@mui/material/Box';
import EnhancedTable from "../components/DataTable";
import MiniDrawer from "../components/MiniDrawer"; 
import useAuth from '../hooks/useAuth'; 
import { useState, useEffect } from 'react';

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const [datachanger, setDatachanger] = useState({});
    const {auth} = useAuth();

    console.log(`auth`, auth);

    useEffect(() => {
        console.log(`datachanger`, datachanger);
    }, [datachanger]);

    useEffect(() => {
        axios.get('http://localhost:8000/getGroups')
            .then(response => {
                setSelectOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching select options:', error); 
            });
    }, []);

    const toggleDrawer = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <Box sx={{ display: 'flex', height: 'calc(100vh)' }}>
            <MiniDrawer selectOptions={selectOptions[0]?.groupName} datachanger={setDatachanger} open={open} toggleDrawer={toggleDrawer} />
            <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'auto' }}>
                <EnhancedTable auth={auth} selectOptions={datachanger} />
            </Box>
        </Box>
    );
}