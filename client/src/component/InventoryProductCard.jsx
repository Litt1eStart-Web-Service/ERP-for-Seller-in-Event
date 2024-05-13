import { Card, IconButton, Stack, Typography, Modal, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

const InventoryProductCard = ({
  product,
  fetchProductData,
  open,
  setOpen,
}) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { authUser } = useAuthContext();

  const [name, setName] = useState(product.name)
  const [margin, setMargin] = useState(product.margin)
  const [price, setPrice] = useState(product.price)
  const [amount, setAmount] = useState(product.amount)

  const handleDeleteProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/product/${product._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!res.ok) throw new Error(res.error);
      toast.success("Succesfully Delete Product");
      await fetchProductData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = async() => {
    try {
      const body = { name, margin: Number(margin), price: Number(price), amount: Number(amount)}
      const res = await fetch(`${API_URL}/api/v1/product/edit/info/${product._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authUser}`
        },
        body: JSON.stringify(body)
      })
      if(!res.ok) throw new Error(res.error)
      toast.success('Edit Product Successfully')
      await fetchProductData()
      setOpen(false)
    } catch (error) {
      toast.error(error.message)
    }
  }
  return (
    <>
      <Card
        sx={{
          height: 120,
          width: "90%",
          mx: "auto",
          display: "flex",
          direction: "row",
        }}
        variant="outlined"
      >
        <Typography
          height={"100%"}
          width={"60%"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          pl={3}
          variant="h3"
        >
          {product.name}
        </Typography>
        <Stack
          height={"100%"}
          width={"30%"}
          justifyContent={"center"}
          alignItems={"flex-center"}
        >
          <Typography color={"gray"}>ต้นทุน: {product.margin} บาท</Typography>
          <Typography color={"gray"}>ราคาขาย: {product.price} บาท</Typography>
          <Typography color={"gray"}>จำนวน: {product.amount} หน่วย</Typography>
          <Typography fontWeight={500}>
            กำไรอิงจากจำนวณ: {product.estProfit} บาท
          </Typography>
        </Stack>
        <Stack
          height={"100%"}
          width={"10%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <IconButton sx={{ width: "40%" }} onClick={()=>setOpen(true)}>
            <EditIcon />
          </IconButton>
          <IconButton sx={{ width: "40%" }} onClick={handleDeleteProduct}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Card>

      {/* Edit Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          bgcolor={"white"}
          width={"30%"}
          height={'35%'}
          mx={"auto"}
          mt={6}
          pt={3}
          justifyContent={"flex-start"}
          alignItems={"center"}
          gap={0.5}
        >
          <Typography variant="h4" color={"black"}>
            Edit Product Data
          </Typography>
          <TextField
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: "60%" }}
          />
          <TextField
            placeholder="Margin"
            value={margin}
            onChange={(e) => setMargin(e.target.value)}
            sx={{ width: "60%" }}
          />
          <TextField
            placeholder="Sell Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ width: "60%" }}
          />
          <TextField
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ width: "60%" }}
          />
          <Button onClick={handleEdit} sx={{ width: '60%'}}>Done</Button>
        </Stack>
      </Modal>
    </>
  );
};

export default InventoryProductCard;
