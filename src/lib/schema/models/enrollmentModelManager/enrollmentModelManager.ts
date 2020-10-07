import {IEnrollment} from "./types";
import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

export interface ICourseModel extends IEnrollment, Model {}

export class EnrollmentModelManager{
    private static instance: EnrollmentModelManager;
    private Enrollment: ModelCtor<ICourseModel> = {} as ModelCtor<ICourseModel>;
    static getInstance(): EnrollmentModelManager {
        if (!EnrollmentModelManager.instance) {
            EnrollmentModelManager.instance = new EnrollmentModelManager();
        }
        return EnrollmentModelManager.instance;
    }

    register(sequelize: Sequelize): void {
        this.Enrollment = sequelize.define<ICourseModel>(
            'Enrollment',
            {
                id: {
                    primaryKey: true,
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    allowNull: false,
                    unique: true,
                },
            },
            {
                timestamps: true,
                createdAt: 'createdAt',
                updatedAt: 'updatedAt',
            }
        );
    }getModel(): ModelCtor<ICourseModel> {
        return this.Enrollment;
    }
}

export default EnrollmentModelManager.getInstance().getModel();


