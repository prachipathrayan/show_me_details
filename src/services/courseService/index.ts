import { nest } from '../../utils';
import logger from '@shared/Logger';
import {ICourseServices, courseDetails, SignUpCourse} from './types';
import { ModelCtor } from 'sequelize';
import {ICourseModel, CourseModel} from "../../lib/schema/models/course/courseModel";



export class CourseService implements ICourseServices {

    private Course: ModelCtor<ICourseModel> = CourseModel.getInstance().getModel();

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

    async getCourses(): Promise<any | Error> {
        let err: Error;
        let res: any;
        [err, res] = await nest(this.Course.findAll());
        if (err) {
            logger.error('Error in fetching data from the file', {Error: err});
            throw new Error('Error in fetching data from the file');
        }
        return res;
    }

    async addCourses(
        signUpCourse: SignUpCourse
    ): Promise<boolean | Error> {
        const userObject: ICourseModel = this.Course.build({
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
