const fs = require('fs');

function quitarTildes(palabra) {
    return palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function procesarArchivo() {
    fs.readFile('lista.txt', 'utf8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            return;
        }

      
        const contenidoSinTildes = data.replace(/[áéíóúÁÉÍÓÚüÜ]/g, (match) => {
            return quitarTildes(match);
        });

 
        const palabrasUnicas = [...new Set(contenidoSinTildes.split(/\s+/))];

    
        const contenidoFinal = palabrasUnicas.join('\n');

        
        fs.writeFile('listafix.txt', contenidoFinal, 'utf8', (err) => {
            if (err) {
                console.error('Error al escribir en el archivo:', err);
                return;
            }
            console.log('Reemplazo de tildes y eliminación de duplicados completados. Ver el archivo "listafix.txt".');
        });
    });
}

procesarArchivo();
