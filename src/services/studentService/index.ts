import { nest } from '../../utils';
import logger from '@shared/Logger';
import {IStudentServices, studentDetails} from './types';
import { promises as  file } from 'fs';
import * as fs from "fs";

export class StudentService implements IStudentServices {

    async getStudents(): Promise<any | Error> {
        let err: Error;
        let res: any;
        // @ts-ignore
        [err, res] = await nest(JSON.parse(fs.readFileSync(`./students.json`).data));
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
        const listOfCourses = new Array<studentDetails>();
        res.forEach((item: { id: number; name: string; description: string; availableSlots: number; }) => {
            listOfCourses.push({
                id: item.id,
                name: item.name,
            });
        });
        return listOfCourses;
    }
}
