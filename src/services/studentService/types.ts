export interface IStudentServices{
    getListOfStudents(): Promise<any | Error>;
    //addCourse(courseDetails : courseDetails): Promise<any| Error>;
}

export type studentDetails={
    id : number;
    name: string;
}