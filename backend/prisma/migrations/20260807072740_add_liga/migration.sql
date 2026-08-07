-- CreateTable
CREATE TABLE "Liga" (
    "id" SERIAL NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Liga_pkey" PRIMARY KEY ("id")
);
