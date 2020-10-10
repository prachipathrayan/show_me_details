export interface IStudentServices{
    getListOfStudents(): Promise<any | Error>;
    enrollStudent(enrollment: enrollStudent): Promise<enrollStudent | Error>
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