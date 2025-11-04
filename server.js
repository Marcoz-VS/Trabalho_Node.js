// server.js
import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3001;

app.get('/pokemon/:nome', async (req, res) => {
  const nome = req.params.nome;
  try {
    const r = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nome.toLowerCase()}`);
    const p = r.data;
    res.json({
      nome: p.name,
      tipos: p.types.map(t => t.type.name),
      peso: p.weight,
      altura: p.height
    });
  } catch {
    res.status(404).json({ erro: 'Pokémon não encontrado' });
  }
});

app.get('/piada', async (req, res) => {
  try {
    const r = await axios.get('https://api.chucknorris.io/jokes/random');
    res.json({ piada: r.data.value });
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar piada' });
  }
});

app.listen(PORT, () => {
  console.log(`Express rodando: http://localhost:${PORT}`);
});
