-- CreateTable
CREATE TABLE "Travel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "kapasitas" INTEGER NOT NULL,
    "carTravelId" INTEGER NOT NULL,

    CONSTRAINT "Travel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Travel_carTravelId_idx" ON "Travel"("carTravelId");

-- AddForeignKey
ALTER TABLE "Travel" ADD CONSTRAINT "Travel_carTravelId_fkey" FOREIGN KEY ("carTravelId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
