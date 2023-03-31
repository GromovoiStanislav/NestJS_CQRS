import {TypeOrmOptionsFactory, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {

    constructor(private configService: ConfigService) {
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {

        // return {
        //   type: 'mysql',
        //   host: process.env.TYPEORM_HOST,
        //   port: Number(process.env.TYPEORM_PORT),
        //   username: process.env.TYPEORM_USERNAME,
        //   password: process.env.TYPEORM_PASSWORD,
        //   database: process.env.TYPEORM_DATABASE,
        //   //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        //   synchronize: true,
        //   autoLoadEntities:true,
        //   //logging: ["query", "error"],
        // };

        return {
            type: 'mysql',
            host: this.configService.get<string>("TYPEORM_HOST"),
            port: this.configService.get<number>("TYPEORM_PORT"),
            username: this.configService.get<string>("TYPEORM_USERNAME"),
            password: this.configService.get<string>("TYPEORM_PASSWORD"),
            database: this.configService.get<string>("TYPEORM_DATABASE"),
            //entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            synchronize: true,
            autoLoadEntities: true,
            //logging: ["query", "error"],
        };

    }
}