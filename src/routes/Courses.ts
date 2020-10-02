import { Request, Response, Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
import { ParamsDictionary } from 'express-serve-static-core';

import { paramMissingError } from '@shared/constants';
import {nest} from "../utils";
import logger from "@shared/Logger";
import {CourseService} from "../services/courseService";
import {courseDetails} from "../services/courseService/types";

// Init shared
const router = Router();



/******************************************************************************
 *                      Get All Users - "GET /api/courses/all"
 ******************************************************************************/

router.get('/all', async (req: Request, res: Response) => {
    const courseService = new CourseService();
    let courses : courseDetails[];
    let err: Error;
    [err, courses]= await nest(courseService.getListOfCourses());
    if(err){
        logger.error('Router Problem');
        throw new Error('Router Problem');
        return res.json({
            Error: err,
        })
    }
    else{
        return res.json({
        data: courses,
        error: null
    });}

});



/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

// router.post('/add', async (req: Request, res: Response) => {
//     const courseService = new CourseService();
//     let err : Error;
//     let isCreated : Boolean;
//     const {
//         id,
//         name,
//         description,
//         availableSlots,
//     }: courseDetails = req.body;
//     [err, isCreated]= await nest(
//         courseService.addCourse({
//             id,
//             name,
//             description,
//             availableSlots,
//         })
//     );
//     if(err){
//         logger.error('Error in adding the course',{ 'error' : err});
//         throw new Error('Error in adding the course');
//         return res.json({
//             error : err,
//         })
//     }
//     else{
//         return res.json({
//             isCreated : isCreated,
//         });
//     }
//
// });


/******************************************************************************
 *                       Update - "PUT /api/users/update"
 ******************************************************************************/

// router.put('/update', async (req: Request, res: Response) => {
//     const { user } = req.body;
//     if (!user) {
//         return res.status(BAD_REQUEST).json({
//             error: paramMissingError,
//         });
//     }
//     user.id = Number(user.id);
//     await userDao.update(user);
//     return res.status(OK).end();
// });
//
//
// /******************************************************************************
//  *                    Delete - "DELETE /api/users/delete/:id"
//  ******************************************************************************/
//
// router.delete('/delete/:id', async (req: Request, res: Response) => {
//     const { id } = req.params as ParamsDictionary;
//     await userDao.delete(Number(id));
//     return res.status(OK).end();
// });
//

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;