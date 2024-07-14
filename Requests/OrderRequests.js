import Order from "../Schema/Orders.js";
import OrderHistory from "../Schema/OrderHistory.js";

const addDataToOrder= async (data) => {
    try {
        const newData = new Order(data);
        const result = await newData.save();
        return result;
    } catch (error) {
        console.error('Error adding data to Order collection:', error);
        throw error;
    }
};
const removeDatafromOrder = async (givenId) => {
    try {
        const result = await Order.deleteOne({ id: givenId });
        return result;
    } catch (error) {
        console.error('Error removing data from Order collection:', error);
        throw error;
    }
};
const AllOrderData = async () => {
    try {
        const result = await Order.find({})
        return result;
    } catch (error) {
        console.error('Error while getting all Order data', error);
        throw error;
    }
};

const addDataToOrderHistory= async (data) => {
    try {
        const newData = new OrderHistory(data);
        const result = await newData.save();
        return result;
    } catch (error) {
        console.error('Error adding data to Order collection:', error);
        throw error;
    }
};
const removeDatafromOrderHistory = async (givenId) => {
    try {
        const result = await OrderHistory.deleteOne({ id: givenId });
        return result;
    } catch (error) {
        console.error('Error removing data from Order collection:', error);
        throw error;
    }
};
const AllOrderHistoryData = async () => {
    try {
        const result = await OrderHistory.find({})
        return result;
    } catch (error) {
        console.error('Error while getting all Order data', error);
        throw error;
    }
};

export {AllOrderData,addDataToOrder,removeDatafromOrder,addDataToOrderHistory,removeDatafromOrderHistory,AllOrderHistoryData}