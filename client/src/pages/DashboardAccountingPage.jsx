import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuthContext } from "../context/AuthContext";
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const DashboardAccountingPage = () => {
  // State to hold the data
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  
  const { authUser } = useAuthContext();
  const [data, setData] = useState([]);

  const [year, setYear] = useState(new Date().getFullYear());

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/transaction/filteredData/byYear/${year}`,
        {
          headers: {
            Authorization: `Bearer ${authUser}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();

      // Transform data into Recharts-compatible format
      const transformedData = jsonData.map((item) => ({
        month: item.month,
        total_sales: item.totalSales,
        total_margin: item.totalMargin,
        total_profit: item.totalProfit,
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data from the backend
  useEffect(() => {
    fetchData();
  }, []); // Re-run effect when authUser changes

  console.log(data);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <Stack>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={1}>
            <Typography variant="h3">Accounting Dashboard</Typography>
            <IconButton onClick={()=>navigate('/')}>
                <HomeIcon/>
            </IconButton>
        </Stack>
        <Stack
          width={"50%"}
          mx={"auto"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={3}
          direction={"row"}
          gap={1}
        >
          <TextField
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            sx={{ width: "7%" }}
          />
          <IconButton onClick={fetchData}>
            <SearchIcon />
          </IconButton>
        </Stack>
      </Stack>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_sales" name="Total Sales" fill="#8884d8" />
          <Bar dataKey="total_margin" name="Total Margin" fill="#82ca9d" />
          <Bar dataKey="total_profit" name="Total Profit" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardAccountingPage;
