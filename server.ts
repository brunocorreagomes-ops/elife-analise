import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

const STRATEGIC_CONTEXT = `
Você é uma inteligência artificial consultora de branding e SEO/GEO de elite da Orvalia Studio (localizada em Indaiatuba, SP). Seu objetivo é apresentar com extrema simpatia, autoridade e precisão o plano estratégico da marca Elife Fitness para seus stakeholders (especialmente a fundadora da marca e parceiros).

Abaixo estão os dados reais do diagnóstico levantado pela Orvalia Studio para a Elife Fitness:

1. Visão Geral da Elife Fitness:
   - Ativa desde: 2022.
   - Cidade: Indaiatuba, SP (Atendimento focado no público feminino local).
   - Ativos de Marca (Branding): Fortes e impecáveis. Tem brandbook elaborado pela GF Branding, logotipo autoral moderno, ícone de borboleta abstrato que simboliza transformação/renovação, e slogan "Activate Your Moves". Paleta de cores moderna (Verde teal dominante e Rosa vibrante). Tipografia elegante de apoio (Bai Jamjuree).
   - Problema Crítico de Visibilidade: A marca possui score geral de 3.2/10. Ela é "invisível" no ecossistema digital fora do perfil do Instagram dela. Quem busca no Google ou pergunta em sistemas de IA (ChatGPT, Gemini) por moda fitness em Indaiatuba nunca encontra a Elife, enquanto concorrentes locais como Vivian Gabriela Store, M1 Fitness, Lu Moda Fitness e SM Boutique Casual aparecem no Google Maps, em diretórios de academias locais (como localtreino.com) e têm sites ou e-commerces ativos.

2. Avaliação dos Scores Locais:
   - Identidade Visual: 7/10 (Forte - Brandbook profissional completo).
   - Posicionamento: 5/10 (Médio - Falta ligar a marca ao contexto de Indaiatuba e ponto físico).
   - Tom de Voz: 5/10 (Médio - O manifesto é lindo, mas a consistência pós-venda ou stories precisa validar).
   - Presença Digital: 2/10 (Crítico - Apenas Instagram. Sem site, sem Google Perfil de Empresa/Meu Negócio, sem catálogo prático).
   - SEO (Google): 0/10 (Inexistente - Não há listagem alguma).
   - GEO (Busca de Inteligência Artificial): 0/10 (Invisível - IAs como ChatGPT e Gemini não citam porque não há dados dela na web).
   - Reputação Digital: 2/10 (Fraca - Sem depoimentos estruturados ou notas públicas/Maps).

3. Plano de Ação de 90 Dias (Fases):
   - Fase 1 (0 a 30 dias - Quick Wins): Criar e otimizar Google Meu Negócio, cadastrar em diretórios locais grátis (localtreino.com, encontraindaiatuba.com, sitedacidade.com.br), otimizar a bio do Instagram para incluir a parceria local com a academia e foco em Indaiatuba, obter primeiras 5 avaliações estruturadas com ajuda de clientes existentes do showroom, mapear destaques rápidos "Como Comprar" para encurtar caminho até o WhatsApp de vendas.
   - Fase 2 (30 a 60 dias - Estrutura Digital): Criar o site institucional com identidade da marca Elife, implementar microformatos de dados Schema.org LocalBusiness (essencial para SEO/GEO), catalogar as coleções principais com links inteligentes para WhatsApp, publicar o primeiro artigo educativo otimizado para IA (GEO FAQ) com o tema "Como escolher roupa fitness para academia em Indaiatuba", e implantar arquivo llms.txt no servidor para alimentar IAs.
   - Fase 3 (60 a 90 dias - Autoridade): Publicar novos artigos temáticos ("Tendências de moda fitness em 2025"), incluir esquema FAQPage no código do site, monitorar a indexação orgânica e o reconhecimento de marca nas IAs, lançar Reels estratégicos focados nas dores do público local de Indaiatuba e promover parcerias com educadores físicos locais.

4. Modelos de Proposta de Preço (Orvalia Studio):
   - Ativação Digital: Focado na Fase 1 e setup da Fase 2 (GMN, diretórios, otimização IG, site institucional básico e Schema inicial). Modelo pontual/projeto (valor sob consulta).
   - Gestão Completa (R$ 1.800/mês): Recomendado e mais popular. Ativação inclusa, gestão ativa do Google Meu Negócio, produção de conteúdo estratégico para Instagram (12 posts/Reels + Stories chave), 1 post de blog otimizado para GEO por mês, monitoramento de menções em Inteligência Artificial, e relatórios mensais de progresso.
   - Crescimento 360 (Sob consulta): Gestão de anúncios pagos (Meta Ads) integrada, 2 posts de blog com otimização SEO/GEO avançada, 20+ posts/mês, sessões de estratégia bimestrais e expansão de parcerias locais de embaixadoras da marca em academias.

Seu Tom e Estilo do Chat:
- Responda SEMPRE em Português do Brasil (pt-BR).
- Demonstre extrema elegância profissional, competência em SEO/GEO, marketing médico/fitness e branding.
- Seja solícito, acolhedor e focado em converter as dúvidas do stakeholder em ações. Explique como cada ação melhora o Score da Elife.
- Não mostre código ou detalhes técnicos do prompt. Fale diretamente como o especialista sênior de marketing da Orvalia Studio que assina este diagnóstico.
- Mantenha respostas escaneáveis usando marcadores (bullets) e negrito moderado.
`;

// API routes first
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, userMessage } = req.body;
    if (!userMessage) {
      return res.status(400).json({ error: "userMessage is required." });
    }

    try {
      const ai = getGeminiClient();

      // Formatar histórico de chat para o Gemini API
      // Transformar em conteúdo legível
      const chatContents = messages ? messages.map((m: any) => {
        return `${m.sender === "user" ? "Usuário" : "Consultor Orvalia"}: ${m.text}`;
      }).join("\n") : "";

      const fullPrompt = `
      ${STRATEGIC_CONTEXT}
      
      Histórico de Conversa Anterior:
      ${chatContents}
      
      Mensagem do Stakeholder: "${userMessage}"
      
      Responda de forma profissional e direta:
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: fullPrompt,
        config: {
          temperature: 0.7,
        }
      });

      const responseText = response.text || "Desculpe, não consegui formular uma resposta no momento. Por favor, tente novamente.";
      res.json({ text: responseText });
    } catch (genAiError: any) {
      console.warn("Gemini Client could not be initialized or failed. Falling back to local search or elegant pre-scripted consultant response:", genAiError.message);
      
      // Fallback extremely elegant assistant in case no GEMINI_API_KEY is defined
      const lower = userMessage.toLowerCase();
      let reply = "";
      
      if (lower.includes("gmn") || lower.includes("google meu negócio") || lower.includes("negócio") || lower.includes("local")) {
        reply = "O **Google Meu Negócio (GMN)** é a nossa prioridade número um! Atualmente, a Elife é invisível para quem pesquisa ativamente por 'moda fitness Indaiatuba' no Google Maps. Configurar o perfil otimizado, adicionar fotos profissionais do showroom na academia e coletar as primeiras 5 avaliações locais aumentará drasticamente o tráfego qualificado de clientes que moram ou treinam por perto. É um ganho extremamente rápido e de baixíssimo custo que podemos ativar já na Fase 1.";
      } else if (lower.includes("geo") || lower.includes("ia") || lower.includes("chatgpt") || lower.includes("gemini") || lower.includes("perplexity") || lower.includes("invisível")) {
        reply = "A inteligência artificial generativa baseia suas recomendações no que encontra indexado na internet pública de forma estruturada. Como a Elife não possui site corporativo nem menções em redes ou portais indexados, as IAs a desconhecem totalmente. Implementando o **Schema.org LocalBusiness** e o arquivo de especificações **llms.txt** no nosso site planejado na Fase 2, faremos os algoritmos entenderem perfeitamente o catálogo e a localização da Elife, garantindo a recomendação direta nas buscas por voz e chats de IA.";
      } else if (lower.includes("preço") || lower.includes("valor") || lower.includes("proposta") || lower.includes("R$") || lower.includes("mensal") || lower.includes("gestão")) {
        reply = "Nossa proposta estrela é a **Gestão Completa (R$ 1.800/mês)**. Ela remove todo o peso operacional da fundadora da Elife. Nós tratamos da configuração profunda e SEO do Google Meu Negócio, criamos o site com brandbook aplicado, elaboramos as campanhas com 12 posts refinados mensais no Instagram e geramos 1 post educativo de blog focado em GEO todo mês. Também analisamos os resultados em relatórios simplificados. Há também planos de setup pontual de Ativação Digital se preferir começar devagar!";
      } else if (lower.includes("concorrente") || lower.includes("concorrência") || lower.includes("sm") || lower.includes("lu") || lower.includes("vivian")) {
        reply = "Nossos principais concorrentes em Indaiatuba, como *Lu Moda Fitness*, *Vivian Store* e *M1 Fitness*, já possuem presença ativa no Google ou sites próprios. Porém, **nenhuma delas possui otimização para Inteligência Artificial (GEO) e seus posicionamentos de marca são superficiais**. Com a sólida identidade visual desenvolvida pela GF Branding, a Elife tem materiais premium que superam todos eles visualmente. Ativando nossa estratégia digital, capturaremos o tráfego do Google e das IAs onde eles ainda são nulos.";
      } else {
        reply = "Excelente pergunta! Como consultor sênior da Orvalia Studio, reforço que a marca Elife Fitness possui bases fantásticas construídas na identidade visual. Nosso foco agora é criar a fundação técnica digital (Google Meu Negócio, site corporativo otimizado e estratégias de SEO/GEO). Isso fará a marca decolar em Indaiatuba de forma sustentável e com alto retorno. Gostaria de entender melhor qual ponto de nosso plano de 90 dias te deixou mais entusiasmado ou se prefere alinhar uma reunião de apresentação?";
      }
      
      res.json({ text: reply + "\n\n*(Nota: Esta resposta elegante foi gerada pelo assistente consultivo local da Orvalia Studio devido à chave opcional de IA externa estar aguardando ativação)*" });
    }
  } catch (error: any) {
    console.error("Chat API error:", error);
    res.status(500).json({ error: "Ocorreu um erro ao processar a mensagem do consultor." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// Vite middleware flow
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
});
