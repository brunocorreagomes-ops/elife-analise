import { ScoreItem, Competitor, StrategicPhase, ProposalPackage } from "./types";

export const INITIAL_SCORE_ITEMS: ScoreItem[] = [
  {
    dimension: "Identidade Visual",
    score: 7,
    status: "Forte",
    severity: "forte",
    detail: "O Brandbook profissional desenvolvido pela GF Branding é excelente. Há um sistema consistente de cores (verde teal dominante + rosa vibrante como acento), tipologia definida e um ícone de borboleta abstrato com profundo significado emocional de renovação e transformação.",
    recommendedAction: "Manter e transpor este cuidado visual para todas as plataformas digitais."
  },
  {
    dimension: "Posicionamento",
    score: 5,
    status: "Médio",
    severity: "medio",
    detail: "O manifesto emocional focado no público feminino é forte, porém falta conectar o posicionamento com a realidade regional (Indaiatuba, SP) e o ponto físico atual, além de expor as vantagens do show-room diretamente.",
    recommendedAction: "Ancorar a comunicação à proximidade local, enfatizando a experiência tátil no showroom antes ou depois do treino."
  },
  {
    dimension: "Tom de Voz",
    score: 5,
    status: "A validar",
    severity: "medio",
    detail: "O manifesto de marca apresenta um tom inspirador. No entanto, é crucial verificar se as interações diárias no Instagram, os posts e o atendimento pós-venda refletem este padrão de forma integrada e humanizada.",
    recommendedAction: "Criar diretrizes de atendimento rápido no WhatsApp que repliquem a empatia e motivação do manifesto."
  },
  {
    dimension: "Presença Digital",
    score: 2,
    status: "Crítico",
    severity: "critico",
    detail: "Atualmente a Elife restringe sua existência online ao Instagram. Não há catálogo web indexável, e-commerce, site institucional simples ou link corporativo. Isso gera fricção na jornada de compra de clientes que não querem usar apenas o Direct.",
    recommendedAction: "Criar um site com catálogo corporativo conectado ao WhatsApp, atuando como vitrine digital 24h acessível para qualquer navegador."
  },
  {
    dimension: "SEO (Google)",
    score: 0,
    status: "Inexistente",
    severity: "inexistente",
    detail: "Buscas por 'moda fitness Indaiatuba' ou 'roupas de academia Indaiatuba SP' retornam zero resultados sobre a Elife. Nem no Maps a marca consta, privando-a de receber tráfego orgânico valioso de quem já procura com intenção de compra imediata.",
    recommendedAction: "Criar e certificar o perfil da Elife no Google Perfil de Empresa (Google Meu Negócio) com SEO estratégico de palavras-chave."
  },
  {
    dimension: "Estrutura do Site & Indexação",
    score: 0,
    status: "Invisível",
    severity: "invisivel",
    detail: "Buscadores convencionais não deparam com quaisquer indícios estruturados de contato ou vitrine sobre a Elife na web pública (como microdados Schema LocalBusiness ou catalogação estruturada). Isso impede o ganho de autoridade orgânica e relevância nas buscas da região.",
    recommendedAction: "Integrar dados estruturados Schema.org LocalBusiness, sitemap XML otimizado e estrutura semântica adequada no futuro site institucional."
  },
  {
    dimension: "Reputação Digital",
    score: 2,
    status: "Fraco",
    severity: "fraco",
    detail: "A marca não possui depoimentos consolidados, notas públicas ou resenhas de clientes acessíveis no Google ou portais de reviews. Isso reduz o gatilho mental da prova social, que é vital para converter novas consumidoras.",
    recommendedAction: "Fomentar ativamente o envio de avaliações rápidas de 5 estrelas das clientes atuais do showroom no Google Perfil."
  }
];

export const COMPETITORS_DATA: Competitor[] = [
  {
    rank: "#1",
    name: "Lu Moda Fitness",
    followers: "—",
    site: "Não",
    gmn: "✅ Ativo (Excelente nota)",
    threat: "Alta",
    differential: "Melhor avaliada no Google Maps da cidade, concentrando forte intenção de busca local."
  },
  {
    rank: "#2",
    name: "SM Boutique Casual",
    handle: "@smboutiquecasual",
    followers: "7.600+",
    site: "Não",
    gmn: "Provável",
    threat: "Alta",
    differential: "Forte volume de seguidores locais no Instagram e showroom consolidado, mas atualmente em fase de reinauguração."
  },
  {
    rank: "#3",
    name: "Vivian Gabriela Store",
    followers: "—",
    site: "✅ Próprio",
    gmn: "✅ Ativo",
    threat: "Média",
    differential: "Disponibiliza site bem desenhado integrando as coleções de moda fitness e linha praia tradicional."
  },
  {
    rank: "#4",
    name: "M1 Fitness",
    followers: "—",
    site: "✅ Próprio (m1fitnessoficial.com.br)",
    gmn: "✅ Ativo",
    threat: "Média",
    differential: "Usa e-commerce nacional escalável para captação, competindo também na venda local via pesquisa."
  },
  {
    rank: "#5",
    name: "LIVE! Indaiatuba",
    followers: "—",
    site: "✅ Franquia Nacional",
    gmn: "✅ Ativo",
    threat: "Baixa",
    differential: "Alta autoridade de marca, porém focada exclusivamente no público corporativo de shopping, sem o apelo comunitário da Elife."
  },
  {
    rank: "—",
    name: "🦋 Elife Fitness",
    followers: "—",
    site: "❌ Não possui",
    gmn: "❌ Não possui",
    threat: "Oportunidade",
    differential: "Visualmente imbatível e conectada ao showroom local de treino, necessita apenas conectar a engenharia técnica digital."
  }
];

export const STRATEGIC_PHASES: StrategicPhase[] = [
  {
    id: 1,
    title: "Fundação digital & Atração Rápida",
    duration: "Mês 1",
    period: "Dias 1 a 30 (Quick Wins)",
    description: "Fase de baixíssimo custo voltada a tirar a Elife do anonimato orgânico imediato no Google Maps e indexações locais.",
    actions: [
      "Criar e certificar o perfil 'Google Meu Negócio' otimizado com endereço na academia, horários, fotos reais e logotipo.",
      "Cadastrar a empresa nos diretórios locais: localtreino.com, sitedacidade.com.br, encontraindaiatuba.com.br e outros portais.",
      "Instalar uma página de links (LinkTree personalizado) rica no Instagram, apresentando os canais e o showroom diretamente.",
      "Otimizar a biografia do Instagram focando em: segmento claro, menção a Indaiatuba, facilidade de compra e link direto.",
      "Fazer um disparo direcionado para as 15 principais clientes solicitando uma rápida avaliação sincera de 5 estrelas no novo Google Maps.",
      "Configurar um destaque elegante no Instagram intitulado 'Como Comprar' com vídeos demonstrando os canais e o WhatsApp."
    ]
  },
  {
    id: 2,
    title: "Estruturação de Ativos & Conteúdo Local",
    duration: "Mês 2",
    period: "Dias 30 a 60 (Construção)",
    description: "Desenvolvimento da infraestrutura própria da marca aplicando o brandbook de alta qualidade e garantindo fácil navegação.",
    actions: [
      "Lançar o site institucional rápido, responsivo, empregando cores e tipografias do brandbook profissional.",
      "Inserir os códigos Schema.org (LocalBusiness microformats) no cabeçalho do site para validação semântica nos buscadores locais.",
      "Habilitar uma sessão de vitrine/catálogo digital categorizado, conectando botões diretos ao WhatsApp com dados de interesse.",
      "Escrever o primeiro artigo informativo local: 'Como escolher roupa fitness para academia em Indaiatuba' focando em SEO orgânico.",
      "Inserir a seção de depoimentos e avaliações recebidas no showroom na página inicial do site institucional.",
      "Desenhar o cronograma visual semanal do Instagram, dividindo o conteúdo entre valor do produto, depoimentos reais e manifesto."
    ]
  },
  {
    id: 3,
    title: "Autoridade Local & Domínio do Mercado",
    duration: "Mês 3",
    period: "Dias 60 a 90 (Crescimento)",
    description: "Ações de engajamento orgânico local, criação de parcerias presenciais e acompanhamento focado na conversão real.",
    actions: [
      "Publicar artigo relevante no blog: 'Tendências em moda fitness feminina para a estação' indexando termos de Indaiatuba.",
      "Adicionar seção de perguntas frequentes do site (FAQ) com navegação rápida de frete ou tamanho para otimizar vendas.",
      "Analisar concorrentes locais nas buscas convencionais do Google e ajustar as palavras-chave chave de cauda longa.",
      "Desenvolver 1 Reels semanal criativo dialogando com os pilares (transformação corporal, conforto das peças no agachamento, etc.).",
      "Propor parcerias táticas com 3 personal trainers de Indaiatuba influentes para experimentar e recomendar as calças e tops Elife.",
      "Analisar o tráfego gerado nos primeiros 60 dias para otimizar os fluxos de mensagens de conversão no WhatsApp."
    ]
  }
];

export const PROPOSAL_PACKAGES: ProposalPackage[] = [
  {
    id: "parceria-orvalia",
    name: "Parceria Orvalia",
    description: "Nossa condição de parceria mais recomendada e exclusiva para dar robustez digital imediata e posicionamento de busca à Elife Fitness. Criamos o setup estratégico completo da marca e o primeiro mês de postagens otimizadas.",
    features: [
      "Setup Digital Completo: Criação estruturada, geolocalização e certificação oficial no Google Meu Negócio / Maps",
      "Otimização GEO e SEO local altamente focada no público consumidor de Indaiatuba, SP",
      "Primeiro mês de Redes Sociais: Cronograma de 12 postagens estratégicas de alta qualidade visual aplicando seu Brandbook",
      "Registro de Domínio Próprio (.com.br) gratuito e custeado sob medida pela Orvalia por 1 ano completo",
      "Cadastro e validação semântica em sitemaps e principais diretórios locais locais de relevância",
      "Suporte VIP dedicado e consultoria estratégica direta para consolidar a presença digital da Elife"
    ],
    price: "R$ 800",
    type: "Setup Integrado + 1º Mês de Redes Sociais",
    badge: "Parceria Orvalia Studio",
    isPopular: true
  }
];
