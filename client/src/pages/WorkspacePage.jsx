import {
  Stack,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

import PlannerCard from '../component/PlannerCard'
import { useNavigate } from "react-router-dom";

const WorkspacePage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()
  const { authUser } = useAuthContext()

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [employeeWage, setEmployeeWage] = useState("");

  const [locationList, setLocationList] = useState([])
  const [planners, setPlanners] = useState([])

  const clearInput = () =>{ 
    setName("")
    setLocation("")
    setEmployeeWage("")
  }

  const fetchLocationListData = async() => {
    try {
      const res = await fetch(`${API_URL}/api/v1/location/getAll`, {
        headers: {
          "Authorization": `Bearer ${authUser}`
        }
      })
      if(!res.ok) throw new Error('Failed get location data')
      const data = await res.json()
      setLocationList(data)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const fetchPlannerData = async() => {
    try {
      const res = await fetch(`${API_URL}/api/v1/planner/getAll`, {
        headers: {
          "Authorization": `Bearer ${authUser}`
        }
      })
      if(!res.ok) throw new Error('Failed to get Planner Data')
      const data = await res.json()
      const filteredData = data.filter(data => !data.status)
      setPlanners(filteredData)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCreatePlanner = async() => {
    try {
      if(location==="" || employeeWage==="") throw new Error('Please Complete All Field')

      const res = await fetch(`${API_URL}/api/v1/planner/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authUser}`
        },
        body: JSON.stringify({
          name,
          location,
          employee_wage: Number(employeeWage)
        })
      })
      if(!res.ok) throw new Error('Failed to create Planner')
      toast.success('Create new Planner')
      await fetchPlannerData()
      clearInput()
    } catch (error) {
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    fetchPlannerData()
    fetchLocationListData()
  },[])
  return (
    <>
      <Stack direction={"row"} height={"100vh"}>
        {/*Product Container*/}
        <Stack width={"70%"}>
          <Stack
            height={"100%"}
            border={"1px solid"}
            pt={3}
            sx={{ overflowY: "auto" }}
            gap={2}
          >
            {planners?.map(planner => (
              <PlannerCard key={planner._id} planner={planner} fetchPlannerData={fetchPlannerData} />
            ))}
          </Stack>
        </Stack>

        {/*Input Container*/}
        <Stack width={"30%"} alignItems={"center"} gap={1} pt={2}>
          <Typography variant="h5">Create New Planner</Typography>
          <TextField
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "60%" }}
          />
          <Box sx={{ width: '60%' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Location</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Location"
                value={location}
                onChange={(e)=>setLocation(e.target.value)}
              >
                {locationList?.map(location => (
                  <MenuItem key={location._id} value={location._id}>{location.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <TextField
            placeholder="Employee Wage"
            value={employeeWage}
            onChange={(e) => setEmployeeWage(e.target.value)}
            sx={{ width: "60%" }}
          />
          <Button sx={{ width: "20%", height: 40 }} onClick={handleCreatePlanner} >Create</Button>
          <Button variant="contained" onClick={()=>navigate('/')}>Go to Home Page</Button>
        </Stack>
      </Stack>
    </>
  );
};

export default WorkspacePage;
