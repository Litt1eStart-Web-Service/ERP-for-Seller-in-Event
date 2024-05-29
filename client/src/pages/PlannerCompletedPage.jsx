import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';

const PlannerCompletedPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const { authUser } = useAuthContext();
  const { id } = useParams();
  const [data, setData] = useState([]);

  const loadData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/order/${id}`, {
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      setData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Stack width={"100%"} justifyContent={'center'} alignItems={'center'} mt={2} gap={2}>
      <Stack direction={'row'} width={' 50%'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h4">{data[0]?.planner_id.name}</Typography>
        <IconButton onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>
      </Stack>
      {data?.map((item) => (
        <Card
          key={item._id}
          sx={{
            width: "50%",
            height: "50px",
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
            alignItems: 'center',
            pl: 3,
            pr: 3
          }}
        >
          <Typography variant="h5" >{item.product_id.name}</Typography>
          <Typography variant="h5">{item.amount}</Typography>
        </Card>
      ))}
    </Stack>
  );
};

export default PlannerCompletedPage;
