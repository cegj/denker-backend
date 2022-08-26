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

Criado por [mim](https://github.com/cegj), com **React**, para fins de aprendizado.

Denker é uma rede social para compartilhar seus pensamentos e acompanhar os pensamentos dos seus amigos.

💡 Denker significa "pensador" em alemão. Na rede social, denker é um usuário, e denkes são seus posts.

Este é o repositório do backend, desenvolvido com NODE JS + Express + Json Web Token. A consulta à API é realizada por meio de requisições HTTP nos diversos verbos (get, post, delete, patch) e as respostas são devolvidas em JSON. A autenticação (nos endpoints que exigem) é feita via Json Web Token.

## Stack

- NodeJS + Express;
- Json Web Token.

Frontend desenvolvido em React: [veja o repositório aqui](https://github.com/cegj/denker-frontend).

## Recursos

1. Endpoints para obter (GET) dados de publicações, usuários, seguidores e curtidas via HTTP request;
2. Endpoints para criar (POST) usuários, publicações, seguidores e curtidas via HTTP request;
3. Endpoints para editar (PATCH) usuários e publicações via HTTP request;
4. Endpoints para apagar (DELETE) usuários, publicações, seguidores e curtidas via HTTP request;
5. Endpoints de acesso livre e endpoints que exigem autenticação via Json Web Token.

## Imagens e links para navegação

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