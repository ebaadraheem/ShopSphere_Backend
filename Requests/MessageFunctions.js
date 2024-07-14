
import Contact from "../Schema/Contact.js";

const addDataToMessage = async (data) => {
    try {
        const newData = new Contact(data);
        const result = await newData.save();
        return result;
    } catch (error) {
        console.error('Error adding data to Contact collection:', error);
        throw error;
    }
};

const removeDatafromMessage = async (givenId) => {
    try {
        const result = await Contact.deleteOne({ id: givenId });
        return result;
    } catch (error) {
        console.error('Error removing data from Contact collection:', error);
        throw error;
    }
};
const AllMessageData = async () => {
    try {
        const result = await Contact.find({})
        return result;
    } catch (error) {
        console.error('Error while getting all data', error);
        throw error;
    }
};


export {addDataToMessage,removeDatafromMessage,AllMessageData}