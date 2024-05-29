import { Card, IconButton, Stack, Typography } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import React from "react";
import { useNavigate } from "react-router-dom";

const PlannerHistoryCard = ({ planner }) => {
  const navigate = useNavigate();
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pl: 3
        }}
      >
        <Stack direction={'row'}>
          <Typography variant="h4">{planner.name}</Typography>
          <IconButton onClick={() => navigate(`planner/completed/${planner._id}`)}>
            <LaunchIcon />
          </IconButton>
        </Stack>
      </Card>
    </>
  );
};

export default PlannerHistoryCard;
