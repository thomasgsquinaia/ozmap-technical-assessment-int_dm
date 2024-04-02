import { UserModel } from "../../models/models";

export async function getUserById(id: string) {
  try {
    const user = await UserModel.findOne({ _id: id }).populate('regions');
    
    if (!user) {
      throw {
        message: "User were not found!",
        status: 404,
      };
    }
    
    return user;
  } 
  catch (err) {
    throw (err);
  }
}
