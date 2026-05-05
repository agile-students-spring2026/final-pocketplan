import {body} from "express-validator";

export const createTaskValidation = [
    body("name").notEmpty().withMessage("Name is required"),
];
export const updateTaskValidation = [
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
];