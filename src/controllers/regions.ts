import { Request, Response } from "express";
import * as useCaseGetRegions from '../user-cases/regions/getRegions';
import * as useCaseGetRegionById from '../user-cases/regions/getRegionById';
import * as useCaseGetRegionsSpecificPoint from '../user-cases/regions/getRegionsSpecificPoint';
import * as useCaseGetRegionsByDistance from '../user-cases/regions/getRegionsByDistance';
import * as useCaseCreateRegion from '../user-cases/regions/createRegion';
import * as useCaseUpdateRegion from '../user-cases/regions/updateRegion';
import * as useCaseDeleteRegion from '../user-cases/regions/deleteRegion';
import { RegionRequestBody } from "../interfaces/regions";


export const getRegions = async (req: Request, res: Response) => {
    try {
        const input = {
            page:req?.query?.page ? Number(req?.query?.page):1,
            limit:req?.query?.limit  ?  Number(req?.query?.limit):10
        }
        const getRegions = await useCaseGetRegions.getRegions(Number(input.page), Number(input.limit));
        return res.status(200).json(getRegions);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err);
    }
}

export const getRegionById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const getRegions = await useCaseGetRegionById.getRegionById(id);
        return res.status(200).json(getRegions);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err);
    }
}

export const getRegionsSpecificPoint = async (req: Request, res: Response) => {
    try {
        const input = {
            lat: Number(req?.params?.lat),
            lng: Number(req?.params?.lng)
        }
        await useCaseGetRegionsSpecificPoint.verifyInput(input);
        const getRegionsSpecificPoint = await useCaseGetRegionsSpecificPoint.getRegionsSpecificPoint(input);
        return res.status(200).json(getRegionsSpecificPoint);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err);
    }
}

export const getRegionsDistance = async (req: Request, res: Response) => {
    try {
        const input = {
            lat: Number(req?.query?.lat),
            lng: Number(req?.query?.lng),
            distance: Number(req?.query?.distance),
            user: String(req?.query?.user)
        }
        await useCaseGetRegionsByDistance.verifyInput(input);
        const regionsDistance = await useCaseGetRegionsByDistance.getRegionsByDistance(input);
        return res.status(200).json(regionsDistance);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err);
    }
}

export const createRegion = async (req: Request, res: Response) => {
    try {
        const input : RegionRequestBody = req.body;
        await useCaseCreateRegion.verifyInput(input)
        const createRegion = await useCaseCreateRegion.createRegion(input);
        return res.status(201).json(createRegion);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
    }
}

export const updateRegion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const body : RegionRequestBody = req.body;
        const updateRegion = await useCaseUpdateRegion.updateRegion(id,body);
        return res.status(201).json(updateRegion);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
    }
}

export const deleteRegion = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteRegion = await useCaseDeleteRegion.deleteRegion(id);
        return res.status(200).json(deleteRegion);
    } 
    catch (err) {
        let statusCode = err.status || 500
        return res.status(statusCode).json(err)
    }
}

export default {
    getRegions,
    getRegionById,
    getRegionsSpecificPoint,
    getRegionsDistance,
    createRegion,
    updateRegion,
    deleteRegion
}