import Delete from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

import { Button, Card, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const OrderCard = ({ order, fetchOrderData }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { authUser } = useAuthContext();

  const [amount, setAmount] = useState(order.amount);
  const [open, setOpen] = useState(false);

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

  console.log(order);

  const handleOpenModal = async() => {
    setOpen(true);
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  const handleEditOrder = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/order/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser}`,
        },
        body: JSON.stringify({
          amount
        })
      });

      if (!res.ok) throw new Error("Failed to Update Order");
      await fetchOrderData();
      toast.success("Successfully Edit Order");
      handleCloseModal();
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
          direction={'row'}
        >
          <IconButton color="error" onClick={handleDeleteOrder}>
            <Delete />
          </IconButton>
          <IconButton color="default" onClick={handleOpenModal}>
            <EditIcon />
          </IconButton>
        </Stack>
      </Card>

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          bgcolor={"white"}
          width={"30%"}
          height={"auto"}
          mx={"auto"}
          mt={6}
          pt={3}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={0.5}
        >
          <TextField label="new amount" value={amount} onChange={(e)=>setAmount(e.target.value)} />
          <Button sx={{ mb: 1, mt: 1}} onClick={handleEditOrder}>Confirm</Button>
        </Stack>
      </Modal>
    </>
  );
};

export default OrderCard;
