import { UpdateUser, UserRequestBody } from "../../interfaces/users";
import { UserModel } from "../../models/models";
import geoLib from "../../services/geoLib";
import Joi from 'joi';
import formatAddress from "../../utils/address";

const input_schema = Joi.object({
    name: Joi.string().label("name").required(),
    email: Joi.string().label("email").required(),
    address: Joi.object({
      street: Joi.string().required(),
      neighborhood: Joi.string().required(),
      number: Joi.string(),
      zipCode: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      country: Joi.string().required()
    }).label("address").optional(),
    coordinates: Joi.object({
      lng: Joi.number().optional(),
      lat: Joi.number().optional(),
    }).label("coordinates").optional(),
  })
  .oxor('address', 'coordinates')
  .messages({
    'any.required': 'Field required {{#label}}',
    'string.email': 'Invalid email format!',
    'object.oxor': 'Enter only address or coordinates!',
    'object.base': '{{#label}} needs to be an object!',
  });

export async function verifyInput(input:UserRequestBody) {
    try {
      await input_schema.validateAsync(input);
    } catch (err) {
      throw { message: err.message, status: 400 };
    }
}

export async function updateUser(id: string, body: UserRequestBody) {
    try{
      const { email, name, address, coordinates } = body
        const findByUser = await UserModel.findOne({ _id: id });
        if(!findByUser) { 
            throw({
                message:`User is not found with id = ${id}!`, 
                status: 404
            })
        }

        const updateUser : UpdateUser =  {
            name: name,
            email: email
        }

        if (address) {
            const { lat, lng } = await geoLib.getCoordinatesFromAddress(address.zipCode);
            const formatedAddress = formatAddress(address);

            updateUser.coordinates = [lng, lat];
            updateUser.address = formatedAddress;
        }

        if(coordinates) {
            const address = await geoLib.getAddressFromCoordinates(coordinates);

            updateUser.address = address;
            updateUser.coordinates = [coordinates.lat, coordinates.lng];
        }

        await UserModel.updateOne({ _id: id}, updateUser)
        
        return { message: "Updated User"};
    }
    catch(err){
        throw(err);
    }
}