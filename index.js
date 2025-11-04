// index.js
import os from 'os';
import http from 'http';
import chalk from 'chalk';
import axios from 'axios';
import readline from 'readline/promises';

// === Parte 1: informações básicas ===
console.log(`Bem-vindo ao mundo do Node.js, Marcos Vinícius Silva!`);
console.log(`Sistema Operacional: ${os.type()}`);
console.log(`Memória Total: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`Tempo de atividade: ${(os.uptime() / 3600).toFixed(2)} horas`);

// === Parte 2: mensagens com chalk ===
console.log(chalk.green('✅ Sucesso: Tudo funcionando!'));
console.log(chalk.red('❌ Erro: Exemplo de erro (apenas demonstração).'));
console.log(chalk.blue('ℹ️ Informação: Servidor será iniciado...'));

// === Parte 3: servidor http básico ===
const PORT = 3000;
const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  if (req.url === '/') {
    res.end('Servidor ativo com Node.js!');
    return;
  }

  if (req.url === '/hora') {
    res.end(`Hora atual: ${new Date().toLocaleTimeString()}`);
    return;
  }

  // rota padrão
  res.statusCode = 404;
  res.end('Rota não encontrada.');
});

server.listen(PORT, () => {
  console.log(chalk.green(`🚀 Servidor rodando em http://localhost:${PORT}`));
});

// === Parte 3: funções Axios ===
async function fetchRandomDog() {
  try {
    const r = await axios.get('https://dog.ceo/api/breeds/image/random');
    console.log(chalk.magenta('\n🐶 Imagem aleatória de cachorro:'), r.data.message);
  } catch (err) {
    console.log(chalk.red('Erro ao buscar dog API'));
  }
}

async function getPokemon(nome) {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`);
    const p = response.data;
    console.log(chalk.yellow(`\n🔎 Pokémon: ${p.name}`));
    console.log(`Peso: ${p.weight}`);
    console.log(`Altura: ${p.height}`);
    console.log(`Quantidade de habilidades: ${p.abilities.length}`);
    return p;
  } catch (err) {
    console.log(chalk.red('Pokémon não encontrado. Verifique o nome e tente novamente.'));
    return null;
  }
}

// chamada exemplo (parte 3)
await fetchRandomDog();
await getPokemon('charmander');

// === Parte 5: mini Pokédex via CLI pedindo 3 pokémons ===
async function miniPokedex() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    console.log(chalk.cyan('\nMini Pokédex — digite 3 nomes de Pokémon (um por vez):'));
    const pokemons = [];
    for (let i = 0; i < 3; i++) {
      const nome = await rl.question(`Nome ${i + 1}: `);
      if (nome.trim() === '') { i--; continue; }
      const p = await getPokemon(nome.trim());
      if (p) pokemons.push({ nome: p.name, tipos: p.types.map(t => t.type.name) });
    }
    console.log(chalk.green('\nResultado Mini Pokédex:'));
    pokemons.forEach((p) => console.log(JSON.stringify(p)));
  } finally {
    rl.close();
  }
}

// === Parte 5: Chuck Norris joke ===
async function chuckNorris() {
  try {
    const r = await axios.get('https://api.chucknorris.io/jokes/random');
    console.log(chalk.gray('\n😂 Chuck Norris joke:'), r.data.value);
  } catch {
    console.log(chalk.red('Erro ao buscar piada Chuck Norris.'));
  }
}

// roda extras (comente se não quiser a interação)
await miniPokedex();
await chuckNorris();

console.log(chalk.green('\nTodas as tarefas executadas.'));
