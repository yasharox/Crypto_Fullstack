// export const calculateProfit = ( order) => {

//     if ( order && order.orderItem.buyPrice && orderReducer.orderItem.sellPrice){

//          return order.orderItem?.sellPrice - order.orderItem?.buyPrice;
//     }

//     return "_";
       
// }

export const calculateProfit = (orderItem) => {
  if (!orderItem.sellPrice) return "-";

  return (
    (orderItem.sellPrice - orderItem.buyPrice) *
    orderItem.quantity
  ).toFixed(2);
};