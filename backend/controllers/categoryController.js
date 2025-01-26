import { createCategory, getCategories, updateCategory, deleteCategory, getCategoryById } from '../models/categoryModel.js';
import asyncHandler from 'express-async-handler';

export const addCategory = asyncHandler(async (req, res) => {
    const { category_name, category_sequence, status } = req.body;
    const image = req.file.path;
    const categoryId = await createCategory({ category_name, category_sequence, status, image });

    res.status(201).json({
        status: "success",
        data: {
            id: categoryId,
            category_name,
            category_sequence,
            status,
            image,
        },
    });
});

export const getCategory = asyncHandler(async (req, res) => {
    const categories = await getCategories();

    res.status(200).json({
        status: "success",
        data: categories,
    });
});

export const editCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { category_name, category_sequence, status } = req.body;
    let image;

    const existingCategory = await getCategoryById(id);
    

    if (!existingCategory) {
        return res.status(404).json({
            status: "fail",
            message: "Category not found",
        });
    }

    if (req.file) {
        image = req.file.path;
    } else {
        image = existingCategory.image;
    }

    const updatedCategory = {
        category_name: category_name || existingCategory.category_name,
        category_sequence: category_sequence || existingCategory.category_sequence,
        status: status || existingCategory.status,
        image: image,
    };

    await updateCategory(id, updatedCategory);

    res.status(200).json({
        status: "success",
        data: updatedCategory,
    });
});

export const deleteCategorys = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const success = await deleteCategory(id);

    if (success) {
        res.status(200).json({
            status: "success",
            message: "Category deleted successfully",
        });
    } else {
        res.status(404).json({
            status: "fail",
            message: "Category not found",
        });
    }
});