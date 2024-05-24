import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext() 
  
  const handleLogout = () => {
    sessionStorage.removeItem("token")
    setAuthUser(null)
  }
  return (
    <>
      <Stack width={"30%"} mx={"auto"} mt={10} gap={2}>
        <Typography variant="h5">Welcome To ERP Project for your Buisiness</Typography>
        <Button
          sx={{ width: "70%", mx: "auto" }}
          size="large"
          onClick={() => navigate("/inventory")}
        >
          Inventory
        </Button>
        <Button
          sx={{ width: "70%", mx: "auto" }}
          size="large"
          onClick={() => navigate("/workspace")}
        >
          Workspace
        </Button>
        <Button
          sx={{ width: "70%", mx: "auto" }}
          size="large"
          onClick={() => navigate("/location")}
        >
          Location
        </Button>
        <Button
          sx={{ width: "70%", mx: "auto" }}
          size="large"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </Button>
        <Button
          sx={{ width: "70%", mx: "auto" }}
          size="large"
          onClick={() => navigate("/planner/history")}
        >
          History
        </Button>
        <Button
          sx={{ width: "70%", mx: "auto", mt: 5 }}
          size="large"
          onClick={handleLogout}
          variant="outlined"
          color="error"
        >
          logout
        </Button>
        
      </Stack>
    </>
  );
};

export default Home;
