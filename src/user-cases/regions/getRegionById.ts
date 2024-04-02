import { RegionModel } from "../../models/models";

export async function getRegionById(id: string) {
    try{
        const region = await RegionModel.findOne({ _id: id }).populate('user');
        if (!region) {
            throw {
                message: "Regions were not found!",
                status: 404,
            };
        }

        return { region: region };
    }
    catch(err){
        throw(err);
    }
}
