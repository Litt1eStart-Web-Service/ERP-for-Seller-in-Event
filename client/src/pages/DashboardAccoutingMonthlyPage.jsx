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
import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const DashboardMonthlyPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const { authUser } = useAuthContext();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [data, setData] = useState([]);
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/v1/transaction/filteredData/byMonth/${year}/${month}`,
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
        week: item.week,
        total_sales: item.totalSales,
        total_margin: item.totalMargin,
        total_profit: item.totalProfit,
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [month, year, authUser]); // Re-run effect when month, year, or authUser changes

  return (
    <div style={{ width: "100%", height: 400 }}>
      <Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
        >
          <Typography variant="h3">Monthly Dashboard</Typography>
          <IconButton onClick={() => navigate("/")}>
            <HomeIcon />
          </IconButton>
        </Stack>
        <Stack
          width={"50%"}
          mx={"auto"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={1}
          direction={"row"}
          gap={1}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            sx={{ width: "auto" }}
          >
            {months?.map((m) => (
              <MenuItem value={m}>{m}</MenuItem>
            ))}
          </Select>

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
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="week" />
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

export default DashboardMonthlyPage;
