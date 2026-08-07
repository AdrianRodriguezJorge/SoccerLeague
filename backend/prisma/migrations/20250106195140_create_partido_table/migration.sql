-- CreateTable
CREATE TABLE "Partido" (
    "idpartido" SERIAL NOT NULL,
    "audiencia" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "fkestadio" INTEGER NOT NULL,
    "local" INTEGER NOT NULL,
    "visitante" INTEGER NOT NULL,
    "goles_local" INTEGER NOT NULL,
    "goles_visitante" INTEGER NOT NULL,

    CONSTRAINT "Partido_pkey" PRIMARY KEY ("idpartido")
);

-- AddForeignKey
ALTER TABLE "Partido" ADD CONSTRAINT "Partido_fkestadio_fkey" FOREIGN KEY ("fkestadio") REFERENCES "Estadio"("idestadio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partido" ADD CONSTRAINT "Partido_local_fkey" FOREIGN KEY ("local") REFERENCES "Equipo"("idequipo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Partido" ADD CONSTRAINT "Partido_visitante_fkey" FOREIGN KEY ("visitante") REFERENCES "Equipo"("idequipo") ON DELETE RESTRICT ON UPDATE CASCADE;
