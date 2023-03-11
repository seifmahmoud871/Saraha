import joi from "joi"


export const messageValSchema={
    body:joi.object({
        message:joi.string().min(5).max(1500).required(),
    }).required(),
    params:joi.object({
        receiverId:joi.string().min(24).max(24).required(),
    }).required(),
}

export const messageDelete = {
    params:joi.object({
        id:joi.string().min(24).max(24).required(),
    }).required(),
}

