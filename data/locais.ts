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
    | 'Desporto';
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
    curiosidade:
      'É a catedral mais antiga de Portugal, originando a famosa expressão popular sobre a sua antiguidade.',
  },
  {
    id: '2',
    nome: 'Santuário do Bom Jesus do Monte',
    tipo: 'Monumento',
    freguesia: 'Tenões',
    seculo: 18,
    lat: 41.5546,
    lng: -8.3774,
    curiosidade:
      'Classificado como Património Mundial da UNESCO, possui um escadório monumental e o funicular mais antigo do mundo a funcionar por contrapeso de água.',
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
      'É o segundo maior centro de devoção mariana em Portugal, situado num dos pontos mais altos da região.',
  },
  {
    id: '4',
    nome: 'Jardim de Santa Bárbara',
    tipo: 'Jardim',
    freguesia: 'Sé',
    seculo: 20,
    lat: 41.5512,
    lng: -8.4261,
    curiosidade:
      'Um jardim público deslumbrante emoldurado pelas alas medievais do Antigo Paço Episcopal.',
  },
  {
    id: '5',
    nome: 'Frigideiras do Cantinho',
    tipo: 'Gastronomia',
    freguesia: 'São João do Souto',
    seculo: 18,
    lat: 41.5507,
    lng: -8.4244,
    curiosidade:
      'O estabelecimento comercial mais antigo da cidade, famoso por um pastel de massa folhada recheado com carne.',
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
      'Também conhecido como Casa do Mexicano, exibe uma das fachadas de azulejos rococó mais exuberantes do país.',
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
      'Uma entrada triunfal da cidade que deu origem à expressão "És de Braga?" por nunca ter tido uma porta física trancada.',
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
      'Foi a ' +
      'Casa-Mãe' +
      ' da Congregação de São Bento em Portugal e no Brasil, possuindo um recheio barroco impressionante.',
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
      'Um dos raríssimos e mais importantes monumentos pré-românicos de influência visigótica em toda a Península Ibérica.',
  },
  {
    id: '10',
    nome: 'Termas Romanas de Maximinos',
    tipo: 'Arqueologia',
    freguesia: 'Maximinos',
    seculo: 1,
    lat: 41.5458,
    lng: -8.4303,
    curiosidade:
      'Ruínas de um grande complexo público de banhos da antiga cidade romana de Bracara Augusta.',
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
      'Um santuário rupestre romano esculpido numa rocha de granito com inscrições dedicadas a uma divindade indígena.',
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
      'O único elemento sobrevivente do antigo castelo medieval que defendia o coração da cidade.',
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
      'Exemplo único de habitação urbana do século XVII cujas janelas estão totalmente cobertas por treliças de madeira.',
  },
  {
    id: '14',
    nome: 'Museu dos Biscainhos',
    tipo: 'Museu',
    freguesia: 'Sé',
    seculo: 17,
    lat: 41.5517,
    lng: -8.4294,
    curiosidade:
      'Instalado num palácio aristocrático, retrata a vida da nobreza nortenha com um dos jardins barrocos mais preservados de Portugal.',
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
      'Antigo quartel da GNR reconvertido num centro cultural vibrante focado em artes digitais e indústrias criativas.',
  },
  {
    id: '16',
    nome: 'Estádio Municipal de Braga (A Pedreira)',
    tipo: 'Desporto',
    freguesia: 'Dume',
    seculo: 21,
    lat: 41.5633,
    lng: -8.4294,
    curiosidade:
      'Desenhado por Souto Moura, este estádio foi esculpido diretamente na encosta do Monte do Castro.',
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
      'Conhecida pela sua fachada maneirista intricada e pelas lendas dos galos esculpidos na pedra que os solteiros tentam encontrar.',
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
      'Templo neoclássico que alberga os restos mortais de D. Frei Bartolomeu dos Mártires.',
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
      'Guarda a melhor coleção do país de "miliares" romanos e artefactos escavados na região de Bracara Augusta.',
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
      'Um parque urbano verdejante na periferia sul da cidade histórica, que acolhe as colossais festas de São João.',
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
      'Obra impressionante do arquiteto André Soares, cujas torres sineiras só foram concluídas no século XX.',
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
      'Especialidade doceira bracarense feita de massa de fartura recheada com creme de pasteleiro e polvilhada com açúcar em pó.',
  },
];
