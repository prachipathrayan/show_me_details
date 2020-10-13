export interface IStudentServices{
    getListOfStudents(): Promise<any | Error>;
    enrollStudent(enrollment: enrollStudent): Promise<enrollStudent | Error>
    unenrollStudent(enrollment: enrollStudent): Promise<any | Error>
}

export type studentDetails={
    id : number;
    name: string;
    email: string;
}

export type enrollStudent={
    studentId : number;
    courseId : number;
}