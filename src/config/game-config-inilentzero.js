const EVIL_NAME = 'CHISPIS';
const EVIL_LETTERS = {
  C: '1',
  H: '2',
  I: '3',
  S: '4',
  P: '5',
};

export default {
  'EVIL_NAME': EVIL_NAME,
  'ROOM_2_PIZARRA_ARGS': { image: 'game/2/pizarra-hint-3.jpg', left: 55, top: 35,
    fontSize: 7, text: 'HUID', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_6_PIZARRA_ARGS': { image: 'game/6/pizarra-hint-1.jpg', left: 15, top: 33,
    fontSize: 6, text: 'EL TIEMPO SE AGOTA', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_PIZARRA_ARGS': { image: 'game/8/pizarra-hint-2.jpg', left: 12, top: 37,
    fontSize: 4.8, text: 'EL INNOMBRABLE SE ACERCA', evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  'ROOM_8_COMPUTER_ARGS': { image: 'game/8/room8-monitor-password-entered.jpg', left: 35, top: 55,
    fontSize: 6, text: EVIL_NAME, evilName: EVIL_NAME, evilLetters: EVIL_LETTERS },
  images: {
    '#CUEVA_Y_HECHICERO#': 'cueva-y-hechicero-chispis.jpg',
  },
  welcomeText: [
    'Iñigo & amigos,<br /><br />',
    'Estoy atrapado.<br /><br />',
    'Cuando fui a recoger a Iñigo al colegio, alguien me pilló husmeando.<br /><br />',
    'Algo debí encontrar porque me han encerrado. <br /><br />',
    'Ayudadme a salir y veamos qué misterios esconde este colegio.',
  ].join(''),
}

