import { Request, Response, Router } from 'express';
import {nest} from "../utils";
import logger from "@shared/Logger";
import {CourseService} from "../services/courseService";
import {courseDetails} from "../services/courseService/types";
import {checkToken} from "../utils/tokenauth.middleware";

// Init shared
const router = Router();



/******************************************************************************
 *                      Get All Users - "GET /api/courses/all"
 ******************************************************************************/

router.get('/all', checkToken, async (req: Request, res: Response) => {
    const courseService = new CourseService();
    let courses : courseDetails[];
    let err: Error;
    [err, courses]= await nest(courseService.getListOfCourses());
    if(err){
        logger.error('Router Problem');
        return res.json({
            Error: err.message,
        })
    }
    else{
        return res.json({
        data: courses,
        error: null
    });}

});



/******************************************************************************
 *                       Add One - "POST /api/courses/add"
 ******************************************************************************/

router.post('/add', checkToken, async (req: Request, res: Response) => {
    const {
        name,
        description,
        availableSlots,
    }: courseDetails = req.body;

    const courseService = new CourseService();
    let err : Error;
    let isCreated : boolean;

    [err, isCreated]= await nest(
        courseService.addCourses({
            name,
            slug : name,
            description,
            availableSlots,
        })
    );
    if(err){
        logger.error('Error in adding the course',{ 'error' : err});
        return res.json({
            error : err.message,
        })
    }
    else{
        return res.json({
            isCreated : isCreated,
        });
    }

});


/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
