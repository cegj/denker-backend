<div align="center">
  <img src="https://camo.githubusercontent.com/faec9d89bd2c7d47b91d988dcd0f27011c27e8191d45836cfa36bf2b3c2a92bd/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4e6f64652e6a7326636f6c6f723d333339393333266c6f676f3d4e6f64652e6a73266c6f676f436f6c6f723d464646464646266c6162656c3d" alt="Node JS" />
  <img src="https://camo.githubusercontent.com/0a95585d6b3a07028298a45d60b85a1331358bc336549d64dbbc27977f1495f3/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4578707265737326636f6c6f723d303030303030266c6f676f3d45787072657373266c6f676f436f6c6f723d464646464646266c6162656c3d" alt="Express" />
  <img src="https://camo.githubusercontent.com/539a184961e9ab46a914b3a57718cd52f9a122ffb33a0bcaaa92484add20ba72/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4d7953514c26636f6c6f723d343437394131266c6f676f3d4d7953514c266c6f676f436f6c6f723d464646464646266c6162656c3d" alt="MySQL" />
  <img src="https://camo.githubusercontent.com/9c2f1381d03b23626b66eb3372afe109aa0be6b50d1695c9ca939289290e39a7/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4a534f4e26636f6c6f723d303030303030266c6f676f3d4a534f4e266c6f676f436f6c6f723d464646464646266c6162656c3d" alt="JSON" />
  <img src="https://camo.githubusercontent.com/0d7baa31f8240f8594bbcf5df27410c0986455d8c46222f05099a62fa957c31b/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4a534f4e2b5765622b546f6b656e7326636f6c6f723d303030303030266c6f676f3d4a534f4e2b5765622b546f6b656e73266c6f676f436f6c6f723d464646464646266c6162656c3d" alt="JSON WEB TOKEN" />
</div>

<div align="center">
  <img src="https://imgur.com/YoRT8Cw.jpg" alt="Denker" />
</div>

# Denker (frontend)

Criado por [mim](https://github.com/cegj), com **Node JS**, para fins de aprendizado.

Este é o repositório do backend do projeto [Denker](https://github.com/cegj/denker-frontend/blob/main/README.md), desenvolvido com **NODE JS** com **Express**. A interação é realizada por meio de **requisições HTTP** nos diversos verbos (get, post, delete, patch) e as respostas são devolvidas em **JSON**. A autenticação (nos endpoints que exigem) é feita via **Json Web Token**. 

O projeto está estruturado seguindo a arquitetura **MVC**, e as queries **SQL** dos *models* para interação com o banco de dados foram escritas por mim, assim como toda a lógica dos *controllers* e todos os demais códigos.

## Stack

- NodeJS + Express;
- Json Web Token;
- MySQL.

Frontend desenvolvido em React: [veja o repositório aqui](https://github.com/cegj/denker-frontend).

## Recursos

1. Endpoints para obter (GET) dados de publicações, usuários, seguidores e curtidas via HTTP request;
2. Endpoints para criar (POST) usuários, publicações, seguidores e curtidas via HTTP request;
3. Endpoints para editar (PATCH) usuários e publicações via HTTP request;
4. Endpoints para apagar (DELETE) usuários, publicações, seguidores e curtidas via HTTP request;
5. Alguns endpoints com autenticação via Json Web Token;
6. Interação com banco de dados MySQL com queries escritas por mim.

## Exemplo de respostas

Endpoint GET para obter postagens de um determinado usuário: 
```
{
    "message": "Denkes recuperados com sucesso",
    "user": {
        "id": 1,
        "name": "Anamara da Silva",
        "username": "anamara",
        "email": "anamara@anamara.com",
        "image": "166138215181949.jpg",
        "createdAt": "2022-08-25T02:02:32.000Z",
        "updatedAt": "2022-08-26T20:31:00.000Z"
    },
    "denkes": [
        {
            "id": 45,
            "content": "Amei a mesinha de centro",
            "image": "NULL",
            "createdAt": "2022-08-25T18:42:33.000Z",
            "updatedAt": "2022-08-25T18:42:33.000Z",
            "denke_id": 44,
            "user_id": 1,
            "user_name": "Anamara da Silva",
            "user_username": "anamara",
            "user_email": "anamara@anamara.com",
            "user_image": "166138215181949.jpg"
        },
        {
            "id": 30,
            "content": "OMG como minha vida está difícil nessas férias hahah",
            "image": "1661441107565351.jpg",
            "createdAt": "2022-08-25T18:25:07.000Z",
            "updatedAt": "2022-08-25T18:25:07.000Z",
            "denke_id": 16,
            "user_id": 1,
            "user_name": "Anamara da Silva",
            "user_username": "anamara",
            "user_email": "anamara@anamara.com",
            "user_image": "166138215181949.jpg"
        }
    ]
}
```

Endpoint GET para buscar usuários (procura termos no nome, nome de usuário e e-mail):
```
{
    "result": [
        {
            "id": 1,
            "name": "Anamara da Silva",
            "username": "anamara",
            "email": "anamara@anamara.com",
            "image": "166138215181949.jpg",
            "createdAt": "2022-08-25T02:02:32.000Z",
            "updatedAt": "2022-08-26T20:31:00.000Z"
        },
        {
            "id": 6,
            "name": "Fernando Ulgari",
            "username": "o_fernando",
            "email": "fernando@fernando.com",
            "image": "1661382859990796.jpg",
            "createdAt": "2022-08-25T02:14:20.000Z",
            "updatedAt": "2022-08-25T02:14:20.000Z"
        }
    ]
}
```

Endpoint POST para curtir uma postagem de um usuário:
```
{
    "message": "Denke curtido com sucesso",
    "denke": [
        {
            "id": 10,
            "content": "Vish! Complicado heim... algum plano B por aí?",
            "image": "NULL",
            "createdAt": "2022-08-25T18:01:00.000Z",
            "updatedAt": "2022-08-25T18:01:00.000Z",
            "denke_id": 9,
            "user_id": 2,
            "user_name": "Bertoldo Yste",
            "user_username": "byste",
            "user_email": "bertoldo@bertoldo.com",
            "user_image": "1661382215560210.jpg"
        }
    ]
}
```

Endpoint DELETE para deixar de seguir um usuário:
```
{
    "message": "Você deixou de seguir o usuário @romao_iasmin",
    "unfollowedUser": {
        "id": 9,
        "name": "Iasmin Romão",
        "username": "romao_iasmin",
        "email": "iasmin@iasmin.com",
        "image": "1661383273488358.jpg",
        "createdAt": "2022-08-25T02:21:13.000Z",
        "updatedAt": "2022-08-25T02:21:13.000Z"
    }
}
```

## Imagens e links para navegação (do frontend)

<div align="center">
<img src="https://imgur.com/Czc0OTb.png" alt="Tela inicial / Home screen">
<p>Tela inicial / Home screen<br/>
<a target="_blank" href="https://denker.herokuapp.com/">Clique aqui para navegar nessa página</a>
</p>

<img src="https://imgur.com/VwZs27P.png" alt="Linha do tempo / Timeline">
<p>Linha do tempo / Timeline<br/>
<a target="_blank" href="https://denker.herokuapp.com/user/timeline">Clique aqui para navegar nessa página</a><br/>
<i>A navegação nessa página requer login, você pode criar uma conta para experimentar</i>
</p>

<img src="https://imgur.com/4x9NdzA.png" alt="Página de post / Post page">
<p>Página de post / Post page <br/>
<a target="_blank" href="https://denker.herokuapp.com/denke/24">Clique aqui para navegar nessa página</a>
</p>

<img src="https://imgur.com/fXGrctf.png" alt="Outra página de post / Another post page">
<p>Outra página de post / Another post page<br/>
<a target="_blank" href="https://denker.herokuapp.com/denke/45">Clique aqui para navegar nessa página</a>
</p>

<img src="https://imgur.com/30RY0Js.png" alt="Página de usuário / User page">
<p>Página de usuário / User page<br/>
<a target="_blank" href="https://denker.herokuapp.com/denke/45">Clique aqui para navegar nessa página</a>
</p>

<img src="https://imgur.com/HLDCdTM.png" alt="Seguidores do usuário / User followers">
<p>Seguidores do usuário / User followers<br/>
<a target="_blank" href="https://denker.herokuapp.com/user/3/followers">Clique aqui para navegar nessa página</a>
</p>

<img src="https://imgur.com/y9n3LbO.png" alt="Busca de usuários / User search">
<p>Busca de usuários / User search<br/>
<a target="_blank" href="https://denker.herokuapp.com/user/search">Clique aqui para navegar nessa página</a>
</p>

</div>