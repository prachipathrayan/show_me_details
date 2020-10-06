import {ICourse} from "./types";
import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

export interface ICourseModel extends ICourse, Model {}

export class CourseModelManager{
    private static instance: CourseModelManager;
    private Course: ModelCtor<ICourseModel> = {} as ModelCtor<ICourseModel>;
    static getInstance(): CourseModelManager {
        if (!CourseModelManager.instance) {
            CourseModelManager.instance = new CourseModelManager();
        }
        return CourseModelManager.instance;
    }

    register(sequelize: Sequelize): void {
        this.Course = sequelize.define<ICourseModel>(
            'Course',
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
                description: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                availableSlots: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
            },
            {
                timestamps: true,
                createdAt: 'createdAt',
                updatedAt: 'updatedAt',
                indexes: [{ unique: true }],
            }
        );
    }getModel(): ModelCtor<ICourseModel> {
        return this.Course;
    }
}

export default CourseModelManager.getInstance().getModel();


