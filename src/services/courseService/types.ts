export interface ICourseServices{
    getCourses() : Promise<courseDetails , Error >
}

export type courseDetails ={
    id: number;
    name: string;
    description : string;
    availableSlots : number;
}