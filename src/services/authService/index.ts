// import { nest } from '../../utils';
// import { comparePassword, passwordHash } from '../../utils/bcrypt';
// import { IUser, LoginRequest, SignUpRequest } from './types';
// import logger from '../../utils/logger';
// import {
//     IUserModel,
//     UserModelManager,
// } from '../../lib/database/schema/models/user';
// import jwt from 'jsonwebtoken';
// import jwtObject from '../../config/jwt.config';
// import { ModelCtor } from 'sequelize';
// import {
//     IOTPModel,
//     OTPModelManager,
// } from '../../lib/database/schema/models/otp';
//
// export class AuthService implements IUser {
//     async logInAndGenerateToken(
//         loginRequest: LoginRequest
//     ): Promise<string | Error> {
//         const User: ModelCtor<IUserModel> = UserModelManager.getInstance().getModel();
//         let err: Error;
//         let userDetails: IUserModel;
//         let isValid: boolean | false;
//         [err, userDetails] = await nest(
//             User.findOne({ where: { email: loginRequest.email } })
//         );
//         if (err) {
//             logger.error('Error finding user', { error: err });
//             throw Error('Error finding user');
//         }
//         [err, isValid] = await nest(
//             comparePassword(userDetails.passwordHash, loginRequest.password)
//         );
//         if (err) {
//             logger.error('Error comparing password', { error: err });
//             throw Error('Error comparing password');
//         }
//         if (!isValid) {
//             logger.error('Invalid credentials');
//             throw new Error('Invalid credentials');
//         }
//         let token: string;
//         try {
//             token = this.generateToken({ user_id: userDetails.id });
//         } catch (e) {
//             throw new Error('Error while generating token');
//         }
//         return token;
//     }
//
//     async signUpAndGenerateToken(
//         signUpRequest: SignUpRequest
//     ): Promise<string | Error> {
//         const User = UserModelManager.getInstance().getModel();
//         const userObject: IUserModel = User.build({
//             username: signUpRequest.username,
//             name: signUpRequest.name,
//             email: signUpRequest.email,
//             passwordHash: await passwordHash(signUpRequest.password),
//         });
//         const [err, userData] = await nest(userObject.save());
//         if (err) {
//             logger.error('Error while registering', { error: err });
//             throw Error('Error while registering');
//         }
//         let token: string;
//         try {
//             token = this.generateToken({ user_id: userData.id });
//         } catch (e) {
//             throw new Error('Error while generating token');
//         }
//         return token;
//     }
//
//     async generateOTP(email: string): Promise<any | Error> {
//         const User: ModelCtor<IUserModel> = UserModelManager.getInstance().getModel();
//         let err: Error;
//         let userDetails: IUserModel;
//         [err, userDetails] = await nest(User.findOne({ where: { email: email } }));
//         if (err || userDetails === undefined) {
//             logger.error('Error while finding user', { error: err });
//             throw new Error('Error while finding user');
//         }
//         const otp: ModelCtor<IOTPModel> = OTPModelManager.getInstance().getModel();
//         [err] = await nest(otp.update({ active: 0 }, { where: { email: email } }));
//         if (err) {
//             logger.error('Error while finding user', { error: err });
//             throw new Error('Error while finding user');
//         }
//         let OTP = Math.floor(Math.random() * 899999 + 100000);
//         let otpDetails: any;
//         let otpObject = otp.build({
//             email: email,
//             OTP: OTP,
//             active: true,
//             retryCount: 0,
//         });
//         [err, otpDetails] = await nest(otpObject.save());
//         if (err) {
//             logger.error('Error while generating new otp', { error: err });
//             throw new Error('Error while generating new otp');
//         }
//         return {
//             isOTPGenerated: true,
//         };
//     }
//
//     async verifyOTP(otp: number, email: string): Promise<any | Error> {
//         let isVerified = false;
//         let err: Error;
//         let token = undefined;
//         const User: ModelCtor<IUserModel> = UserModelManager.getInstance().getModel();
//         let userDetails: IUserModel;
//         [err, userDetails] = await nest(User.findOne({ where: { email: email } }));
//         if (err || userDetails === undefined) {
//             logger.error('Error while finding user', { error: err });
//             throw new Error('Error while finding user');
//         }
//         const otpObject = OTPModelManager.getInstance().getModel();
//         let otpDetails: IOTPModel;
//         [err, otpDetails] = await nest(
//             otpObject.findOne({ where: { email: email, active: 1 } })
//         );
//         if (err || otpDetails === null) {
//             logger.error('Error while finding otp detail', { error: err });
//             throw new Error('Error while finding otp detail');
//         }
//         if (otpDetails.retryCount < 2 && otpDetails.active === true) {
//             if (otpDetails.OTP === otp) {
//                 isVerified = true;
//                 try {
//                     token = this.generateToken({ user_id: userDetails.id });
//                 } catch (e) {
//                     throw new Error('Error while generating token');
//                 }
//                 otpObject.update(
//                     { active: false },
//                     { where: { email: email, active: 1 } }
//                 );
//             } else {
//                 let retryCount: number = otpDetails.retryCount + 1;
//                 otpObject.update(
//                     { retryCount },
//                     { where: { email: email, active: 1 } }
//                 );
//             }
//         } else {
//             otpObject.update(
//                 { active: false },
//                 { where: { email: email, active: 1 } }
//             );
//         }
//         return { isVerified: isVerified, token };
//     }
//
//     async updatePassword(
//         newPassword: string,
//         userId: number
//     ): Promise<boolean | Error> {
//         const User: ModelCtor<IUserModel> = UserModelManager.getInstance().getModel();
//         const [err] = await nest(
//             User.update(
//                 {
//                     passwordHash: await passwordHash(newPassword),
//                 },
//                 { where: { id: userId } }
//             )
//         );
//         if (err) {
//             logger.error('Error while updating password', { error: err });
//             throw new Error('Error while updating password');
//         }
//         return true;
//     }
//
//     // eslint-disable-next-line camelcase
//     generateToken(payload: { user_id: number }): string {
//         try {
//             const token = jwt.sign(payload, jwtObject.secret, {
//                 expiresIn: 172800000,
//             });
//             return token;
//         } catch (e) {
//             logger.error('Error generating new token', { error: e });
//             throw Error('Error generating new token');
//         }
//     }
// }
