import {IEnrollment} from "./types";
import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

export interface IEnrollmentModel extends IEnrollment, Model {}

export class EnrollmentModelManager{
    private static instance: EnrollmentModelManager;
    private Enrollment: ModelCtor<IEnrollmentModel> = {} as ModelCtor<IEnrollmentModel>;
    static getInstance(): EnrollmentModelManager {
        if (!EnrollmentModelManager.instance) {
            EnrollmentModelManager.instance = new EnrollmentModelManager();
        }
        return EnrollmentModelManager.instance;
    }

    register(sequelize: Sequelize): void {
        this.Enrollment = sequelize.define<IEnrollmentModel>(
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
                indexes: [
                    {
                        unique: true,
                        fields: ['studentId', 'courseId']
                    }
                ]
            }
        );
    }getModel(): ModelCtor<IEnrollmentModel> {
        return this.Enrollment;
    }
}

export default EnrollmentModelManager.getInstance().getModel();


