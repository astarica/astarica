-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NO_CONFIRMATION', 'CONFIRMED', 'ABSENT', 'CONFUSED');

-- CreateTable
CREATE TABLE "Web" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "template" TEXT,

    PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "lastUpdate" TIMESTAMP(3) NOT NULL,
    "webUsername" TEXT,
    "status" "Status" NOT NULL DEFAULT E'NO_CONFIRMATION',

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "webUsername" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invitation" ADD FOREIGN KEY ("webUsername") REFERENCES "Web"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD FOREIGN KEY ("webUsername") REFERENCES "Web"("username") ON DELETE SET NULL ON UPDATE CASCADE;
