import { nest } from '../../utils';
import logger from '@shared/Logger';
import {ICourseServices, courseDetails} from './types';
import { promises as  file } from 'fs';
import * as fs from "fs";
import { writeFile } from 'fs/promises'

export class CourseService implements ICourseServices {

    async getCourses(): Promise<any | Error> {
        let err: Error;
        let res: any;
        // @ts-ignore
        [err, res] = JSON.parse(fs.readFileSync("coursesModelManager.json").data));
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

    async getCourseById(id: number): Promise<any | Error> {
        let err: Error;
        let res: any;
        [err, res] = await nest(this.getCourses());
        if (err) {
            logger.error('Error in getEvents function', {error: err});
            throw new Error('Error in getEvents function');
        }
        let course = new Array<courseDetails>();
        res.forEach((item: { id: number; name: string; description: string; availableSlots: number; }) => {
            if (item.id === id) {
                course.push({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    availableSlots: item.availableSlots,
                });
            }
        });
        if (!course) {
            logger.error('The course with this id does not exist', {error: err});
            throw new Error('The course with this id does not exist');
        } else {
            return course;
        }
    }

    // async addCourse(courseDetails: courseDetails): Promise<any | Error> {
    //     let err: Error;
    //     let res: any;
    //     // @ts-ignore
    //     [err, res] = await nest(this.getCourses());
    //     if (err) {
    //         logger.error('Error in getEvents function', {error: err});
    //         throw new Error('Error in getEvents function');
    //     }
    //
    //     res.push(courseDetails);
    //     let data: any = {
    //         "data": res,
    //     };
    //     [err, data] = await nest(writeFile('./coursesModelManager.json', data));
    //     if (err) {
    //         logger.error('Error in writing data to the file', {error: err});
    //         throw new Error('Error in writing data to the file');
    //     } else {
    //         return true;
    //     }
    // }
}

