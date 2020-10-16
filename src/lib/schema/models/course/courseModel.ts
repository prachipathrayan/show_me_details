import {ICourse} from "./types";
import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

export interface ICourseModel extends ICourse, Model {}

export class CourseModel{
    private static instance: CourseModel;
    private Course: ModelCtor<ICourseModel> = {} as ModelCtor<ICourseModel>;
    static getInstance(): CourseModel {
        if (!CourseModel.instance) {
            CourseModel.instance = new CourseModel();
        }
        return CourseModel.instance;
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
                slug: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    set() {
                        const slug: string = this.name.toLowerCase().split(' ').join('_');
                        this.setDataValue('slug', slug);
                    },
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                availableSlots: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
            },
            {
                timestamps: true,
                createdAt: 'createdAt',
                updatedAt: 'updatedAt',
                indexes: [{ unique: true, fields: ['slug'] }],
            }
        );
    }getModel(): ModelCtor<ICourseModel> {
        return this.Course;
    }
}

export default CourseModel.getInstance().getModel();


