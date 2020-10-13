import { nest } from '../../utils';
import logger from '@shared/Logger';
import {ICourseServices, courseDetails, SignUpCourse} from './types';
import { ModelCtor } from 'sequelize';
import {ICourseModel, CourseModelManager} from "../../lib/schema/models/coursesModelManager/courseModelManager";



export class CourseService implements ICourseServices {

    async getCourses(): Promise<any | Error> {
        let err: Error;
        let res: any;
        const Course: ModelCtor<ICourseModel> = CourseModelManager.getInstance().getModel();
        [err, res] = await nest(Course.findAll());
        if (err) {
            logger.error('Error in fetching data from the file', {Error: err});
            throw new Error('Error in fetching data from the file');
        }
        return res;
    }

    async getListOfCourses(): Promise<any | Error> {
        let err: Error;
        let res: any;
        [err, res] = await nest(this.getCourses());
        if (err) {
            logger.error('Error in getEvents function', {error: err});
            throw new Error('Error in getEvents function');
        }
        const listOfCourses = new Array<courseDetails>();
        res.forEach((item: { id: number; name: string; description: string; availableSlots: number; }) => {
            listOfCourses.push({
                id: item.id,
                name: item.name,
                description: item.description,
                availableSlots: item.availableSlots,
            });
        });
        return listOfCourses;
    }

    async addCourses(
        signUpCourse: SignUpCourse
    ): Promise<boolean | Error> {
        const Course = CourseModelManager.getInstance().getModel();
        const userObject: ICourseModel = Course.build({
            name: signUpCourse.name,
            slug: signUpCourse.slug,
            description: signUpCourse.description,
            availableSlots: signUpCourse.availableSlots,
        });
        const [err, courseData] = await nest(userObject.save());
        if (err) {
            logger.error('Error while registering', {error: err});
            throw new Error('Error while registering');
        }

        return true;
    }

}
