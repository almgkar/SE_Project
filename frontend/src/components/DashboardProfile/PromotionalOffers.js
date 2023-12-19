import React from "react";

const promotionalOffers = [
  "The late fee is waived during the holiday season, HAPPY HOLIDAYS!!!",
];

const PromotionalOffers = () => {
  return (
    <div className="promotional-offers">
      <style>
        {`
          .promotional-offers {
            background-color: #f8f8f8;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin: 20px;
          }

          h2 {
            color: #333;
          }

          ul {
            list-style-type: none;
            padding: 0;
          }

          li {
            margin-bottom: 10px;
            padding: 5px;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
          }
        `}
      </style>
      <h2>Promotional Offers</h2>
      <ul>
        {promotionalOffers.map((offer, index) => (
          <li key={index}>{offer}</li>
        ))}
      </ul>
    </div>
  );
};

export default PromotionalOffers;
