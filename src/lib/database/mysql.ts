import {QueryTypes, Sequelize} from 'sequelize';
import {CourseModelManager} from "../schema/models/coursesModelManager/courseModelManager";
import {StudentModelManager} from "../schema/models/studentModelManager/studentModelManager";
import {IDatabase} from "./type";
import { nest } from '../../utils';
import config from '../../config/index';
import logger from "@shared/Logger";
import {EnrollmentModelManager} from "../schema/models/enrollmentModelManager/enrollmentModelManager";



export class MysqlManager implements IDatabase {
    private static instance: MysqlManager;
    private dbUri: string = config.database.mysql.uri;

    static getInstance(): MysqlManager {
        if (!MysqlManager.instance) {
            MysqlManager.instance = new MysqlManager();
        }
        return MysqlManager.instance;
    }

    connect(): Promise<boolean | Error> {
        return new Promise(async (resolve, reject) => {
            try {
                const tempClient: Sequelize = this.getSequelizeInstance();
                await tempClient.authenticate();
                await this.registerModels(tempClient);
                logger.info('mysql db connected successfully');
                return resolve(true);
            } catch (e) {
                logger.error('Error in connecting to mysql', {error: e});
                return reject(new Error('Error in connecting to mysql'));
            }
        });
    }

    private getSequelizeInstance(): Sequelize {
        return new Sequelize(this.dbUri, {logging: false});
    }

    private async addStudentAssociation(): Promise<boolean | Error>{
        try{
            StudentModelManager.getInstance()
                .getModel()
                .hasMany(EnrollmentModelManager.getInstance().getModel(), {
                    sourceKey: 'id',
                    foreignKey: 'studentId',
                });
            EnrollmentModelManager.getInstance()
                .getModel()
                .belongsTo(StudentModelManager.getInstance().getModel(), {
                    foreignKey: 'studentId',
                });
            return true;
        } catch (err) {
            logger.error('Error while adding association into studentModel', {
                error: err,
            });
            throw new Error('Error while adding association studentModel');
        }
    }


    private async addCourseAssociation(): Promise<boolean | Error>{
        try{
            CourseModelManager.getInstance()
                .getModel()
                .hasMany(EnrollmentModelManager.getInstance().getModel(), {
                    sourceKey: 'id',
                    foreignKey: 'courseId',
                });
            EnrollmentModelManager.getInstance()
                .getModel()
                .belongsTo(CourseModelManager.getInstance().getModel(), {
                    foreignKey: 'courseId',
                });
            return true;
        } catch (err) {
            logger.error('Error while adding association into courseModel', {
                error: err,
            });
            throw new Error('Error while adding association courseModel');
        }
    }



    private async registerModels(sequelize: Sequelize): Promise<boolean | Error> {
        CourseModelManager.getInstance().register(sequelize);
        StudentModelManager.getInstance().register(sequelize);
        EnrollmentModelManager.getInstance().register(sequelize);
        this.addCourseAssociation();
        this.addStudentAssociation();
        const [err, isCreated] = await nest(sequelize.sync({ alter: true }));
        if (err && !isCreated) {
            logger.error('Error in registering models', { error: err });
            throw new Error('Error in registering models');
        }
        return true;
    }
    async executeUpdateQuery(query: string): Promise<boolean | Error> {
        let err: Error;
        let result: any;
        [err, result] = await nest(
            this.getSequelizeInstance().query(query, {
                raw: true,
                type: QueryTypes.UPDATE,
            })
        );
        if (err) {
            logger.error('Error in executing raw query', { error: err, query });
            throw new Error('Error in executing query');
        }
        return true;
    }

    async executeDeleteQuery(query: string): Promise<boolean | Error> {
        let err: Error;
        let result: any;
        [err, result] = await nest(
            this.getSequelizeInstance().query(query, {
                raw: true,
                type: QueryTypes.DELETE,
            })
        );
        if (err) {
            logger.error('Error in executing raw query', { error: err, query });
            throw new Error('Error in executing query');
        }
        return true;
    }
}
