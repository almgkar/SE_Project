import React, { useState, useEffect } from "react";
import HeaderDashboard from "../Header_dashBoard";
import userSession from "../../LoginSingup/userSession";
import { useNavigate } from "react-router-dom";
import CustomerUserInfo from "./CustomerUserInfo";
import "./CustomerSupport.css";

const url = process.env.REACT_APP_API_URL || "http://localhost:3001";
const params = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

const EmployeeDashboard2 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const type = userSession.getUserType();
    console.log("type is below");
    console.log(type);
    if (type === "employee" || type === "admin" || type === "support") {
      console.log("you're in!");
    } else {
      navigate("/LoginSignup");
    }
  }, [navigate]);

  const [view, setView] = useState("details");
  const [userData, setUserData] = useState(null);
  const [field, setField] = useState(null);
  const [amount, setAmount] = useState(0);
  const [money, setMoney] = useState(amount);
  const [items, setNumOfItems] = useState(0);
  const [date, setDate] = useState(null);
  const [card, setCard] = useState(null);

  const handleSearch = async (input, selectedField) => {
    try {
      const response = await fetch(
        `${url}/userInfo/get-user?term=${input}&type=${selectedField}`,
        params
      );
      const data = await response.json();

      const resp = await fetch(
        `${url}/userInfo/amount-due?user_id=${data.user.user_id}`,
        params
      );
      const due = await resp.json();

      const paymentResponse = await fetch(
        `${url}/userInfo/payment-info?user_id=${data.user.user_id}`,
        params
      );
      const paymentInfo = await paymentResponse.json();
      const { itemsCount, formattedDate, paymentCardnumber } = paymentInfo;
      setNumOfItems(itemsCount);
      setDate(formattedDate);
      setCard(paymentCardnumber);

      console.log("items: " + itemsCount);
      console.log("date: " + formattedDate);
      console.log("card: " + paymentCardnumber);

      setUserData(data.user);
      setField(selectedField);
      setAmount(due.amount);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUserData(null);
    }
  };

  const handleAddClick = () => {
    setView("search");
  };

  const handlePayClick = async () => {
    try {
      if (!userData || !money) {
        console.log("no");
        console.error("Invalid parameters for payment");
        return;
      }

      const response = await fetch(`${url}/userInfo/update-amount`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userData.user_id,
          payment: money,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Payment successful:", data.amount);
        handleSearch(userData.user_id, field);
      } else {
        console.error("Failed to process payment:", data.error);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  return (
    <div className="employee-dashboard-container">
      <HeaderDashboard />
      <div className="subheader-container">
        <div className="subheader1">
          <h1 className="emp-dashboar-title">Customer Support</h1>
        </div>
      </div>
      <CustomerUserInfo
        view={view}
        userData={userData}
        field={field}
        card={card}
        date={date}
        items={items}
        amount={amount}
        money={money}
        setMoney={setMoney}
        handleSearch={handleSearch}
        handleAddClick={handleAddClick}
        handlePayClick={handlePayClick}
      />
    </div>
  );
};

export default EmployeeDashboard2;
