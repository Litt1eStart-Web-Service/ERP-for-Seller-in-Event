import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Button, Stack, Typography } from "@mui/material";

const TransactionPage = () => {
  const { id } = useParams();
  const { authUser } = useAuthContext();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate()

  const [transactionData, setTransactionData] = useState(null);

  const formattedDate = (strDate) => {
    const date = new Date(strDate);
    const day = date.getDate();

    const monthName = new Intl.DateTimeFormat("th-TH", { month: "long" })
      .format;
    const month = monthName(date);

    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const loadTransactionData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${authUser}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }
      const data = await res.json();
      setTransactionData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(transactionData);

  useEffect(() => {
    loadTransactionData();
  }, []);

  if (transactionData) {
    return (
      <Stack pt={5}>
        <Typography variant="h3">
          วันที่ขายของ: {formattedDate(transactionData?.date)}{" "}
        </Typography>
        <Typography variant="h4">
          สถานที่: {transactionData.location.name}{" "}
        </Typography>
        <Typography variant="h4">ข้อมูลทางการเงิน</Typography>

        <Stack
          width={"10%"}
          mx={"auto"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Typography>ยอดขาย: {transactionData.total_sales}</Typography>
          <Typography>กำไรสุทธิ: {transactionData.total_profit}</Typography>
          <Typography variant="h4">ข้อมูลต้นทุน</Typography>
        </Stack>

        <Stack
          width={"10%"}
          mx={"auto"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Typography>ต้นทุนทั้งหมด: {transactionData.total_margin}</Typography>
          <Typography>
            (ค่าสินค้า):{" "}
            {transactionData.total_margin -
              (transactionData.employee_wage +
                transactionData.other_expenses +
                transactionData.location.price)}
          </Typography>
          <Typography>
            (ค่าพื้นที่): {transactionData.location.price}
          </Typography>
          <Typography>(ค่าลูกน้อง): {transactionData.employee_wage}</Typography>
          <Typography>
            (ค่าใช้จ่ายอื่นๆ): {transactionData.other_expenses}
          </Typography>
        </Stack>

        <Button variant="contained" sx={{ width: "5%", mt: 5, mx: "auto" }} onClick={()=>navigate('/')}>
          HOME
        </Button>
      </Stack>
    );
  }
};

export default TransactionPage;
