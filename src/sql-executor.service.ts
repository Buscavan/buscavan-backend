import { PrismaClient } from '@prisma/client';
import { promises as fs } from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

export async function adicionarLocal() {
  try {
    // Resolve the path to the JSON file
    const filePathCidade = path.join(__dirname, '../population/cidade.json');
    const filePathEstado = path.join(__dirname, '../population/estados.json');

    // Read the file contents
    const dataCidade = await fs.readFile(filePathCidade, 'utf8');
    const dataEstado = await fs.readFile(filePathEstado, 'utf-8');
    const cidades = JSON.parse(dataCidade);
    const estados = JSON.parse(dataEstado);

    console.log('Iniciando os inserts');

    await prisma.estado.createMany({
      data: estados.map((estado) => ({
        id: estado.id,
        nome: estado.nome,
        uf: estado.uf,
        ibge: estado.ibge,
        ddd: estado.ddd,
      })),
    });

    // Clear the table
    await prisma.cidade.deleteMany({});

    // Insert all locals into the database
    await prisma.cidade.createMany({
      data: cidades.map((cidade) => ({
        id: cidade.id,
        nome: cidade.nome,
        uf: cidade.uf,
        ibge: cidade.ibge,
        lat_lon: cidade.lat_lon,
        cod_tom: cidade.cod_tom,
      })),
    });

    console.log('Locais adicionados com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar locais:', error);
  } finally {
    await prisma.$disconnect();
  }
}
adicionarLocal();
