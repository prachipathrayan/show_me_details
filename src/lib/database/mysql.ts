import { QueryTypes, Sequelize } from 'sequelize';
import {CourseModelManager} from "../schema/models/coursesModelManager/courseModelManager";
import {StudentModelManager} from "../schema/models/studentModelManager/studentModelManager";
import {IDatabase} from "./type";
import { nest } from '../../utils';
import config from '../../config/index';
import logger from "@shared/Logger";



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

    private async registerModels(sequelize: Sequelize): Promise<boolean | Error> {
        CourseModelManager.getInstance().register(sequelize);
        StudentModelManager.getInstance().register(sequelize);
        const [err, isCreated] = await nest(sequelize.sync({ alter: true }));
        if (err && !isCreated) {
            logger.error('Error in registering models', { error: err });
            throw new Error('Error in registering models');
        }
        return true;
    }
}
