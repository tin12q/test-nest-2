import { MigrationInterface, QueryRunner } from "typeorm";

export class Add1700127044093 implements MigrationInterface {
    name = 'Add1700127044093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "c_role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_1874eaee054ae44ed2b8e0af9c4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "c_status" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_39a49b16a8192017b6e30ff01cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "path" character varying NOT NULL, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_to_user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "teamId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_72dfe91f11fec020a6f330ca972" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying, "status" character varying, CONSTRAINT "PK_f57d8293406df4af348402e4b74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "team_to_project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "teamId" uuid NOT NULL, "projectId" uuid NOT NULL, CONSTRAINT "PK_59d995aeaab2b6847f03ddfc497" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_to_task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "taskId" uuid NOT NULL, CONSTRAINT "PK_1ae1f1ccb9b5ae7e142b611a447" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying, "password" character varying, "provider" character varying NOT NULL DEFAULT 'email', "socialId" character varying, "firstName" character varying, "lastName" character varying, "hash" character varying, "deletedAt" TIMESTAMP, "photoId" uuid, "roleId" uuid, "statusId" uuid, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bd2fe7a8e694dedc4ec2f666f" ON "user" ("socialId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58e4dbff0e1a32a9bdc861bb29" ON "user" ("firstName") `);
        await queryRunner.query(`CREATE INDEX "IDX_f0e1b4ecdca13b177e2e3a0613" ON "user" ("lastName") `);
        await queryRunner.query(`CREATE INDEX "IDX_e282acb94d2e3aec10f480e4f6" ON "user" ("hash") `);
        await queryRunner.query(`CREATE TABLE "forgot" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "hash" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_087959f5bb89da4ce3d763eab75" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_df507d27b0fb20cd5f7bef9b9a" ON "forgot" ("hash") `);
        await queryRunner.query(`CREATE TABLE "c_page" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "path" character varying NOT NULL, "name" character varying NOT NULL, "description" character varying, "icon" character varying, "order" integer, CONSTRAINT "PK_eb1d7ae4a0957df99edef6490f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_3d2f174ef04fb312fdebd0ddc5" ON "session" ("userId") `);
        await queryRunner.query(`CREATE TABLE "c_page_roles_c_role" ("cPageId" uuid NOT NULL, "cRoleId" uuid NOT NULL, CONSTRAINT "PK_5473b0dc48ccbd1455b2a441896" PRIMARY KEY ("cPageId", "cRoleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ff3c4da23c450c978ade813ca2" ON "c_page_roles_c_role" ("cPageId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cf6c20183f0785178235709aea" ON "c_page_roles_c_role" ("cRoleId") `);
        await queryRunner.query(`ALTER TABLE "team" ADD "projectId" uuid`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team_to_user" ADD CONSTRAINT "FK_006abba7a1e6044a1c6a7b026bb" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_to_user" ADD CONSTRAINT "FK_720a370dd5449b8a0b711bc3f68" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_to_project" ADD CONSTRAINT "FK_040afde22e6ebf027778baad23a" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team_to_project" ADD CONSTRAINT "FK_1b5f09a1923dfcaa1cc56a01d68" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_2defea9edb26358ff53c172ee28" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_task" ADD CONSTRAINT "FK_f87c1e55344c84117b39ab36c97" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_to_task" ADD CONSTRAINT "FK_06038a96f29a53885399038080a" FOREIGN KEY ("taskId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "c_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_dc18daa696860586ba4667a9d31" FOREIGN KEY ("statusId") REFERENCES "c_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forgot" ADD CONSTRAINT "FK_31f3c80de0525250f31e23a9b83" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "c_page_roles_c_role" ADD CONSTRAINT "FK_ff3c4da23c450c978ade813ca24" FOREIGN KEY ("cPageId") REFERENCES "c_page"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "c_page_roles_c_role" ADD CONSTRAINT "FK_cf6c20183f0785178235709aeae" FOREIGN KEY ("cRoleId") REFERENCES "c_role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "c_page_roles_c_role" DROP CONSTRAINT "FK_cf6c20183f0785178235709aeae"`);
        await queryRunner.query(`ALTER TABLE "c_page_roles_c_role" DROP CONSTRAINT "FK_ff3c4da23c450c978ade813ca24"`);
        await queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`);
        await queryRunner.query(`ALTER TABLE "forgot" DROP CONSTRAINT "FK_31f3c80de0525250f31e23a9b83"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_dc18daa696860586ba4667a9d31"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_75e2be4ce11d447ef43be0e374f"`);
        await queryRunner.query(`ALTER TABLE "user_to_task" DROP CONSTRAINT "FK_06038a96f29a53885399038080a"`);
        await queryRunner.query(`ALTER TABLE "user_to_task" DROP CONSTRAINT "FK_f87c1e55344c84117b39ab36c97"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_2defea9edb26358ff53c172ee28"`);
        await queryRunner.query(`ALTER TABLE "team_to_project" DROP CONSTRAINT "FK_1b5f09a1923dfcaa1cc56a01d68"`);
        await queryRunner.query(`ALTER TABLE "team_to_project" DROP CONSTRAINT "FK_040afde22e6ebf027778baad23a"`);
        await queryRunner.query(`ALTER TABLE "team_to_user" DROP CONSTRAINT "FK_720a370dd5449b8a0b711bc3f68"`);
        await queryRunner.query(`ALTER TABLE "team_to_user" DROP CONSTRAINT "FK_006abba7a1e6044a1c6a7b026bb"`);
        await queryRunner.query(`ALTER TABLE "team" ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "projectId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cf6c20183f0785178235709aea"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff3c4da23c450c978ade813ca2"`);
        await queryRunner.query(`DROP TABLE "c_page_roles_c_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3d2f174ef04fb312fdebd0ddc5"`);
        await queryRunner.query(`DROP TABLE "session"`);
        await queryRunner.query(`DROP TABLE "c_page"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_df507d27b0fb20cd5f7bef9b9a"`);
        await queryRunner.query(`DROP TABLE "forgot"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e282acb94d2e3aec10f480e4f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f0e1b4ecdca13b177e2e3a0613"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_58e4dbff0e1a32a9bdc861bb29"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bd2fe7a8e694dedc4ec2f666f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_to_task"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "team_to_project"`);
        await queryRunner.query(`DROP TABLE "team"`);
        await queryRunner.query(`DROP TABLE "team_to_user"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "c_status"`);
        await queryRunner.query(`DROP TABLE "c_role"`);
    }

}
