import { RegionModel } from "../../models/models";

export async function deleteRegion(id:string) {
    try{
        const findByRegion = await RegionModel.findOne({ _id: id })
        
        if(!findByRegion) {
            throw({
                message:`Region is not found with id = ${id}!`, 
                status: 404
            })
        }

        await RegionModel.deleteOne({ _id: id })

        return { message: "Deleted Region!" };
    }
    catch(err){
        throw(err);
    }
}