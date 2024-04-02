import { RegionModel } from "../../models/models";
import Joi from "joi";

const input_schema = Joi.object({
    lat:Joi.number().label('lat').required(),
    lng:Joi.number().label('lng').required(),
    distance:Joi.number().label('distance').required(),
    user:Joi.string().label('user').required(),
}).messages({
  'any.required': 'Field required {{#label}}'
});
  
export async function verifyInput(input) {
    try {
      await input_schema.validateAsync(input);
    } 
    catch (err) {
      throw { message: err.message, status: 400 };
    }
}

export async function getRegionsByDistance(input) {
    try{
        const { lat, lng, distance, user } = input;
        const regions = await RegionModel.find({
          coordinates: {
            $near: {
              $geometry: {
                type: 'Point',
                coordinates: [lat, lng],
              },
              $maxDistance: distance,
            },
          },
        });

        if (!regions.length) {
          throw({
            message:"Regions were not found!", 
            status: 404
        })
        }
      
        if (user) {
          const filteredRegions = regions.filter((region) => region.user === user);
      
          if (!filteredRegions.length) {
            throw({
              message:"No region belongs to this user!", 
              status: 404
          })
          }
      
          return { filtered_regions: filteredRegions };
        }
      
        return { region_distance: regions };
    }
    catch(err){
      throw(err);
    }
}
