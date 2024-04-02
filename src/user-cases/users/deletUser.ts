import { UserModel } from "../../models/models";

export async function deleteUser(id: string) {
    try{
        const findByUser = await UserModel.findOne({ _id : id});
        if(!findByUser) { 
            throw({
                message:`Users were not found with id = ${id}!`, 
                status: 404
            })
        }
        await UserModel.deleteOne({ _id : id });
        
        return { message: "Deleted User!" };
    }
    catch(err){
        throw(err);
    }
}