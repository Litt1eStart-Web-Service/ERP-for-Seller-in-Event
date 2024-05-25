import { Card, IconButton, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import DeleteIcon from '@mui/icons-material/Delete';

import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const PlannerCard = ({planner, fetchPlannerData}) => {
  const navigate = useNavigate()
  const { authUser } = useAuthContext()
  const API_URL = import.meta.env.VITE_API_URL;

  const handleDeletePlanner = async() =>{ 
    try {
      const res = await fetch(`${API_URL}/api/v1/planner/${planner._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authUser}`
        }
      })
      if(!res.ok) throw new Error(`Failed to delete planner`)
      await fetchPlannerData()
      toast.success('Delete Planner')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <Card sx={{
        height: 300,
        width: '95%',
        mx: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Stack width={'100%'} height={'100%'} direction={'row'}>
          <Stack width={'80%'} justifyContent={'center'} pl={5}>
            <Typography variant={isSmallScreen ? "h4" : "h3"} width={'100%'} textAlign={'left'}>{planner.name}</Typography>
            <Typography variant={isSmallScreen ? "h6" : "h5"} width={'100%'} textAlign={'left'}>ค่าเช่าพื้นที่: {planner.location.price} บาท</Typography>
            <Typography variant={isSmallScreen ? "h6" : "h5"} width={'100%'} textAlign={'left'}>ค่าจ้างลูกน้อง: {planner.employee_wage} บาท</Typography>
          </Stack>
          <Stack width={'20%'} justifyContent={'center'}>
            <IconButton sx={{ width: 70, mx: 'auto'}} onClick={()=>navigate(`/planner/${planner._id}`)}>
              <LaunchIcon sx={{ height: 50, width: 50}} />
            </IconButton>
            <IconButton color="inherit" sx={{ width: 70, mx: 'auto'}} onClick={handleDeletePlanner}>
              <DeleteIcon sx={{ height: 50, width: 50}} />
            </IconButton>
          </Stack>
        </Stack>
      </Card>
    </>
  )
};

export default PlannerCard;
