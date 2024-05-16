import {
  Stack,
  Typography,
  TextField,
  Button,
  Card,
} from "@mui/material";
import LocationCard from "../component/LocationCard";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const YourComponent = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [locations, setLocations] = useState([]);

  const API_URI = import.meta.env.VITE_API_URL;
  const { authUser } = useAuthContext();
  const navigate = useNavigate()

  const clearInput = () => {
    setName("");
    setPrice("");
  };
  const handleCreateLocation = async () => {
    try {
      if (name === "" || price === "")
        throw new Error("Please Complete All Field");

      const res = await fetch(`${API_URI}/api/v1/location/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser}`,
        },
        body: JSON.stringify({
          name,
          price: Number(price),
        }),
      });
      if (!res.ok) throw new Error("Failed to create new Location");
      await fetchLocationData();
      clearInput();
      toast.success("Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchLocationData = async () => {
    try {
      const res = await fetch(`${API_URI}/api/v1/location/getAll`, {
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!res.ok) throw new Error("Failed to get data from Database");
      const data = await res.json();
      setLocations(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchLocationData();
  }, []);
  return (
    <Stack height="100vh" direction="row">
      {/* Location Card Container */}
      <Stack width="70%" height="100vh" sx={{ overflowY: "auto" }}>
        <Stack pt={3} pl={3} gap={2}>
          {locations.length === 0 && (
            <Card
              variant="outlined"
              sx={{
                height: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" color={"gray"}>
                There is no Location Data in this Account
              </Typography>
            </Card>
          )}

          {locations?.length > 0 &&
            locations.map((location) => <LocationCard key={location._id} location={location} fetchLocationData={fetchLocationData} />)}
        </Stack>
      </Stack>

      {/* Input Container */}
      <Stack
        width="30%"
        height="100%"
        justifyContent="flex-start"
        alignItems="center"
        gap={2}
      >
        <Typography variant="h5" mt={5}>
          Create new Location
        </Typography>
        <TextField
          placeholder="location name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: "60%" }}
        />
        <TextField
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          sx={{ width: "60%" }}
        />
        <Button onClick={handleCreateLocation} sx={{ width: "60%" }}>
          Create
        </Button>
        <Button variant="contained" onClick={()=>navigate('/')}>Go to Home Page</Button>
      </Stack>
    </Stack>
  );
};

export default YourComponent;
