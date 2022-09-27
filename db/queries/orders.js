const db = require("../connection");

const getOrders = () => {
  return db.query('SELECT * FROM orders;')
    .then(data => {
      return data.rows;
    });
};

const updateOrderDishesTable = (dishIDs, orderID) => {
  let queryString = "INSERT INTO order_dishes (dish_id, order_id) VALUES ";
  dishIDs.forEach((id) => {
    queryString += `(${id}, ${orderID}), `;
  });
  queryString = queryString.slice(0, -2);
  queryString += " RETURNING *;";

  return db.query(queryString)
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

const placeOrder = ({ customerID, totalPrice, estimatedTime, dishIDs, status }) => {

  const queryString = `
    INSERT INTO orders (user_id, order_time, total_price, est_prep_time, status)
    VALUES ($1, CURRENT_TIMESTAMP, $2, $3, $4) RETURNING *;`;

  const queryParams = [customerID, totalPrice, estimatedTime, status];
  return db.query(queryString, queryParams)
    .then((result) => {
      return updateOrderDishesTable(dishIDs, result.rows[0].id);
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
};

module.exports = { getOrders, placeOrder };
