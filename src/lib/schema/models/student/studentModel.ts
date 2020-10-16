import {IStudent} from "./types";
import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

export interface IStudentModel extends IStudent, Model {}

export class StudentModel{
    private static instance: StudentModel;
    private Student: ModelCtor<IStudentModel> = {} as ModelCtor<IStudentModel>;
    static getInstance(): StudentModel {
        if (!StudentModel.instance) {
            StudentModel.instance = new StudentModel();
        }
        return StudentModel.instance;
    }

    register(sequelize: Sequelize): void {
        this.Student = sequelize.define<IStudentModel>(
            'Student',
            {
                id: {
                    primaryKey: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    allowNull: false,
                    unique: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                username: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                passwordHash: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                timestamps: true,
                createdAt: 'createdAt',
                updatedAt: 'updatedAt',
                indexes: [
                    {
                        unique: true,
                        fields: ['username']
                    }
                ]
            }
        );
    }getModel(): ModelCtor<IStudentModel> {
        return this.Student;
    }
}

export default StudentModel.getInstance().getModel();


