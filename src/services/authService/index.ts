import { nest } from '../../utils';
import { comparePassword, passwordHash } from '../../utils/bcrypt';
import { IUser, LoginRequest, SignUpRequest } from './types';
import logger from '../../shared/logger';
import {
    IStudentModel,
    StudentModelManager,
} from '../../lib/schema/models/studentModelManager/studentModelManager';
import jwt from 'jsonwebtoken';
import jwtObject from '../../config/jwt.config';
import { ModelCtor } from 'sequelize';


export class AuthService implements IUser {
    async logInAndGenerateToken(
        loginRequest: LoginRequest
    ): Promise<string | Error> {
        const Student: ModelCtor<IStudentModel> = StudentModelManager.getInstance().getModel();
        let err: Error;
        let studentDetails: IStudentModel;
        let isValid: boolean | false;
        [err, studentDetails] = await nest(
            Student.findOne({ where: { email: loginRequest.email } })
        );
        if (err) {
            logger.error('Error finding user', { error: err });
            throw Error('Error finding user');
        }
        [err, isValid] = await nest(
            comparePassword(studentDetails.passwordHash, loginRequest.password)
        );
        if (err) {
            logger.error('Error comparing password', { error: err });
            throw Error('Error comparing password');
        }
        if (!isValid) {
            logger.error('Invalid credentials');
            throw new Error('Invalid credentials');
        }
        let token: string;
        [err, token] = await nest(this.generateToken({ student_id: studentDetails.id }));
        if(err){
            logger.error('Error while generating token',{error : err})
            throw new Error('Error while generating token');
        }
        return token;
    }

    async signUpAndGenerateToken(
        signUpRequest: SignUpRequest
    ): Promise<string | Error> {
        const Student = StudentModelManager.getInstance().getModel();
        const userObject: IStudentModel = Student.build({
            username: signUpRequest.username,
            name: signUpRequest.name,
            email: signUpRequest.email,
            passwordHash: await passwordHash(signUpRequest.password),
        });
        const [err, studentData] = await nest(userObject.save());
        if (err) {
            logger.error('Error while registering', { error: err });
            throw Error('Error while registering');
        }
        let token: string;
        let error: Error;
        [error, token]= await nest(this.generateToken({ student_id: studentData.id }));
        if(error){
            logger.error('Error while generating token',{error : err})
            throw new Error('Error while generating token');
        }

        return token;
    }



    // eslint-disable-next-line camelcase
    async generateToken(payload: { student_id: number }): Promise<string | Error> {
        try {
            const token = jwt.sign(payload, jwtObject.secret, {
                expiresIn: 172800000,
            });
            return token;
        } catch (e) {
            logger.error('Error generating new token', { error: e });
            throw Error('Error generating new token');
        }
    }
}
