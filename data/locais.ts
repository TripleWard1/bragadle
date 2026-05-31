export interface Local {
  id: string;
  nome: string;
  tipo: 'Monumento' | 'Igreja' | 'Jardim' | 'Museu' | 'Gastronomia' | 'Arqueologia' | 'Cultura e Desporto';
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
    curiosidade: 'É a catedral mais antiga do país, cuja construção começou antes mesmo da fundação de Portugal.' 
  },
  { 
    id: '2', 
    nome: 'Santuário do Bom Jesus do Monte', 
    tipo: 'Monumento', 
    freguesia: 'Tenões', 
    seculo: 18, 
    lat: 41.5546, 
    lng: -8.3774, 
    curiosidade: 'Declarado Património Mundial da UNESCO, destaca-se pelo seu escadório barroco e pelo funicular hidráulico.' 
  },
  { 
    id: '3', 
    nome: 'Santuário de Nossa Senhora do Sameiro', 
    tipo: 'Monumento', 
    freguesia: 'Espinho', 
    seculo: 19, 
    lat: 41.5408, 
    lng: -8.3694, 
    curiosidade: 'Um dos maiores centros de devoção mariana em Portugal, oferecendo uma vista panorâmica deslumbrante.' 
  },
  { 
    id: '4', 
    nome: 'Jardim de Santa Bárbara', 
    tipo: 'Jardim', 
    freguesia: 'Sé', 
    seculo: 20, 
    lat: 41.5512, 
    lng: -8.4261, 
    curiosidade: 'Jardim público geometricamente desenhado junto da ala medieval do Antigo Paço Episcopal.' 
  },
  { 
    id: '5', 
    nome: 'Frigideiras do Cantinho', 
    tipo: 'Gastronomia', 
    freguesia: 'São João do Souto', 
    seculo: 18, 
    lat: 41.5507, 
    lng: -8.4244, 
    curiosidade: 'Fundado em 1796, é o estabelecimento comercial mais antigo de Braga, famoso pelo seu folhado de carne.' 
  },
  { 
    id: '6', 
    nome: 'Palácio do Raio', 
    tipo: 'Monumento', 
    freguesia: 'São Lázaro', 
    seculo: 18, 
    lat: 41.5484, 
    lng: -8.4214, 
    curiosidade: 'Uma obra-prima do barroco joanino desenhada por André Soares, célebre pela sua exuberante fachada azul.' 
  },
  { 
    id: '7', 
    nome: 'Arco da Porta Nova', 
    tipo: 'Monumento', 
    freguesia: 'Sé', 
    seculo: 18, 
    lat: 41.5506, 
    lng: -8.4292, 
    curiosidade: 'A icónica entrada da cidade que deu origem à expressão popular sobre os bracarenses não fecharem as portas.' 
  },
  { 
    id: '8', 
    nome: 'Mosteiro de São Martinho de Tibães', 
    tipo: 'Monumento', 
    freguesia: 'Mire de Tibães', 
    seculo: 11, 
    lat: 41.5562, 
    lng: -8.4791, 
    curiosidade: 'Antiga Casa-Mãe da Ordem de São Bento na Península Ibérica, dona de um vasto e rico património barroco.' 
  },
  { 
    id: '9', 
    nome: 'Capela de São Frutuoso', 
    tipo: 'Igreja', 
    freguesia: 'Real', 
    seculo: 7, 
    lat: 41.5606, 
    lng: -8.4389, 
    curiosidade: 'Um monumento visigótico raríssimo em forma de cruz grega, classificado como Monumento Nacional.' 
  },
  { 
    id: '10', 
    nome: 'Termas Romanas de Maximinos', 
    tipo: 'Arqueologia', 
    freguesia: 'Maximinos', 
    seculo: 1, 
    lat: 41.5458, 
    lng: -8.4303, 
    curiosidade: 'Ruínas arqueológicas de um complexo de banhos públicos da antiga Bracara Augusta.' 
  },
  { 
    id: '11', 
    nome: 'Fonte do Ídolo', 
    tipo: 'Arqueologia', 
    freguesia: 'São Lázaro', 
    seculo: 1, 
    lat: 41.5492, 
    lng: -8.4225, 
    curiosidade: 'Santuário rupestre da época romana esculpido num penedo de granito, dedicado a uma divindade local.' 
  },
  { 
    id: '12', 
    nome: 'Torre de Menagem', 
    tipo: 'Monumento', 
    freguesia: 'São João do Souto', 
    seculo: 14, 
    lat: 41.5511, 
    lng: -8.4241, 
    curiosidade: 'O elemento defensivo que restou do antigo castelo medieval de Braga, demolido no início do século XX.' 
  },
  { 
    id: '13', 
    nome: 'Casa dos Crivos', 
    tipo: 'Monumento', 
    freguesia: 'São João do Souto', 
    seculo: 17, 
    lat: 41.5505, 
    lng: -8.4251, 
    curiosidade: 'Edifício único resguardado por gelosias de madeira, típicas da forte influência religiosa na Braga de outrora.' 
  },
  { 
    id: '14', 
    nome: 'Museu dos Biscainhos', 
    tipo: 'Museu', 
    freguesia: 'Sé', 
    seculo: 17, 
    lat: 41.5517, 
    lng: -8.4294, 
    curiosidade: 'Instalado num palácio aristocrático, ilustra o quotidiano da nobreza e possui um magnífico jardim barroco.' 
  },
  { 
    id: '15', 
    nome: 'GNRation', 
    tipo: 'Cultura e Desporto', 
    freguesia: 'São Vicente', 
    seculo: 21, 
    lat: 41.5528, 
    lng: -8.4222, 
    curiosidade: 'Antigo quartel militar transformado em polo cultural focado na música contemporânea e artes digitais.' 
  },
  { 
    id: '16', 
    nome: 'Estádio Municipal de Braga', 
    tipo: 'Cultura e Desporto', 
    freguesia: 'Dume', 
    seculo: 21, 
    lat: 41.5633, 
    lng: -8.4294, 
    curiosidade: 'Obra de Eduardo Souto de Moura conhecida como A Pedreira, integrada na encosta do Monte do Castro.' 
  },
  { 
    id: '17', 
    nome: 'Igreja de Santa Cruz', 
    tipo: 'Igreja', 
    freguesia: 'São João do Souto', 
    seculo: 17, 
    lat: 41.5498, 
    lng: -8.4242, 
    curiosidade: 'Templo barroco famoso pelas esculturas em pedra na fachada, onde os solteiros procuram dois galos escondidos.' 
  },
  { 
    id: '18', 
    nome: 'Theatro Circo', 
    tipo: 'Cultura e Desporto', 
    freguesia: 'São Lázaro', 
    seculo: 20, 
    lat: 41.5494, 
    lng: -8.4211, 
    curiosidade: 'Teatro de traço revivalista inaugurado em 1915, considerado uma das salas de espetáculo mais belas do país.' 
  },
  { 
    id: '19', 
    nome: 'Museu de Arqueologia D. Diogo de Sousa', 
    tipo: 'Museu', 
    freguesia: 'Cividade', 
    seculo: 20, 
    lat: 41.5445, 
    lng: -8.4239, 
    curiosidade: 'Alberga coleções arqueológicas que cobrem desde a Pré-História até à época romana em Braga.' 
  },
  { 
    id: '20', 
    nome: 'Parque da Ponte', 
    tipo: 'Jardim', 
    freguesia: 'São Lázaro', 
    seculo: 20, 
    lat: 41.5415, 
    lng: -8.4191, 
    curiosidade: 'Espaço florestal urbano que serve de cenário central às tradicionais Festas de São João de Braga.' 
  },
  { 
    id: '21', 
    nome: 'Pudim Abade de Priscos', 
    tipo: 'Gastronomia', 
    freguesia: 'Priscos', 
    seculo: 19, 
    lat: 41.4925, 
    lng: -8.4411, 
    curiosidade: 'Um dos ex-líbris da doçaria conventual bracarense, cuja receita original inclui toucinho de porco.' 
  },
  { 
    id: '22', 
    nome: 'Casa das Bananas', 
    tipo: 'Gastronomia', 
    freguesia: 'São João do Souto', 
    seculo: 20, 
    lat: 41.5504, 
    lng: -8.4258, 
    curiosidade: 'Local de paragem obrigatória no dia 24 de dezembro para cumprir a famosa tradição do Bananeiro.' 
  },
  { 
    id: '23', 
    nome: 'Basílica dos Congregados', 
    tipo: 'Igreja', 
    freguesia: 'São Lázaro', 
    seculo: 18, 
    lat: 41.5516, 
    lng: -8.4216, 
    curiosidade: 'Imponente basílica desenhada por André Soares, cujas torres sineiras só foram terminadas no século XX.' 
  },
  { 
    id: '24', 
    nome: 'Igreja do Pópulo', 
    tipo: 'Igreja', 
    freguesia: 'São Vicente', 
    seculo: 16, 
    lat: 41.5522, 
    lng: -8.4278, 
    curiosidade: 'Templo neoclássico que guarda o corpo de D. Frei Bartolomeu dos Mártires e exibe belos painéis de azulejos.' 
  },
  { 
    id: '25', 
    nome: 'Igreja de São Vicente', 
    tipo: 'Igreja', 
    freguesia: 'São Vicente', 
    seculo: 16, 
    lat: 41.5542, 
    lng: -8.4213, 
    curiosidade: 'Destaca-se pelo imponente elemento sineiro e pela forte ligação às celebrações da Semana Santa.' 
  },
  { 
    id: '26', 
    nome: 'Igreja de São Victor', 
    tipo: 'Igreja', 
    freguesia: 'São Victor', 
    seculo: 17, 
    lat: 41.5524, 
    lng: -8.4128, 
    curiosidade: 'Famosa pelo seu interior quase totalmente revestido por um dos melhores conjuntos de azulejos azuis e brancos de Braga.' 
  },
  { 
    id: '27', 
    nome: 'Miradouro do Monte do Picoto', 
    tipo: 'Jardim', 
    freguesia: 'Nogueiró', 
    seculo: 20, 
    lat: 41.5391, 
    lng: -8.4162, 
    curiosidade: 'Parque florestal urbano que oferece uma panorâmica de 360 graus absolutamente perfeita sobre toda a malha urbana.' 
  },
  { 
    id: '28', 
    nome: 'Antigo Paço Episcopal', 
    tipo: 'Monumento', 
    freguesia: 'Sé', 
    seculo: 14, 
    lat: 41.5514, 
    lng: -8.4265, 
    curiosidade: 'Um complexo arquitetónico monumental composto por várias alas medievais e barrocas que acolhem a Biblioteca Pública.' 
  },
  { 
    id: '29', 
    nome: 'Museu Pio XII', 
    tipo: 'Museu', 
    freguesia: 'Cividade', 
    seculo: 20, 
    lat: 41.5485, 
    lng: -8.4267, 
    curiosidade: 'Alberga uma vasta coleção de arte sacra, arqueologia e uma imponente torre medieval com vista panorâmica.' 
  },
  { 
    id: '30', 
    nome: 'Insula das Carvalheiras', 
    tipo: 'Arqueologia', 
    freguesia: 'Sé', 
    seculo: 1, 
    lat: 41.5495, 
    lng: -8.4285, 
    curiosidade: 'Quarteirão residencial romano musealizado que mostra as estruturas habitacionais e pátios da Bracara Augusta.' 
  },
  { 
    id: '31', 
    nome: 'Forum Braga', 
    tipo: 'Cultura e Desporto', 
    freguesia: 'Nogueira', 
    seculo: 21, 
    lat: 41.5385, 
    lng: -8.4215, 
    curiosidade: 'Espaço polivalente vocacionado para feiras, congressos e grandes concertos, possuindo o segundo maior auditório do país.' 
  },
  { 
    id: '32', 
    nome: 'Castelo de Dona Chica', 
    tipo: 'Monumento', 
    freguesia: 'Palmeira', 
    seculo: 20, 
    lat: 41.5905, 
    lng: -8.4202, 
    curiosidade: 'Palácio de traço romântico e revivalista desenhado por Ernesto Korrodi, envolto numa mística mata arborizada.' 
  },
  { 
    id: '33', 
    nome: 'Santuário de Santa Maria da Falperra', 
    tipo: 'Igreja', 
    freguesia: 'Nogueiró', 
    seculo: 18, 
    lat: 41.5312, 
    lng: -8.3934, 
    curiosidade: 'Templo barroco de planta pentagonal único, situado na encosta da Falperra, desenhado por André Soares.' 
  },
  { 
    id: '34', 
    nome: 'Elevador do Bom Jesus', 
    tipo: 'Monumento', 
    freguesia: 'Tenões', 
    seculo: 19, 
    lat: 41.5551, 
    lng: -8.3806, 
    curiosidade: 'O funicular mais antigo do mundo em serviço que utiliza o sistema de contra-peso de água, inaugurado em 1882.' 
  },
  { 
    id: '35', 
    nome: 'Tíbias de Braga', 
    tipo: 'Gastronomia', 
    freguesia: 'Sé', 
    seculo: 20, 
    lat: 41.5510, 
    lng: -8.4270, 
    curiosidade: 'Doce tradicional de massa folhada estaladiça, moldado em formato alongado e recheado com creme de pasteleiro.' 
  },
  { 
    id: '36', 
    nome: 'Sete Fontes', 
    tipo: 'Arqueologia', 
    freguesia: 'São Victor', 
    seculo: 18, 
    lat: 41.5645, 
    lng: -8.4023, 
    curiosidade: 'Complexo monumental de engenharia hidráulica setecentista que abasteceu a cidade de água durante séculos.' 
  },
  { 
    id: '37', 
    nome: 'Arcada (Praça da República)', 
    tipo: 'Monumento', 
    freguesia: 'São Lázaro', 
    seculo: 18, 
    lat: 41.5510, 
    lng: -8.4221, 
    curiosidade: 'O coração social de Braga, cujos arcos serviam originalmente de abrigo mercantil junto à antiga muralha.' 
  },
  { 
    id: '38', 
    nome: 'Mercado Municipal de Braga', 
    tipo: 'Cultura e Desporto', 
    freguesia: 'São Vicente', 
    seculo: 20, 
    lat: 41.5535, 
    lng: -8.4248, 
    curiosidade: 'Espaço histórico de comércio local regenerado, que combina bancas tradicionais com praça de restauração.' 
  },
  { 
    id: '39', 
    nome: 'Convento do Carmo', 
    tipo: 'Igreja', 
    freguesia: 'São Vicente', 
    seculo: 17, 
    lat: 41.5540, 
    lng: -8.4255, 
    curiosidade: 'Destaca-se pela sua arquitetura religiosa sóbria e pela torre sineira recuada face à linha da rua.' 
  },
  { 
    id: '40', 
    nome: 'Capela de Nossa Senhora de Guadalupe', 
    tipo: 'Igreja', 
    freguesia: 'São Vicente', 
    seculo: 17, 
    lat: 41.5555, 
    lng: -8.4208, 
    curiosidade: 'Pequena capela de planta circular situada no cimo do monte de Guadalupe, com vista aberta para o norte da cidade.' 
  },
  { 
    id: '41', 
    nome: 'Café Vianna', 
    tipo: 'Cultura e Desporto', 
    freguesia: 'São Lázaro', 
    seculo: 19, 
    lat: 41.5511, 
    lng: -8.4223, 
    curiosidade: 'Café histórico fundado em 1871, ponto de encontro secular de escritores, políticos e intelectuais na Arcada.' 
  },
  { 
    id: '42', 
    nome: 'Café Astoria', 
    tipo: 'Cultura e Desporto', 
    freguesia: 'São Lázaro', 
    seculo: 20, 
    lat: 41.5509, 
    lng: -8.4222, 
    curiosidade: 'Marcante café na Praça da República, famoso pela sua arquitetura Arte Nova e tetos trabalhados.' 
  },
  { 
    id: '43', 
    nome: 'Museu Nogueira da Silva', 
    tipo: 'Museu', 
    freguesia: 'São Victor', 
    seculo: 20, 
    lat: 41.5521, 
    lng: -8.4204, 
    curiosidade: 'Legado à Universidade do Minho, exibe valiosas coleções de arte e possui um dos jardins mais fotogénicos do centro.' 
  },
  { 
    id: '44', 
    nome: 'Teatro Romano de Bracara Augusta', 
    tipo: 'Arqueologia', 
    freguesia: 'Cividade', 
    seculo: 1, 
    lat: 41.5469, 
    lng: -8.4289, 
    curiosidade: 'O único teatro romano descoberto no Noroeste da Península Ibérica, outrora capaz de albergar milhares de espetadores.' 
  },
  { 
    id: '45', 
    nome: 'Cruzeiro do Campo das Hortas', 
    tipo: 'Monumento', 
    freguesia: 'Sé', 
    seculo: 16, 
    lat: 41.5504, 
    lng: -8.4298, 
    curiosidade: 'Um dos mais belos cruzeiros renascentistas da cidade, mandado erguer pelo Arcebispo D. Diogo de Sousa.' 
  },
  { 
    id: '46', 
    nome: 'Casa Rolão', 
    tipo: 'Monumento', 
    freguesia: 'São Victor', 
    seculo: 18, 
    lat: 41.5518, 
    lng: -8.4184, 
    curiosidade: 'Exemplo soberbo de arquitetura civil barroca na Avenida Central, que hoje alberga a icónica Livraria Centésima Página.' 
  },
  { 
    id: '47', 
    nome: 'Praia Fluvial de Adaúfe', 
    tipo: 'Jardim', 
    freguesia: 'Adaúfe', 
    seculo: 20, 
    lat: 41.5855, 
    lng: -8.3985, 
    curiosidade: 'Extensa área de lazer nas margens do Rio Cávado, muito popular pelas suas infraestruturas e relvados.' 
  },
  { 
    id: '48', 
    nome: 'Praia Fluvial de Merelim São Paio', 
    tipo: 'Jardim', 
    freguesia: 'Merelim São Paio', 
    seculo: 21, 
    lat: 41.5841, 
    lng: -8.4552, 
    curiosidade: 'Zona balnear e ecológica requalificada junto ao Cávado, dotada de passadiços de madeira de grande beleza.' 
  },
  { 
    id: '49', 
    nome: 'Capela de São Sebastião', 
    tipo: 'Igreja', 
    freguesia: 'São Victor', 
    seculo: 16, 
    lat: 41.5515, 
    lng: -8.4144, 
    curiosidade: 'Pequeno templo erguido em devoção contra as pestes medievais, localizado no Campo da Vinha.' 
  },
  { 
    id: '50', 
    nome: 'Igreja da Misericórdia de Braga', 
    tipo: 'Igreja', 
    freguesia: 'Sé', 
    seculo: 16, 
    lat: 41.5505, 
    lng: -8.4271, 
    curiosidade: 'O único monumento renascentista puro sobrevivente no centro da cidade, anexo à Sé Catedral.' 
  },
  { 
    id: '51', 
    nome: 'Domus de Santiago', 
    tipo: 'Arqueologia', 
    freguesia: 'Cividade', 
    seculo: 1, 
    lat: 41.5478, 
    lng: -8.4261, 
    curiosidade: 'Ruínas de uma habitação romana aristocrática preservadas sob o edifício do Seminário de Santiago.' 
  },
  { 
    id: '52', 
    nome: 'Capela de Nossa Senhora da Torre', 
    tipo: 'Igreja', 
    freguesia: 'Sé', 
    seculo: 18, 
    lat: 41.5491, 
    lng: -8.4269, 
    curiosidade: 'Erguida em agradecimento pelo facto de Braga ter sido poupada ao devastador Terramoto de 1755.' 
  },
  { 
    id: '53', 
    nome: 'Igreja dos Terceiros', 
    tipo: 'Igreja', 
    freguesia: 'São Lázaro', 
    seculo: 17, 
    lat: 41.5496, 
    lng: -8.4216, 
    curiosidade: 'Localizada no topo da Avenida Central, apresenta uma fachada imponente e um rico recheio de talha dourada.' 
  },
  { 
    id: '54', 
    nome: 'Chafariz dos Castelos', 
    tipo: 'Monumento', 
    freguesia: 'São João do Souto', 
    seculo: 18, 
    lat: 41.5518, 
    lng: -8.4259, 
    curiosidade: 'Localizado na Praça do Município, possui uma figura feminina no topo que simboliza a própria cidade de Braga.' 
  },
  { 
    id: '55', 
    nome: 'Museu da Imagem', 
    tipo: 'Museu', 
    freguesia: 'Sé', 
    seculo: 20, 
    lat: 41.5507, 
    lng: -8.4293, 
    curiosidade: 'Espaço cultural dedicado à fotografia, encastrado numa das antigas torres da muralha medieval junto ao Arco da Porta Nova.' 
  },
  { 
    id: '56', 
    nome: 'Palácio dos Arcebispos - Ala Joanina', 
    tipo: 'Monumento', 
    freguesia: 'Sé', 
    seculo: 18, 
    lat: 41.5513, 
    lng: -8.4259, 
    curiosidade: 'A imponente fachada barroca virada para a Praça do Município, desenhada pelo arquiteto Manuel Pinto de Vilalobos.' 
  },
  { 
    id: '57', 
    nome: 'Capela de São Miguel-o-Anjo', 
    tipo: 'Igreja', 
    freguesia: 'Maximinos', 
    seculo: 18, 
    lat: 41.5432, 
    lng: -8.4355, 
    curiosidade: 'Pequeno templo barroco isolado, visível à entrada da cidade por quem chega vindo do sul.' 
  },
  { 
    id: '58', 
    nome: 'Cruzeiro de Tibães', 
    tipo: 'Monumento', 
    freguesia: 'Mire de Tibães', 
    seculo: 17, 
    lat: 41.5558, 
    lng: -8.4772, 
    curiosidade: 'Trabalho minucioso em granito localizado no terreiro exterior de acesso ao Mosteiro Beneditino.' 
  },
  { 
    id: '59', 
    nome: 'Ruínas Arqueológicas da Praça do Município', 
    tipo: 'Arqueologia', 
    freguesia: 'Sé', 
    seculo: 1, 
    lat: 41.5515, 
    lng: -8.4258, 
    curiosidade: 'Estruturas romanas visíveis através de claraboias de vidro integradas no pavimento da própria praça.' 
  },
  { 
    id: '60', 
    nome: 'Pelourinho de Braga', 
    tipo: 'Monumento', 
    freguesia: 'Sé', 
    seculo: 20, 
    lat: 41.5502, 
    lng: -8.4271, 
    curiosidade: 'Reconstrução moderna de cariz revivalista erguida perto da Sé, utilizando fragmentos do pelourinho histórico original.' 
  },
  { 
    id: '61', 
    nome: 'Igreja de São João do Souto', 
    tipo: 'Igreja', 
    freguesia: 'São João do Souto', 
    seculo: 12, 
    lat: 41.5501, 
    lng: -8.4247, 
    curiosidade: 'Templo de fundação medieval que tem anexa a famosíssima Capela dos Coimbras.' 
  },
  { 
    id: '62', 
    nome: 'Capela da Senhora-A-Branca', 
    tipo: 'Igreja', 
    freguesia: 'São Victor', 
    seculo: 18, 
    lat: 41.5516, 
    lng: -8.4158, 
    curiosidade: 'Localizada no largo homónimo, a sua fundação primitiva remonta ao século XIV, reformulada no período barroco.' 
  },
  { 
    id: '63', 
    nome: 'Igreja de São Lázaro', 
    tipo: 'Igreja', 
    freguesia: 'São Lázaro', 
    seculo: 18, 
    lat: 41.5461, 
    lng: -8.4195, 
    curiosidade: 'Templo barroco marcante no fim do traçado histórico da antiga estrada real que ligava a Guimarães.' 
  },
  { 
    id: '64', 
    nome: 'Capela dos Coimbras', 
    tipo: 'Monumento', 
    freguesia: 'São João do Souto', 
    seculo: 16, 
    lat: 41.5500, 
    lng: -8.4246, 
    curiosidade: 'Uma joia do manuelino em Braga, apresentando uma capela privada e uma torre senhorial fortificada.' 
  },
  { 
    id: '65', 
    nome: 'Estátua de Dom Diogo de Sousa', 
    tipo: 'Monumento', 
    freguesia: 'São Lázaro', 
    seculo: 20, 
    lat: 41.5508, 
    lng: -8.4219, 
    curiosidade: 'Monumento em bronze dedicado ao grande arcebispo mecenas que modernizou e desenhou o urbanismo renascentista de Braga.' 
  }
];