import { Stack, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardHomePage = () => {
    const navigate = useNavigate();

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  
  return (
    <>
    <Stack width={isSmallScreen ? "50%" : "30%"} mx={"auto"} mt={10} gap={2}>
        <Typography variant="h5">Dashboard for Visualizing your Data</Typography>
        <Button
          sx={{ width: "70%", mx: "auto" }}
          size="large"
          onClick={() => navigate("/dashboard/accounting")}
        >
          Dashboard รายปี (การเงิน)
        </Button>
        <Button
          sx={{ width: "70%", mx: "auto" }}
          size="large"
          onClick={() => navigate("/dashboard/accounting/specificMonth")}
        >
          Dashboard รายเดือน (การเงิน)
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
