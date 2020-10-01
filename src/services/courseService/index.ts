import { nest } from '../../utils';
import logger from '@shared/Logger';
import {ICourseServices, courseDetails} from './types';

export class CourseService implements ICourseServices{


    async getCourses() : Promise<courseDetails , Error >{
        let err: Error;
        let courses: courseDetails;
        [err, courses]= await nest()
    }

}