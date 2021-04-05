import { Service } from "typedi";
import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { CurrencyRateProviderPairSeed } from "./currencyRateProviderPair.seed";

@Service()

export class SeedCurrencyRateProviderPair1613924012272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await getRepository("CurrencyRateProviderPair").save(CurrencyRateProviderPairSeed);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // do nothing
    }

}
