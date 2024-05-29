const Transaction = require("./model");
const Location = require("../location/model");
const Product = require("../product/model");
const lineNotify = require("../utils/lineNotify");
const { getISOWeek, getWeeksInMonth } = require("date-fns"); // Import getISOWeek function from date-fns library

const getAll = async (req, res, next) => {
  const user = req.user;
  try {
    const transactions = await Transaction.find({ user_id: user.id })
      .populate("location")
      .exec();
    if (!transactions || transactions.length === 0)
      throw new Error("Resource not Found");
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

const getFilterdData = async (req, res, next) => {
  const user = req.user;
  const { dataType } = req.params;
  if (!dataType)
    return res.status(404).json({ error: "Credential not complete" });

  try {
    const transactions = await filterdDataByFieldName(dataType, user);
    if (!transactions || transactions.length === 0)
      throw new Error("Resource not Found");
    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};
const filterdDataByFieldName = async (dataType, user) => {
  const sortOption = {};
  sortOption[dataType] = 1;
  const transactions = await Transaction.find({ user_id: user.id })
    .sort(sortOption)
    .populate("location")
    .exec();
  return transactions;
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ error: "Credential Not Complete" });

  try {
    const transaction = await Transaction.findById(id)
      .populate("location")
      .exec();
    if (!transaction) throw new Error(`Resource not Found`);
    res.status(200).json(transaction);
  } catch (error) {
    next();
  }
};

const create = async (req, res, next) => {
  const user = req.user;
  const { orders, total_sales, location, employee_wage, other_expenses, date } =
    req.body;
  try {
    let total_margin = 0;

    await Promise.all(
      orders.map(async (order) => {
        const orderValue = order.amount * order.product_id.margin;
        const product = await Product.findById(order.product_id);
        product.amount -= order.amount;
        await product.save();
        total_margin += orderValue;
      })
    );

    const locationData = await Location.findById(location);

    const other_margin =
      Number(employee_wage) +
      Number(other_expenses) +
      Number(locationData.price);
    total_margin += other_margin;

    const transaction = await Transaction.create({
      user_id: user.id,
      total_margin,
      total_sales,
      location,
      employee_wage,
      other_expenses,
      date,
    })

    const profit = transaction.total_sales - transaction.total_margin;
    const margin = transaction.total_margin;
    const profitPercentage = Math.floor(
      ((profit) / margin) *
        100
    );

    const currentDate = new Date();
    const message = `${currentDate.toLocaleDateString("th-TH", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })}\nสถานที่: ${locationData.name} \n-ยอดขาย: ${transaction.total_sales.toLocaleString()} บาท\n-ต้นทุนทั้งหมด: ${transaction.total_margin.toLocaleString()} บาท\n-กำไร: ${(
      transaction.total_sales - transaction.total_margin
    ).toLocaleString()} บาท\n💰สรุป -> กำไร ${profitPercentage}%`;

    const encodedMessage = encodeURIComponent(message);
    await lineNotify(encodedMessage);

    if (!transaction) throw new Error("Failed to create new Tranasction");
    res.status(200).json(transaction);
  } catch (error) {
    next(error);
  }
};

const getFilteredDataByMonthYear = async (req, res, next) => {
  const user = req.user;
  const { year } = req.params;
  if (!year) {
    return res.status(400).json({ error: "Year is required" });
  }

  try {
    const yearlyData = [];
    for (let month = 1; month <= 12; month++) {
      // Construct start and end dates for the given month and year
      const startDate = new Date(year, month - 1, 1); // Month is 0-indexed in JavaScript
      const endDate = new Date(year, month, 0); // Get the last day of the month

      // Query transactions for the current month and year
      const transactions = await Transaction.find({
        user_id: user.id,
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      }).exec();

      console.log(`Transactions for month ${month}:`, transactions); // Log transactions

      let totalSales = 0;
      let totalMargin = 0;
      let totalProfit = 0;

      transactions.forEach((transaction) => {
        totalSales += transaction.total_sales;
        totalMargin += transaction.total_margin;
        totalProfit += transaction.total_profit;
      });

      yearlyData.push({
        month,
        totalSales,
        totalMargin,
        totalProfit,
      });
    }

    res.status(200).json(yearlyData);
  } catch (error) {
    next(error);
  }
};

const monthMap = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11,
};

const getNumWeeksInMonth = (year, month) => {
  month = monthMap[month]; // Map month name to its number
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const totalDaysInMonth = lastDayOfMonth.getDate();
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const remainingDays = totalDaysInMonth - (7 - firstDayOfWeek);
  const numWeeks = Math.ceil(remainingDays / 7) + 1;
  return numWeeks;
};

const getWeek = (date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const diff = date.getTime() - firstDayOfMonth.getTime();
  return Math.ceil(diff / (7 * 24 * 60 * 60 * 1000));
};

const getFilteredDataByMonth = async (req, res, next) => {
  const user = req.user;
  const { month, year } = req.params;
  if (!month || !year) {
    return res.status(400).json({ error: "Month and year are required" });
  }

  try {
    const numWeeks = getNumWeeksInMonth(year, month);
    const weeklyData = {};

    // Query transactions for the specified month and year
    const transactions = await Transaction.find({
      user_id: user.id,
      date: {
        $gte: new Date(`${year}-${monthMap[month] + 1}-01`),
        $lte: new Date(`${year}-${monthMap[month] + 1}-31`),
      },
    }).exec();

    // Aggregate transactions by week
    transactions.forEach((transaction) => {
      const weekNumber = getWeek(transaction.date); // Calculate week number within the month
      if (transaction.date && transaction.total_sales !== undefined) {
        if (!weeklyData[weekNumber]) {
          weeklyData[weekNumber] = {
            totalSales: 0,
            totalMargin: 0,
            totalProfit: 0,
          };
        }
        weeklyData[weekNumber].totalSales += transaction.total_sales;
        weeklyData[weekNumber].totalMargin += transaction.total_margin;
        weeklyData[weekNumber].totalProfit += transaction.total_profit;
      }
    });

    // Format data for Recharts
    const formattedData = Object.keys(weeklyData).map((weekNumber) => ({
      week: parseInt(weekNumber),
      ...weeklyData[weekNumber],
    }));

    res.status(200).json(formattedData);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getFilterdData,
  getById,
  create,
  getFilteredDataByMonthYear,
  getFilteredDataByMonth,
};
