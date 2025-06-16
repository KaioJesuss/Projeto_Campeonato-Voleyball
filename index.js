import express from "express";

const porta = 3004;
const host = "0.0.0.0";

const app = express();

app.get("/", (requisicao, resposta)=>{
    resposta.send(`
                    <html lang="pt-br">
                        <head>
                            <meta charset="UTF-8">
                            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">                            
                            <title>Login do Sistema</title>

                            <style>
                               
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
                                                    <input type="text"  id="usuario" name="usuario" class="form-control" placeholder="Usuário">
                                                </div>
                                                <div class="form-group">
                                                    <label for="senha" class="label-custom">Senha</label>
                                                    <input type="password"  id="senha" name="senha" class="form-control" placeholder="Senha">
                                                </div>
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
                                        background-color: #0a0a0a;
                                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                                        color: #ffffff;
                                        margin: 0;
                                        padding: 0;
                                    }

                                    .card {
                                        background-color: #111;
                                        border-radius: 20px;
                                        box-shadow: 0 0 20px rgba(0, 255, 100, 0.2);
                                        border: 1px solid #0f0;
                                    }

                                    .login-title {
                                        font-size: 2rem;
                                        text-align: center;
                                        color: #0f0;
                                        font-weight: bold;
                                    }

                                    .division .line {
                                        height: 2px;
                                        background-color: #0f0;
                                        margin: 10px auto 20px;
                                        width: 60%;
                                        border-radius: 2px;
                                    }

                                    .label-custom {
                                        font-weight: bold;
                                        color: #ffffff;
                                    }

                                    .form-control {
                                        background-color: #1a1a1a;
                                        border: 1px solid #0f0;
                                        color: #ffffff;
                                        border-radius: 10px;
                                        padding: 10px;
                                    }

                                    .form-control:focus {
                                        background-color: #1a1a1a;
                                        border-color: #39ff14;
                                        box-shadow: 0 0 5px #39ff14;
                                        color: #ffffff;
                                    }

                                    .form-check-label {
                                        color: #cccccc;
                                    }

                                    .bn {
                                        text-align: right;
                                        color: #39ff14;
                                        cursor: pointer;
                                        transition: color 0.3s ease;
                                    }

                                    .bn:hover {
                                        color: #ffffff;
                                        text-decoration: underline;
                                    }

                                    .btn-primary {
                                        background-color: #0f0;
                                        border: none;
                                        color: #000;
                                        border-radius: 12px;
                                        transition: background-color 0.3s ease, transform 0.2s ease;
                                    }

                                    .btn-primary:hover {
                                        background-color: #39ff14;
                                        transform: scale(1.05);
                                    }

                                    .btn-primary:focus {
                                        outline: none;
                                        box-shadow: 0 0 10px #39ff14;
                                    }

                                    span[style*="color: red;"] {
                                        display: block;
                                        margin-top: 10px;
                                        text-align: center;
                                        color: #ff4d4d !important;
                                        
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
                                                    <input type="text"  id="usuario" name="usuario" class="form-control" placeholder="Usuário">
                                                </div>
                                                <div class="form-group">
                                                    <label for="senha" class="label-custom">Senha</label>
                                                    <input type="password"  id="senha" name="senha" class="form-control" placeholder="Senha">
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