import { UserModel } from "../../models/models";
import Joi from "joi";

const input_schema = Joi.object({
  page:Joi.number().optional(),
  limit:Joi.number().optional(),
})

export async function verifyInput(input) {
  try {
    await input_schema.validateAsync(input);
  } catch (err) {
    throw { message: err.message, status: 400 };
  }
}

export async function getUsers(page: number, limit: number) {
  try {
    const [users, total] = await Promise.all([
      UserModel.find(),
      UserModel.countDocuments()
    ]);

    if (!users) {
      throw {
        message: "Users were not found!",
        status: 404,
      };
    }

    return {
      rows: users,
      page,
      limit,
      total
    };
  } 
  catch (err) {
    throw (err);
  }
}
