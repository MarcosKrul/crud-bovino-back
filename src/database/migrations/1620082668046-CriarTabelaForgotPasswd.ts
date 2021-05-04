import {MigrationInterface, QueryRunner} from "typeorm";

export class CriarTabelaForgotPasswd1620082668046 implements MigrationInterface {
    name = 'CriarTabelaForgotPasswd1620082668046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "forgot_passwd" (
                "user_id" uuid NOT NULL, 
                "token" character varying(40) NOT NULL, 
                "expiresIn" TIMESTAMP NOT NULL, 
                CONSTRAINT "REL_ea5e344b58dd7112dd8777001f" UNIQUE ("user_id"), 
                CONSTRAINT "PK_ea5e344b58dd7112dd8777001f3" PRIMARY KEY ("user_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "forgot_passwd" 
                ADD CONSTRAINT "FK_ea5e344b58dd7112dd8777001f3" 
                FOREIGN KEY ("user_id") REFERENCES "usuarios"("id") 
                ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forgot_passwd" DROP CONSTRAINT "FK_ea5e344b58dd7112dd8777001f3"`);
        await queryRunner.query(`DROP TABLE "forgot_passwd"`);
    }

}
