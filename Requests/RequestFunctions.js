import Cards from "../Schema/Schema.js";
import Favourite from "../Schema/Favourite.js";
const addDataToFavourite = async (userId, data) => {
    try {
        let user = await Favourite.findOne({ favouriteId: userId });

        if (!user) {
            const newData = new Favourite({ favouriteId: userId, favouriteIdData: [data] });
            await newData.save();
        } else {
            user.favouriteIdData.push(data);
            await user.save();
        }
    } catch (error) {
        console.error('Error adding data to Favourites collection:', error);
        throw error;
    }
};

const RemoveDatafromFavourite = async (userId, data) => {
    try {
        let user = await Favourite.findOne({ favouriteId: userId });

        if (user) {
            const index = user.favouriteIdData.indexOf(data);
            if (index !== -1) {
                user.favouriteIdData.splice(index, 1);
                await user.save();
            } else {
                console.log("Data not found in user's favourites");
            }
        } else {
            console.log("User not found");
        }
    } catch (error) {
        console.error('Error removing data from Favourites collection:', error);
        throw error;
    }
};

const getAllFavouriteData = async (userId) => {
    try {
      const user = await Favourite.findOne({ favouriteId: userId });
      if (user) {
        return user.favouriteIdData;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching favourite data:', error);
      throw error;
    }
  };
const addDataToCards = async (data) => {
    try {
        const newData = new Cards(data);
        const result = await newData.save();
        return result;
    } catch (error) {
        console.error('Error adding data to Cards collection:', error);
        throw error;
    }
};
const removeDatafromCards = async (givenId) => {
    try {
        const result = await Cards.deleteOne({ id: givenId });
        return result;
    } catch (error) {
        console.error('Error removing data from Cards collection:', error);
        throw error;
    }
};
const UpdateDatainCards = async (givenname, givenSize, givenQuantity) => {
    try {
        const card = await Cards.findOne({ name: givenname });
        
        if (!card) {
            throw new Error('Card not found');
        }
        const updatedSizes = card.sizes.map(sizeEntry => {
            const sizeKey = Object.keys(sizeEntry).find(key => key !== 'quantity');
   
            if (sizeKey == givenSize) {
                const previousQuantity = sizeEntry.quantity;
                const updatedQuantity = previousQuantity - givenQuantity;
                if (updatedQuantity<=0) {
                    updatedQuantity=0
                }
                return {
                    ...sizeEntry,
                    quantity: updatedQuantity
                };
            }
            return sizeEntry;
        });
        card.sizes = updatedSizes;
        const result = await card.save();
        return result;
    } catch (error) {
        console.error('Error updating data in Cards collection:', error);
        throw error;
    }
};
const AllData = async () => {
    try {
        const result = await Cards.find({})
        return result;
    } catch (error) {
        console.error('Error while getting all data', error);
        throw error;
    }
};


export { addDataToCards, removeDatafromCards, AllData, addDataToFavourite,UpdateDatainCards, RemoveDatafromFavourite, getAllFavouriteData };
