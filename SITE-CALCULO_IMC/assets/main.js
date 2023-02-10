// Capturar evento de submit do formulário
const form = document.querySelector('#formulario');

form.addEventListener('submit', function(e){
    e.preventDefault();
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');

    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);


    if (!peso || peso > 400 || peso < 2){
        if(!altura || altura > 2.60 || altura < 0.3){
            setResultado('Peso e altura invalidos', false)
            return;
        }
        setResultado('Peso invalido', false);
        return;
    }

    if (!altura  || altura > 2.60 || altura < 0.3) {
        setResultado('Altura invalido', false);
        return;
    }


    const imc = getImc(peso, altura);
    const nivelImc = getNivelImc(imc);

    const msg = `Seu IMC é ${imc} (${nivelImc}).`;

    setResultado(msg, true, imc);

});

function getNivelImc(imc) {
    const nivel = ['Abaixo do peso', 'Peso normal','Sobrepeso', 'Obesidade grau 1', 'Obesidade grau 2', 'Obesidade grau 3'];

    if(imc > 39.9) return nivel[5];
    if(imc >= 35) return nivel[4];
    if(imc >= 30) return nivel[3];
    if(imc >= 25) return nivel[2];
    if(imc >= 18.5) return nivel[1];
    if(imc < 18.5) return nivel[0];
    
}

function getImc(peso, altura) {
    const imc = peso / altura ** 2;
    return imc.toFixed(2);
}

function criarP() {
    const p = document.createElement('p');
    return p;
}

function setResultado(msg, isValid, imc) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';

    const p = criarP();

    if(isValid) {
        if(imc < 18.5 || imc >= 25){
            p.classList.add('alerta');
        }else{
        p.classList.add('paragrafo-resultado');
        }
    } else {
        p.classList.add('bad');
    }
    p.innerHTML = msg
    resultado.appendChild(p);

}