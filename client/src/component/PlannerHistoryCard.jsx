import { Card, Typography } from "@mui/material";
import React from "react";

const PlannerHistoryCard = ({ planner }) => {
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
        <Typography variant="h4">{planner.name}</Typography>
      </Card>
    </>
  );
};

export default PlannerHistoryCard;
