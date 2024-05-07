const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const port = 3001;

const FilmesPath = path.join(__dirname, 'Filmes.json');
const FilmesData = fs.readFileSync(FilmesPath, 'utf-8');
const Filmes = JSON.parse(FilmesData);

function buscarFilmePorNome(nome) {
    return Filmes.find(Filme => Filme.nome.toLowerCase() === nome.toLowerCase());
}

app.get('/buscar-Filme/:nome', (req, res) => {
    const nomeDoFilmeBuscado = req.params.nome;
    const FilmeEncontrado = buscarFilmePorNome(nomeDoFilmeBuscado);

    if (FilmeEncontrado) {
        const templatePath = path.join(__dirname, 'dadosFilme.html');
        const templateData = fs.readFileSync(templatePath, 'utf-8');
        const html = templateData
            .replace('{{nome}}', FilmeEncontrado.nome)
            .replace('{{desc}}', FilmeEncontrado.desc)
            .replace('{{url_info}}', FilmeEncontrado.url_info);
        res.send(html)
        } else {
        res.send('<h1>Filme não encontrado.</h1>')
    }
});

app.listen(port, () => {
    console.log(`Servido iniciado em http://localhost:${port}`);
});