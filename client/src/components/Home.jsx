import logo from '../assets/Msu_baroda_logo.png';
import Divider from '@mui/material/Divider' 

export default function Home() {
return (
    <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'100px'}}>
            <img src={logo} alt="MSU Baroda Logo" style={{ marginRight: '20px' }} />
            <Divider orientation="vertical" flexItem />
            <p style={{ marginLeft: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>Annual Report Management System</p>
        </div>
    </>
);
}