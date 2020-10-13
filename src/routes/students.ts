import { Request, Response, Router } from 'express';
import {nest} from '../utils';
import logger from '@shared/Logger';
import {studentDetails} from "../services/studentService/types";
import {StudentService} from "../services/studentService";
import {checkToken} from "../utils/tokenauth.middleware";


const router = Router();

/******************************************************************************
 *                      Get All Users - "GET /api/students/all"
 ******************************************************************************/

router.get('/all', checkToken , async (req: Request, res: Response) => {
    const getStudents = new StudentService();
    let student : studentDetails[];
    let err: Error;
    [err, student]= await nest(getStudents.getListOfStudents());
    if(err){
        logger.error('Router Problem');
        throw new Error('Router Problem');
        return res.json({
            Error: err,
        })
    }
    return res.json({
        data: student,
        error: null
    });
});

/******************************************************************************
 *                      Post API- "POST /api/students/enroll"
 ******************************************************************************/

router.post('/enroll', checkToken, async (req: Request, res: Response) => {
    const {studentId, courseId} = req.body;
    if(!studentId || !courseId){
        return res.json({
            data:null,
            error: 'Invalid Payload',
        })
    }
    const enrollStudent = new StudentService();
    let isEnrolled: boolean;
    let err: Error;
    [err, isEnrolled]= await nest(enrollStudent.enrollStudent({
        studentId,
        courseId,
    }));
    if(err){
        logger.error('Router Problem');
        throw new Error('Router Problem');
        return res.json({
            Error: err,
        })
    }
    return res.json({
        data: isEnrolled,
        error: null
    });
});
/******************************************************************************
 *                      Delete student - "Post /api/students/enroll"
 ******************************************************************************/

router.post('/unenroll', checkToken, async (req: Request, res: Response) => {
    const {studentId, courseId} = req.body;
    if(!studentId || !courseId){
        return res.json({
            data:null,
            error: 'Invalid Payload',
        })
    }
    const enrollStudent = new StudentService();
    let isEnrolled: boolean;
    let err: Error;
    [err, isEnrolled]= await nest(enrollStudent.unenrollStudent({
        studentId,
        courseId,
    }));
    if(err){
        logger.error('Router Problem');
        throw new Error('Router Problem');
        return res.json({
            Error: err,
        })
    }
    return res.json({
        data: isEnrolled,
        error: null
    });
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;
