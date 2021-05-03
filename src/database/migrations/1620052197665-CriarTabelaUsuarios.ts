import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTabelaUsuarios1620052197665 implements MigrationInterface {
    name = 'CriarTabelaUsuarios1620052197665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "usuarios" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "name" character varying(64) NOT NULL, 
                "email" character varying(64) NOT NULL, 
                "password" character varying(255) NOT NULL, 
                CONSTRAINT "PK_d7281c63c176e152e4c531594a8" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "usuarios"`);
    }

}
