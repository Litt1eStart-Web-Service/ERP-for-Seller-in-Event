import Delete from "@mui/icons-material/Delete";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const LocationCard = ({ location, fetchLocationData }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { authUser } = useAuthContext()
  const handleDeleteLocation = async() =>{ 
    try {
        const res = await fetch(`${API_URL}/api/v1/location/${location._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authUser}`
            }
        })
        if(!res.ok) throw new Error('Failed to Delete Location')
        await fetchLocationData()
        toast.success('Delete Location Item')
    } catch (error) {
        toast.error(error.message)
    }
  }

    return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          direction: "row",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          padding={2} // Optional: Adds padding inside the container
        >
          <Typography variant="h4" width="70%" textAlign={'left'}>
            {location.name}
          </Typography>
          <Typography
            variant="h4"
            width="30%"
            textAlign="right" 
            mr={1}
          >
            {location.price} บาท
          </Typography>
          <IconButton color="error" onClick={handleDeleteLocation}>
            <Delete />
          </IconButton>
        </Stack>
      </Card>
    </>
  );
};

export default LocationCard;
