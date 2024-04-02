# OZmap

## API RESTful robusta para gerenciar usuários e localizações.

Este projeto foi construido com **NodeJs, TypeScript, Express.js, MongoDB, Docker, Mocha, Chai, Vitest e Swagger.**

## Índice

- [Instalação API](#instalação-api)
- [API Endpoints](#api-endpoints)
- [Documentação](#documentação)
- [Testes](#testes)
- [Insomnia](#insomnia)
- [Sobre](#sobre)

## Instalação API

1. Clonar o repositório:

```bash
git clone https://github.com/thomasgsquinaia/ozmap-technical-assessment-int_dm.git
```

2. Ir para a branch "thomasquinaia":

```bash
git switch thomasquinaia
```

3. Instalar as dependências: 

```bash
npm install
```

4. Crie um arquivo .env contendo as mesmas variáveis de ambiente presentes no arquivo .env.example, segue o exemplo abaixo:

```markdown
API_PORT=3001
DB_PORT=27017
MONGODB_URI="mongodb+srv://root:root@clusterozmap.q6natw5.mongodb.net/"
GOOGLE_API_KEY="YOUR_API_KEY"
GOOGLE_GEOCODING_REVERSE_API_URL="https://maps.googleapis.com/maps/api/geocode/json?latlng="
GOOGLE_GEOCODING_API_URL="https://maps.googleapis.com/maps/api/geocode/json?address="
DB_NAME="oz-tech-test"
DB_USER="root"
DB_PASS="MongoDB2019!"
```

6. Verifique se tem algum container rodando e rode isso para parar a execução dele: 

```bash
docker-compose down --remove-orphans
```

7. Rode o projeto com o comando: 

```bash
docker-compose up --build
```

8. Aguarde até que os contêineres estejam prontos para uso.


## API Endpoints
A API fornece os seguintes endpoints:

**API USUÁRIOS**
```markdown
GET /users - Lista usuários cadastrados.
GET /users/:id - Lista um usuário específico cadastrado - {id}. 
POST /users - Cria um usuário - {name, email, address, coordinates}.
PUT /users/:id - Atualiza um usuário - {name, email, address, coordinates}.
DELETE /users/:id - Deleta um usuário específico - {id}.
```

**API REGIÕES**
```markdown
GET /regions - Lista regiões cadastradas.
GET /regions/:id - Lista uma região específica cadastrada.
GET /regions/distance - Retonar regiões em um raio de distância a partir das coordenadas informadas e podendo filtrar por um usuário específico - {lat, lng, distance, user}.
GET /regions/:lat/:lng/specific - Retorna a listagem de regiões a uma certa distância de um ponto - {lat, lng}.
POST /regions - Cria uma região - {name, coordinates, user}.
PUT /regions/:id - Atualiza uma região - {name, coordinates, user}.
DELETE /regions/:id - Deleta uma região específica - {id}.
```

## Documentação

### Caso deseje entre nesse link para ver a documentação: 

```markdown
https://ozmap-technical-assessment-int-dm.onrender.com/docs
```

<p align="center">
    <img src="./.github/img/docs-api.png" alt="docs-api" width="1200px">
</p>

## Testes

Rode os testes com esse comando: 

```bash
npm run test:all
```

<p align="center">
    <img src="./.github/img/tests.png" alt="tests" width="1200px">
</p>

## Insomnia

Se você optar por fazer as solicitações usando o Insomnia, pode importar todas as coleções de solicitações a partir do arquivo `insomnia_ozmap.json` localizado na raiz do projeto. 

## Sobre

Linkedin: https://www.linkedin.com/in/thomas-quinaia-82b5221b1/
