import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTabelaBovinoFemeas1618838179308 implements MigrationInterface {
    name = 'CriarTabelaBovinoFemeas1618838179308'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bovino_femeas" (
                "id" uuid NOT NULL, 
                "prenhez" date, 
                "ultimo_parto" date, 
                CONSTRAINT "REL_edee80fecce62e339ef77e5b44" UNIQUE ("id"), 
                CONSTRAINT "PK_edee80fecce62e339ef77e5b443" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "bovino_femeas" 
                ADD CONSTRAINT "FK_edee80fecce62e339ef77e5b443" 
                FOREIGN KEY ("id") REFERENCES "bovino"("id") 
                ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bovino_femeas" DROP CONSTRAINT "FK_edee80fecce62e339ef77e5b443"`);
        await queryRunner.query(`DROP TABLE "bovino_femeas"`);
    }

}
