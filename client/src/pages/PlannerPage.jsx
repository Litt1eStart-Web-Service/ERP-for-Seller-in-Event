import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import {
  Stack,
  FormControl,
  Typography,
  TextField,
  Box,
  Button,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery
} from "@mui/material";

import toast from "react-hot-toast";
import OrderCard from "../component/OrderCard";

const PlannerPage = () => {
  const { id } = useParams();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [plannerData, setPlannerData] = useState(null);
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [total_sales, setTotalSales] = useState("");
  const [other_expenses, setOtherExpenses] = useState("");

  const [order, setOrder] = useState([]);
  const [productList, setProductList] = useState([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const clearInput = () => {
    setProduct("");
    setAmount("");
  };

  const fetchPlannerData = async () => {
    try {
      if (id === "") throw new Error("Planner id not existed");

      const res = await fetch(`${API_URL}/api/v1/planner/${id}`, {
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!res.ok) throw new Error("Failed to get Planner Data");
      const data = await res.json();
      setPlannerData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCreateTransaction = async () => {
    try {
      if (total_sales === "" || other_expenses === "")
        throw new Error("Please complete all fields");
      const order_res = await fetch(`${API_URL}/api/v1/order/${id}`, {
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!order_res.ok) throw new Error("Failed to get order data");
      const data = await order_res.json();

      const orders = data.map((order) => ({
        planner_id: {
          _id: order.planner_id._id,
          user_id: order.planner_id.user_id,
          location: order.planner_id.location,
          employee_wage: order.planner_id.employee_wage,
          status: order.planner_id.status,
          createdAt: order.planner_id.createdAt,
          updatedAt: order.planner_id.updatedAt,
          name: order.planner_id.name,
          __v: order.planner_id.__v,
        },
        product_id: {
          _id: order.product_id._id,
          user_id: order.product_id.user_id,
          name: order.product_id.name,
          margin: order.product_id.margin,
          price: order.product_id.price,
          amount: order.product_id.amount,
          estValue: order.product_id.estValue,
          totalMargin: order.product_id.totalMargin,
          estProfit: order.product_id.estProfit,
          __v: order.product_id.__v,
        },
        amount: order.amount,
        __v: order.__v,
      }));

      const bodyData = {
        orders,
        total_sales,
        location: plannerData.location,
        employee_wage: plannerData.employee_wage,
        other_expenses,
        date: new Date(),
      };

      const transaction_res = await fetch(
        `${API_URL}/api/v1/transaction/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authUser}`,
          },
          body: JSON.stringify(bodyData),
        }
      );

      if (!transaction_res.ok) throw new Error("Failed to create transaction");
      toast.success("Transaction created successfully");
      const transaction = await transaction_res.json();

      const edit_res = await fetch(
        `${API_URL}/api/v1/planner/edit/status/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authUser}`,
          },
        }
      );
      if (!edit_res.ok) throw new Error("Failed to Update Planner Status");
      navigate(`/transaction/${transaction._id}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCreateOrder = async () => {
    try {
      if (product === "" || amount === "")
        throw new Error("Please complete all fields");
      const res = await fetch(`${API_URL}/api/v1/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser}`,
        },
        body: JSON.stringify({
          planner_id: plannerData._id,
          product_id: product._id,
          amount: Number(amount),
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      await fetchOrderData();
      toast.success("Created new Order");
      clearInput();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchOrderData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/order/${id}`, {
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!res.ok) throw new Error("Failed to get Order");
      const data = await res.json();
      setOrder(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchProductData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/product/getAll`, {
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!res.ok) throw new Error("Failed to get Product List");
      const data = await res.json();
      setProductList(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPlannerData();
    fetchOrderData();
    fetchProductData();
  }, []);

  console.log(product);

  return (
    <>
      <Stack direction={"row"} height={"100vh"}>
        {/*Product Container*/}
        <Stack width={isSmallScreen ? "65%" : "70%"}>
          <Stack
            height={"100%"}
            border={"1px solid"}
            pt={3}
            sx={{ overflowY: "auto" }}
            gap={2}
          >
            {order.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                fetchOrderData={fetchOrderData}
              />
            ))}
          </Stack>
        </Stack>

        {/*Input Container*/}
        <Stack width={isSmallScreen ? "35%" : "30%"} alignItems={"center"} gap={1} pt={2}>
          <Typography variant={isSmallScreen ? "h6" : "h5"}>Create New Order</Typography>
          <Box sx={{ width: "60%" }}>
            <FormControl fullWidth>
              <InputLabel>Product</InputLabel>
              <Select
                label="Product"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                {productList?.map((product) => (
                  <MenuItem key={product._id} value={product}>
                    <Typography>{product.name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TextField
            placeholder="Amount"
            sx={{ width: "60%" }}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <Button sx={{ width: "20%", height: 40 }} onClick={handleCreateOrder}>
            Create
          </Button>

          <TextField
            placeholder="Total Sales"
            value={total_sales}
            onChange={(e) => setTotalSales(e.target.value)}
            sx={{ mt: 5, width: '65%' }}
          />
          <TextField
            placeholder="Other Expenses"
            value={other_expenses}
            onChange={(e) => setOtherExpenses(e.target.value)}
            sx={{ width: '65%' }}
          />
          <Button
            variant="contained"
            size="large"
            onClick={handleCreateTransaction}
            sx={{ width: '65%'}}
          >
            Create Transaction
          </Button>
          <Button
            variant="outlined"
            color="warning"
            size="large"
            onClick={() => navigate("/")}
          >
            Home Page
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default PlannerPage;
