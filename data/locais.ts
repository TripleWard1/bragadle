export interface Local {
  id: string;
  nome: string;
  tipo:
    | 'Monumento'
    | 'Igreja'
    | 'Jardim'
    | 'Museu'
    | 'Gastronomia'
    | 'Arqueologia'
    | 'Desporto'
    | 'Cultura'
    | 'Universidade'
    | 'Miradouro';
  freguesia: string;
  seculo: number;
  lat: number;
  lng: number;
  curiosidade: string;
}

export const LOCAIS_BRAGA: Local[] = [
  // ── IGREJAS ──────────────────────────────────────────────────────────────
  {
    id: '1',
    nome: 'Sé de Braga',
    tipo: 'Igreja',
    freguesia: 'Sé',
    seculo: 11,
    lat: 41.5503,
    lng: -8.4275,
    curiosidade:
      'É a catedral mais antiga de Portugal, fundada logo após a Reconquista cristã, tornando Braga a diocese mais velha do país.',
  },
  {
    id: '9',
    nome: 'Capela de São Frutuoso de Montélios',
    tipo: 'Igreja',
    freguesia: 'Real',
    seculo: 7,
    lat: 41.5606,
    lng: -8.4389,
    curiosidade:
      'Um dos raríssimos monumentos pré-românicos de influência visigótica em toda a Península Ibérica, datando do século VII.',
  },
  {
    id: '17',
    nome: 'Igreja de Santa Cruz',
    tipo: 'Igreja',
    freguesia: 'São João do Souto',
    seculo: 17,
    lat: 41.5498,
    lng: -8.4242,
    curiosidade:
      'Conhecida pelas lendas dos galos esculpidos na pedra — conta-se que os solteiros tentam encontrá-los às escuras para garantir sorte no amor.',
  },
  {
    id: '18',
    nome: 'Igreja do Pópulo',
    tipo: 'Igreja',
    freguesia: 'São Vicente',
    seculo: 16,
    lat: 41.5522,
    lng: -8.4278,
    curiosidade:
      'Templo neoclássico que alberga os restos mortais de D. Frei Bartolomeu dos Mártires, um dos grandes reformadores da Igreja Católica portuguesa.',
  },
  {
    id: '21',
    nome: 'Basílica dos Congregados',
    tipo: 'Igreja',
    freguesia: 'São José de São Lázaro',
    seculo: 18,
    lat: 41.5516,
    lng: -8.4216,
    curiosidade:
      'Obra impressionante do arquiteto André Soares, cujas torres sineiras só foram concluídas no século XX — mais de 200 anos depois do início da construção.',
  },
  {
    id: '23',
    nome: 'Igreja de São João do Souto',
    tipo: 'Igreja',
    freguesia: 'São João do Souto',
    seculo: 12,
    lat: 41.5508,
    lng: -8.4248,
    curiosidade:
      'Uma das mais antigas igrejas paroquiais da cidade, com origens medievais e uma bela Capela dos Coimbras anexa com azulejos notáveis.',
  },
  {
    id: '24',
    nome: 'Igreja de São Marcos',
    tipo: 'Igreja',
    freguesia: 'São Marcos',
    seculo: 18,
    lat: 41.5558,
    lng: -8.4234,
    curiosidade:
      'Parte do antigo Hospital de São Marcos, construída no mesmo complexo barroco que serviu de principal hospital da cidade durante séculos.',
  },
  {
    id: '25',
    nome: 'Igreja dos Terceiros',
    tipo: 'Igreja',
    freguesia: 'Sé',
    seculo: 18,
    lat: 41.5519,
    lng: -8.4283,
    curiosidade:
      'Pertencente à Ordem Terceira de São Francisco, destaca-se pelo seu interior ricamente decorado com talha dourada barroca.',
  },
  {
    id: '26',
    nome: 'Igreja de Nossa Senhora do Leite',
    tipo: 'Igreja',
    freguesia: 'Sé',
    seculo: 16,
    lat: 41.5498,
    lng: -8.4269,
    curiosidade:
      'Pequena ermida renascentista dedicada a uma das invocações mais antigas de Braga, ligada à devoção mariana da cidade episcopal.',
  },
  {
    id: '27',
    nome: 'Igreja de São Vicente de Braga',
    tipo: 'Igreja',
    freguesia: 'São Vicente',
    seculo: 17,
    lat: 41.5531,
    lng: -8.4212,
    curiosidade:
      'Erguida no local onde, segundo a tradição, esteve sepultado o mártir São Vicente antes de os seus restos serem trasladados para Lisboa.',
  },
  {
    id: '28',
    nome: 'Igreja dos Remédios',
    tipo: 'Igreja',
    freguesia: 'São Lázaro',
    seculo: 17,
    lat: 41.5461,
    lng: -8.4218,
    curiosidade:
      'Igreja com fachada barroca imponente, associada ao convento das freiras dominicanas que marcou a vida religiosa feminina de Braga.',
  },
  {
    id: '29',
    nome: 'Igreja de São Vítor',
    tipo: 'Igreja',
    freguesia: 'São Vítor',
    seculo: 12,
    lat: 41.5478,
    lng: -8.4181,
    curiosidade:
      'Paróquia com origens medievais cujo padroeiro dá nome a uma das zonas mais populosas e vibrantes da cidade moderna.',
  },
  {
    id: '30',
    nome: 'Igreja de Santa Tecla',
    tipo: 'Igreja',
    freguesia: 'Maximinos',
    seculo: 18,
    lat: 41.5447,
    lng: -8.4321,
    curiosidade:
      'Igreja de bairro com uma história discreta mas profundamente enraizada na espiritualidade popular do antigo arrabaldes romano de Maximinos.',
  },
  // ── MONUMENTOS ───────────────────────────────────────────────────────────
  {
    id: '2',
    nome: 'Santuário do Bom Jesus do Monte',
    tipo: 'Monumento',
    freguesia: 'Tenões',
    seculo: 18,
    lat: 41.5546,
    lng: -8.3774,
    curiosidade:
      'Classificado como Património Mundial da UNESCO, possui o funicular mais antigo do mundo ainda em funcionamento por contrapeso de água.',
  },
  {
    id: '3',
    nome: 'Santuário de Nossa Senhora do Sameiro',
    tipo: 'Monumento',
    freguesia: 'Espinho',
    seculo: 19,
    lat: 41.5408,
    lng: -8.3694,
    curiosidade:
      'É o segundo maior centro de devoção mariana em Portugal, num dos pontos mais altos da região, com vistas deslumbrantes sobre o Minho.',
  },
  {
    id: '6',
    nome: 'Palácio do Raio',
    tipo: 'Monumento',
    freguesia: 'São José de São Lázaro',
    seculo: 18,
    lat: 41.5484,
    lng: -8.4214,
    curiosidade:
      'Também conhecido como Casa do Mexicano, exibe uma das fachadas de azulejos rococó mais exuberantes e fotogénicas de todo o país.',
  },
  {
    id: '7',
    nome: 'Arco da Porta Nova',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 18,
    lat: 41.5506,
    lng: -8.4292,
    curiosidade:
      'A entrada triunfal da cidade nunca teve uma porta física com trancas, dando origem à expressão "Porta Fiel" e a vários ditos populares bracarenses.',
  },
  {
    id: '8',
    nome: 'Mosteiro de São Martinho de Tibães',
    tipo: 'Monumento',
    freguesia: 'Mire de Tibães',
    seculo: 11,
    lat: 41.5562,
    lng: -8.4791,
    curiosidade:
      'Foi a Casa-Mãe da Congregação Beneditina em Portugal e no Brasil, possuindo um dos interiores barrocos mais ricos e bem preservados do noroeste ibérico.',
  },
  {
    id: '12',
    nome: 'Torre de Menagem do Castelo de Braga',
    tipo: 'Monumento',
    freguesia: 'São João do Souto',
    seculo: 14,
    lat: 41.5511,
    lng: -8.4241,
    curiosidade:
      'Único elemento sobrevivente do castelo medieval que defendia o centro da cidade, hoje encravado entre edifícios modernos como testemunho silencioso da Idade Média.',
  },
  {
    id: '13',
    nome: 'Casa dos Crivos',
    tipo: 'Monumento',
    freguesia: 'São João do Souto',
    seculo: 17,
    lat: 41.5505,
    lng: -8.4251,
    curiosidade:
      'Exemplo único de habitação urbana do século XVII com janelas integralmente cobertas por treliças de madeira — uma solução original de privacidade e ventilação.',
  },
  {
    id: '15',
    nome: 'GNRation',
    tipo: 'Monumento',
    freguesia: 'São Vicente',
    seculo: 21,
    lat: 41.5528,
    lng: -8.4222,
    curiosidade:
      'Antigo quartel da GNR reconvertido num centro cultural vibrante, hoje considerado uma das melhores infraestruturas criativas do país focadas em artes digitais.',
  },
  {
    id: '31',
    nome: 'Antigo Paço Episcopal de Braga',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 14,
    lat: 41.5513,
    lng: -8.4258,
    curiosidade:
      'Complexo palaciano de fundação medieval que albergou os arcebispos bracarenses durante séculos, hoje sede da reitoria da Universidade do Minho.',
  },
  {
    id: '32',
    nome: 'Câmara Municipal de Braga',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 18,
    lat: 41.5501,
    lng: -8.4261,
    curiosidade:
      'Edifício neoclássico construído em plena Praça do Município, onde funcionou a primeira câmara liberal do país após o triunfo da revolução de 1820.',
  },
  {
    id: '33',
    nome: 'Theatro Circo',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5509,
    lng: -8.4238,
    curiosidade:
      'Inaugurado em 1915, foi o maior teatro da Península Ibérica na época e, após décadas de abandono, foi magistralmente restaurado reabrindo em 2011.',
  },
  {
    id: '34',
    nome: 'Palácio dos Biscainhos (exterior)',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 17,
    lat: 41.5517,
    lng: -8.4294,
    curiosidade:
      'Palácio aristocrático cujos jardins barrocos são considerados dos mais bem preservados do norte de Portugal, com tanques, fontes e buxos centenários.',
  },
  {
    id: '35',
    nome: 'Torre do Relógio — Porta do Souto',
    tipo: 'Monumento',
    freguesia: 'São João do Souto',
    seculo: 14,
    lat: 41.5509,
    lng: -8.4245,
    curiosidade:
      'Antiga entrada da cidade medieval integrada no tecido urbano histórico, com relógio público que marcava o tempo da comunidade bracarense há séculos.',
  },
  {
    id: '36',
    nome: 'Palácio do Centennial / Casa Nogueira Lima',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 19,
    lat: 41.5521,
    lng: -8.4271,
    curiosidade:
      'Palacete de influência eclética construído por um emigrante enriquecido no Brasil, símbolo da chamada arquitetura dos "brasileiros" no Minho.',
  },
  // ── ARQUEOLOGIA ──────────────────────────────────────────────────────────
  {
    id: '10',
    nome: 'Termas Romanas de Maximinos',
    tipo: 'Arqueologia',
    freguesia: 'Maximinos',
    seculo: 1,
    lat: 41.5458,
    lng: -8.4303,
    curiosidade:
      'Ruínas de um dos maiores complexos públicos de banhos da antiga Bracara Augusta, descobertas em plena zona residencial moderna.',
  },
  {
    id: '11',
    nome: 'Fonte do Ídolo',
    tipo: 'Arqueologia',
    freguesia: 'São Lázaro',
    seculo: 1,
    lat: 41.5492,
    lng: -8.4225,
    curiosidade:
      'Santuário rupestre romano esculpido numa rocha de granito com inscrições dedicadas à divindade indígena Tongus Nabiagus, única no mundo.',
  },
  {
    id: '37',
    nome: 'Domus da Escola Velha da Sé',
    tipo: 'Arqueologia',
    freguesia: 'Sé',
    seculo: 1,
    lat: 41.5497,
    lng: -8.4269,
    curiosidade:
      'Vestígios de uma casa romana de atrium descobertos mesmo no coração da área catedralícia, visíveis através de janelas arqueológicas no pavimento.',
  },
  {
    id: '38',
    nome: 'Criptopórtico Romano',
    tipo: 'Arqueologia',
    freguesia: 'Sé',
    seculo: 1,
    lat: 41.5503,
    lng: -8.4263,
    curiosidade:
      'Corredor subterrâneo romano descoberto sob o Jardim de Santa Bárbara, parte da imponente infraestrutura urbana de Bracara Augusta no século I d.C.',
  },
  {
    id: '39',
    nome: 'Museu da Imagem (Ex-Convento dos Remédios — Nível Arqueológico)',
    tipo: 'Arqueologia',
    freguesia: 'São Lázaro',
    seculo: 1,
    lat: 41.5463,
    lng: -8.4216,
    curiosidade:
      'Abaixo do museu de fotografia, jazem vestígios de uma necrópole romana e estruturas paleocristãs integradas na visita museológica.',
  },
  // ── JARDINS E ESPAÇOS VERDES ──────────────────────────────────────────────
  {
    id: '4',
    nome: 'Jardim de Santa Bárbara',
    tipo: 'Jardim',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5512,
    lng: -8.4261,
    curiosidade:
      'Jardim público deslumbrante emoldurado pelas alas medievais do Antigo Paço Episcopal, considerado um dos mais fotogénicos do país.',
  },
  {
    id: '20',
    nome: 'Parque da Ponte',
    tipo: 'Jardim',
    freguesia: 'São Lázaro',
    seculo: 20,
    lat: 41.5415,
    lng: -8.4191,
    curiosidade:
      'Parque urbano verdejante que acolhe as colossais Festas de São João, um dos maiores eventos de verão do norte de Portugal.',
  },
  {
    id: '40',
    nome: 'Parque de Lazer das Sete Fontes',
    tipo: 'Jardim',
    freguesia: 'São João de Souto',
    seculo: 18,
    lat: 41.5601,
    lng: -8.4334,
    curiosidade:
      'Parque histórico com o complexo hidráulico que abasteceu a cidade durante séculos, com sete nascentes naturais ainda ativas.',
  },
  {
    id: '41',
    nome: 'Jardim do Parque de Exposure (Braga Parque)',
    tipo: 'Jardim',
    freguesia: 'Ferreiros',
    seculo: 21,
    lat: 41.5368,
    lng: -8.4218,
    curiosidade:
      'Espaço verde contemporâneo que circunda o maior centro comercial da cidade, tornando-se ponto de encontro de jovens e famílias ao fim de semana.',
  },
  {
    id: '42',
    nome: 'Horto de Santa Maria Madalena',
    tipo: 'Jardim',
    freguesia: 'Maximinos',
    seculo: 19,
    lat: 41.5449,
    lng: -8.4341,
    curiosidade:
      'Antigo jardim de clausura pertencente a um convento feminino, hoje espaço público com espécies botânicas raras e fontes barrocas.',
  },
  // ── MUSEUS E CULTURA ─────────────────────────────────────────────────────
  {
    id: '14',
    nome: 'Museu dos Biscainhos',
    tipo: 'Museu',
    freguesia: 'Sé',
    seculo: 17,
    lat: 41.5517,
    lng: -8.4294,
    curiosidade:
      'Instalado num palácio aristocrático, retrata a vida da nobreza nortenha com um dos jardins barrocos mais bem preservados de Portugal.',
  },
  {
    id: '19',
    nome: 'Museu de Arqueologia D. Diogo de Sousa',
    tipo: 'Museu',
    freguesia: 'São Vicente',
    seculo: 20,
    lat: 41.5445,
    lng: -8.4239,
    curiosidade:
      'Guarda a maior coleção de miliários romanos do país e artefactos únicos das escavações de Bracara Augusta, a capital romana da Galécia.',
  },
  {
    id: '43',
    nome: 'Museu da Imagem',
    tipo: 'Museu',
    freguesia: 'São Lázaro',
    seculo: 20,
    lat: 41.5463,
    lng: -8.4216,
    curiosidade:
      'Dedicado à história da fotografia em Portugal, instalado num antigo convento onde o silêncio monástico contrasta com imagens que capturam décadas do mundo.',
  },
  {
    id: '44',
    nome: 'Arquivo Distrital de Braga',
    tipo: 'Museu',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5504,
    lng: -8.4253,
    curiosidade:
      'Depositário de documentação histórica secular, incluindo registos eclesiásticos de todo o noroeste peninsular que atraem investigadores de todo o mundo.',
  },
  {
    id: '45',
    nome: 'Museu Nogueira da Silva',
    tipo: 'Museu',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5538,
    lng: -8.4221,
    curiosidade:
      'Alberga uma valiosa coleção de artes decorativas doada à Universidade do Minho, com porcelanas, joias e mobiliário de exceção dos séculos XVII ao XX.',
  },
  {
    id: '46',
    nome: 'Centro de Ciência Viva de Braga',
    tipo: 'Cultura',
    freguesia: 'São Vítor',
    seculo: 21,
    lat: 41.5479,
    lng: -8.4181,
    curiosidade:
      'Um espaço interativo de divulgação científica que transforma conceitos complexos de física, biologia e astronomia em experiências lúdicas para todas as idades.',
  },
  {
    id: '47',
    nome: 'Biblioteca Lúcio Craveiro da Silva',
    tipo: 'Cultura',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5507,
    lng: -8.4231,
    curiosidade:
      'A principal biblioteca pública da cidade, instalada numa antiga fábrica de fiação num exemplo notável de reabilitação industrial ao serviço da cultura.',
  },
  {
    id: '48',
    nome: 'Conservatório de Música Calouste Gulbenkian de Braga',
    tipo: 'Cultura',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5524,
    lng: -8.4261,
    curiosidade:
      'Instalado num palácio histórico, é uma das mais antigas e reputadas escolas de música do norte de Portugal, formando gerações de músicos portugueses.',
  },
  // ── GASTRONOMIA ──────────────────────────────────────────────────────────
  {
    id: '5',
    nome: 'Frigideiras do Cantinho',
    tipo: 'Gastronomia',
    freguesia: 'São João do Souto',
    seculo: 18,
    lat: 41.5507,
    lng: -8.4244,
    curiosidade:
      'O estabelecimento comercial mais antigo da cidade, famoso pelo pastel de carne designado "frigideira", receita secreta transmitida de geração em geração.',
  },
  {
    id: '22',
    nome: 'Tíbias de Braga (Pastelaria Bananeira)',
    tipo: 'Gastronomia',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.551,
    lng: -8.427,
    curiosidade:
      'Especialidade doceira bracarense de massa frita recheada com creme de pasteleiro — a "tíbia" é um dos ícones gastronómicos incontornáveis da cidade.',
  },
  {
    id: '49',
    nome: 'Mercado Municipal de Braga',
    tipo: 'Gastronomia',
    freguesia: 'São Vicente',
    seculo: 20,
    lat: 41.5534,
    lng: -8.4198,
    curiosidade:
      'O coração abastecedor da cidade, onde se encontram as melhores carnes, peixes, queijos, presuntos e doçaria regional do Minho em ambiente animadíssimo.',
  },
  {
    id: '50',
    nome: 'Praça Conde de Agrolongo (Zona de Cafés Históricos)',
    tipo: 'Gastronomia',
    freguesia: 'Sé',
    seculo: 19,
    lat: 41.5506,
    lng: -8.4235,
    curiosidade:
      'Praça histórica onde se encontram alguns dos cafés e tascas mais antigas de Braga, ponto de encontro de políticos, jornalistas e intelectuais desde o século XIX.',
  },
  {
    id: '51',
    nome: 'Tasca do Zé',
    tipo: 'Gastronomia',
    freguesia: 'Maximinos',
    seculo: 20,
    lat: 41.5451,
    lng: -8.4288,
    curiosidade:
      'Ícone da cozinha popular bracarense, famosa pelo bacalhau à Zé da Broa e pelo ambiente de taberna tradicional que resiste ao modernismo gastronómico.',
  },
  // ── DESPORTO ─────────────────────────────────────────────────────────────
  {
    id: '16',
    nome: 'Estádio Municipal de Braga (A Pedreira)',
    tipo: 'Desporto',
    freguesia: 'Dume',
    seculo: 21,
    lat: 41.5633,
    lng: -8.4294,
    curiosidade:
      'Desenhado pelo arquiteto Souto Moura e premiado mundialmente, este estádio foi literalmente esculpido na encosta granítica do Monte do Castro.',
  },
  {
    id: '52',
    nome: 'Estádio 1.º de Maio (SC Braga — antigo)',
    tipo: 'Desporto',
    freguesia: 'São Vítor',
    seculo: 20,
    lat: 41.5483,
    lng: -8.4136,
    curiosidade:
      'O histórico campo onde o SC Braga jogou durante décadas, palco de memórias inesquecíveis antes da mudança para a Pedreira nos anos 2000.',
  },
  {
    id: '53',
    nome: 'Pavilhão Multiusos de Braga',
    tipo: 'Desporto',
    freguesia: 'Maximinos',
    seculo: 21,
    lat: 41.5489,
    lng: -8.4352,
    curiosidade:
      'Polivalente moderno que acolhe desde concertos internacionais a campeonatos nacionais de andebol e basquetebol, com capacidade para mais de 10 mil espectadores.',
  },
  // ── UNIVERSIDADE ─────────────────────────────────────────────────────────
  {
    id: '54',
    nome: 'Campus de Gualtar — Universidade do Minho',
    tipo: 'Universidade',
    freguesia: 'Gualtar',
    seculo: 20,
    lat: 41.5604,
    lng: -8.3976,
    curiosidade:
      'Principal campus da Universidade do Minho, fundada em 1973, hoje uma das mais internacionalizadas de Portugal com destaque em engenharia e ciências.',
  },
  {
    id: '55',
    nome: 'Instituto Politécnico do Cávado e do Ave (IPCA)',
    tipo: 'Universidade',
    freguesia: 'Barcelos',
    seculo: 20,
    lat: 41.5369,
    lng: -8.4167,
    curiosidade:
      'Instituição de ensino superior politécnico que cobre a região do Minho, com forte vocação para a gestão, turismo e design de moda.',
  },
  {
    id: '56',
    nome: 'Campus de Azurém — Universidade do Minho',
    tipo: 'Universidade',
    freguesia: 'Azurém',
    seculo: 20,
    lat: 41.4418,
    lng: -8.2981,
    curiosidade:
      'Campus universitário em Guimarães dedicado maioritariamente à Escola de Engenharia, partilhando projetos com o ecossistema industrial da região.',
  },
  // ── MIRADOUROS ───────────────────────────────────────────────────────────
  {
    id: '57',
    nome: 'Miradouro do Bom Jesus — Terraço Superior',
    tipo: 'Miradouro',
    freguesia: 'Tenões',
    seculo: 20,
    lat: 41.5549,
    lng: -8.378,
    curiosidade:
      'Do alto do Santuário do Bom Jesus avista-se Braga, o vale do Cávado e, em dias límpidos, o oceano Atlântico a mais de 50 quilómetros de distância.',
  },
  {
    id: '58',
    nome: 'Miradouro do Sameiro',
    tipo: 'Miradouro',
    freguesia: 'Espinho',
    seculo: 20,
    lat: 41.541,
    lng: -8.3697,
    curiosidade:
      'A uma altitude de cerca de 570 metros, oferece uma das mais vastas panorâmicas do noroeste ibérico, com o Gerês e os picos da Galiza visíveis.',
  },
  {
    id: '59',
    nome: 'Monte de Santa Marta',
    tipo: 'Miradouro',
    freguesia: 'Gualtar',
    seculo: 20,
    lat: 41.5584,
    lng: -8.4042,
    curiosidade:
      'Colina que domina o campus universitário de Gualtar, com uma pequena ermida no cume e trilhos naturais muito frequentados pela comunidade académica.',
  },
  // ── MAIS MONUMENTOS E LOCAIS ─────────────────────────────────────────────
  {
    id: '60',
    nome: 'Praça da República (Avenida Central)',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 19,
    lat: 41.5505,
    lng: -8.423,
    curiosidade:
      'O coração cosmopolita de Braga, com o famoso Café Vianna como cenário de tertúlias políticas e literárias desde a monarquia constitucional.',
  },
  {
    id: '61',
    nome: 'Rua do Souto (Eixo Histórico Central)',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 12,
    lat: 41.5503,
    lng: -8.4253,
    curiosidade:
      'Principal artéria pedonal da cidade histórica, com cerca de 900 anos de história comercial contínua, sendo provavelmente a rua mais antiga em uso no país.',
  },
  {
    id: '62',
    nome: 'Convento do Salvador de Vilar de Frades',
    tipo: 'Monumento',
    freguesia: 'Vilar de Frades',
    seculo: 9,
    lat: 41.5081,
    lng: -8.3764,
    curiosidade:
      'Mosteiro de fundação visigótica que albergou comunidades monásticas ininterruptamente até ao século XIX, conservando elementos arquitetónicos de múltiplas épocas.',
  },
  {
    id: '63',
    nome: 'Necrópole de Bracara Augusta',
    tipo: 'Arqueologia',
    freguesia: 'Maximinos',
    seculo: 1,
    lat: 41.5455,
    lng: -8.4312,
    curiosidade:
      'Vasta área funerária da cidade romana descoberta durante obras urbanas, com mausoléus, estelas e objetos votivos que revelam a diversidade cultural da antiga Bracara.',
  },
  {
    id: '64',
    nome: 'Colina do Fujacal',
    tipo: 'Miradouro',
    freguesia: 'São José de São Lázaro',
    seculo: 20,
    lat: 41.547,
    lng: -8.4227,
    curiosidade:
      'Parque urbano elevado com vistas sobre o centro histórico, muito frequentado por famílias e praticantes de exercício ao final da tarde.',
  },
  {
    id: '65',
    nome: 'Santuário de Nossa Senhora do Pópulo — Termas de Caldas de Vizela',
    tipo: 'Monumento',
    freguesia: 'Caldas de Vizela',
    seculo: 16,
    lat: 41.3726,
    lng: -8.3003,
    curiosidade:
      'Localizado nas termas históricas de Vizela, este santuário atrai peregrinos e doentes que acreditam nas propriedades terapêuticas das suas águas sulfúrosas.',
  },
  {
    id: '66',
    nome: 'Museu Pio XII',
    tipo: 'Museu',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5497,
    lng: -8.4274,
    curiosidade:
      'Museu eclesiástico com uma das coleções de arte sacra, ourivesaria e arqueologia paleocristã mais importantes do norte de Portugal.',
  },
  {
    id: '67',
    nome: 'Claustro da Sé de Braga',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 14,
    lat: 41.5501,
    lng: -8.427,
    curiosidade:
      'Claustro gótico onde repousam arcebispos e nobres medievais, com lápides tumulares que narram séculos de poder eclesiástico e aristocrático bracarense.',
  },
  {
    id: '68',
    nome: 'Aqueduto das Sete Fontes',
    tipo: 'Monumento',
    freguesia: 'São João do Souto',
    seculo: 18,
    lat: 41.562,
    lng: -8.4355,
    curiosidade:
      'Sistema hidráulico barroco construído pelo arcebispo D. Rodrigo de Moura Teles para abastecer Braga, visível em vários pontos do parque com as suas arcadas graníticas.',
  },
  {
    id: '69',
    nome: 'Largo do Paço',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 14,
    lat: 41.5514,
    lng: -8.4257,
    curiosidade:
      'Centro nevrálgico do poder eclesiástico em Braga durante séculos, ladeado pelo Antigo Paço Episcopal e pelo Jardim de Santa Bárbara, é hoje sede da Universidade do Minho.',
  },
  {
    id: '70',
    nome: 'Igreja e Convento do Pópulo',
    tipo: 'Igreja',
    freguesia: 'São Vicente',
    seculo: 16,
    lat: 41.5523,
    lng: -8.4278,
    curiosidade:
      'Fundado pelos frades agostinhos em 1596, o convento adjacente acolheu o Tribunal do Santo Ofício em Braga durante o período da Inquisição.',
  },
];