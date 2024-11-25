import express, { Request, Response } from "express";
import mongoose from "mongoose";

export const UserInfo =  express();

interface responseData {
    code : string;
    status : string;
    data : object;
}

const UserSchemas = new mongoose.Schema({
    AffiliatedCompany : String,
    UserName : String,
    NationalIDNumber : String,
    Email : String,
    PhoneNumber : String,
    StartDateBondDealer : String,
    EndDateBondDealer : String,
    CourseDetail : String

});

const userData = mongoose.model("Information", UserSchemas);

/**
 * @swagger
 * /users/getList:
 *   get:
 *     summary: User Information
 *     tags:
 *       - View User Information
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Successfully
 *       401:
 *         description: Unauthorized
 */

UserInfo.get("/getList", async(req: Request, res: Response) => {
    mongoose.connect('mongodb://localhost:27017/ViewInformationUser?authSource=ViewInformationUser')
    const headersReq : any = req.headers;
    const body : any = req.body;
    const UserData = await userData.find()

    res.status(200).json({
        code : "Success-01-0001",
        status : "Success",
        data : UserData,
    })
});