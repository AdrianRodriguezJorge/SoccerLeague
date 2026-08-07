import { PrismaClient, Rol } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando la siembra (seed) de la base de datos...');

  // Limpiar base de datos
  await prisma.futbolista.deleteMany({});
  await prisma.partido.deleteMany({});
  await prisma.equipo.deleteMany({});
  await prisma.estadio.deleteMany({});
  await prisma.usuario.deleteMany({});

  // Crear usuarios de prueba con contraseñas cifradas
  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('admin123', salt);
  const gestorPassword = await bcrypt.hash('gestor123', salt);

  console.log('Creando usuarios...');
  const admin = await prisma.usuario.create({
    data: {
      nombre: 'admin',
      email: 'admin@soccer.com',
      password: adminPassword,
      rol: Rol.ADMINISTRADOR,
    },
  });

  const gestor = await prisma.usuario.create({
    data: {
      nombre: 'gestor',
      email: 'gestor@soccer.com',
      password: gestorPassword,
      rol: Rol.GESTOR,
    },
  });

  console.log('Creando estadios...');
  const bernabeu = await prisma.estadio.create({
    data: { nomestadio: 'Santiago Bernabéu', capacidad: 81044 },
  });
  const campnou = await prisma.estadio.create({
    data: { nomestadio: 'Camp Nou', capacidad: 99354 },
  });
  const metropolitano = await prisma.estadio.create({
    data: { nomestadio: 'Cívitas Metropolitano', capacidad: 68456 },
  });

  console.log('Creando equipos...');
  const realMadrid = await prisma.equipo.create({
    data: {
      nomequipo: 'Real Madrid',
      provincia: 'Madrid',
      camparticip: 90,
      campganados: 35,
      mascota: 'Real',
      color: 'Blanco',
      puntos: 3,
    },
  });

  const barcelona = await prisma.equipo.create({
    data: {
      nomequipo: 'FC Barcelona',
      provincia: 'Cataluña',
      camparticip: 90,
      campganados: 27,
      mascota: 'L’Avi Barça',
      color: 'Azulgrana',
      puntos: 1,
    },
  });

  const atletico = await prisma.equipo.create({
    data: {
      nomequipo: 'Atlético de Madrid',
      provincia: 'Madrid',
      camparticip: 80,
      campganados: 11,
      mascota: 'Indi',
      color: 'Rojiblanco',
      puntos: 1,
    },
  });

  console.log('Creando futbolistas...');
  await prisma.futbolista.createMany({
    data: [
      { idequipo: realMadrid.idequipo, nombre: 'Kylian Mbappé', numero: 9, añosenequipo: 1, tipo: 'Delantero' },
      { idequipo: realMadrid.idequipo, nombre: 'Jude Bellingham', numero: 5, añosenequipo: 2, tipo: 'Mediocampista' },
      { idequipo: barcelona.idequipo, nombre: 'Robert Lewandowski', numero: 9, añosenequipo: 3, tipo: 'Delantero' },
      { idequipo: barcelona.idequipo, nombre: 'Lamine Yamal', numero: 19, añosenequipo: 2, tipo: 'Delantero' },
      { idequipo: atletico.idequipo, nombre: 'Antoine Griezmann', numero: 7, añosenequipo: 8, tipo: 'Delantero' },
    ],
  });

  console.log('Creando partidos...');
  await prisma.partido.createMany({
    data: [
      {
        audiencia: 80000,
        fecha: new Date('2026-08-01T20:00:00Z'),
        fkestadio: bernabeu.idestadio,
        local: realMadrid.idequipo,
        visitante: barcelona.idequipo,
        goles_local: 3,
        goles_visitante: 2,
      },
      {
        audiencia: 65000,
        fecha: new Date('2026-08-05T20:00:00Z'),
        fkestadio: campnou.idestadio,
        local: barcelona.idequipo,
        visitante: atletico.idequipo,
        goles_local: 1,
        goles_visitante: 1,
      },
    ],
  });

  console.log('Siembra de base de datos finalizada con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
