import { nest } from '../../utils';
import logger from '@shared/Logger';
import {IStudentServices, studentDetails, enrollStudent} from './types';
import { ModelCtor } from 'sequelize';
import {
    IStudentModel,
    StudentModelManager
} from "../../lib/schema/models/studentModelManager/studentModelManager";
import {
    EnrollmentModelManager,
    IEnrollmentModel
} from "../../lib/schema/models/enrollmentModelManager/enrollmentModelManager";



export class StudentService implements IStudentServices {

    async getStudents(): Promise<any | Error> {
        let err: Error;
        let res: any;
        const Student: ModelCtor<IStudentModel> = StudentModelManager.getInstance().getModel();
        [err, res] = await nest(Student.findAll());
        if (err) {
            logger.error('Error in fetching data from the file', {Error: err});
            throw new Error('Error in fetching data from the file');
        }
        return res;
    }

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

    async enrollStudent(
        enrollment: enrollStudent
    ): Promise<enrollStudent | Error> {
        const enrollStudent = EnrollmentModelManager.getInstance().getModel();
        const enrollmentObject: IEnrollmentModel = enrollStudent.build({
            studentId: enrollment.studentId,
            courseId: enrollment.courseId,
        });
        const [err, enrollmentData] = await nest(enrollmentObject.save());
        if (err) {
            logger.error('Error while registering', {error: err});
            throw new Error('Error while registering');
        }

        return enrollmentData;
    }
}
