import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "feature_image_id" integer;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_feature_image_id_media_id_fk" FOREIGN KEY ("feature_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "site_settings_feature_image_idx" ON "site_settings" USING btree ("feature_image_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP CONSTRAINT "site_settings_feature_image_id_media_id_fk";
  
  DROP INDEX "site_settings_feature_image_idx";
  ALTER TABLE "site_settings" DROP COLUMN "feature_image_id";`)
}
