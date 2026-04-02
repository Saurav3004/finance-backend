import { Finance } from "./finance.model.js";

export const create = async (data) => {
    try {
        const createdFinance = await Finance.create(data)
        return createdFinance;
    } catch (error) {
        throw new Error("Error while creating finance")
    }
}

export const findAll = async (filter,skip,limit) => {
    const all = await Finance.find(filter).skip(skip).limit(limit);
    return all;
}

export const update = async (id,data) => {
    const updatedData = await Finance.findByIdAndUpdate(id,data,{new:true});
    return updatedData
};

export const softDelete = async (id) => {
    const data = await Finance.findByIdAndDelete(id,{isDeleted:true})
    return data;
}