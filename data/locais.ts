export interface Local {
  id: string;
  nome: string;
  tipo: 'Monumento' | 'Igreja' | 'Jardim' | 'Museu' | 'Gastronomia' | 'Arqueologia' | 'Cultura' | 'Desporto';
  freguesia: string;
  seculo: number;
  lat: number;
  lng: number;
  curiosidade: string;
}

export const LOCAIS_BRAGA: Local[] = [
  {
    id: '1',
    nome: 'Sé de Braga',
    tipo: 'Igreja',
    freguesia: 'Sé',
    seculo: 11,
    lat: 41.5503,
    lng: -8.4275,
    curiosidade: 'A catedral mais antiga de Portugal, cuja construção começou em 1070 sob o bispo D. Pedro. Guarda o túmulo do arcebispo D. Lourenço Vicente, herói da batalha de Aljubarrota, e possui um órgão barroco do século XVIII considerado um dos mais belos do mundo.'
  },
  {
    id: '2',
    nome: 'Santuário do Bom Jesus do Monte',
    tipo: 'Monumento',
    freguesia: 'Tenões',
    seculo: 18,
    lat: 41.5546,
    lng: -8.3774,
    curiosidade: 'Classificado como Património Mundial da UNESCO em 2019, é o único bem cultural português desta lista fora de um centro urbano. O escadório barroco dos Cinco Sentidos foi iniciado em 1723 pelo arcebispo D. Rodrigo de Moura Teles e é percorrido por peregrinos de joelhos.'
  },
  {
    id: '3',
    nome: 'Santuário de Nossa Senhora do Sameiro',
    tipo: 'Monumento',
    freguesia: 'Espinho',
    seculo: 19,
    lat: 41.5408,
    lng: -8.3694,
    curiosidade: 'Segundo maior centro de devoção mariana de Portugal, a basílica foi concluída em 1891 a 566 metros de altitude. Todos os anos, no domingo seguinte ao Pentecostes, atrai centenas de milhares de peregrinos numa das maiores romarias do norte do país.'
  },
  {
    id: '4',
    nome: 'Jardim de Santa Bárbara',
    tipo: 'Jardim',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5512,
    lng: -8.4261,
    curiosidade: 'Inaugurado em 1955, este jardim de canteiros geométricos com rosas multicoloridas é emoldurado pelas alas medievais e barrocas do Antigo Paço Episcopal. É considerado um dos espaços verdes mais fotografados do norte de Portugal, especialmente na primavera.'
  },
  {
    id: '5',
    nome: 'Frigideiras do Cantinho',
    tipo: 'Gastronomia',
    freguesia: 'São João do Souto',
    seculo: 18,
    lat: 41.5507,
    lng: -8.4244,
    curiosidade: 'Fundado em 1796, é o estabelecimento comercial mais antigo de Braga ainda em funcionamento. A "frigideira" é um pastel de massa folhada circular recheado com carne temperada, cuja receita original permanece secreta e transmitida de geração em geração.'
  },
  {
    id: '6',
    nome: 'Palácio do Raio',
    tipo: 'Monumento',
    freguesia: 'São Lázaro',
    seculo: 18,
    lat: 41.5484,
    lng: -8.4214,
    curiosidade: 'Obra-prima do barroco rococó desenhada por André Soares em 1754 para o negociante João Duarte de Faria. Também chamado "Casa do Mexicano", a sua fachada é integralmente revestida por azulejos azuis e brancos com cenas alegóricas — uma das mais exuberantes de Portugal.'
  },
  {
    id: '7',
    nome: 'Arco da Porta Nova',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 18,
    lat: 41.5506,
    lng: -8.4292,
    curiosidade: 'Construído em 1772 por ordem do arcebispo D. Gaspar de Bragança, este arco triunfal nunca chegou a ter portas com fechadura. Daí o dito popular sobre a hospitalidade bracarense — uma cidade que nunca fecha as portas a ninguém.'
  },
  {
    id: '8',
    nome: 'Mosteiro de São Martinho de Tibães',
    tipo: 'Monumento',
    freguesia: 'Mire de Tibães',
    seculo: 11,
    lat: 41.5562,
    lng: -8.4791,
    curiosidade: 'Casa-Mãe da Congregação Beneditina em Portugal e no Brasil até 1834, quando foi extinto com as ordens religiosas. A sua igreja possui um dos mais ricos interiores barrocos do país, com talha dourada, azulejos e pinturas dos séculos XVII e XVIII.'
  },
  {
    id: '9',
    nome: 'Capela de São Frutuoso de Montélios',
    tipo: 'Igreja',
    freguesia: 'Real',
    seculo: 7,
    lat: 41.5606,
    lng: -8.4389,
    curiosidade: 'Construída no século VII em estilo visigótico, com planta em cruz grega e influências bizantinas, é um dos monumentos pré-românicos mais raros da Península Ibérica. Terá sido o mausoléu do bispo São Frutuoso de Braga, um dos mais importantes prelados da Hispânia visigótica.'
  },
  {
    id: '10',
    nome: 'Termas Romanas de Maximinos',
    tipo: 'Arqueologia',
    freguesia: 'Maximinos',
    seculo: 1,
    lat: 41.5458,
    lng: -8.4303,
    curiosidade: 'Um dos maiores complexos termais públicos da antiga Bracara Augusta, capital romana da Galécia. Descobertos durante obras urbanas no século XX, incluem salas frias, mornas e quentes (frigidarium, tepidarium e caldarium) com sistemas de aquecimento por hipocausto.'
  },
  {
    id: '11',
    nome: 'Fonte do Ídolo',
    tipo: 'Arqueologia',
    freguesia: 'São Lázaro',
    seculo: 1,
    lat: 41.5492,
    lng: -8.4225,
    curiosidade: 'Santuário rupestre romano do século I escavado diretamente na rocha de granito, dedicado à divindade indígena Tongus Nabiagus. Único no mundo: preserva o nome do artesão que o esculpiu — Celicus Fronto — numa inscrição original que sobreviveu dois milénios.'
  },
  {
    id: '12',
    nome: 'Torre de Menagem',
    tipo: 'Monumento',
    freguesia: 'São João do Souto',
    seculo: 14,
    lat: 41.5511,
    lng: -8.4241,
    curiosidade: 'Único vestígio do castelo medieval de Braga, erguido no século XIV durante o reinado de D. Afonso IV. O restante castelo foi demolido em 1906 para alargamento das vias urbanas, sobrevivendo apenas esta torre encravada entre edifícios modernos no coração da cidade histórica.'
  },
  {
    id: '13',
    nome: 'Casa dos Crivos',
    tipo: 'Monumento',
    freguesia: 'São João do Souto',
    seculo: 17,
    lat: 41.5505,
    lng: -8.4251,
    curiosidade: 'Edifício do século XVII cujas janelas estão inteiramente cobertas por gelosias de madeira em treliça — os "crivos" que lhe dão o nome. Esta solução de influência mourisco-oriental permitia às habitantes observar a rua sem serem vistas, garantindo privacidade numa cidade episcopal muito conservadora.'
  },
  {
    id: '14',
    nome: 'Museu dos Biscainhos',
    tipo: 'Museu',
    freguesia: 'Sé',
    seculo: 17,
    lat: 41.5517,
    lng: -8.4294,
    curiosidade: 'Instalado num palácio aristocrático do século XVII pertencente à família dos Biscainhos. O jardim formal barroco, com esculturas de granito, tanques e buxos recortados, é considerado um dos mais bem preservados do norte de Portugal e raramente faltou em nenhum calendário de jardins históricos.'
  },
  {
    id: '15',
    nome: 'GNRation',
    tipo: 'Cultura',
    freguesia: 'São Vicente',
    seculo: 21,
    lat: 41.5528,
    lng: -8.4222,
    curiosidade: 'Polo cultural inaugurado em 2014 num antigo quartel da GNR datado de 1915. Especializado em música contemporânea, artes digitais e indústrias criativas, foi distinguido com vários prémios de arquitetura pela reconversão exemplar de um edifício histórico militar em espaço cultural de vanguarda.'
  },
  {
    id: '16',
    nome: 'Estádio Municipal de Braga',
    tipo: 'Desporto',
    freguesia: 'Dume',
    seculo: 21,
    lat: 41.5633,
    lng: -8.4294,
    curiosidade: 'Projetado por Eduardo Souto de Moura, laureado com o Prémio Pritzker em 2011, e inaugurado em 2003 para o Euro 2004. Escavado diretamente na rocha do Monte do Castro, não tem bancadas em dois dos quatro lados — uma solução arquitetónica única no mundo do futebol profissional.'
  },
  {
    id: '17',
    nome: 'Igreja de Santa Cruz',
    tipo: 'Igreja',
    freguesia: 'São João do Souto',
    seculo: 17,
    lat: 41.5498,
    lng: -8.4242,
    curiosidade: 'Templo barroco do século XVII com fachada em granito ricamente esculpida. Segundo a tradição local, existem dois galos escondidos nos frisos da fachada — os solteiros que os conseguissem encontrar às cegas numa noite de São João ficavam prometidos a casamento próximo.'
  },
  {
    id: '18',
    nome: 'Theatro Circo',
    tipo: 'Cultura',
    freguesia: 'São Lázaro',
    seculo: 20,
    lat: 41.5494,
    lng: -8.4211,
    curiosidade: 'Inaugurado a 6 de dezembro de 1915, foi durante décadas o maior teatro da Península Ibérica com capacidade para 2.200 espetadores. Encerrou em 1971, esteve abandonado por 40 anos, e foi reinaugurado em 2011 com um concerto histórico que lotou o espaço totalmente restaurado.'
  },
  {
    id: '19',
    nome: 'Museu de Arqueologia D. Diogo de Sousa',
    tipo: 'Museu',
    freguesia: 'Cividade',
    seculo: 21,
    lat: 41.5445,
    lng: -8.4239,
    curiosidade: 'Aberto em 2007 e nomeado em homenagem ao arcebispo humanista que reformou Braga no século XVI, este museu guarda a maior coleção de miliários romanos de Portugal — marcos de granito que sinalizavam distâncias nas estradas do Império e que eram renovados a cada novo imperador.'
  },
  {
    id: '20',
    nome: 'Parque da Ponte',
    tipo: 'Jardim',
    freguesia: 'São Lázaro',
    seculo: 20,
    lat: 41.5415,
    lng: -8.4191,
    curiosidade: 'Extensa área verde nas margens do rio Este, palco central das Festas de São João de Braga — uma das maiores festas populares do norte de Portugal. Em junho, o parque acolhe feiras, concertos e o tradicional fogo de artifício que ilumina o céu sobre o rio.'
  },
  {
    id: '21',
    nome: 'Pudim Abade de Priscos',
    tipo: 'Gastronomia',
    freguesia: 'Priscos',
    seculo: 19,
    lat: 41.4925,
    lng: -8.4411,
    curiosidade: 'Criado pelo padre Manuel Joaquim Machado Rebelo, pároco de Priscos no século XIX, este pudim tem uma receita insólita: 15 gemas de ovo, toucinho de porco curado, vinho do Porto e calda de açúcar. É o mais famoso ex-líbris da doçaria conventual bracarense, servido nos melhores restaurantes do Minho.'
  },
  {
    id: '22',
    nome: 'Casa das Bananas',
    tipo: 'Gastronomia',
    freguesia: 'São João do Souto',
    seculo: 20,
    lat: 41.5504,
    lng: -8.4258,
    curiosidade: 'Pastelaria histórica no centro de Braga famosa pela tradição do "Bananeiro": na noite de 24 de dezembro, os bracarenses fazem fila à porta para comprar os seus bolos natalícios característicos. A tradição remonta ao início do século XX e tornou-se um ritual que nenhuma geração de bracarenses ousou quebrar.'
  },
  {
    id: '23',
    nome: 'Basílica dos Congregados',
    tipo: 'Igreja',
    freguesia: 'São Lázaro',
    seculo: 18,
    lat: 41.5516,
    lng: -8.4216,
    curiosidade: 'Desenhada por André Soares em estilo barroco joanino, a sua construção arrastou-se por mais de dois séculos: as duas torres sineiras da fachada só foram concluídas em 1963. A fachada lateral, revestida por azulejos azuis e brancos com cenas da vida de São Filipe Néri, é visível de boa parte da cidade.'
  },
  {
    id: '24',
    nome: 'Igreja do Pópulo',
    tipo: 'Igreja',
    freguesia: 'São Vicente',
    seculo: 16,
    lat: 41.5522,
    lng: -8.4278,
    curiosidade: 'Fundada em 1596 pelos frades eremitas de Santo Agostinho, guarda os restos mortais de D. Frei Bartolomeu dos Mártires — arcebispo de Braga, teólogo marcante do Concílio de Trento e figura em processo de beatificação pelo Vaticano. O claustro preserva belíssimos azulejos barrocos do século XVIII.'
  },
  {
    id: '25',
    nome: 'Igreja de São Vicente',
    tipo: 'Igreja',
    freguesia: 'São Vicente',
    seculo: 17,
    lat: 41.5542,
    lng: -8.4213,
    curiosidade: 'Erguida no local onde, segundo a tradição, esteve sepultado o mártir São Vicente antes de os seus restos serem trasladados para Lisboa em 1173 a bordo de um navio guiado por corvos — origem do símbolo de Lisboa. A atual fachada barroca do século XVII tem uma torre sineira que domina a zona norte do centro histórico.'
  },
  {
    id: '26',
    nome: 'Igreja de São Vítor',
    tipo: 'Igreja',
    freguesia: 'São Vítor',
    seculo: 17,
    lat: 41.5524,
    lng: -8.4128,
    curiosidade: 'A nave central e os arcos laterais estão revestidos por um dos maiores conjuntos de azulejos azuis e brancos de Braga, executados no século XVIII com cenas hagiográficas de grande qualidade pictórica. O padroeiro São Vítor era um mártir romano cuja devoção em Braga remonta à Antiguidade cristã.'
  },
  {
    id: '27',
    nome: 'Miradouro do Monte do Picoto',
    tipo: 'Jardim',
    freguesia: 'Nogueiró',
    seculo: 20,
    lat: 41.5391,
    lng: -8.4162,
    curiosidade: 'Parque florestal no cimo do Monte do Picoto, a sudeste de Braga, com uma panorâmica de 360 graus que abrange a cidade, a Serra do Gerês, o Sameiro e o Bom Jesus em simultâneo. É o ponto mais procurado pelos fotógrafos para captar o pôr do sol sobre toda a bacia urbana de Braga.'
  },
  {
    id: '28',
    nome: 'Antigo Paço Episcopal',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 14,
    lat: 41.5514,
    lng: -8.4265,
    curiosidade: 'Residência oficial dos arcebispos de Braga desde o século XIV, o complexo inclui alas medieval, manuelina e barroca. Desde 1979 acolhe a Reitoria da Universidade do Minho — uma das maiores reconversões de um palácio episcopal em campus universitário em toda a Europa.'
  },
  {
    id: '29',
    nome: 'Museu Pio XII',
    tipo: 'Museu',
    freguesia: 'Cividade',
    seculo: 20,
    lat: 41.5485,
    lng: -8.4267,
    curiosidade: 'Fundado pelo Seminário Conciliar de Braga, reúne uma coleção de arte sacra, ourivesaria e arqueologia que cobre 2000 anos de história da diocese de Braga. Integra uma torre medieval do século XIV que oferece uma das melhores vistas sobre a cidade antiga, com a Sé e o Paço Episcopal à vista.'
  },
  {
    id: '30',
    nome: 'Insula das Carvalheiras',
    tipo: 'Arqueologia',
    freguesia: 'Sé',
    seculo: 1,
    lat: 41.5495,
    lng: -8.4285,
    curiosidade: 'Quarteirão habitacional romano do século I d.C. descoberto no coração do centro histórico, com habitações, pátios interiores, canalizações e um complexo termal privado com hipocausto. É o sítio arqueológico romano mais visitável de Braga, com passadiços que permitem caminhar sobre as ruínas.'
  },
  {
    id: '31',
    nome: 'Santuário de Santa Maria da Falperra',
    tipo: 'Igreja',
    freguesia: 'Nogueiró',
    seculo: 18,
    lat: 41.5312,
    lng: -8.3934,
    curiosidade: 'Templo barroco de planta pentagonal projetado por André Soares em 1753 — das formas mais incomuns de um templo em Portugal. Situa-se na Serra da Falperra, a cerca de 5 km do centro, construído sobre o local de uma antiga lenda de aparição mariana registada nos séculos medievais.'
  },
  {
    id: '32',
    nome: 'Elevador do Bom Jesus',
    tipo: 'Monumento',
    freguesia: 'Tenões',
    seculo: 19,
    lat: 41.5551,
    lng: -8.3806,
    curiosidade: 'Inaugurado a 27 de março de 1882 pelo rei D. Luís I, é o funicular mais antigo do mundo ainda em funcionamento por sistema de contrapeso de água. Não tem motor elétrico: o carro que desce, carregado com água num reservatório próprio, puxa automaticamente o carro que sobe através de um cabo de aço.'
  },
  {
    id: '33',
    nome: 'Tíbias de Braga',
    tipo: 'Gastronomia',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5510,
    lng: -8.4270,
    curiosidade: 'Doce típico bracarense em forma de tubo oco de massa frita estaladiça, polvilhado com açúcar em pó e recheado com creme de pasteleiro. O nome vem de "tíbia" — osso da perna em latim — pela forma alongada e oca do doce, que era servido nas festas e romarias da cidade desde o início do século XX.'
  },
  {
    id: '34',
    nome: 'Complexo das Sete Fontes',
    tipo: 'Monumento',
    freguesia: 'São Vítor',
    seculo: 18,
    lat: 41.5645,
    lng: -8.4023,
    curiosidade: 'Sistema de captação e distribuição de água construído em 1737 por ordem do arcebispo D. Rodrigo de Moura Teles para resolver a escassez de água em Braga. As sete nascentes naturais eram conduzidas por aquedutos de granito até às fontes e chafarizes da cidade — uma obra de engenharia hidráulica notável para a época.'
  },
  {
    id: '35',
    nome: 'Arcada — Praça da República',
    tipo: 'Monumento',
    freguesia: 'São Lázaro',
    seculo: 18,
    lat: 41.5510,
    lng: -8.4221,
    curiosidade: 'Galeria de arcos do século XVIII construída ao longo da antiga muralha da cidade, servindo de abrigo a comerciantes e mercadores. Hoje é o espaço de sociabilidade mais icónico de Braga: sob as arcadas ficam o Café Vianna, esplanadas e as tradicionais lojas de artesanato minhoto.'
  },
  {
    id: '36',
    nome: 'Mercado Municipal de Braga',
    tipo: 'Cultura',
    freguesia: 'São Vicente',
    seculo: 20,
    lat: 41.5535,
    lng: -8.4248,
    curiosidade: 'O mercado municipal de Braga foi regenerado e reaberto no século XXI, combinando bancas de produtos frescos tradicionais — carnes, peixes, queijos e presuntos do Minho — com uma moderna praça de restauração. Nos sábados de manhã é ponto de encontro obrigatório dos bracarenses há várias gerações.'
  },
  {
    id: '37',
    nome: 'Convento do Carmo',
    tipo: 'Igreja',
    freguesia: 'São Vicente',
    seculo: 17,
    lat: 41.5540,
    lng: -8.4255,
    curiosidade: 'Fundado no século XVII pelos carmelitas descalços e extinto em 1834 com as ordens religiosas. Convertido em quartel militar durante o liberalismo, hoje é utilizado como arquivo histórico e espaço cultural. A Igreja do Carmo, de arquitetura deliberadamente sóbria, mantém a traça original seiscentista.'
  },
  {
    id: '38',
    nome: 'Café Vianna',
    tipo: 'Cultura',
    freguesia: 'São Lázaro',
    seculo: 19,
    lat: 41.5511,
    lng: -8.4223,
    curiosidade: 'Fundado em 1871 na Arcada da Praça da República, é o café mais antigo de Braga. Frequentado por Eça de Queirós e Ramalho Ortigão, foi palco de tertúlias literárias e debates políticos da Primeira República. As suas mesas de mármore, espelhos e móveis art déco são originais do início do século XX.'
  },
  {
    id: '39',
    nome: 'Museu Nogueira da Silva',
    tipo: 'Museu',
    freguesia: 'São Vítor',
    seculo: 20,
    lat: 41.5521,
    lng: -8.4204,
    curiosidade: 'Legado à Universidade do Minho pelo colecionador António Augusto Nogueira da Silva em 1985, reúne cerca de 2.000 peças de artes decorativas europeias — porcelanas, mobiliário, joias e pinturas dos séculos XVII a XX. O jardim romântico anexo, com camélias centenárias, é um dos mais aprazíveis do centro da cidade.'
  },
  {
    id: '40',
    nome: 'Teatro Romano de Bracara Augusta',
    tipo: 'Arqueologia',
    freguesia: 'Cividade',
    seculo: 1,
    lat: 41.5469,
    lng: -8.4289,
    curiosidade: 'O único teatro romano identificado no Noroeste da Península Ibérica, descoberto em escavações arqueológicas no centro de Braga. Datado do século I d.C., estima-se que tivesse capacidade para cerca de 5.000 espetadores. As ruínas são parcialmente visitáveis in situ sob o centro histórico da cidade.'
  },
  {
    id: '41',
    nome: 'Cruzeiro do Campo das Hortas',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 16,
    lat: 41.5504,
    lng: -8.4298,
    curiosidade: 'Cruzeiro renascentista em granito do século XVI, mandado erguer pelo arcebispo D. Diogo de Sousa — o grande reformador urbano de Braga que alargou ruas e trouxe o Renascimento à cidade. Situa-se no Campo das Hortas, um dos largueiros medievais que D. Diogo de Sousa criou para modernizar o espaço público.'
  },
  {
    id: '42',
    nome: 'Casa Rolão',
    tipo: 'Monumento',
    freguesia: 'São Vítor',
    seculo: 18,
    lat: 41.5518,
    lng: -8.4184,
    curiosidade: 'Elegante palacete de arquitetura civil barroca do século XVIII na Avenida Central, com varandas de ferro forjado e frontão esculpido em granito. Alberga a Livraria Centésima Página, uma das livrarias independentes mais emblemáticas de Braga — regularmente eleita uma das melhores do país pelos leitores.'
  },
  {
    id: '43',
    nome: 'Praia Fluvial de Adaúfe',
    tipo: 'Jardim',
    freguesia: 'Adaúfe',
    seculo: 20,
    lat: 41.5855,
    lng: -8.3985,
    curiosidade: 'Situada nas margens do Rio Cávado, a cerca de 8 km do centro de Braga, é uma das praias fluviais mais frequentadas do distrito. Com água de qualidade certificada, relvados, parques de merendas e zona de apoio de praia, recebe dezenas de milhares de banhistas nos meses de julho e agosto.'
  },
  {
    id: '44',
    nome: 'Igreja da Misericórdia de Braga',
    tipo: 'Igreja',
    freguesia: 'Sé',
    seculo: 16,
    lat: 41.5505,
    lng: -8.4271,
    curiosidade: 'O único edifício de arquitetura renascentista pura sobrevivente no centro histórico de Braga, construído na segunda metade do século XVI. A sua fachada, com arcaria em dois pisos sobrepostos, é atribuída ao círculo de influência do escultor flamengo João de Ruão, radicado em Coimbra.'
  },
  {
    id: '45',
    nome: 'Domus de Santiago',
    tipo: 'Arqueologia',
    freguesia: 'Cividade',
    seculo: 1,
    lat: 41.5478,
    lng: -8.4261,
    curiosidade: 'Habitação romana aristocrática do século I d.C. descoberta sob o antigo Seminário de Santiago durante obras de requalificação urbana. Preserva pavimentos em opus signinum, bases de colunas e canalizações. É um dos sítios romanos musealizados mais acessíveis ao público no centro histórico de Braga.'
  },
  {
    id: '46',
    nome: 'Igreja dos Terceiros',
    tipo: 'Igreja',
    freguesia: 'São Lázaro',
    seculo: 17,
    lat: 41.5496,
    lng: -8.4216,
    curiosidade: 'Pertencente à Ordem Terceira de São Francisco, a fachada barroca do século XVII destaca-se no topo da Avenida Central. O interior preserva um notável conjunto de talha dourada e painéis de azulejos do século XVIII com episódios da vida de São Francisco de Assis, de grande vivacidade pictórica.'
  },
  {
    id: '47',
    nome: 'Chafariz dos Castelos',
    tipo: 'Monumento',
    freguesia: 'São João do Souto',
    seculo: 18,
    lat: 41.5518,
    lng: -8.4259,
    curiosidade: 'Chafariz público do século XVIII na Praça do Município, construído no âmbito do abastecimento de água da cidade. É encimado por uma estátua feminina em granito com uma coroa de castelos — símbolo heráldico de Braga — representando alegoricamente a cidade como uma rainha coroada.'
  },
  {
    id: '48',
    nome: 'Museu da Imagem',
    tipo: 'Museu',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5507,
    lng: -8.4293,
    curiosidade: 'Instalado numa das antigas torres da muralha medieval de Braga, contígua ao Arco da Porta Nova, é o único museu de fotografia do norte de Portugal. O espólio cobre a história da imagem fotográfica desde meados do século XIX até à era digital, com especial enfoque na memória visual da região minhota.'
  },
  {
    id: '49',
    nome: 'Palácio dos Arcebispos',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 18,
    lat: 41.5513,
    lng: -8.4259,
    curiosidade: 'A ala joanina deste complexo palaciano, com fachada sobre a Praça do Município desenhada por Manuel Pinto de Vilalobos no século XVIII, é um dos exemplos mais imponentes do barroco civil bracarense. A arcaria do piso térreo serviu historicamente de galeria coberta para a circulação do clero e da nobreza.'
  },
  {
    id: '50',
    nome: 'Igreja de São João do Souto',
    tipo: 'Igreja',
    freguesia: 'São João do Souto',
    seculo: 12,
    lat: 41.5501,
    lng: -8.4247,
    curiosidade: 'Igreja paroquial de fundação medieval do século XII, uma das mais antigas da malha urbana de Braga. Tem anexa a celebrada Capela dos Coimbras — panteão manuelino construído entre 1525 e 1528 pela família Coimbra, com uma abóbada esculpida de nervuras e decoração vegetalista de excepcional riqueza.'
  },
  {
    id: '52',
    nome: 'Pelourinho de Braga',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 16,
    lat: 41.5502,
    lng: -8.4271,
    curiosidade: 'O pelourinho original de Braga — símbolo da autonomia municipal e local de execução de penas públicas — foi destruído no século XIX durante as reformas liberais. A reconstituição atual, de estilo revivalista, incorpora fragmentos de granito do original e foi erguida para assinalar o local do antigo poder concelhio medieval.'
  },
  {
    id: '53',
    nome: 'Estátua de D. Diogo de Sousa',
    tipo: 'Monumento',
    freguesia: 'São Lázaro',
    seculo: 21,
    lat: 41.5508,
    lng: -8.4219,
    curiosidade: 'Escultura em bronze inaugurada no século XXI em homenagem ao arcebispo D. Diogo de Sousa (1505-1532), o humanista que transformou Braga: alargou ruas medievais, criou a Rua do Souto como eixo central, mandou construir chafarizes e trouxe artistas e intelectuais renascentistas para a Cidade dos Arcebispos.'
  },
  {
    id: '54',
    nome: 'Forum Braga',
    tipo: 'Cultura',
    freguesia: 'Nogueira',
    seculo: 20,
    lat: 41.5385,
    lng: -8.4215,
    curiosidade: 'Inaugurado em 1997, foi o primeiro grande centro comercial do distrito de Braga e um dos maiores do país na época. O seu auditório, com capacidade para cerca de 2.500 pessoas, é um dos maiores do norte de Portugal e acolhe regularmente concertos, congressos e espetáculos de escala nacional.'
  },
  {
    id: '55',
    nome: 'Castelo de Dona Chica',
    tipo: 'Monumento',
    freguesia: 'Palmeira',
    seculo: 20,
    lat: 41.5905,
    lng: -8.4202,
    curiosidade: 'Palácio de traço neo-medieval e romântico projetado pelo arquiteto suíço Ernesto Korrodi no início do século XX para a família Sampaio. Envolto numa densa mata privada a norte de Braga, ficou conhecido como "Castelo de Dona Chica" em referência à sua proprietária mais longeva, Francisca de Sampaio.'
  },
  {
    id: '56',
    nome: 'Igreja de São Lázaro',
    tipo: 'Igreja',
    freguesia: 'São Lázaro',
    seculo: 18,
    lat: 41.5461,
    lng: -8.4195,
    curiosidade: 'Templo barroco do século XVIII que marca o limite sul do centro histórico de Braga, no local onde existia um hospital medieval de leprosos — os "lázaros", donde vem o nome da freguesia. Assinala o início da antiga estrada real que ligava Braga a Guimarães e ao Porto através do vale do Ave.'
  },
  {
    id: '57',
    nome: 'Cruzeiro de Tibães',
    tipo: 'Monumento',
    freguesia: 'Mire de Tibães',
    seculo: 17,
    lat: 41.5558,
    lng: -8.4772,
    curiosidade: 'Cruzeiro em granito esculpido do século XVII situado no largo de entrada do Mosteiro Beneditino de São Martinho de Tibães. Com capitel decorado e imagens de Cristo crucificado e da Virgem em alto relevo, era o ponto de chegada dos peregrinos e monges que percorriam os caminhos rurais do Minho até ao mosteiro.'
  },
  {
    id: '58',
    nome: 'Praça do Município',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 18,
    lat: 41.5513,
    lng: -8.4256,
    curiosidade: 'O coração cívico de Braga desde o século XVIII, delimitado pela fachada barroca do Paço dos Arcebispos, pela Câmara Municipal neoclássica e pela Torre de Menagem medieval. O pavimento de granito em calçada portuguesa esconde estruturas romanas do século I visíveis através de janelas arqueológicas no chão.'
  },
  {
    id: '59',
    nome: 'Posto de Turismo de Braga',
    tipo: 'Cultura',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5506,
    lng: -8.4264,
    curiosidade: 'O Posto de Turismo de Braga funciona no coração do centro histórico, junto ao Arco da Porta Nova, e é o ponto de partida oficial para explorar a cidade. Fornece mapas, informação sobre rotas históricas e visitas guiadas em vários idiomas. Braga foi Capital Europeia da Juventude em 2012 e Capital Portuguesa da Cultura em 2025.'
  },
  {
    id: '60',
    nome: 'Café Astoria',
    tipo: 'Cultura',
    freguesia: 'São Lázaro',
    seculo: 20,
    lat: 41.5509,
    lng: -8.4222,
    curiosidade: 'Café histórico na Praça da República, inaugurado na primeira metade do século XX, famoso pelos estuques trabalhados no teto e pelos lambris de madeira envernizada. Ao contrário do vizinho Café Vianna — mais literário e político — o Astoria manteve sempre um ambiente mais boémio e noturno, frequentado por artistas e músicos.'
  },
  {
    id: '61',
    nome: 'Capela dos Coimbras',
    tipo: 'Igreja',
    freguesia: 'São João do Souto',
    seculo: 16,
    lat: 41.5500,
    lng: -8.4246,
    curiosidade: 'Panteão manuelino da família Coimbra, construído entre 1525 e 1528 como extensão funerária da Igreja de São João do Souto. A abóbada esculpida em pedra, com nervuras cruzadas, esferas armilares e decoração vegetalista profusa, é considerada uma das obras de escultura manuelina mais refinadas do norte de Portugal.'
  },
  {
    id: '62',
    nome: 'Igreja de São Marcos',
    tipo: 'Igreja',
    freguesia: 'São Marcos',
    seculo: 16,
    lat: 41.5558,
    lng: -8.4234,
    curiosidade: 'Igreja integrada no complexo do Hospital de São Marcos, fundado no século XVI e durante séculos o principal estabelecimento de saúde de Braga e do Minho. O edifício hospitalar barroco do século XVIII chegou a ter capacidade para centenas de doentes e incluía enfermarias, botica, biblioteca e capelas.'
  },
  {
    id: '63',
    nome: 'Praia Fluvial de Merelim',
    tipo: 'Jardim',
    freguesia: 'Merelim (São Paio)',
    seculo: 21,
    lat: 41.5841,
    lng: -8.4552,
    curiosidade: 'Zona balnear requalificada no Rio Cávado, a norte de Braga, com passadiços de madeira suspensos sobre a margem e infraestruturas ecológicas inauguradas no século XXI. É a praia fluvial mais recente do município de Braga e distingue-se pelo ambiente natural preservado e pela qualidade da água certificada anualmente.'
  },
  {
    id: '64',
    nome: 'Biblioteca Lúcio Craveiro da Silva',
    tipo: 'Cultura',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5507,
    lng: -8.4231,
    curiosidade: 'A principal biblioteca pública de Braga, inaugurada em 1996 numa antiga fábrica de fiação do século XIX reabilitada para o efeito. Com mais de 200.000 volumes, é das maiores bibliotecas municipais do país. O nome homenageia o filósofo e jesuíta bracarense Lúcio Craveiro da Silva (1914-2002).'
  },
  {
    id: '65',
    nome: 'Câmara Municipal de Braga',
    tipo: 'Monumento',
    freguesia: 'Sé',
    seculo: 18,
    lat: 41.5513,
    lng: -8.4253,
    curiosidade: 'Edifício neoclássico do século XVIII que delimita a Praça do Município a sul. A sala nobre do primeiro andar, com tetos pintados e retratos de arcebispos e monarcas, foi palco de grandes decisões da vida pública bracarense. Em 1820, a primeira câmara liberal do país tomou aqui posse após a Revolução do Porto.'
  }
];