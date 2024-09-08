export const formatarNumeroCelular = (valor: string) => {
    // Remove todos os caracteres não numéricos
    const apenasNumeros = valor.replace(/[^\d]/g, '');
  
    // Aplica a formatação desejada
    const parte1 = apenasNumeros.slice(0, 2);
    const parte2 = apenasNumeros.slice(2, 7);
    const parte3 = apenasNumeros.slice(7, 11);
  
    let numeroFormatado = '';
    
    if (parte1) {
      numeroFormatado += `(${parte1}`;
    }
    if (parte2) {
      numeroFormatado += `) ${parte2}`;
    }
    if (parte3) {
      numeroFormatado += `-${parte3}`;
    }
  
    return numeroFormatado;
  };