import Delete from "@mui/icons-material/Delete";
import { Card, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const OrderCard = ({ order, fetchOrderData }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { authUser } = useAuthContext();

  const handleDeleteOrder = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/order/${order._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser}`,
        },
      });

      if (!res.ok) throw new Error("Failed to Delete Order");
      await fetchOrderData();
      toast.success("Delete Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          height: 70,
          width: "70%",
          display: "flex",
          direction: "row",
          alignItems: "center",
          mx: "auto",
        }}
      >
        <Stack
          width={"90%"}
          height={"100%"}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          pl={3}
        >
          <Typography variant="h4">{order.product_id.name}</Typography>
          <Typography variant="h5">{order.amount} หน่วย</Typography>
        </Stack>
        <Stack
          width={"10%"}
          height={"100%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton color="error" onClick={handleDeleteOrder}>
            <Delete />
          </IconButton>
        </Stack>
      </Card>
    </>
  );
};

export default OrderCard;
