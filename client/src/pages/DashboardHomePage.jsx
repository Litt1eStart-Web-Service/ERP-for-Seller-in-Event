import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardHomePage = () => {
    const navigate = useNavigate();
  return (
    <>
    <Stack width={"30%"} mx={"auto"} mt={10} gap={2}>
        <Typography variant="h5">Welcome To ERP Project for your Buisiness</Typography>
        <Button
          sx={{ width: "70%", mx: "auto" }}
          size="large"
          onClick={() => navigate("/dashboard/accounting")}
        >
          Dashboard (การเงิน)
        </Button>
        <Button
          sx={{ width: "70%", mx: "auto", mt: 5 }}
          size="large"
          variant="outlined"
          onClick={()=>navigate('/')}
          color="primary"
        >
          HomePage
        </Button>
        
      </Stack>
    </>
  )
};

export default DashboardHomePage;
