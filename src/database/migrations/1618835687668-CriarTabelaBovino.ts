import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTabelaBovino1618835687668 implements MigrationInterface {
    name = 'CriarTabelaBovino1618835687668'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bovino" ( 
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
                "nome" character varying(20) NOT NULL, 
                "brinco" character varying(8) NOT NULL, 
                "brinco_mae" character varying(8), 
                "brinco_pai" character varying(8), 
                "situacao" character varying(15) NOT NULL, 
                "raca" character varying(15) NOT NULL, 
                "sexo" character varying(1) NOT NULL, 
                "nascimento" date NOT NULL, 
                CONSTRAINT "PK_cc1ac9058b9486da4fdc1074178" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "bovino"`);
    }

}
