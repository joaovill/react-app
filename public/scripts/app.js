'use strict';

var filtro = {
  tag: '',
  search: ''
};
/* Renderização da Nav Bar com limpeza dos filtros quando clicado em Todos Processo */
var navBar = function navBar() {
  return React.createElement(
    'div',
    { className: 'navbar' },
    React.createElement(
      'div',
      { className: 'navbar-title' },
      React.createElement(
        'span',
        null,
        'Processos'
      )
    ),
    React.createElement(
      'div',
      { className: "navbar-process " + (filtro.tag || filtro.search ? "" : "active"),
        onClick: function onClick() {
          filtro.tag = '';
          filtro.search = '';
          renderApp();
        } },
      React.createElement(
        'svg',
        { className: 'navbar-bookmarks', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 25 32' },
        React.createElement('path', { d: 'M24.3 0v27.949l-4.051-2.025V32l-10.122-5.063L0 32V4.051h4.051V0zm-6.072 28.759V6.076H2.025v22.683l8.1-4.051zm4.051-4.051V2.025H6.076v2.026h14.177V23.7z' })
      ),
      dataJson.cards.length && React.createElement(
        'div',
        { className: 'navbar-process-total' },
        React.createElement(
          'span',
          null,
          'Todos os Processos: '
        ),
        React.createElement(
          'span',
          { className: 'navbar-process-number' },
          dataJson.cards.length
        )
      )
    ),
    navBarTags()
  );
};
/* Função que itera e atrela o array de 
tags do obj criando um evento click para filtrar mais tarde na renderização do card */
var navBarTags = function navBarTags() {
  return React.createElement(
    'div',
    { className: 'navbar-tags' },
    React.createElement(
      'span',
      { className: 'navbar-tags-title' },
      'Etiquetas'
    ),
    dataJson.tags.map(function (tag) {
      var tagColor = {
        background: tag.background
      };
      return React.createElement(
        'div',
        { className: "navbar-tags-tag " + (filtro.tag == tag.id ? "active" : ""),
          onClick: function onClick() {
            filtro.tag = tag.id;
            renderApp();
          } },
        React.createElement('span', { className: 'navbar-tags-tag-color', style: tagColor }),
        React.createElement(
          'span',
          { className: 'navbar-tags-tag-name' },
          tag.name
        )
      );
    })
  );
};
/* Função de busca que re-renderiza o app caso altere o valor, 
filtrando assim na função de renderização do card */
var searchBar = function searchBar() {
  return React.createElement(
    'div',
    { className: 'app-body-search' },
    React.createElement(
      'svg',
      { className: 'app-body-search-icon', xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 32 32' },
      React.createElement('path', { d: 'M.3 31.7a1.131 1.131 0 0 1-.3-.8c0-.1.2-.3.5-.7a15.361 15.361 0 0 1 1.3-1.4c.5-.6 1.2-1.2 1.9-1.9l2.2-2.2 2.2-2.2 2-2c.6-.6 1.2-1.1 1.6-1.6l.857-.856A10.951 10.951 0 0 1 10 11 11.012 11.012 0 0 1 21 0a10.925 10.925 0 0 1 7.778 3.222A10.924 10.924 0 0 1 32 11a10.924 10.924 0 0 1-3.222 7.778A10.925 10.925 0 0 1 21 22a10.951 10.951 0 0 1-7.042-2.556L1.7 31.7a.909.909 0 0 1-.7.3.779.779 0 0 1-.7-.3zM12 11a9.01 9.01 0 0 0 9 9 9.011 9.011 0 0 0 9-9 9.01 9.01 0 0 0-9-9 9.01 9.01 0 0 0-9 9z' })
    ),
    React.createElement('input', { className: 'app-body-search-bar', type: 'text',
      name: 'search', placeholder: 'Buscar', onChange: function onChange(evt) {
        filtro.search = evt.target.value;
        renderApp();
      } })
  );
};
/* Função para atrelar as Partes ao card */
var partesCard = function partesCard(card) {
  return React.createElement(
    'div',
    { className: 'app-body-cards-card-partes' },
    card.partes.ativa.name && React.createElement(
      'span',
      { className: 'app-body-cards-card-partes-ativa' },
      React.createElement(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 32 32' },
        React.createElement('path', { d: 'M17.001 15h7v2h-7v7h-2v-7h-7v-2h7V8h2z' }),
        React.createElement('path', { d: 'M16.001 32a15.894 15.894 0 0 1-11.313-4.686A15.894 15.894 0 0 1 .001 16 15.9 15.9 0 0 1 4.688 4.686 15.9 15.9 0 0 1 16.001 0a15.9 15.9 0 0 1 11.313 4.687A15.9 15.9 0 0 1 32.001 16a15.894 15.894 0 0 1-4.686 11.313A15.894 15.894 0 0 1 16.001 32zm0-30a14.016 14.016 0 0 0-14 14 14.016 14.016 0 0 0 14 14 14.016 14.016 0 0 0 14-14 14.016 14.016 0 0 0-14-14z' })
      ),
      card.partes.ativa.name
    ),
    card.partes.passiva.name && React.createElement(
      'span',
      { className: 'app-body-cards-card-partes-passiva' },
      React.createElement(
        'svg',
        { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 32 32' },
        React.createElement('path', { d: 'M7 15h18v2H7z' }),
        React.createElement('path', { d: 'M16 0a15.894 15.894 0 0 1 11.313 4.686A15.894 15.894 0 0 1 32 16a15.9 15.9 0 0 1-4.687 11.314A15.9 15.9 0 0 1 16 32a15.9 15.9 0 0 1-11.313-4.687A15.9 15.9 0 0 1 0 16 15.894 15.894 0 0 1 4.686 4.687 15.894 15.894 0 0 1 16 0zm0 30a14.016 14.016 0 0 0 14-14A14.016 14.016 0 0 0 16 2 14.016 14.016 0 0 0 2 16a14.016 14.016 0 0 0 14 14z' })
      ),
      card.partes.passiva.name
    )
  );
};
/* Função para atrelar as Tarjas ao card */
var getTarjasCard = function getTarjasCard(card) {
  return React.createElement(
    'div',
    { className: 'app-body-cards-card-tarjas' },
    card.tarja.map(function (tarjaTag) {
      var stylesTarja = {
        background: tarjaTag.background,
        color: tarjaTag.color
      };
      return tarjaTag.name && React.createElement(
        'span',
        { className: 'app-body-cards-card-tarjas-tarja', style: stylesTarja },
        tarjaTag.name
      );
    })
  );
};
/* Corpo do App */
var appProcess = function appProcess() {
  return React.createElement(
    'div',
    { className: 'app-body' },
    searchBar(),
    React.createElement(
      'div',
      { className: 'app-body-cards' },
      dataJson.cards.map(function (card) {
        /* renderiza sem filtro */
        if (!filtro.tag && !filtro.search) {
          return renderCard(card);
        }
        /* renderiza com Tag + Busca */
        else if (card.tag.filter(function (tagId) {
            return filtro.tag == tagId;
          }).length && (card.competencia.toLowerCase().includes(filtro.search) || card.classe.toLowerCase().includes(filtro.search) || card.assunto.toLowerCase().includes(filtro.search))) {
            return renderCard(card);
          }
          /* renderiza apenas busca sem tag */
          else if (!filtro.tag && (card.competencia.toLowerCase().includes(filtro.search) || card.classe.toLowerCase().includes(filtro.search) || card.assunto.toLowerCase().includes(filtro.search))) {
              return renderCard(card);
            }
      })
    )
  );
};

var renderCard = function renderCard(card) {
  /* renderizar o card de processo */
  return React.createElement(
    'div',
    { className: 'app-body-cards-card' },
    partesCard(card),
    card.classe && React.createElement(
      'p',
      null,
      card.classe,
      ' - ',
      card.competencia
    ),
    card.numero && React.createElement(
      'span',
      null,
      card.numero
    ),
    getTarjasCard(card)
  );
};
/* Objeto Data */
var dataJson = {
  cards: [{
    id: "1",
    status: {
      id: "4",
      name: "Lido",
      slug: "lido"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 2,
      namedefault: "Despacho",
      name: "Elaborar documento",
      content: '<figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}/{{competencia}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p>&nbsp;</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong></p>'
    },
    todo: true,
    enviadoRevisao: false,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: false,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      id: "1",
      name: "Doença Grave",
      color: "#0078D7",
      background: "#F4F4F4"
    }, {
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [1, 3],
    partes: {
      ativa: {
        name: "Reinaldo"
      },
      passiva: {
        name: "Agemed"
      }
    },
    competencia: "Civil -Procedimento Especial Contencioso",
    classe: "Procedimento Comum",
    assunto: "Planos de Saúde",
    numero: "0308735-46.2014.8.24.0023",
    concluso: 10
  }, {
    id: "2",
    status: {
      id: "4",
      name: "Lido",
      slug: "lido"
    },
    lido: false,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 2,
      namedefault: "Despacho",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}/{{competencia}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p>&nbsp;</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong></p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: false,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      id: "3",
      name: "Estatuto Idoso",
      color: "#FF0E35",
      background: "#F4F4F4"
    }, {
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [1, 4],
    partes: {
      ativa: {
        name: "Marisa",
        plus: ""
      },
      passiva: {
        name: "Latam",
        plus: ""
      }
    },
    competencia: "Cível - Possessórias",
    classe: "Procedimento Comum",
    assunto: "Indenização por Dano Moral",
    numero: "0308808-76.2018.8.24.0023",
    concluso: 9
  }, {
    id: "3",
    status: {
      id: "1",
      name: "Novo",
      slug: "novo"
    },
    lido: false,
    checked: false,
    modeloAssociado: true,
    modelo: {
      id: 2,
      namedefault: "Despacho",
      name: "Despacho Genérico",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}/{{competencia}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p class="classe">Vistos para despacho.</p><p> <strong>INTIME-SE</strong> a parte autora para, no prazo de 15 (quinze dias), emendar a petição inicial apresentando cópias legíveis dos documentos de páginas <font color="red">xx</font>, ciente da possibilidade de indeferimento, nos termos dos artigos 320, 321, caput e parágrafo único, e 485, inciso I, do Código de Processo Civil.</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong></p>'
    },
    todo: true,
    devolutiva: true,
    pecas: {
      inicial: true,
      todas: true,
      decisao: false,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      id: "3",
      name: "Estatuto Idoso",
      color: "#FF0E35",
      background: "#F4F4F4"
    }, {
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [1],
    partes: {
      ativa: {
        name: "Gralha",
        plus: ""
      },
      passiva: {
        name: "Telmo",
        plus: ""
      }
    },
    competencia: "Civil -Procedimento Especial Contencioso",
    classe: "Procedimento Comum",
    assunto: "Comissão",
    numero: "0806109-31.2013.8.24.0023",
    concluso: 15,
    remetente: "Mariana Sales",
    juiz: "Dra. Eliane de Alburquerque",
    titulacaoMagristrado: "JUIZA DE DIREITO"
  }, {
    id: "4",
    status: {
      id: "4",
      name: "Lido",
      slug: "lido"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 2,
      namedefault: "Despacho",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}/{{competencia}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p>&nbsp;</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong></p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: false,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      id: "3",
      name: "Estatuto Idoso",
      color: "#FF0E35",
      background: "#F4F4F4"
    }, {
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [1],
    partes: {
      ativa: {
        name: "José",
        plus: ""
      },
      passiva: {
        name: "Elza",
        plus: ""
      }
    },
    competencia: "Civil -Procedimento Especial Contencioso",
    classe: "Procedimento Comum",
    assunto: "Rescisão / Resolução",
    numero: "0312957-86.2016.8.24.0023",
    concluso: 7
  }, {
    id: "5",
    status: {
      id: "4",
      name: "Lido",
      slug: "lido"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 3,
      namedefault: "Sentença",
      name: "Sentença Genérico",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p class="classe">Vistos etc.</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p><p class="ck__assinatura"><strong> {{juiz}} </strong> <br><strong> {{titulacaoMagristrado}} </strong><br>"DOCUMENTO ASSINADO DIGITALMENTE <br>Lei n. 11.419/2006, art. 1o, § 2o, III, a” </p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: true,
      contestacao: true,
      impugnacao: true
    },
    tarja: [{
      id: "3",
      name: "Estatuto Idoso",
      color: "#FF0E35",
      background: "#F4F4F4"
    }, {
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [1, 2],
    partes: {
      ativa: {
        name: "Maura",
        plus: ""
      },
      passiva: {
        name: "BMW",
        plus: ""
      }
    },
    competencia: "Civil -Procedimento Especial Contencioso",
    classe: "Procedimento Comum",
    assunto: "Acidente de Trânsito",
    numero: "0809945.12.2013.8.24.0023",
    concluso: 2
  }, {
    id: "6",
    status: {
      id: "4",
      name: "Lido",
      slug: "lido"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 2,
      namedefault: "Despacho",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}/{{competencia}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p>&nbsp;</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong></p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: false,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      id: "3",
      name: "Estatuto Idoso",
      color: "#FF0E35",
      background: "#F4F4F4"
    }],
    tag: [1],
    partes: {
      ativa: {
        name: "Luiz",
        plus: ""
      },
      passiva: {
        name: "CAB",
        plus: ""
      }
    },
    competencia: "Civil - Responsabilidade Civil",
    classe: "Procedimento Comum - ",
    assunto: "Obrigação de Fazer / Não Fazer",
    numero: "0104160-23.2007.8.24.0023",
    concluso: 0.5
  }, {
    id: "7",
    status: {
      id: "4",
      name: "Lido",
      slug: "lido"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 2,
      namedefault: "Despacho",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}/{{competencia}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p>&nbsp;</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong></p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: false,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      id: "4",
      name: "Tramitação Prioritária",
      color: "#3978BB",
      background: "#F4F4F4"
    }, {
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [1],
    partes: {
      ativa: {
        name: "Espólio",
        plus: "+2"
      },
      passiva: {
        name: "Rogério",
        plus: ""
      }
    },
    competencia: "Consumidor",
    classe: "Reintegração / Manutenção de Posse",
    assunto: "Esbulho / Turbação / Ameaça",
    numero: "0008836-69.2008.8.24.0025",
    concluso: 0.4
  }, {
    id: "8",
    status: {
      id: "4",
      name: "Lido",
      slug: "lido"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 1,
      namedefault: "Decisão Interlocutória",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p class="classe">Vistos, etc.</p><p> &nbsp;</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong> </p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: true,
      contestacao: false,
      impugnacao: false
    },
    tarja: [],
    tag: [5],
    partes: {
      ativa: {
        name: "João",
        plus: ""
      },
      passiva: {
        name: "Paulo",
        plus: ""
      }
    },
    competencia: "Civil - Responsabilidade Civil",
    classe: "Procedimento Comum ",
    assunto: "Requerimento de Reintegração de Posse",
    numero: "0303650-04.201.68.24.0090",
    concluso: 60
  }, {
    id: "9",
    status: {
      id: "1",
      name: "Novo",
      slug: "novo"
    },
    lido: false,
    checked: false,
    modeloAssociado: true,
    modelo: {
      id: 1,
      namedefault: "Decisão Interlocutória",
      name: "Decisão Liminar Indeferimento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure>  <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p class="classe">Vistos para despacho.</p><p> <strong>INTIME-SE</strong> a parte autora para, no prazo de 15 (quinze dias), emendar a petição inicial apresentando cópias legíveis dos documentos de páginas <font color="red">xx</font>, ciente da possibilidade de indeferimento, nos termos dos artigos 320, 321, caput e parágrafo único, e 485, inciso I, do Código de Processo Civil.</p>  <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong> </p>'
    },
    todo: true,
    devolutiva: true,
    pecas: {
      inicial: true,
      todas: true,
      decisao: true,
      contestacao: true,
      impugnacao: false
    },
    tarja: [{
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [6],
    partes: {
      ativa: {
        name: "Vanessa",
        plus: ""
      },
      passiva: {
        name: "Condomínio",
        plus: ""
      }
    },
    competencia: "Civil - Contratos Civis",
    classe: "Procedimento Comum",
    assunto: "Obrigação de Fazer / Não Fazer",
    numero: "0304563-56.2017.8.24.0024",
    concluso: 10,
    remetente: "Debora Martins",
    juiz: "Dr. Romano José Enzweiler",
    titulacaoMagristrado: "JUIZ DE DIREITO"
  }, {
    id: "10",
    status: {
      id: "1",
      name: "Novo",
      slug: "novo"
    },
    lido: false,
    checked: false,
    modeloAssociado: true,
    modelo: {
      id: 2,
      namedefault: "Despacho",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}/{{competencia}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p>&nbsp;</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong></p>'
    },
    todo: true,
    devolutiva: true,
    pecas: {
      inicial: true,
      todas: true,
      decisao: false,
      contestacao: false,
      impugnacao: false
    },
    tarja: [],
    tag: [5],
    partes: {
      ativa: {
        name: "Catia",
        plus: "+1"
      },
      passiva: {
        name: "Paulo",
        plus: "+23"
      }
    },
    competencia: "Civil - Execução Civil",
    classe: "Embargos de Terceiro",
    assunto: "Constrição / Penhora / Avaliação / Indisponibilidade de Bens",
    numero: "0304563-56.2017.8.24.0023",
    concluso: 9,
    remetente: "Rafael Moraes",
    juiz: "Dra. Eliane de Alburquerque",
    titulacaoMagristrado: "JUIZA DE DIREITO"
  }, {
    id: "11",
    status: {
      id: "1",
      name: "Novo",
      slug: "novo"
    },
    lido: false,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 2,
      namedefault: "Despacho",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}/{{competencia}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p>&nbsp;</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong></p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: true,
      contestacao: true,
      impugnacao: true
    },
    tarja: [{
      name: "Meta 2 do CNJ",
      color: "#333333",
      background: "#E4E4E4"
    }, {
      name: "Defensoria Pública",
      color: "#333333",
      background: "#E4E4E4"
    }],
    tag: [],
    partes: {
      ativa: {
        name: "Gioconda",
        plus: "+2"
      },
      passiva: {
        name: "José",
        plus: ""
      }
    },
    competencia: "Civil -Procedimento Especial Contencioso",
    classe: "Dissolução e Liquidação de Sociedade",
    assunto: "Dissolução",
    numero: "0008836-69.2008.8.24.0023",
    concluso: 0.2
  }, {
    id: "12",
    status: {
      id: "1",
      name: "Novo",
      slug: "novo"
    },
    lido: false,
    checked: false,
    modeloAssociado: true,
    modelo: {
      id: 1,
      namedefault: "Decisão Interlocutória",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p class="classe">Vistos, etc.</p><p> &nbsp;</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong> </p>'
    },
    todo: true,
    devolutiva: true,
    pecas: {
      inicial: true,
      todas: true,
      decisao: true,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [4],
    partes: {
      ativa: {
        name: "Alkimat"
      },
      passiva: {
        name: "W.A."
      }
    },
    competencia: "Civil -Procedimento Especial Contencioso",
    classe: "Reintegração",
    assunto: "Esbulho / Turbação / Ameaça",
    numero: "0011918-06.2011.8.24.00233",
    concluso: 1,
    remetente: "Rodrigo Zen",
    juiz: "Dr. Romano José Enzweiler",
    titulacaoMagristrado: "JUIZ DE DIREITO"
  }, {
    id: "13",
    status: {
      id: "1",
      name: "Novo",
      slug: "novo"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 3,
      namedefault: "Sentença",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p class="classe">Vistos etc.</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p><p class="ck__assinatura"><strong> {{juiz}} </strong> <br><strong> {{titulacaoMagristrado}} </strong><br>"DOCUMENTO ASSINADO DIGITALMENTE <br>Lei n. 11.419/2006, art. 1o, § 2o, III, a” </p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: true,
      contestacao: true,
      impugnacao: true
    },
    tarja: [{
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [],
    partes: {
      ativa: {
        name: "Pedra"
      },
      passiva: {
        name: "Floripa"
      }
    },
    competencia: "Civil -Procedimento Especial Contencioso",
    classe: "Monitória",
    assunto: "Empreitada",
    numero: "0304784-73.2016.8.24.0023",
    concluso: 2
  }, {
    id: "14",
    status: {
      id: "4",
      name: "Lido",
      slug: "lido"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 1,
      namedefault: "Decisão Interlocutória",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p class="classe">Vistos, etc.</p><p> &nbsp;</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong> </p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: true,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [4],
    partes: {
      ativa: {
        name: "Zenon"
      },
      passiva: {
        name: "Juliana"
      }
    },
    competencia: "Civil -Procedimento Especial Contencioso",
    classe: "Procedimento Comum",
    assunto: "Compra e venda",
    numero: "0873312-10.2013.8.24.0023",
    concluso: 28
  }, {
    id: "17",
    status: {
      id: "1",
      name: "Novo",
      slug: "novo"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 3,
      namedefault: "Sentença",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p class="classe">Vistos etc.</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p><p class="ck__assinatura"><strong> {{juiz}} </strong> <br><strong> {{titulacaoMagristrado}} </strong><br>"DOCUMENTO ASSINADO DIGITALMENTE <br>Lei n. 11.419/2006, art. 1o, § 2o, III, a” </p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: true,
      contestacao: true,
      impugnacao: true
    },
    tarja: [{
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [5],
    partes: {
      ativa: {
        name: "Celesc",
        plus: ""
      },
      passiva: {
        name: "Alexsandro",
        plus: ""
      }
    },
    competencia: "Civil -Procedimento Especial Contencioso",
    classe: "Reintegração / Manutenção de Posse",
    assunto: "Esbulho / Turbação / Ameaça",
    numero: "1017716-57.2013.8.24.0023",
    concluso: 0.5
  }, {
    id: "18",
    status: {
      id: "4",
      name: "Lido",
      slug: "lido"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 1,
      namedefault: "Decisão Interlocutória",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p class="classe">Vistos, etc.</p><p> &nbsp;</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong> </p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: true,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      id: "2",
      name: "Justiça Gratuita",
      color: "#333333",
      background: "#E4E4E4"
    }],
    tag: [6],
    partes: {
      ativa: {
        name: "Sidney",
        plus: ""
      },
      passiva: {
        name: "Luciane",
        plus: ""
      }
    },
    competencia: "Civil - Responsabilidade Civil",
    classe: "Procedimento Comum - ",
    assunto: "Obrigações",
    numero: "0314024-86.2016.8.24.0023",
    concluso: 9
  }, {
    id: "19",
    status: {
      id: "1",
      name: "Novo",
      slug: "novo"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 1,
      namedefault: "Decisão Interlocutória",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p class="classe">Vistos, etc.</p><p> &nbsp;</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong> </p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: true,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      id: "2",
      name: "Justiça Gratuita",
      color: "#4D4D4D",
      background: "#F4F4F4"
    }],
    tag: [],
    partes: {
      ativa: {
        name: "Verde",
        plus: "+2"
      },
      passiva: {
        name: "Luiz",
        plus: ""
      }
    },
    competencia: "Consumidor",
    classe: "Procedimento Comum",
    assunto: "Compra e Venda",
    numero: "0014325-19.2010.8.24.0023",
    concluso: 2
  }, {
    id: "20",
    status: {
      id: "1",
      name: "Novo",
      slug: "novo"
    },
    lido: true,
    checked: false,
    modeloAssociado: false,
    modelo: {
      id: 2,
      namedefault: "Despacho",
      name: "Elaborar documento",
      content: ' <figure class="image"><img src="../__core/assets/images/modelos/cabecalho.jpg" alt="Estado de Santa Catarina - Comarca da capital - 2ª Vara Cívil"> </figure> <p class="ck__titulos"><strong>Autos nº {{numero}}&nbsp;</strong><br><strong>Ação: {{classe}}/{{competencia}}&nbsp;</strong><br><strong>{{tipoParteAtiva}}: {{partes.ativa.name}}&nbsp;</strong><br><strong>{{tipoPartePassiva}}: {{partes.passiva.name}}&nbsp;</strong></p><br><br> <p>&nbsp;</p><p>*.</p> <p> {{municipio}}, {{dataSistema}}. </p> <p  class="ck__assinatura"><strong> {{juiz}} </strong> <br> <strong> {{titulacaoMagristrado}} </strong></p>'
    },
    todo: true,
    devolutiva: false,
    pecas: {
      inicial: true,
      todas: true,
      decisao: false,
      contestacao: false,
      impugnacao: false
    },
    tarja: [{
      name: "",
      color: "",
      background: ""
    }, {
      name: "",
      color: "",
      background: ""
    }],
    tag: [],
    partes: {
      ativa: {
        name: "Thyssen",
        plus: "+2"
      },
      passiva: {
        name: "KGL",
        plus: ""
      }
    },
    competencia: "Consumidor",
    classe: "Procedimento Comum",
    assunto: "Prestação de Serviços",
    numero: "0335013-84.2014.8.24.0023",
    concluso: 1
  }],
  produto: "Gabinete",
  tags: [{
    id: "1",
    name: "Urgente1",
    color: "#fff",
    background: "#c483d7"
  }, {
    id: "2",
    name: "DPVAT",
    color: "#fff",
    background: "#2dab5c"
  }, {
    id: "3",
    name: "Agemed",
    color: "#fff",
    background: "#eadb2a"
  }, {
    id: "4",
    name: "Indenizatória",
    color: "#FFF",
    background: "#ff0022"
  }, {
    id: "5",
    name: "Possessória",
    color: "#FFF",
    background: "#72328a"
  }, {
    id: "6",
    name: "Obrigações",
    color: "#FFF",
    background: "#49bdce"
  }],
  tarja: [{
    id: "1",
    name: "Doença Grave",
    color: "#0078D7",
    background: "#F4F4F4"
  }, {
    id: "2",
    name: "Justiça Gratuita",
    color: "#4D4D4D",
    background: "#F4F4F4"
  }, {
    id: "3",
    name: "Estatuto Idoso",
    color: "#FF0E35",
    background: "#F4F4F4"
  }, {
    id: "4",
    name: "Tramitação Prioritária",
    color: "#3978BB",
    background: "#F4F4F4"
  }],
  usuario: [{
    id: 1,
    name: "Assessor"
  }, {
    id: 2,
    name: "Juiz"
  }]
  /* Raiz App */
};var appRoot = document.getElementById("app");
/* renderizado */
var renderApp = function renderApp() {
  var template = React.createElement(
    'div',
    { className: 'clearfix' },
    navBar(),
    appProcess()
  );

  ReactDOM.render(template, appRoot);
};

renderApp();
