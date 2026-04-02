import { errorMiddleware } from "../../middleware/error.middleware.js";
import { Finance } from "./finance.model.js";
import { create, findAll, softDelete, update } from "./finance.service.js";

export const createFinanceRecord = async (req,res) =>{
    try {
        const {amount,type,category,date,notes} = req.body;
        if(!amount || !type || !category || !date || !notes){
            return res.status(400).json({
                message:"Invalid input"
            })
        }
        const finance = await create({amount,type,category,date,notes,createdBy:req.user._id});
        return res.status(201).json({
            message:"Record has been created",
            finance
    })
    } catch (error) {
        throw new errorMiddleware;
    }
}

export const getRecords = async (req,res) => {
    try {
        const {page = 1, limit = 10, type, category} = req.query;
        let filter = {isDeleted:false};
        if(type) filter.type = type;
        if(category) filter.category = category;

        const data = await findAll(filter,(page - 1) * limit,Number(limit));
        return res.status(200).json({
            message:"Finance fetched successfully",
            data
        })
    } catch (error) {
        return res.status(400).json({
            message:"Error while getting all finance records"
        })
    }
}

export const updateRecord = async (req,res) => {
    try {
        const updated = await update(req.params.id, req.body);
        return res.status(200).json(updated);
    } catch (error) {
        throw new errorMiddleware
    }
}

export const deleteRecord = async (req,res) => {
    try {
        const softDelete = await softDelete(req.params.id);
        return res.status(200).json({
            message:"Deleted successfully",
            softDelete
        })
    } catch (error) {
        throw new errorMiddleware;
    }
}

export const summary = async (req,res) => {
    const data = await Finance.aggregate([
        {$match:{isDeleted:false}},
        {$group:{_id:"$type",total:{$sum:"$amount"}}}
    ]);

    let income = 0, expense = 0;
    data.forEach(d => d._id === "income" ? income = d.total : expense = d.total);

    return res.status(200).json({
        totalIncome: income,
        totalExpense: expense,
        netBalance: income - expense
    });
}


export const category = async (req, res) => {
  const data = await Finance.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } }
  ]);

  res.status(200).json(data);
};

export const trends = async (req, res) => {
  const data = await Finance.aggregate([
    {
      $group: {
        _id: { month: { $month: "$date" } },
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.status(200).json(data);
};

export const recent = async (req, res) => {
  const data = await Finance.find({ isDeleted: false })
    .sort({ date: -1 })
    .limit(5);

  res.status(200).json(data);
};