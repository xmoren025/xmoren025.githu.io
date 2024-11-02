

function generarTablero(n){
    return Array(n).fill('+'.repeat(n)).join('\n')
};

generarTablero(8)