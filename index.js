import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const port = 3004;
const host = "0.0.0.0";
var listaequipes = [];
var listajogadores = [];

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.static('imagens'));

app.use(session({
        secret: "Ch4v3s3cr3t4",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            secure: false
        }
}));

app.use(cookieParser());

app.get("/", (requisicao, resposta)=>{
    resposta.send(`
                    <html lang="pt-br">
                        <head>
                            <meta charset="UTF-8">
                            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">                            
                            <title>Login do Sistema</title>
                            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                            <style>
                            body {
                                background: linear-gradient(to bottom right,rgb(0, 0, 0), #042f31);
                                color: #ffffff;
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            }

                            .card {
                                background-color: #0e3a3b;
                                border: none;
                                border-radius: 16px;
                                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                                transition: transform 0.3s ease;

                                 display: flex;
                                flex-direction: column;
                                justify-content: center;

                               
                                height: 450px;
                                padding: 0 20px;
                                max-width: 450px; 
                                margin: 0 auto;   /
                            }

                            .card:hover {
                                transform: translateY(-5px);
                            }

                            .login-title {
                                font-size: 2rem;
                                font-weight: bold;
                                text-align: center;
                                color: #81fcff;
                                margin-bottom: 10px;
                            }

                            .division .line {
                                height: 2px;
                                background-color: #81fcff;
                                width: 60%;
                                margin: 0 auto 20px;
                                border-radius: 4px;
                            }

                            .label-custom {
                                color: #81fcff;
                                font-weight: 600;
                            }

                            .form-control {
                                background-color: #052d2f;
                                border: 1px solid #81fcff;
                                border-radius: 10px;
                                color: white;
                            }

                            .form-control::placeholder {
                                color: #a9cfcf;
                            }

                            .form-check-label {
                                color: #ccc;
                            }

                            .bn {
                                text-align: right;
                                color: #81fcff;
                                font-size: 0.9rem;
                                cursor: pointer;
                                margin-top: 8px;
                                transition: color 0.2s;
                            }

                            .bn:hover {
                                color: #ffffff;
                            }

                            .btn-primary {
                                background-color: #81fcff;
                                border: none;
                                color: #094043;
                                font-weight: bold;
                                border-radius: 12px;
                                padding: 10px 20px;
                                transition: background-color 0.3s ease;
                            }

                            .btn-primary:hover {
                                background-color: #62e6e9;
                            }
                             </style>

                        </head>
                        <body>
                            <div class="container">
                                <div class="row d-flex justify-content-center mt-5">
                                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                                        <div class="card py-3 px-2">
                                            <p class="login-title">Login</p>
                                            <div class="division">
                                                <div class="line"></div>
                                            </div>
                                            <form class="login" id="login" action="/Login" method="post">
                                                <div class="form-group mb-3">
                                                    <label for="usuario" class="label-custom">Usuário</label>
                                                    <input type="text"  id="usuario" name="usuario" class="form-control" placeholder="Usuário">
                                                </div>
                                                <div class="form-group">
                                                    <label for="senha" class="label-custom">Senha</label>
                                                    <input type="password"  id="senha" name="senha" class="form-control" placeholder="Senha">
                                                </div>
                                                <div class="row mt-4">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group form-check">
                                                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                                            <label class="form-check-label" for="exampleCheck1">Permaneça Conectado</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12 bn">Esqueci a senha</div>
                                                </div>
                                                <div class="form-group mt-3 text-center"">
                                                    <button type="submit" class="btn btn-block btn-primary btn-lg"><small><i class="far fa-user pr-2"></i>Entrar</small></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </body> 
                                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
                    </html>       
        `);
 });   

app.post("/Login", (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if(usuario == "admin" && senha == "123")
    {
        requisicao.session.logado = true;
        const dataHorasAtuais = new Date();
        resposta.cookie('ultimoLogin',dataHorasAtuais.toLocaleString(), { maxAge: 1000 * 60 * 60 * 24 * 30});
        resposta.redirect("/menu");
    }
    else 
    {
      resposta.send(`
                    <html lang="pt-br">
                        <head>
                            <meta charset="UTF-8">
                            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">                            
                            <title>Login do Sistema</title>
                            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                            <style>
                            body {
                                background: linear-gradient(to bottom right,rgb(0, 0, 0), #042f31);
                                color: #ffffff;
                                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            }

                            .card {
                                background-color: #0e3a3b;
                                border: none;
                                border-radius: 16px;
                                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
                                transition: transform 0.3s ease;

                                 display: flex;
                                flex-direction: column;
                                justify-content: center;

                               
                                height: 450px;
                                padding: 0 20px;
                                max-width: 450px; 
                                margin: 0 auto;   /
                            }

                            .card:hover {
                                transform: translateY(-5px);
                            }

                            .login-title {
                                font-size: 2rem;
                                font-weight: bold;
                                text-align: center;
                                color: #81fcff;
                                margin-bottom: 10px;
                            }

                            .division .line {
                                height: 2px;
                                background-color: #81fcff;
                                width: 60%;
                                margin: 0 auto 20px;
                                border-radius: 4px;
                            }

                            .label-custom {
                                color: #81fcff;
                                font-weight: 600;
                            }

                            .form-control {
                                background-color: #052d2f;
                                border: 1px solid #81fcff;
                                border-radius: 10px;
                                color: white;
                            }

                            .form-control::placeholder {
                                color: #a9cfcf;
                            }

                            .form-check-label {
                                color: #ccc;
                            }

                            .bn {
                                text-align: right;
                                color: #81fcff;
                                font-size: 0.9rem;
                                cursor: pointer;
                                margin-top: 8px;
                                transition: color 0.2s;
                            }

                            .bn:hover {
                                color: #ffffff;
                            }

                            .btn-primary {
                                background-color: #81fcff;
                                border: none;
                                color: #094043;
                                font-weight: bold;
                                border-radius: 12px;
                                padding: 10px 20px;
                                transition: background-color 0.3s ease;
                            }

                            .btn-primary:hover {
                                background-color: #62e6e9;
                            }
                                    span[style*="color: red;"] {
                                        display: block;
                                        margin-top: 10px;
                                        text-align: center;
                                        color: #ff4d4d !important;
                                    }
                                    .is-invalid {
                                        border: 2px solid #ff1a1a !important;
                                        box-shadow: 0 0 6px rgba(255, 0, 0, 0.4);
                                        background-color: #1a1a1a;
                                        color: #fff;
                                    }
                                    .invalid-feedback {
                                        color: #ff4d4d;
                                    }              
                            </style>

                        </head>
                        <body>
                            <div class="container">
                                <div class="row d-flex justify-content-center mt-5">
                                    <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                                        <div class="card py-3 px-2">
                                            <p class="login-title">Login</p>
                                            <div class="division">
                                                <div class="line"></div>
                                            </div>
                                            <form class="login" id="login" action="/Login" method="post">
                                                <div class="form-group">
                                                    <label for="usuario" class="label-custom">Usuário</label>
                                            <input type="text"  id="usuario" name="usuario" class="form-control is-invalid" placeholder="Usuário">
                                            <div class="invalid-feedback">Usuário inválido</div>
                                                </div>
                                                <div class="form-group">
                                                    <label for="senha" class="label-custom">Senha</label>
                                                <input type="password"  id="senha" name="senha" class="form-control is-invalid" placeholder="Senha">
                                                <div class="invalid-feedback">Senha inválida</div>
                                                </div>
                                                <span style="color: red;">Usuário ou Senha Inválidos</span>
                                                <div class="row">
                                                    <div class="col-md-6 col-12">
                                                        <div class="form-group form-check">
                                                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                                            <label class="form-check-label" for="exampleCheck1">Permaneça Conectado</label>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-6 col-12 bn">Esqueci a senha</div>
                                                </div>
                                                <div class="form-group mt-3 text-center"">
                                                    <button type="submit" class="btn btn-block btn-primary btn-lg"><small><i class="far fa-user pr-2"></i>Entrar</small></button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </body> 
                                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
                    </html>       
        `);
    }
});

app.get("/menu", verificarAutenticacao, (requisicao, resposta) => {
    const ultimoLogin = requisicao.cookies.ultimoLogin;
    resposta.send(`

        <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                        <title>Página Inicial</title>
                            <style>
                        
                                    .navbar {
                                        background-color:rgb(0, 0, 0) !important;
                                        border-bottom: 2px solid #81fcff;
                                        padding: 0.8rem 1.5rem;
                                    }

                                    .navbar-brand {
                                        color: #81fcff !important;
                                        font-weight: bold;
                                        font-size: 1.4rem;
                                        transition: color 0.3s;
                                    }

                                    .navbar-brand:hover {
                                        color: #ffffff !important;
                                    }

                                    .nav-link {
                                        color: #ffffff !important;
                                        font-weight: 500;
                                        margin-right: 15px;
                                        transition: color 0.3s;
                                    }

                                    .nav-link:hover {
                                        color: #81fcff !important;
                                    }

                                    .dropdown-menu {
                                        background-color: #052d2f;
                                        border: 1px solid #81fcff;
                                        border-radius: 8px;
                                    }

                                    .dropdown-item {
                                        color: #ffffff;
                                        transition: background-color 0.2s, color 0.2s;
                                    }

                                    .dropdown-item:hover {
                                        background-color: #094043;
                                        color: #81fcff;
                                    }

                                    .navbar-toggler {
                                        border: none;
                                        background-color: #81fcff;
                                        border-radius: 5px;
                                    }

                                    .navbar-toggler-icon {
                                        background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(9, 64, 67, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
                                    }

                                    .navbar-nav .nav-item span {
                                        color: #81fcff;
                                        margin-right: 20px;
                                        font-size: 0.9rem;
                                        display: flex;
                                        align-items: center;
                                    }

                                    body
                                    {
                                        background: linear-gradient(to bottom right,rgb(0, 0, 0), #042f31);
                                    }

                                    @media (max-width: 768px) {
                                        .navbar-nav .nav-item span {
                                            margin: 10px 0;
                                        }
                                    }

                                    .titulo-principal h1 {
                                        font-family: 'Verdana', 'Segoe UI', sans-serif;
                                        color: #81fcff;
                                        font-size: 3.5rem;
                                        font-weight: bold;
                                        text-transform: uppercase;
                                        letter-spacing: 2px;
                                        text-shadow: 2px 2px 10px rgba(129, 252, 255, 0.3);
                                        margin-top: 40px;
                                    }
                            </style>

                    </head>
                        <body>
                            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                                <div class="container-fluid">
                                    <a class="navbar-brand" href="#">MENU</a>
                                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                            <span class="navbar-toggler-icon"></span>
                                        </button>
                                    <div class="collapse navbar-collapse" id="navbarNav">
                                            <ul class="navbar-nav">
                                                <li class="nav-item dropdown">
                                                    <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Opções
                                                    </a>
                                                    <ul class="dropdown-menu">
                                                        <li><a class="dropdown-item" href="/cadastroequipes">Cadastro de Equipes</a></li>
                                                        <li><a class="dropdown-item" href="/cadastrojogadores">Cadastro de Jogadores</a></li>
                                                        <li><a class="dropdown-item" href="/listaequipes">Equipes Cadastradas</a></li>
                                                        <li><a class="dropdown-item" href="/listajogadores">Jogadores Cadastrados</a></li>
                                                    </ul>
     
                                                </li>
                                            </ul>

                                            <ul class="navbar-nav ms-auto">
                                                    <li class="nav-item">
                                                        <span style="color: white;">${ultimoLogin?"Ultimo Acesso: "+ultimoLogin:""}</span>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" href="/Logout">Sair</a>
                                                    </li>
                                            </ul>
                                    </div>
                                    
                                </div>
                            </nav>
                                        <div class="text-center titulo-principal mt-5">
                                            <h1>CAMPEONATO DE VOLEYBALL 2025</h1>
                                        </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
                </html>
                `)
            resposta.end();
});

app.get("/cadastroequipes", verificarAutenticacao, (requisicao, resposta) =>{

    resposta.send(` 
                <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                        <title>Página Inicial</title>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                            <style>
                            body {
                                background: linear-gradient(to bottom right,rgb(0, 0, 0), #042f31);
                                font-family: 'Segoe UI', sans-serif;
                                color: #ffffff;
                                margin: 0;
                                padding: 20px 0;
                            }

                            h2 {
                                color: #81fcff;
                                text-align: center;
                                font-weight: bold;
                                margin-bottom: 30px;
                            }

                            .container {
                                max-width: 900px;
                                background-color: #002b2b;
                                border-radius: 15px;
                                padding: 30px 25px;
                                box-shadow: 0 0 20px rgba(129, 252, 255, 0.3);
                                border: 1px solid #81fcff;
                            }

                            label {
                                color: #81fcff;
                                font-weight: 500;
                            }

                            .form-control {
                                background-color: transparent;
                                border: 1px solid #81fcff;
                                color: #ffffff;
                                border-radius: 8px;
                                padding: 8px 12px;
                                transition: 0.3s;
                            }

                            .form-control::placeholder {
                                color: #b0dcdc;
                            }

                            .form-control:focus {
                                outline: none;
                                box-shadow: 0 0 5px #81fcff;
                                border-color: #81fcff;
                            }

                            .btn {
                                width: 100%;
                                padding: 10px;
                                border-radius: 8px;
                                font-weight: bold;
                                transition: 0.3s ease;
                                margin-bottom: 10px;
                            }

                            .btn-primary {
                                background-color: #81fcff;
                                color: #002b2b;
                                border: none;
                            }

                            .btn-primary:hover {
                                background-color: #5ee7ea;
                                color: #001f1f;
                            }

                            .btn-secondary {
                                background-color: transparent;
                                border: 1px solid #81fcff;
                                color: #81fcff;
                            }

                            .btn-secondary:hover {
                                background-color: #81fcff;
                                color: #001f1f;
                            }

                            
                            .table-responsive {
                                margin-top: 30px;
                            }

                            .custom-table {
                                width: 100%;
                                border-collapse: collapse;
                                border-radius: 12px;
                                overflow: hidden;
                                background-color: #002b2b;
                                box-shadow: 0 0 10px rgba(129, 252, 255, 0.2);
                            }

                            .custom-table th,
                            .custom-table td {
                                padding: 12px 16px;
                                border: 1px solid #81fcff33;
                                color: #ffffff;
                                text-align: left;
                            }

                            .custom-table thead {
                                background-color: #094043;
                            }

                            .custom-table th {
                                color: #81fcff;
                                font-weight: 600;
                            }

                            .custom-table tbody tr:nth-child(even) {
                                background-color: #073737;
                            }

                            .custom-table tbody tr:hover {
                                background-color: #0b5050;
                            }
                            </style>
                        
                    </head>
                        <body>
                            <div class="container w-85 mb-10" >
                                    <div class="Legenda w-20 mb-5 mt-5">
                                        <h2>Cadastro de Equipes</h2>
                                    </div>
                                    <form method="POST" action="/cadastroequipes" class="row g-1 border p-2">                                       
                                        <div class="form-row row">
                                            <div class="form-group col-md-8 mb-1">
                                                <label for="inputequipe" class="mb-1">Nome da Equipe</label>
                                                <input type="text" class="form-control" id="nomeequipe" name="nomeequipe" placeholder="Nome da Equipe">
                                            </div>
                                        </div>

                                        <div class="form-row row">
                                            <div class="form-group col-md-8 mb-1">
                                                <label for="inputtecnico" class="mb-1">Nome do Técnico</label>
                                                <input type="text" class="form-control" id="nometecnico" name="nometecnico" placeholder="Nome do Técnico">
                                            </div>
                                        </div>

                                        <div class="form-group col-md-6 mb-1">
                                            <label for="inputTelefone" class="mb-1">Telefone</label>
                                            <input type="tel" class="form-control" id="inputTelefone" name="telefone" placeholder="(00) 00000-0000">
                                        </div>

                                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                                        <a class="btn btn-secondary" href="/menu">Voltar</a>
                                    </form>
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
                </html>
        `);
        resposta.end();
});

app.post("/cadastroequipes", verificarAutenticacao, (requisicao, resposta) => {

    const nomeequipe = requisicao.body.nomeequipe
    const nometecnico = requisicao.body.nometecnico
    const telefone = requisicao.body.telefone

        if(nomeequipe && nometecnico && telefone)
    {    
        listaequipes.push({
            nomeequipe,
            nometecnico,
            telefone,
        });
        resposta.redirect("/listaequipes");
    }
    else
    {
    
        let conteudo = `
                <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                        <title>Página Inicial</title>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                            <style>
                                body {
                                    background: linear-gradient(to bottom right,rgb(0, 0, 0), #042f31);
                                    font-family: 'Segoe UI', sans-serif;
                                    color: #ffffff;
                                    margin: 0;
                                    padding: 20px 0;
                                }

                                h2 {
                                    color: #81fcff;
                                    text-align: center;
                                    font-weight: bold;
                                    margin-bottom: 30px;
                                }

                                .container {
                                    max-width: 900px;
                                    background-color: #002b2b;
                                    border-radius: 15px;
                                    padding: 30px 25px;
                                    box-shadow: 0 0 20px rgba(129, 252, 255, 0.3);
                                    border: 1px solid #81fcff;
                                }

                                label {
                                    color: #81fcff;
                                    font-weight: 500;
                                }

                                .form-control {
                                    background-color: transparent;
                                    border: 1px solid #81fcff;
                                    color: #ffffff;
                                    border-radius: 8px;
                                    padding: 8px 12px;
                                    transition: 0.3s;
                                }

                                .form-control::placeholder {
                                    color: #b0dcdc;
                                }

                                .form-control:focus {
                                    outline: none;
                                    box-shadow: 0 0 5px #81fcff;
                                    border-color: #81fcff;
                                }

                                .btn {
                                    width: 100%;
                                    padding: 10px;
                                    border-radius: 8px;
                                    font-weight: bold;
                                    transition: 0.3s ease;
                                    margin-bottom: 10px;
                                }

                                .btn-primary {
                                    background-color: #81fcff;
                                    color: #002b2b;
                                    border: none;
                                }

                                .btn-primary:hover {
                                    background-color: #5ee7ea;
                                    color: #001f1f;
                                }

                                .btn-secondary {
                                    background-color: transparent;
                                    border: 1px solid #81fcff;
                                    color: #81fcff;
                                }

                                .btn-secondary:hover {
                                    background-color: #81fcff;
                                    color: #001f1f;
                                }

                                /* TABELA */
                                .table-responsive {
                                    margin-top: 30px;
                                }

                                .custom-table {
                                    width: 100%;
                                    border-collapse: collapse;
                                    border-radius: 12px;
                                    overflow: hidden;
                                    background-color: #002b2b;
                                    box-shadow: 0 0 10px rgba(129, 252, 255, 0.2);
                                }

                                .custom-table th,
                                .custom-table td {
                                    padding: 12px 16px;
                                    border: 1px solid #81fcff33;
                                    color: #ffffff;
                                    text-align: left;
                                }

                                .custom-table thead {
                                    background-color: #094043;
                                }

                                .custom-table th {
                                    color: #81fcff;
                                    font-weight: 600;
                                }

                                .custom-table tbody tr:nth-child(even) {
                                    background-color: #073737;
                                }

                                .custom-table tbody tr:hover {
                                    background-color: #0b5050;
                                }
                            </style>
                    </head>
                        <body>
                            <div class="container w-95 mb-10" >
                                    <div class="Legenda w-20 mb-5 mt-5">
                                        <h2>Cadastro de Equipes</h2>
                                    </div>
                                    <form method="POST" action="/cadastroequipes" class="row g-3 border p-2">
                                        <div class="form-row row">
                                            <div class="form-group col-md-8"> `;
                   
                                                if (!nomeequipe) {
                                                conteudo = conteudo + `
                                                <label for="inputequipe" class="mb-1">Nome da Equipe</label>
                                                <input type="text" class="form-control is-invalid" id="nomeequipe" name="nomeequipe" value="${nomeequipe || ''}" placeholder="Nome da Equipe">
                                                    <span class="text-danger">Insira o nome da equipe</span>
                                                `;
                                                } else {
                                                conteudo = conteudo + `
                                                <label for="inputequipe" class="mb-1">Nome da Equipe</label>
                                                <input type="text" class="form-control" id="nomeequipe" name="nomeequipe" value="${nomeequipe}" placeholder="Nome da Equipe">
                                                `;
                                                }
                                        conteudo = conteudo + `</div>

                                            <div class="form-group col-md-8"> `;
                                                if (!nometecnico) {
                                                conteudo = conteudo + `
                                                <label for="inputtecnico" class="mb-1">Nome do Técnico</label>
                                                <input type="text" class="form-control is-invalid" id="nometecnico" name="nometecnico" value="${nometecnico || ''}" placeholder="Nome do Técnico">
                                                    <span class="text-danger">Insira o nome do tecnico</span>
                                                `;
                                                } else {
                                                conteudo = conteudo + `
                                                <label for="inputtecnico" class="mb-1">Nome do Técnico</label>
                                                <input type="text" class="form-control" id="nometecnico" name="nometecnico" value="${nometecnico}" placeholder="Nome do Técnico">
                                                `;
                                                }
                                        conteudo = conteudo + `</div>

                                        <div class="form-group">`;
                                            if (!telefone) {
                                            conteudo = conteudo + `
                                                <label for="telefone">Telefone</label>
                                                <input type="tel"  class="form-control is-invalid" id="telefone" name="telefone" value="${telefone || ''}" placeholder="(00) 00000-0000">
                                                <span class="text-danger">Insira o telefone</span>
                                            `;
                                            } else {
                                            conteudo = conteudo + `
                                                <label for="telefone">Telefone</label>
                                                <input type="tel" class="form-control" id="telefone" name="telefone" value="${telefone}" placeholder="(00) 00000-0000">
                                            `;
                                            }
                                        conteudo = conteudo + `</div>
                                        <button class="btn btn-primary" type="submit">Cadastrar</button>
                                        <a class="btn btn-secondary" href="/menu">Voltar</a>
                                    </form>
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
                </html>
        `;
        resposta.send(conteudo);
        resposta.end();
    }
});


app.get("/listaequipes",verificarAutenticacao, (requisicao, resposta) => {
    let conteudo=`
            <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                        <title>Página Inicial</title>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                        <style>
                        
                            .Legenda2 h2 {
                            color: #81fcff;
                            text-align: center;
                            font-weight: 700;
                            margin-bottom: 24px;
                            }

                            
                            .custom-table {
                            width: 100%;
                            border-collapse: collapse;
                            border: 1px solid #81fcff33;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                            background-color: #042f31;
                            color: #e0f7fa;
                            font-size: 15px;
                            }

                            
                            .custom-table thead {
                            background-color: #094043;
                            }

                            .custom-table thead th {
                            padding: 12px;
                            color: #81fcff;
                            text-align: left;
                            border-bottom: 2px solid #81fcff55;
                            }

                            
                            .custom-table tbody tr {
                            transition: background-color 0.2s ease-in-out;
                            }

                            .custom-table tbody td {
                            padding: 10px 14px;
                            border-bottom: 1px solid #0d5b5d;
                            }

                            
                            .custom-table tbody tr:hover {
                            background-color: #0f4d4f;
                            }

                            
                            .btn-secondary {
                            margin-top: 20px;
                            padding: 10px 16px;
                            font-weight: bold;
                            border-radius: 8px;
                            background-color: transparent;
                            border: 1px solid #81fcff;
                            color: #81fcff;
                            transition: 0.2s ease;
                            }

                            .btn-secondary:hover {
                            background-color: #81fcff;
                            color: #094043;
                            text-decoration: none;
                            }

                            body {
                            background: linear-gradient(to bottom right,rgb(0, 0, 0), #042f31);
                            margin: 0;
                            font-family: 'Segoe UI', sans-serif;
                            }

                            
                            .table-responsive {
                            overflow-x: auto;
                            margin-bottom: 20px;
                        </style>
                    </head>
                        <body>
                            <div class="container w-95 mb-10" >
                                    <div class="Legenda2 w-20 mb-5 mt-5">
                                        <h2>Equipes Cadastradas</h2>
                                    </div>

                                    <div class="table-responsive">
                                        <table class="custom-table">
                                            <thead>

                                                <tr>
                                                    <th scope="col">Equipe</th>
                                                    <th scope="col">Técnico</th>
                                                    <th scope="col">Telefone</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;
                                                for(let i=0; i < listaequipes.length; i++)
                                                {
                                                    conteudo = conteudo + `
                                                    </tr>
                                                        <td>${listaequipes[i].nomeequipe}</td>
                                                        <td>${listaequipes[i].nometecnico}</td>
                                                        <td>${listaequipes[i].telefone}</td>
                                                    </tr>
                                                    `;
                                                }
                conteudo=conteudo + `    </tbody>
                                        </table>
                                     </div>
                                <a class="btn btn-secondary" href="/cadastroequipes">Continuar Cadastrando</a>
                                <a class="btn btn-secondary" href="/menu">Voltar</a>
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`
    resposta.send(conteudo);
    resposta.end();
});


app.get("/cadastrojogadores", verificarAutenticacao, (requisicao, resposta) =>{
    let opcoesEquipes = ""
    for (let i = 0; i < listaequipes.length; i++) {
        opcoesEquipes += `<option value="${listaequipes[i].nomeequipe}">${listaequipes[i].nomeequipe}</option>`;
    }
    resposta.send(` 
                <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                        <title>Página Inicial</title>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                            <style>
                                body {
                                        background: linear-gradient(to bottom right, rgb(0, 0, 0), #042f31);
                                        font-family: 'Segoe UI', sans-serif;
                                        color: #ffffff;
                                        margin: 0;
                                        padding: 20px 0;
                                    }

                                    h2 {
                                        color: #81fcff;
                                        text-align: center;
                                        font-weight: bold;
                                        margin-bottom: 30px;
                                    }

                                    .container {
                                        max-width: 900px;
                                        background-color: #002b2b;
                                        border-radius: 15px;
                                        padding: 30px 25px;
                                        box-shadow: 0 0 20px rgba(129, 252, 255, 0.3);
                                        border: 1px solid #81fcff;
                                    }

                                    label {
                                        color: #81fcff;
                                        font-weight: 500;
                                    }

                                    .form-control {
                                        background-color: transparent;
                                        color: #ffffff;
                                        border-radius: 8px;
                                        padding: 8px 12px;
                                        transition: 0.3s;
                                        border: 1px solid #81fcff;
                                    }

                                    .form-control::placeholder {
                                        color: rgb(255, 255, 255);
                                    }

                                    .form-control:focus {
                                        outline: none;
                                        box-shadow: 0 0 5px #81fcff;
                                        border-color: #81fcff;
                                    }

                                    .form-control.is-invalid {
                                        border-color: #dc3545 !important;
                                    }

                                    .form-control.is-valid {
                                        border-color: #28a745 !important;
                                    }

                                    .invalid-feedback {
                                        color: #dc3545;
                                        font-size: 0.875em;
                                    }

                                    select.form-control {
                                        background-color: transparent;
                                        color: #ffffff;
                                    }

                                    .btn {
                                        width: 100%;
                                        padding: 10px;
                                        border-radius: 8px;
                                        font-weight: bold;
                                        transition: 0.3s ease;
                                        margin-bottom: 10px;
                                    }

                                    .btn-primary {
                                        background-color: #81fcff;
                                        color: #002b2b;
                                        border: none;
                                    }

                                    .btn-primary:hover {
                                        background-color: #5ee7ea;
                                        color: #001f1f;
                                    }

                                    .btn-secondary {
                                        background-color: transparent;
                                        border: 1px solid #81fcff;
                                        color: #81fcff;
                                    }

                                    .btn-secondary:hover {
                                        background-color: #81fcff;
                                        color: #001f1f;
                                    }
                            </style>
                        
                    </head>
                    <body>
                        <div class="container w-85 mb-10">
                            <div class="Legenda w-20 mb-5 mt-5">
                                <h2>Cadastro de Jogador</h2>
                            </div>

                            <form method="POST" action="/cadastrojogadores" class="row g-1 border p-2">

                                <div class="form-row row">
                                    <div class="form-group col-md-8 mb-1">
                                        <label for="nomejogador" class="mb-1">Nome do Jogador</label>
                                        <input type="text" class="form-control" id="nomejogador" name="nomejogador"  placeholder="Nome completo">
                                    </div>
                                </div>

                                <div class="form-row row">
                                    <div class="form-group col-md-4 mb-1">
                                        <label for="numero" class="mb-1">Número da Camisa</label>
                                        <input type="number" class="form-control" id="numero" name="numero" placeholder="Ex: 10" min="1">
                                    </div>

                                    <div class="form-group col-md-4 mb-1">
                                        <label for="datanascimento" class="mb-1">Data de Nascimento</label>
                                        <input type="date" class="form-control" id="datanascimento" name="datanascimento" >
                                    </div>
                                </div>

                                <div class="form-row row">
                                    <div class="form-group col-md-4 mb-1">
                                        <label for="altura" class="mb-1">Altura (cm)</label>
                                        <input type="number" class="form-control" id="altura" name="altura"  placeholder="Ex: 180" min="100">
                                    </div>

                                    <div class="form-group col-md-4 mb-1">
                                        <label for="genero" class="mb-1">Gênero</label>
                                        <select class="form-control" id="genero" name="genero" >
                                            <option value="" disabled selected>Selecione</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Feminino">Feminino</option>
                                            <option value="Outro">Outro</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-row row">
                                    <div class="form-group col-md-6 mb-1">
                                        <label for="posicao" class="mb-1">Posição</label>
                                        <input type="text" class="form-control" id="posicao" name="posicao"  placeholder="Ex: Ponteiro, Central, etc.">
                                    </div>
                                </div>


                                <div class="form-group col-md-4 mb-1">
                                    <label for="equipe" class="mb-1">Equipe</label>
                                    <select class="form-control" id="equipe" name="equipe" >
                                        <option value="" disabled selected>Selecione uma equipe</option>
                                        ${opcoesEquipes}
                                    </select>
                                </div>
                                        
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/menu">Voltar</a>
                            </form>
                        </div>
                    </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
                </html>
        `);
        resposta.end();
});
    app.post("/cadastrojogadores", verificarAutenticacao, (requisicao, resposta) => {
        const nomejogador = requisicao.body.nomejogador;
        const numero = requisicao.body.numero;
        const datanascimento = requisicao.body.datanascimento;
        const altura = requisicao.body.altura;
        const genero = requisicao.body.genero;
        const posicao = requisicao.body.posicao;
        const equipe = requisicao.body.equipe;

        if (nomejogador && numero && datanascimento && altura && genero && posicao && equipe) {

            const jogadoresDaEquipe = listajogadores.filter(j => j.equipe === equipe);
            if (jogadoresDaEquipe.length >= 6) {
                    let opcoesEquipes = ""
                    for (let i = 0; i < listaequipes.length; i++) {
                        opcoesEquipes += `<option value="${listaequipes[i].nomeequipe}">${listaequipes[i].nomeequipe}</option>`;
                    }
                return resposta.send(`
                                    <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                        <title>Página Inicial</title>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                            <style>
                                body {
                                        background: linear-gradient(to bottom right, rgb(0, 0, 0), #042f31);
                                        font-family: 'Segoe UI', sans-serif;
                                        color: #ffffff;
                                        margin: 0;
                                        padding: 20px 0;
                                    }

                                    h2 {
                                        color: #81fcff;
                                        text-align: center;
                                        font-weight: bold;
                                        margin-bottom: 30px;
                                    }

                                    .container {
                                        max-width: 900px;
                                        background-color: #002b2b;
                                        border-radius: 15px;
                                        padding: 30px 25px;
                                        box-shadow: 0 0 20px rgba(129, 252, 255, 0.3);
                                        border: 1px solid #81fcff;
                                    }

                                    label {
                                        color: #81fcff;
                                        font-weight: 500;
                                    }

                                    .form-control {
                                        background-color: transparent;
                                        color: #ffffff;
                                        border-radius: 8px;
                                        padding: 8px 12px;
                                        transition: 0.3s;
                                        border: 1px solid #81fcff;
                                    }

                                    .form-control::placeholder {
                                        color: rgb(255, 255, 255);
                                    }

                                    .form-control:focus {
                                        outline: none;
                                        box-shadow: 0 0 5px #81fcff;
                                        border-color: #81fcff;
                                    }

                                    .form-control.is-invalid {
                                        border-color: #dc3545 !important;
                                    }

                                    .form-control.is-valid {
                                        border-color: #28a745 !important;
                                    }

                                    .invalid-feedback {
                                        color: #dc3545;
                                        font-size: 0.875em;
                                    }

                                    select.form-control {
                                        background-color: transparent;
                                        color: #ffffff;
                                    }

                                    .btn {
                                        width: 100%;
                                        padding: 10px;
                                        border-radius: 8px;
                                        font-weight: bold;
                                        transition: 0.3s ease;
                                        margin-bottom: 10px;
                                    }

                                    .btn-primary {
                                        background-color: #81fcff;
                                        color: #002b2b;
                                        border: none;
                                    }

                                    .btn-primary:hover {
                                        background-color: #5ee7ea;
                                        color: #001f1f;
                                    }

                                    .btn-secondary {
                                        background-color: transparent;
                                        border: 1px solid #81fcff;
                                        color: #81fcff;
                                    }

                                    .btn-secondary:hover {
                                        background-color: #81fcff;
                                        color: #001f1f;
                                    }
                            </style>
                        
                    </head>
                    <body>
                        <div class="container w-85 mb-10">
                            <div class="Legenda w-20 mb-5 mt-5">
                                <h2>Cadastro de Jogador</h2>
                            </div>

                            <form method="POST" action="/cadastrojogadores" class="row g-1 border p-2">

                                <div class="form-row row">
                                    <div class="form-group col-md-8 mb-1">
                                        <label for="nomejogador" class="mb-1">Nome do Jogador</label>
                                        <input type="text" class="form-control" id="nomejogador" name="nomejogador"  placeholder="Nome completo">
                                    </div>
                                </div>

                                <div class="form-row row">
                                    <div class="form-group col-md-4 mb-1">
                                        <label for="numero" class="mb-1">Número da Camisa</label>
                                        <input type="number" class="form-control" id="numero" name="numero" placeholder="Ex: 10" min="1">
                                    </div>

                                    <div class="form-group col-md-4 mb-1">
                                        <label for="datanascimento" class="mb-1">Data de Nascimento</label>
                                        <input type="date" class="form-control" id="datanascimento" name="datanascimento" >
                                    </div>
                                </div>

                                <div class="form-row row">
                                    <div class="form-group col-md-4 mb-1">
                                        <label for="altura" class="mb-1">Altura (cm)</label>
                                        <input type="number" class="form-control" id="altura" name="altura"  placeholder="Ex: 180" min="100">
                                    </div>

                                    <div class="form-group col-md-4 mb-1">
                                        <label for="genero" class="mb-1">Gênero</label>
                                        <select class="form-control" id="genero" name="genero" >
                                            <option value="" disabled selected>Selecione</option>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Feminino">Feminino</option>
                                            <option value="Outro">Outro</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-row row">
                                    <div class="form-group col-md-6 mb-1">
                                        <label for="posicao" class="mb-1">Posição</label>
                                        <input type="text" class="form-control" id="posicao" name="posicao"  placeholder="Ex: Ponteiro, Central, etc.">
                                    </div>
                                </div>


                                <div class="form-group col-md-4 mb-1">
                                    <label for="equipe" class="mb-1">Equipe</label>
                                    <select class="form-control" id="equipe" name="equipe" >
                                        <option value="" disabled selected>Selecione uma equipe</option>
                                        ${opcoesEquipes}
                                    </select>
                                </div>
                                <p style="color:red;">A equipe "${equipe}" já possui 6 jogadores cadastrados.</p>
                                <button class="btn btn-primary" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/menu">Voltar</a>
                            </form>
                        </div>
                    </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
                </html>

                `);
            }
            listajogadores.push({
                nomejogador,
                numero,
                datanascimento,
                altura,
                genero,
                posicao,
                equipe
            });
            resposta.redirect("/listajogadores");
        } else {
            let conteudo = `
                <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
                        <title>Cadastro de Jogadores</title>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                        <style>
                           body {
                                background: linear-gradient(to bottom right,rgb(0, 0, 0), #042f31);
                                font-family: 'Segoe UI', sans-serif;
                                color: #ffffff;
                                margin: 0;
                                padding: 20px 0;
                            }

                            h2 {
                                color: #81fcff;
                                text-align: center;
                                font-weight: bold;
                                margin-bottom: 30px;
                            }

                            .container {
                                max-width: 900px;
                                background-color: #002b2b;
                                border-radius: 15px;
                                padding: 30px 25px;
                                box-shadow: 0 0 20px rgba(129, 252, 255, 0.3);
                                border: 1px solid #81fcff;
                            }

                            label {
                                color: #81fcff;
                                font-weight: 500;
                            }

                            
                            .form-control {
                                background-color: transparent;
                                color: #ffffff;
                                border-radius: 8px;
                                padding: 8px 12px;
                                transition: 0.3s;
                            }

                            
                            .form-control:not(.is-valid):not(.is-invalid) {
                                border: 1px solid #81fcff;
                            }

                            
                            .form-control.is-invalid {
                                border-color: #dc3545 !important;
                            }

                            /* Corrige a borda verde (se usar is-valid futuramente) */
                            .form-control.is-valid {
                                border-color: #28a745 !important;
                            }

                            .invalid-feedback {
                                color: #dc3545;
                                font-size: 0.875em;
                            }

                            .btn {
                                width: 100%;
                                padding: 10px;
                                border-radius: 8px;
                                font-weight: bold;
                                transition: 0.3s ease;
                                margin-bottom: 10px;
                            }

                            .btn-primary {
                                background-color: #81fcff;
                                color: #002b2b;
                                border: none;
                            }

                            .btn-primary:hover {
                                background-color: #5ee7ea;
                                color: #001f1f;
                            }

                            .btn-secondary {
                                background-color: transparent;
                                border: 1px solid #81fcff;
                                color: #81fcff;
                            }

                            .btn-secondary:hover {
                                background-color: #81fcff;
                                color: #001f1f;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container w-95 mb-10">
                            <div class="Legenda w-20 mb-5 mt-5">
                                <h2>Cadastro de Jogadores</h2>
                            </div>
                            <form method="POST" action="/cadastrojogadores" class="row g-3 border p-2">
                                <div class="form-row row">
                                    <div class="form-group col-md-8">`;
                                        if (!nomejogador) {
                                            conteudo += `
                                            <div class="form-group col-md-8 mb-1">
                                                <label for="nomejogador" class="mb-1">Nome do Jogador</label>
                                                <input type="text" class="form-control is-invalid" id="nomejogador" name="nomejogador" value="${nomejogador || ''}" placeholder="Nome completo">
                                                <span class="text-danger">Insira o nome do jogador</span>
                                            </div>
                                            `;
                                        } else {
                                            conteudo += `
                                            <div class="form-group col-md-8 mb-1">
                                                <label for="nomejogador" class="mb-1">Nome do Jogador</label>
                                                <input type="text" class="form-control" id="nomejogador" name="nomejogador" value="${nomejogador}" placeholder="Nome completo">
                                            </div>
                                            `;
                                        }

                                        conteudo += `
                                                                </div>
                                                            </div>
                                                            <div class="form-row row">
                                                                <div class="form-group col-md-4">
                                        `;

                                        if (!numero) {
                                            conteudo += `
                                                <label for="numero" class="mb-1">Número da Camisa</label>
                                                <input type="number" class="form-control is-invalid" id="numero" name="numero" value="${numero || ''}" placeholder="Ex: 10" min="1">
                                                <span class="text-danger">Insira o número da camisa</span>
                                            `;
                                        } else {
                                            conteudo += `
                                                <label for="numero" class="mb-1">Número da Camisa</label>
                                                <input type="number" class="form-control" id="numero" name="numero" value="${numero}" placeholder="Ex: 10" min="1">
                                            `;
                                        }

                                        conteudo += `
                                                                </div>
                                                                <div class="form-group col-md-4">
                                        `;

                                        if (!datanascimento) {
                                            conteudo += `
                                                <label for="datanascimento" class="mb-1">Data de Nascimento</label>
                                                <input type="date" class="form-control is-invalid" id="datanascimento" name="datanascimento" value="${datanascimento || ''}">
                                                <span class="text-danger">Insira a data de nascimento</span>
                                            `;
                                        } else {
                                            conteudo += `
                                                <label for="datanascimento" class="mb-1">Data de Nascimento</label>
                                                <input type="date" class="form-control" id="datanascimento" name="datanascimento" value="${datanascimento}">
                                            `;
                                        }

                                        conteudo += `
                                                                </div>
                                                            </div>
                                                            <div class="form-row row">
                                                                <div class="form-group col-md-4">
                                        `;

                                        if (!altura) {
                                            conteudo += `
                                                <label for="altura" class="mb-1">Altura (cm)</label>
                                                <input type="number" class="form-control is-invalid" id="altura" name="altura" value="${altura || ''}" placeholder="Ex: 180" min="100">
                                                <span class="text-danger">Insira a altura</span>
                                            `;
                                        } else {
                                            conteudo += `
                                                <label for="altura" class="mb-1">Altura (cm)</label>
                                                <input type="number" class="form-control" id="altura" name="altura" value="${altura}" placeholder="Ex: 180" min="100">
                                            `;
                                        }

                                        conteudo += `
                                            </div>
                                            <div class="form-group col-md-4">
                                        `;

                                        if (!genero) {
                                            conteudo += `
                                                <label for="genero" class="mb-1">Gênero</label>
                                                <select class="form-control is-invalid" id="genero" name="genero">
                                                    <option value="" disabled ${!genero ? "selected" : ""}>Selecione</option>
                                                    <option value="Masculino">Masculino</option>
                                                    <option value="Feminino">Feminino</option>
                                                    <option value="Outro">Outro</option>
                                                </select>
                                                <span class="text-danger">Selecione o gênero</span>
                                            `;
                                        } else {
                                            conteudo += `
                                                <label for="genero" class="mb-1">Gênero</label>
                                                <select class="form-control" id="genero" name="genero">
                                                    <option value="" disabled ${!genero ? "selected" : ""}>Selecione</option>
                                                    <option value="Masculino" ${genero === "Masculino" ? "selected" : ""}>Masculino</option>
                                                    <option value="Feminino" ${genero === "Feminino" ? "selected" : ""}>Feminino</option>
                                                    <option value="Outro" ${genero === "Outro" ? "selected" : ""}>Outro</option>
                                                </select>
                                            `;
                                        }

                                        conteudo += `
                                                                </div>
                                                            </div>
                                                            <div class="form-row row">
                                                                <div class="form-group col-md-6">
                                        `;

                                        if (!posicao) {
                                            conteudo += `
                                                <label for="posicao" class="mb-1">Posição</label>
                                                <input type="text" class="form-control is-invalid" id="posicao" name="posicao" value="${posicao || ''}" placeholder="Ex: Ponteiro, Central">
                                                <span class="text-danger">Insira a posição</span>
                                            `;
                                        } else {
                                            conteudo += `
                                                <label for="posicao" class="mb-1">Posição</label>
                                                <input type="text" class="form-control" id="posicao" name="posicao" value="${posicao}" placeholder="Ex: Ponteiro, Central">
                                            `;
                                        }

                                        conteudo += `
                                                                </div>
                                                            </div>
                                                            <div class="form-row row">
                                                                <div class="form-group col-md-4">
                                        `;

                                        if (!equipe) {
                                            conteudo += `
                                                <label for="equipe" class="mb-1">Equipe</label>
                                                <select class="form-control is-invalid" id="equipe" name="equipe">
                                                    <option value="" disabled selected>Selecione uma equipe</option>
                                        `;
                                            for (const eq of listaequipes) {
                                                conteudo += `<option value="${eq.nomeequipe}">${eq.nomeequipe}</option>`;
                                            }
                                            conteudo += `
                                                </select>
                                                <span class="text-danger">Selecione a equipe</span>
                                            `;
                                        } else {
                                            conteudo += `
                                                <label for="equipe" class="mb-1">Equipe</label>
                                                <select class="form-control" id="equipe" name="equipe">
                                                    <option value="" disabled>Selecione uma equipe</option>
                                            `;
                                            for (const eq of listaequipes) {
                                                conteudo += `<option value="${eq.nomeequipe}" ${eq.nomeequipe === equipe ? "selected" : ""}>${eq.nomeequipe}</option>`;
                                            }
                                            conteudo += `
                                                </select>
                                            `;
                                        }

                                        conteudo += `
                                                                </div>
                                                            </div>
                                                            
                                                            <button class="btn btn-primary" type="submit">Cadastrar</button>
                                                            <a class="btn btn-secondary" href="/menu">Voltar</a>
                                                        </form>
                                                    </div>
                                                </body>
                                                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
                                            </html>
                                        `;

                                        resposta.send(conteudo);
                                    }
                                });



app.get("/listajogadores", verificarAutenticacao, (requisicao, resposta) => {
    let conteudo=`
            <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                        <title>Página Inicial</title>
                        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
                        <style>
                        
                            .Legenda2 h2 {
                            color: #81fcff;
                            text-align: center;
                            font-weight: 700;
                            margin-bottom: 24px;
                            }

                            
                            .custom-table {
                            width: 100%;
                            border-collapse: collapse;
                            border: 1px solid #81fcff33;
                            border-radius: 8px;
                            overflow: hidden;
                            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                            background-color: #042f31;
                            color: #e0f7fa;
                            font-size: 15px;
                            }

                            
                            .custom-table thead {
                            background-color: #094043;
                            }

                            .custom-table thead th {
                            padding: 12px;
                            color: #81fcff;
                            text-align: left;
                            border-bottom: 2px solid #81fcff55;
                            }

                            
                            .custom-table tbody tr {
                            transition: background-color 0.2s ease-in-out;
                            }

                            .custom-table tbody td {
                            padding: 10px 14px;
                            border-bottom: 1px solid #0d5b5d;
                            }

                            
                            .custom-table tbody tr:hover {
                            background-color: #0f4d4f;
                            }

                            
                            .btn-secondary {
                            margin-top: 20px;
                            padding: 10px 16px;
                            font-weight: bold;
                            border-radius: 8px;
                            background-color: transparent;
                            border: 1px solid #81fcff;
                            color: #81fcff;
                            transition: 0.2s ease;
                            }

                            .btn-secondary:hover {
                            background-color: #81fcff;
                            color: #094043;
                            text-decoration: none;
                            }

                            body {
                            background: linear-gradient(to bottom right,rgb(0, 0, 0), #042f31);
                            margin: 0;
                            font-family: 'Segoe UI', sans-serif;
                            }

                            
                            .table-responsive {
                            overflow-x: auto;
                            margin-bottom: 20px;
                        </style>
                    </head>
                        <body>
                            <div class="container w-95 mb-10" >
                                    <div class="Legenda2 w-20 mb-5 mt-5">
                                        <h2>Equipes Cadastradas</h2>
                                    </div>

                                    <div class="table-responsive">
                                        <table class="custom-table">
                                            <thead>

                                                <tr>
                                                    <th scope="col">Jogador</th>
                                                    <th scope="col">N°</th>
                                                    <th scope="col">Data</th>
                                                    <th scope="col">Altura</th>
                                                    <th scope="col">Genêro</th>
                                                    <th scope="col">Posição</th>
                                                    <th scope="col">Equipe</th>
                                                </tr>
                                            </thead>
                                            <tbody>`;
                                                for(let i=0; i < listajogadores.length; i++)
                                                {
                                                    conteudo = conteudo + `
                                                    </tr>
                                                        <td>${listajogadores[i].nomejogador}</td>
                                                        <td>${listajogadores[i].numero}</td>
                                                        <td>${listajogadores[i].datanascimento.split("-").reverse().join("/")}</td>
                                                        <td>${listajogadores[i].altura}</td>
                                                        <td>${listajogadores[i].genero}</td>
                                                        <td>${listajogadores[i].posicao}</td>
                                                        <td>${listajogadores[i].equipe}</td>
                                                    `;
                                                }
                conteudo=conteudo + `    </tbody>
                                        </table>
                                     </div>
                                <a class="btn btn-secondary" href="/cadastrojogadores">Continuar Cadastrando</a>
                                <a class="btn btn-secondary" href="/menu">Voltar</a>
                            </div>
                        </body>
                        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`
    resposta.send(conteudo);
    resposta.end();
});
function verificarAutenticacao(requisicao, resposta, next)
{
    if(requisicao.session.logado)
    {
        next();
    }
    else
    {
        resposta.redirect("/");
    }
}

app.get("/Logout", (requisicao, resposta)=>{
    requisicao.session.destroy();
    resposta.redirect("/");
});

app.listen(port, host, () => {
    console.log(`Servidor em execução em http://localhost:${port}/`);
});