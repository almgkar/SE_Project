import "./Ds_Mainsection.css";
import React from "react";
import Dsnavbar from "./Dsnavbar";
import Bookings from "./Bookings";
import PromotionalOffers from "./PromotionalOffers";
//  <Bookings />

const Ds_MainSection = ({ userId }) => {
  return (
    <div>
      <Dsnavbar userId={userId} />
      <PromotionalOffers />
    </div>
  );
};

export default Ds_MainSection;
