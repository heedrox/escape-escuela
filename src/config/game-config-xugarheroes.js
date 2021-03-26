const EVIL_NAME = 'AITONA';
const EVIL_LETTERS = {
  A: '3',
  I: '1',
  T: '2',
  O: '4',
  N: '5',
};

export default {
  background: 'background-xugarheroes.jpg',
  'EVIL_NAME': EVIL_NAME,
  'ROOM_2_PIZARRA_ARGS': { image: 'game/2/pizarra-hint-3-B.jpg', left: 55, top: 35,
    fontSize: 7, text: 'RAPIDO', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_6_PIZARRA_ARGS': { image: 'game/6/pizarra-hint-1-B.jpg', left: 15, top: 33,
    fontSize: 6, text: 'EL    TIEMPO    CORRE', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_PIZARRA_ARGS': { image: 'game/8/pizarra-hint-2-B.jpg', left: 12, top: 37,
    fontSize: 5.5, text: 'YA ESTA AQUI', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_COMPUTER_ARGS': { image: 'game/8/room8-monitor-password-entered-xugarheroes.jpg', left: 37, top: 59,
    fontSize: 5, text: EVIL_NAME.split('').join(' '), evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  images: {
    '#CARTA_INICIAL#': 'carta-xugarheroes.jpg',
    '#CUEVA_Y_HECHICERO#': 'cueva-y-hechicero-xugarheroes.jpg',
    '#LIBRO_BIBLIO#': 'book-xugarheroes.jpg',
    '#VIDEO_PISTA#': 'videopista-xugarheroes.mp4',
    '#ROOM2_BIBLIO#': 'biblio-xugarheroes.jpg',
    '#ROOM5_POLI#': 'poli-xugarheroes.jpg',
    '#ROOM6_STEAM#': 'steamroom-xugarheroes.jpg',
    '#ROOM8_AULA#': 'aula-xugarheroes.jpg',
    '#ROOM8_ORDENADOR_ON#': 'room8-monitor-password-entered-xugarheroes.jpg'
  },
  welcomeText: [
    'Aupa!,<br /><br />',
    'Estoy atrapado.<br /><br />',
    'Soy Jordi, detective privado. Me contrataron en vuestro colegio porque Olimpus se ha escapado. ',
    'Pero me puse a husmear, y alguien me pilló...<br /><br />',
    'Algo debí encontrar porque me han encerrado. <br /><br />',
    'Beto me ha dicho que conocéis este colegio a fondo y que sois personas muy inteligentes. <br /><br />',
    'Ayudadme a salir y veamos qué misterios esconde este colegio.',
  ].join(''),
}

