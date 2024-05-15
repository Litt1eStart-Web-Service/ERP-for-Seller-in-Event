import { Box, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PlannerHistoryCard from "../component/PlannerHistoryCard";

const PlannerHistoryPage = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [plannerHistorys, setPlannerHistorys] = useState([]);

  const loadPlannerHistorys = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/planner/getAll`, {
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      const data = await res.json();
      const filteredData = data.filter((data) => data.status);
      setPlannerHistorys(filteredData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(plannerHistorys);

  useEffect(() => {
    loadPlannerHistorys();
  }, []);

  return (
    <>
      <Stack width={"90%"} height={"100%"} mx={"auto"}>
        <Stack height={"5%"} justifyContent={"center"}>
          <Button variant="contained" sx={{ width: "15%", mx: "auto" }} onClick={()=>navigate('/')}>
            Go back to Home Page
          </Button>
        </Stack>
        <Stack>
          <Stack
            height={"100%"}
            width={'60%'}
            pt={2}
            sx={{ overflowY: "auto" }}
            gap={2}
            mx={'auto'}
          >
            {plannerHistorys?.map(planner => (
               <PlannerHistoryCard planner={planner} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default PlannerHistoryPage;
