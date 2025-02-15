/*
  Warnings:

  - You are about to drop the column `adminResponse` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `adminResponse`,
    ADD COLUMN `admin_response` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `avatarUrl`,
    ADD COLUMN `avatar_public_id` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `avatar_url` VARCHAR(191) NOT NULL DEFAULT 'https://avatar.iran.liara.run/public/boy?username=Ash';
