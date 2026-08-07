-- CreateTable
CREATE TABLE "Estadio" (
    "idestadio" SERIAL NOT NULL,
    "nomestadio" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,

    CONSTRAINT "Estadio_pkey" PRIMARY KEY ("idestadio")
);
