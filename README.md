# Remix: Diagnóstico Elife Fitness 🚀

Este repositório contém o sistema do **Diagnóstico Estratégico Elife Fitness** desenvolvido pela **Orvalia Studio**. É uma aplicação moderna construída em **React 19**, **Vite** e **Tailwind CSS 4** no frontend, gerenciada por um servidor robusto em **Express (Node.js)** que integra consultas de Inteligência Artificial usando a API do **Gemini 3.5**.

O projeto conta com:
- **Simulador de Score Digital Interativo** para a Elife Fitness.
- **Tabela Comparativa de Concorrentes Locais** em Indaiatuba, SP.
- **Painel de Cronograma de Implementação (Fases 1, 2 e 3)** de 90 dias.
- **Gerador de PDF de alta fidelidade** adaptado para páginas A4.
- **Plano exclusivo de Parceria Orvalia** desenhado especificamente para a marca.

---

## 📋 Pré-requisitos para Rodar Localmente

Certifique-se de possuir instalado em sua máquina:
1. **Node.js** (recomenda-se versão 18 ou superior).
2. Um gerenciador de pacotes, como o **npm** (já incluso com o Node.js).

---

## 🛠️ Instalação e Execução Local

Siga o passo a passo abaixo para rodar o projeto localmente em ambiente de desenvolvimento:

1. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

2. **Configure suas variáveis de ambiente:**
   Duplique o arquivo `.env.example` e renomeie-o para `.env`:
   ```bash
   cp .env.example .env
   ```
   Abra o arquivo `.env` e preencha a chave do Gemini se desejar utilizar os recursos de chat de inteligência artificial completos da Orvalia:
   ```env
   GEMINI_API_KEY="SUA_CHAVE_AQUI"
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O projeto estará acessível em `http://localhost:3000`.

---

## 📦 Como Compilar/Gerar o Build

O projeto oferece dois caminhos de compilação dependendo da infraestrutura de deploy desejada:

### Opção A: Compilação Full-Stack (Recomendada)
Gera o bundle estático do frontend e compila o código TypeScript do backend no arquivo `dist/server.cjs` de forma unificada:
```bash
npm run build
```

### Opção B: Compilação Estática (Client-Side Only)
Caso seu destino seja um servidor de arquivos puramente estáticos (como GitHub Pages, Vercel Static ou Netlify):
```bash
npm run build:static
```
Os arquivos prontos para publicação estarão localizados de forma limpa no diretório `/dist`.

---

## 🌐 Guia de Deploy para o GitHub e Hospedagem

Siga o roteiro abaixo para enviar seu código para o GitHub e publicá-lo na internet.

### Passo 1: Inicializando o Repositório Git Local

No terminal da raiz do seu projeto local, execute:
```bash
# Inicializa o repositório git
git init

# Adiciona todos os arquivos (o .gitignore impedirá o carregamento de dist, node_modules e arquivos .env confidenciais)
git add .

# Registra a primeira versão de deploy
git commit -m "feat: setup completo da pagina de diagnóstico elife fitness"
```

### Passo 2: Publicando no GitHub do seu perfil

1. Acesse o seu [GitHub](https://github.com) e crie um **Novo Repositório** (New Repository) vazio.
2. Dê a ele um nome apropriado (ex: `diagnostico-elife-fitness`).
3. Não selecione "Add a README", .gitignore ou licenças (para mantê-lo vazio).
4. Copie a URL do seu novo repositório (ex: `https://github.com/SEU-USUARIO/diagnostico-elife-fitness.git`).
5. Execute os comandos no seu terminal:
   ```bash
   # Associa o repositório remoto do GitHub
   git remote add origin https://github.com/SEU-USUARIO/diagnostico-elife-fitness.git
   
   # Renomeia a branch padrão para main
   git branch -M main
   
   # Envia os arquivos para o GitHub de forma segura
   git push -u origin main
   ```

---

## 🚀 Onde Hospedar a Aplicação?

### Opção 1: Hospedagem Estática Gratuita (Vercel ou Netlify)
Ideal para implantar em 1 minuto se você precisa apenas do layout interativo e gerador de PDF funcionando:
1. Acesse a [Vercel](https://vercel.com).
2. Conecte com a sua conta do GitHub e importe o repositório `diagnostico-elife-fitness`.
3. Nas configurações do projeto de Build, defina:
   - **Framework Preset:** `Other` ou `Vite`.
   - **Build Command:** `npm run build:static` (Para rodar apenas o frontend estático).
   - **Output Directory:** `dist`.
4. Clique em **Deploy**. A página estará online em segundos!

### Opção 2: Hospedagem no GitHub Pages
Se você quer hospedar gratuitamente na infraestrutura nativa do GitHub:

1. (Opcional) A propriedade `base: './'` já está configurada por padrão no arquivo `vite.config.ts` deste projeto, garantindo que os estilos e scripts funcionem em qualquer subdiretório.
2. Instalar a ferramenta de deploy de forma temporária no seu projeto:
   ```bash
   npm install gh-pages --save-dev
   ```
3. Adicionar o seguinte script no seu `package.json`:
   ```json
   "predeploy": "npm run build:static",
   "deploy": "gh-pages -d dist"
   ```
4. Execute o comando de publicação:
   ```bash
   npm run deploy
   ```
   Sua página será implantada de forma estática no seu GitHub Pages.

### Opção 3: Hospedagem Full-Stack Completa (Render, Railway ou Cloud Run)
Se você deseja utilizar os recursos de API e respostas inteligentes do Gemini no Chatbot dinâmico, utilize hospedagens com suporte a Node.js:
1. No painel da plataforma escolhida (ex: **Render.com**), adicione um novo "Web Service" conectado ao repositório do seu GitHub.
2. Defina os seguintes parâmetros:
   - **Language:** `Node`.
   - **Build Command:** `npm install && npm run build`.
   - **Start Command:** `npm start` (Executa o node servindo o backend que gerencia o Vite em tempo de execução).
3. Adicione nas variáveis de ambiente globais da plataforma:
   - `GEMINI_API_KEY`: A sua chave secreta da API do Google Gemini.
   - `NODE_ENV`: `production`.
4. Faça o deploy. O serviço estará online de ponta a ponta com o servidor Express pronto para receber e enviar respostas inteligentes de inteligência artificial.

---

Este projeto foi otimizado para o máximo desempenho, responsividade desktop e mobile, além de garantir o carregamento suave de todas as fontes especiais e ícones da biblioteca **Lucide-react**.

Em caso de dúvidas técnicas ou sugestões de evoluções de design, sintonize com o time de engenharia de software da **Orvalia Studio**. 🎨
