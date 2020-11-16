// Importar librerías
import _ from 'lodash';

// Da formato a un valor numérico
const putFormat = (number, decimals = 0) => {
    // Definir formato
    var formatter = new Intl.NumberFormat('de-DE');

    // Validar entrada del número
    if (number === '-') return '-';
    if (!number) return 0;

    // Retornar valor
    return formatter.format(_.round(number, decimals));
};

export default putFormat;