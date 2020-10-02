export interface ICourseServices{
    getListOfCourses(): Promise<any | Error>;
    getCourseById(id:number): Promise<any| Error>;
    //addCourse(courseDetails : courseDetails): Promise<any| Error>;
}

export type courseDetails ={
    id: number;
    name: string;
    description : string;
    availableSlots : number;
}