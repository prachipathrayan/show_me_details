export interface ICourseServices{
    getListOfCourses(): Promise<any | Error>;
    //getCourseById(id:number): Promise<any| Error>;
    //addCourse(courseDetails : courseDetails): Promise<any| Error>;
    addCourses(signUpCourse: SignUpCourse): Promise<boolean | Error>
}

export type SignUpCourse = {
    slug: string;
    name: string;
    description: string;
    availableSlots: number;
};

export type courseDetails ={
    id: number;
    name: string;
    description : string;
    availableSlots : number;
}