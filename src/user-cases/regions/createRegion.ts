import { RegionRequestBody } from "../../interfaces/regions";
import { RegionModel, UserModel } from "../../models/models";
import Joi from 'joi';

const input_schema = Joi.object({
    name: Joi.string().label('name').required(),
    coordinates: Joi.object({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    }).label('coordinates').optional(),
    user: Joi.string().label('user').required()
  }).messages({
    'any.required': 'Field required {{#label}}',
    'object.base': '{{#label}} needs to be an object!',
  });
  
export async function verifyInput(input) {
      try {
        await input_schema.validateAsync(input);
      } 
      catch (err) {
        throw { message: err.message, status: 400 };
      }
}

export async function createRegion(input:RegionRequestBody) {
    try{
        const { name, coordinates, user } = input
        const findByUser = await UserModel.findById(user);
        if(!findByUser) { 
            throw({
                message:`Users were not found with id!`, 
                status: 404
            })
        }

        const findByRegion = await RegionModel.findOne({coordinates: [coordinates.lat, coordinates.lng]})
        if(findByRegion) {
            throw({
                message:`Region is already registered!`, 
                status: 404
            })
        }

        const createRegion = await RegionModel.create({
            name,
            user,
            coordinates: [coordinates.lat, coordinates.lng]
        })

        return { createRegion: createRegion };
    }
    catch(err){
      throw(err);
    }
}