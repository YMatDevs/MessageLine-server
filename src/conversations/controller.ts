import { Router } from "express";
import type { APIResponseInterface } from "../utilities/types.js";
import type { Request, Response } from "express";
import { listService } from "./service.js";


const router = Router();


router.get('/list',  async (req: Request, res: Response): Promise<Response<APIResponseInterface<null>>> => {

    const { success, data, status, message } = await listService();

    return res.status(status).json({ success, message, data });
});

export default router;
