// import jwt from 'jsonwebtoken';
// import {Request, Response, NextFunction, request, response} from 'express';
// import {
//     IStudentModel,
//     StudentModelManager,
// } from '../lib/schema/models/studentModelManager/studentModelManager';
// import jwtObject from '../config/jwt.config';
// import logger from '../shared/logger';
// import { nest } from '.';
//
// export const checkToken = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
// ): Promise<void> => {
//     try {
//         let token: string = <string>req.headers['authorization'];
//         if (token && token.length > 7) {
//             token = token.split('Bearer ')[1];
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             const jwtPayload = <any>jwt.verify(token, jwtObject.secret);
//             // eslint-disable-next-line camelcase
//             const { user_id } = jwtPayload;
//             res.setHeader('user_id', user_id);
//             const userModel = StudentModelManager.getInstance().getModel();
//             let err: Error;
//             let userDetails: IStudentModel;
//             [err, userDetails] = await nest(userModel.findByPk(user_id));
//             if (err || userDetails === null) {
//                 throw Error('User not found');
//             }
//             next();
//         } else {
//             throw Error('Please provide valid token');
//         }
//     } catch (e) {
//         logger.error('Error verifying token', { error: e });
//         res.json({
//             error: `Error verifying token ${e}`,
//             data: [],
//         });
//     }
// };
//
//
//
// async function verifyId(student_id : number): Promise<boolean | Error>{
//     const studentModel = StudentModelManager.getInstance().getModel();
//     let err: Error;
//     let studentDetails: IStudentModel;
//     [err, studentDetails] = await nest(studentModel.findByPk(student_id));
//     if (err || studentDetails === null) {
//         throw Error('User not found');
//     }
//     else{
//         return true;
//     }
// }


