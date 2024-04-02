import { RegionRequestBody } from "../../interfaces/regions";
import { RegionModel, UserModel } from "../../models/models";
import Joi from "joi";

const input_schema = Joi.object({
    name: Joi.string().label('name').optional(),
    user: Joi.string().label('user').optional(),
    coordinates: Joi.object({
      lng: Joi.number().optional(),
      lat: Joi.number().optional(),
    }).label('coordinates').optional(),
  }).messages({
    'any.required': 'Field required {{#label}}',
    'object.base': '{{#label}} needs to be an object!',
  });
  
export async function verifyInput(input:RegionRequestBody) {
      try {
        await input_schema.validateAsync(input);
      } 
      catch (err) {
        throw { message: err.message, status: 400 };
      }
}
export async function updateRegion(id: string, body: RegionRequestBody) {
    try{
        const { name, user, coordinates } = body

        const findByUser = await UserModel.findOne({ _id: user });
        if(!findByUser) { 
            throw({
                message:`Users were not found with id = ${id}!`, 
                status: 404
            })
        }

        const region = await UserModel.findOne({regions: id});
        if (region._id !== user) {
          await UserModel.updateOne({ _id: region._id }, { $pull: { regions: id } });
          await UserModel.updateOne({ _id: user }, { $push: { regions: id } });
        }

        const findByRegion = await RegionModel.findOne({ _id: id})
        if(!findByRegion) {
            throw({
                message:`Region was not found with this id!`, 
                status: 404
            })
        }

        await RegionModel.updateOne(
            { _id: id}, 
            {
                name: name, 
                coordinates: [coordinates.lat,coordinates.lng],
                user: user
            });

        return { message: "Updated Region!"};
    }
    catch(err){
        throw(err);
    }
}