import { Service } from "typedi";
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { usd2rubSeed, eur2rubSeed } from "./currencyRate.seed";

@Service()
export class CurrencyRate1620469644411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository("CurrencyRate").save(usd2rubSeed);
        await getRepository("CurrencyRate").save(eur2rubSeed);
    }

    public async down(_queryRunner: QueryRunner): Promise<void> {
        // do nothing
    }

}
