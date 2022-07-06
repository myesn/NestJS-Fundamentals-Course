import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaSync1657098736196 implements MigrationInterface {
    name = 'SchemaSync1657098736196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "description"`);
    }

}
