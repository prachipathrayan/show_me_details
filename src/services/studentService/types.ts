export interface IStudentServices{
    getListOfStudents(): Promise<any | Error>;
    //addStudent(studentDetails: studentDetails): Promise<any | Error>;
}

export type studentDetails={
    id : number;
    name: string;
    email: string;
    passwordHash: string;
}