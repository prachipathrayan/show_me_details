import { nest } from '../../utils';
import logger from '@shared/Logger';
import {ICourseServices, courseDetails} from './types';
import { promises as  file } from 'fs';
import * as fs from "fs";

export class CourseService implements ICourseServices{

    async getCourses(): Promise<any | Error> {
        let err: Error;
        let res: any;
        // @ts-ignore
        [err, res]= await nest(JSON.parse(fs.readFileSync(`./courses.json`).data));
        if(err){
            logger.error('Error in fetching data from the file',{Error: err});
            throw new Error('Error in fetching data from the file');
        }
        return res;
    }

    async getListOfCourses(): Promise<any | Error>{
        let err: Error;
        let res: any;
        [err, res]= await  nest(this.getCourses());
        if(err){
            logger.error('Error in getEvents function',{error: err});
            throw new Error('Error in getEvents function');
        }
        const listOfCourses = new Array<courseDetails>();
        res.forEach((item: {id : number; name: string; description: string; availableSlots: number;}) => {
                listOfCourses.push({
                    id : item.id,
                    name: item.name,
                    description: item.description,
                    availableSlots: item.availableSlots,
                });
            });
        return listOfCourses;
    }

    async getCourseById(id:number): Promise<any| Error> {
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

    async addCourse(courseDetails : courseDetails): Promise<any| Error> {
        let err : Error;
        // @ts-ignore
        let courseData = new courseDetails(courseDetails.id, courseDetails.name, courseDetails.description, courseDetails.availableSlots);
        [err]= await nest( fs.writeFileSync('./courses.json', courseData))
            console.log("File created!");
        }));
        if(err){
            logger.error('Error in sending data to the file', {error: err});
            throw new Error('The course with this id does not exist');
        }
    }
            obj = JSON.parse(data);
            obj.data.push({
                id: obj.data.length > 0 ? obj.data[obj.data.length - 1].id + 1 : 1,
                name: name,
                description: description,
                enrolledStudents: [],
                availableSlots: availableSlots,
            });
            jsonData = JSON.stringify(obj, null, 2);
            fs.writeFile("json_data/courses.json", jsonData, "utf8", () => {
                res.json({ success: true });
    }


}