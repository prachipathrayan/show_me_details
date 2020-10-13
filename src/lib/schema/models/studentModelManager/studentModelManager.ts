import {IStudent} from "./types";
import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

export interface IStudentModel extends IStudent, Model {}

export class StudentModelManager{
    private static instance: StudentModelManager;
    private Student: ModelCtor<IStudentModel> = {} as ModelCtor<IStudentModel>;
    static getInstance(): StudentModelManager {
        if (!StudentModelManager.instance) {
            StudentModelManager.instance = new StudentModelManager();
        }
        return StudentModelManager.instance;
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

export default StudentModelManager.getInstance().getModel();


