const EVIL_NAME = 'MANUEL';
const EVIL_LETTERS = {
  M: '3',
  A: '1',
  N: '2',
  U: '4',
  E: '6',
  L: '5'
};

export default {
  background: 'background-the-great-jvmx.jpg',
  'EVIL_NAME': EVIL_NAME,
  'ROOM_2_PIZARRA_ARGS': { image: 'game/2/pizarra-hint-3-J.jpg', left: 55, top: 35,
    fontSize: 7, text: 'AMIGOS', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_6_PIZARRA_ARGS': { image: 'game/6/pizarra-hint-1-J.jpg', left: 15, top: 33,
    fontSize: 6, text: 'EL TIEMPO CORRE', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_PIZARRA_ARGS': { image: 'game/8/pizarra-hint-2-J.jpg', left: 12, top: 37,
    fontSize: 5.5, text: 'HUID, NO OS QUEDEIS', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_COMPUTER_ARGS': { image: 'game/8/room8-monitor-password-entered-the-great-jvmx.jpg', left: 31, top: 59,
    fontSize: 5, text: EVIL_NAME.split('').join(' '), evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  images: {
    '#CARTA_INICIAL#': 'carta-the-great-jvmx.jpg',
    '#CUEVA_Y_HECHICERO#': 'cueva-y-hechicero-the-great-jvmx.jpg',
    '#LIBRO_BIBLIO#': 'book-the-great-jvmx.jpg',
    '#VIDEO_PISTA#': 'videopista-the-great-jvmx.mp4',
    '#ROOM2_BIBLIO#': 'biblio-the-great-jvmx.jpg',
    '#ROOM5_POLI#': 'poli-the-great-jvmx.jpg',
    '#ROOM6_STEAM#': 'steamroom-the-great-jvmx.jpg',
    '#ROOM8_AULA#': 'aula-the-great-jvmx.jpg',
    '#ROOM8_ORDENADOR_ON#': 'room8-monitor-password-entered-the-great-jvmx.jpg'
  },
  welcomeText: [
    'Aupa, Jorge y amigos:<br /><br />',
    '¡Estoy atrapado!<br /><br />',
    'Soy Jordi, tío de Jorge. Fui de sorpresa a su colegio, para saludar, pero me perdí sin querer.<br/><br/> ',
    'Cuando deambulaba por el colegio, creo que vi algo o a alguien que no debía, y me dejaron insconciente. ',
    'Ahora estoy atrapado.<br /><br />',
    'Jorge, y amigos: sé que conocéis este colegio a fondo y que sois personas muy inteligentes. <br /><br />',
    'Ayudadme a salir y veamos qué misterios esconde.',
  ].join(''),
}

