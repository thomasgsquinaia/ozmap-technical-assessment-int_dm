import { Request, Response } from "express";
import * as useCaseGetUsers from '../user-cases/users/getUsers';
import * as useCaseGetUserById from '../user-cases/users/getUserById';
import * as useCaseCreateUsers from '../user-cases/users/createUser';
import * as useCaseUpdateUsers from '../user-cases/users/updateUser';
import * as useCaseDeleteUsers from '../user-cases/users/deletUser';
import { UserRequestBody } from "../interfaces/users";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const input = {
            page:req?.query?.page ? Number(req?.query?.page):1,
            limit:req?.query?.limit  ?  Number(req?.query?.limit):10,
        }
        await useCaseGetUsers.verifyInput(input);
        const getUsers = await useCaseGetUsers.getUsers(Number(input.page), Number(input.limit));
        return res.status(200).json(getUsers);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const getUsers = await useCaseGetUserById.getUserById(id);
        return res.status(200).json(getUsers);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err);
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const input : UserRequestBody = req.body;
        await useCaseCreateUsers.verifyInput(input)
        const createUser = await useCaseCreateUsers.createUsers(input);
        return res.status(201).json(createUser);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const input : UserRequestBody = req.body;
        await useCaseUpdateUsers.verifyInput(input);
        const updateUser = await useCaseUpdateUsers.updateUser(id,input);
        return res.status(200).json(updateUser);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteUser = await useCaseDeleteUsers.deleteUser(id);
        return res.status(204).json(deleteUser);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
    }
}

