import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Box from '@mui/material/Box';
import EnhancedTable from "../components/DataTable";
import MiniDrawer from "../components/MiniDrawer"; 
import CVGenerator from "../components/CVGenerator";
import useAuth from '../hooks/useAuth'; 
import { useState, useEffect } from 'react';
import UserProfile from './UserProfile';

export default function Dashboard() {
    const [open, setOpen] = useState(false);
    const [selectOptions, setSelectOptions] = useState([]);
    const [datachanger, setDatachanger] = useState({});
    const [componentChanger, setComponentChanger] = useState('Profile');


    const {auth} = useAuth();
    const axios = useAxiosPrivate();

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
        <>
        <Box sx={{ display: 'flex', height: 'calc(100vh)' }}>

            <MiniDrawer selectOptions={selectOptions[0]?.groupName} componentChanger={setComponentChanger} datachanger={setDatachanger} open={open} toggleDrawer={toggleDrawer} />
            
            <MiniDrawer selectOptions={selectOptions[0]?.groupName} componentChanger={setComponentChanger} datachanger={setDatachanger} open={open} toggleDrawer={toggleDrawer} />
            
            <Box component="main" sx={{ flexGrow: 1, p: 3, overflowX: 'auto' }}>
                {(componentChanger === 'Profile') ? 
                    <>
                    <UserProfile/>
                    </>
                    :(componentChanger === 'Generate CV')? (<CVGenerator auth={auth} selectOptions={selectOptions}></CVGenerator>):

                    <EnhancedTable auth={auth} selectOptions={datachanger} />
                }
            </Box>
        </Box>
        </>
    );
}