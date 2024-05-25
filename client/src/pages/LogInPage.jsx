import {
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
const LogInPage = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const { setAuthUser } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const handleConfirm = async () => {
    try {
      if (username === "" || password === "")
        throw new Error("Please Complete All Field");

      const body = { username, password };
      const res = await fetch(`${API_URL}/api/v1/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(res.error);
      const data = await res.json();
      sessionStorage.setItem("token", data);
      setAuthUser(data);
      toast.success("Succesfully");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Stack width={isSmallScreen ? "60%" :"30%"} mx={"auto"} mt={"10%"} gap={3} >
      <Typography variant="h2">Login</Typography>
      <TextField
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleConfirm}>Confirm</Button>
      <Stack direction={"row"} mx={"auto"}>
        <Typography color={"gray"}>Don't Have an account?</Typography>
        <Typography
          fontWeight={600}
          onClick={() => navigate("/signup")}
          sx={{
            ":hover": { fontWeight: 600, color: "blue", cursor: "pointer" },
          }}
        >
          Signup
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LogInPage;
