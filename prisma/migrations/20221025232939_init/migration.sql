-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'OPERATOR', 'BASIC');

-- CreateEnum
CREATE TYPE "QuoteStatus" AS ENUM ('OPEN', 'WAITING_PAYMENT', 'CLOSED');

-- CreateEnum
CREATE TYPE "TransportMethod" AS ENUM ('CAR', 'BUS', 'PLANE', 'TELETRANSPORT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL,
    "departure_loc" TEXT NOT NULL,
    "destination_loc" TEXT NOT NULL,
    "departure_date" TIMESTAMP(3) NOT NULL,
    "return_date" TIMESTAMP(3) NOT NULL,
    "traveler_qty" INTEGER NOT NULL,
    "transportation" "TransportMethod" NOT NULL,
    "contact_info" TEXT NOT NULL,
    "status" "QuoteStatus" NOT NULL,
    "price" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "quotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
