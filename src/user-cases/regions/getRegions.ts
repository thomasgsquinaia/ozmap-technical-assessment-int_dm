import { RegionModel } from "../../models/models";
import Joi from "joi";

const input_schema = Joi.object({
    page:Joi.number().optional(),
    limit:Joi.number().optional(),
})
  
export async function verifyInput(input) {
    try {
      await input_schema.validateAsync(input);
    } 
    catch (err) {
      throw { message: err.message, status: 400 };
    }
}

export async function getRegions(page: number, limit: number) {
    try{
        const [regions, total] = await Promise.all([
            RegionModel.find(),
            RegionModel.countDocuments()
        ]);

        if(!regions.length) { 
            throw({
                message:"Regions were not found!", 
                status: 404
            })
        }

        return {
            rows: regions, 
            page,
            limit,
            total
        };
    }
    catch(err){
        throw(err);
    }
}
