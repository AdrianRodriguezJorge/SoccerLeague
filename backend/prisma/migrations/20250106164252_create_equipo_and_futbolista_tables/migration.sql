-- CreateTable
CREATE TABLE "Equipo" (
    "idequipo" SERIAL NOT NULL,
    "nomequipo" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "camparticip" INTEGER NOT NULL,
    "campganados" INTEGER NOT NULL,
    "mascota" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "puntos" INTEGER NOT NULL,

    CONSTRAINT "Equipo_pkey" PRIMARY KEY ("idequipo")
);

-- CreateTable
CREATE TABLE "Futbolista" (
    "idfutbolista" SERIAL NOT NULL,
    "idequipo" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "añosenequipo" INTEGER NOT NULL,
    "tipo" TEXT NOT NULL,

    CONSTRAINT "Futbolista_pkey" PRIMARY KEY ("idfutbolista")
);

-- AddForeignKey
ALTER TABLE "Futbolista" ADD CONSTRAINT "Futbolista_idequipo_fkey" FOREIGN KEY ("idequipo") REFERENCES "Equipo"("idequipo") ON DELETE RESTRICT ON UPDATE CASCADE;
