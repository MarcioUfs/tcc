# Backend SIPECAD

Bem vindo ao backend do Sistema de Pesquisa do Cadastro Único, abaixo será disponibilizado um guia para instalação e execução no sistema operacional Windows 10.

## Objetivo
Este guia servirá de auxílio para desenvolvedores interessados em deixar esse projeto funcional de forma rápida, clara e simples:

### Passo 1 - Instalando programas:

  - [PostgreSql](https://www.postgresql.org/download/) Banco de dados relacional de software livre usado para guardar os dados.
  - [VsCode](https://code.visualstudio.com/download) Editor de código aberto desenvolvido pela Microsoft.
  - [Git](https://git-scm.com/downloads) Sistema de controle de versão de arquivos.

### Passo 2 - Baixando Projeto:
Você deve abrir o github e clonar o projeto clicando no botão "code" na opção "Copy url to clipboard" sem aspas.
  - [Projeto completo](https://github.com/MarcioUfs/tcc) <!-- ![Imagem github](Downloads/Capturar) -->

Depois você deve abrir a pasta onde deseja salva o projeto e clicar dentro com o botao direito e abrir a opção "git bash", logo um prompt do git será aberto, dentro você irá digitar "git clone " sem aspas e clicar com o botão direito e selecionar a opção "paste", logo após digitar enter para clonar o projeto.
### Passo 3 - Executar o projeto:
Finalizado o clone do projeto você digita "cd tcc" sem aspas, assim irá entra na pasta do projeto, logo depois digite "code ." sem aspas, assim o VSCode abrirá o projeto na versão main.
Estando aberto o projeto no VSCode segure a tecla control e digite aspa simples (') sem parentesis, apos abrerto o prompt do VSCode deve-se digitar "npm install" sem aspas e aguardar a instalação dos pacotes.
Você deve baixar alguns pacotes no VSCode para acompanhar o versionamento via git, apos isso mude a versão de mais para dev, isso deve atualizar para a branch mais recente do git.
Emfim rodar o projeto! para executar o projeto você deve escrever no prompt "npm start" sem aspas. aguardar uns segundos e visualizar se uma mensagem de texto do tipo "o projeto esta rodando em http://localhost:3000 ou http:192.168.0.30:3000", sao exemplos que o projeto esta executando localmente.
Agora é só codar!
