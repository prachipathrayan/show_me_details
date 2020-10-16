import {IEnrollment} from "./types";
import {DataTypes, Model, ModelCtor, Sequelize} from "sequelize";

export interface IEnrollmentModel extends IEnrollment, Model {}

export class EnrollmentModel{
    private static instance: EnrollmentModel;
    private Enrollment: ModelCtor<IEnrollmentModel> = {} as ModelCtor<IEnrollmentModel>;
    static getInstance(): EnrollmentModel {
        if (!EnrollmentModel.instance) {
            EnrollmentModel.instance = new EnrollmentModel();
        }
        return EnrollmentModel.instance;
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

export default EnrollmentModel.getInstance().getModel();


