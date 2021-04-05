import { Service } from "typedi";
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { CurrencyRateProviderSeed } from "./currencyRateProvider.seed";

@Service()
export class SeedCurrencyRateProvider1613922269080 implements MigrationInterface {

    /* eslint-disable no-unused-vars */
    public async up(_: QueryRunner): Promise<void> {
        await getRepository("CurrencyRateProvider").save(CurrencyRateProviderSeed);
    }
    
    /* eslint-disable no-unused-vars */
    public async down(_: QueryRunner): Promise<void> {
        // do nothing
    }
}
