import { RegionModel } from "../../models/models";
import Joi from "joi";

const input_schema = Joi.object({
    lat:Joi.number().optional(),
    lng:Joi.number().optional(),
})
  
export async function verifyInput(input) {
    try {
      await input_schema.validateAsync(input);
    } 
    catch (err) {
      throw { message: err.message, status: 400 };
    }
}

export async function getRegionsSpecificPoint(input) {
    try{
        const { lng, lat } = input;
        const regionsSpecific = await RegionModel.find({
            coordinates: {
              $near: {
                $geometry: {
                  type: 'Point',
                  coordinates: [lng, lat],
                },
              },
            },
          }).populate('user');

        return { region_specific: regionsSpecific };
    }
    catch(err){
        throw(err);
    }
}
