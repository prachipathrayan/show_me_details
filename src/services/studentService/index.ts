import { nest } from '../../utils';
import logger from '@shared/Logger';
import {IStudentServices, studentDetails, enrollStudent} from './types';
import { ModelCtor } from 'sequelize';
import {
    IStudentModel,
    StudentModel
} from "../../lib/schema/models/student/studentModel";
import {
    EnrollmentModel,
    IEnrollmentModel
} from "../../lib/schema/models/enrollment/enrollmentModel";
import {MysqlManager} from "../../lib/database/mysql";
import {IDatabase} from "../../lib/database/type";




export class StudentService implements IStudentServices {



    async getListOfStudents(): Promise<any | Error> {
        let err: Error;
        let res: any;
        [err, res] = await nest(this.getStudents());
        if (err) {
            logger.error('Error in getEvents function', {error: err});
            throw new Error('Error in getEvents function');
        }
        const listOfStudents = new Array<studentDetails>();
        res.forEach((item: { id: number; name: string; email: string}) => {
            listOfStudents.push({
                id: item.id,
                name: item.name,
                email: item.email,
            });
        });
        return listOfStudents;
    }


    private async getStudents(): Promise<any | Error> {
        let err: Error;
        let res: any;
        const student: ModelCtor<IStudentModel> = StudentModel.getInstance().getModel();
        [err, res] = await nest(student.findAll());
        if (err) {
            logger.error('Error in fetching data from the file', {Error: err});
            throw new Error('Error in fetching data from the file');
        }
        return res;
    }



    private databaseManager: IDatabase = MysqlManager.getInstance();

    async enrollStudent(
        enrollment: enrollStudent
    ): Promise<enrollStudent | Error> {
        const enrollStudent = EnrollmentModel.getInstance().getModel();
        const enrollmentObject: IEnrollmentModel = enrollStudent.build({
            studentId: enrollment.studentId,
            courseId: enrollment.courseId,
        });

        const [err, enrollmentData] = await nest(enrollmentObject.save());
        if (err) {
            logger.error('Error while registering', {error: err});
            throw new Error('Error while registering');
        }
        let query =`UPDATE Courses SET availableSlots = availableSlots - 1 WHERE id=${enrollment.courseId}`;
        let error: Error;
        let isUpdated: boolean;
        [error, isUpdated]= await nest(this.databaseManager.executeUpdateQuery(query));
        if(error){
            logger.error('Error while updating the data', {error: err});
            throw  new Error('Error while updating the data');
        }
        return enrollmentData;
    }
    async unenrollStudent(
        enrollment: enrollStudent
    ): Promise<boolean | Error> {
        let err: Error;
        let isDeleted: boolean;
        let query1 =`DELETE FROM Enrollments WHERE courseId=${enrollment.courseId} AND studentId=${enrollment.studentId}`;
        [err, isDeleted]= await nest(this.databaseManager.executeDeleteQuery(query1));
        if(err){
            logger.error('Error while deleting the data', {error: err});
            throw  new Error('Error while deleting the data');
        }
        let query =`UPDATE Courses SET availableSlots = availableSlots + 1 WHERE id=${enrollment.courseId}`;
        let error: Error;
        let isUpdated: boolean;
        [error, isUpdated]= await nest(this.databaseManager.executeUpdateQuery(query));
        if(error){
            logger.error('Error while updating the data', {error: err});
            throw  new Error('Error while updating the data');
        }
        return isDeleted;
    }

}
