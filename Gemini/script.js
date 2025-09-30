// 1. Importar a ferramenta (você já fez isso perfeitamente)
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const daquiUmMes = dayjs().add(1, 'month').format('MMMM D');
console.log('Daqui a 1 mês:', daquiUmMes);

// 15c: Subtrair 1 mês
const umMesAtras = dayjs().subtract(1, 'month').format('MMMM D');
console.log('Um mês atrás:', umMesAtras);


