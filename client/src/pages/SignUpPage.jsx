import { Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SignUpPage = () => {
  const navigate = useNavigate()
  const API_URL = import.meta.env.VITE_API_URL

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleConfirm = async() => {
    try {
      if(username==="" || password==="" || confirmPassword==="") throw new Error('Please Complete All Field')
      
      const body = {usernamem, password, confirmPassword}
      const res = await fetch(`${API_URL}/api/v1/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })
      if(!res.ok) throw new Error(res.error)
      toast.success('Succesfully')
      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <Stack width={"30%"} mx={"auto"} mt={"10%"} gap={3}>
      <Typography variant="h2">Signup</Typography>
      <TextField placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
      <TextField type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <TextField type="password" placeholder="confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
      <Button onClick={handleConfirm}>Confirm</Button>
      <Stack direction={"row"} mx={"auto"}>
        <Typography color={"gray"}>Already Have an account?</Typography>
        <Typography
          fontWeight={600}
          onClick={()=>navigate('/login')}
          sx={{
            ":hover": { fontWeight: 600, color: "blue", cursor: "pointer" },
          }}
        >
          Login
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SignUpPage;
