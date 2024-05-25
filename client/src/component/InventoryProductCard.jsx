import {
  Card,
  IconButton,
  Stack,
  Typography,
  Modal,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

const InventoryProductCard = ({ product, fetchProductData }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const { authUser } = useAuthContext();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [margin, setMargin] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

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
      toast.success("Successfully Deleted Product");
      await fetchProductData();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const body = {
        name,
        margin: Number(margin),
        price: Number(price),
        amount: Number(amount),
      };
      const res = await fetch(
        `${API_URL}/api/v1/product/edit/info/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authUser}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) throw new Error(res.error);
      toast.success("Edited Product Successfully");
      await fetchProductData();
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setName(product.name);
    setAmount(product.amount);
    setMargin(product.margin);
    setPrice(product.price);
    setOpen(true);
  };

  return (
    <>
      <Card
        sx={{
          height: 120,
          width: isSmallScreen ? "100%" : "90%",
          mx: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          flexShrink: 0, // Prevents the card from shrinking
        }}
        variant="outlined"
      >
        <Typography
          height={isSmallScreen ? "auto" : "100%"}
          width={isSmallScreen ? "100%" : "60%"}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          pl={3}
          pt={isSmallScreen ? 2 : 0}
          fontSize={isSmallScreen ? 25 : 40}
          variant="h6"
        >
          {product.name}
        </Typography>
        <Stack
          height={"100%"}
          width={isSmallScreen ? "100%" : "30%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography fontSize={isSmallScreen ? 15 : 18} color={"gray"}>
            ต้นทุน: {product.margin} บาท
          </Typography>
          <Typography fontSize={isSmallScreen ? 15 : 18} color={"gray"}>
            ราคาขาย: {product.price} บาท
          </Typography>
          <Typography fontSize={isSmallScreen ? 15 : 18} color={"gray"}>
            จำนวน: {product.amount} หน่วย
          </Typography>
          <Typography fontSize={isSmallScreen ? 13 : 18} fontWeight={500}>
            กำไรอิงจากจำนวณ: {product.estProfit} บาท
          </Typography>
        </Stack>
        <Stack
          height={"100%"}
          width={isSmallScreen ? "100%" : "10%"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={isSmallScreen ? "row" : "column"}
          mt={isSmallScreen ? 2 : 0}
        >
          <IconButton
            sx={{ width: isSmallScreen ? "20%" : "40%" }}
            onClick={handleOpenModal}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            sx={{ width: isSmallScreen ? "20%" : "40%" }}
            onClick={handleDeleteProduct}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Card>

      {/* Edit Modal */}
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Stack
          bgcolor={"white"}
          width={isSmallScreen ? "50%" : "30%"}
          height={"35%"}
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
          <Button onClick={handleEdit} sx={{ width: "60%" }}>
            Done
          </Button>
        </Stack>
      </Modal>
    </>
  );
};

export default InventoryProductCard;
