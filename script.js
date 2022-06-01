var configMinuto;
var configSegundo;
var mostrarValor;
var evento = null;
var contador = null;
var minuto = 0;
var segundo = 0;
var hora = 0;

function IniciarCronometro(valor) {
	this.evento = valor;
	this.configHora = document.getElementById('hor').value;
	this.configMinuto = document.getElementById('min').value;
	this.configSegundo = document.getElementById('seg').value;
	this.mostrarValor = document.getElementById('mostrarValor');


	if (evento == "start") {
		if (!document.getElementById('hor').readOnly) {
			if (!this.validarNumero(this.configHora) || document.getElementById('hor').value > 24) {
				alert("Campo hora não é um número!");
				return;
			}

			if (!this.validarNumero(this.configMinuto) || document.getElementById('min').value > 59) {
				alert("Campo minuto não é um número (0 a 59)!");
				return;
			}
			if (!this.validarNumero(this.configSegundo) || document.getElementById('seg').value > 59) {
				alert("Campo segundo não é um número válido (0 a 59)!");
				return;
			}
			document.getElementById('hor').readOnly = true;
			document.getElementById('min').readOnly = true;
			document.getElementById('seg').readOnly = true;
			document.getElementById('btnIniciar').disabled = true;
			document.getElementById('btnResetar').disabled = false;
			document.getElementById('btnPausar').disabled = false;
			this.hora = document.getElementById('hor').value;
			this.minuto = document.getElementById('min').value;
			this.segundo = document.getElementById('seg').value;

			document.getElementById('mostrarValor').classList.remove('mostrarValor');
			document.getElementById('mostrarValor').classList.add('mostrarValor2');
			document.getElementById('exibe').classList.remove('Classexibe');
			document.getElementById('exibe').classList.add('Classexibe2');

		} else {
			if (  this.hora != 0 && this.minuto == 0 &&  this.segundo == 0) {
				this.minuto = 60;
				this.hora--;

			}
			if ( this.minuto != 0 && this.segundo == 0 ) {
				
				this.segundo = 59;
				this.minuto--;
				
			} else {
				
				this.segundo--;
			}

			if ( this.hora == 0 && this.minuto == 0 && this.segundo == 0) {
				document.getElementById('hor').readOnly = false;
				document.getElementById('min').readOnly = false;
				document.getElementById('seg').readOnly = false;
				document.getElementById('btnIniciar').disabled = false;
				document.getElementById('btnResetar').disabled = true;
				document.getElementById('btnPausar').disabled = true;
				this.mostrarValor.value = "00:00:00";

				document.getElementById('mostrarValor').classList.remove('mostrarValor2');
				document.getElementById('mostrarValor').classList.add('mostrarValor');
				document.getElementById('exibe').classList.remove('Classexibe2');
				document.getElementById('exibe').classList.add('Classexibe');

				clearTimeout(this.contador);
				return;
			}

			novoHora = null;
			novoMinuto = null;
			novoSegundo = null;
			if (this.hora <= 9) {
				novoHora = "0" + this.hora;
			} else {
				novoHora = this.hora;
			}
			if (this.minuto <= 9) {
				novoMinuto = "0" + this.minuto;
			} else {
				novoMinuto = this.minuto;
			}
			if (this.segundo <= 9) {
				novoSegundo = "0" + this.segundo;
			} else {
				novoSegundo = this.segundo;
			}
			this.mostrarValor.value = novoHora + ":" + novoMinuto + ":" + novoSegundo;
		}
	}
	clearTimeout(this.contador);
	this.contador = setTimeout('IniciarCronometro(evento)', 1000);
}

function validarNumero(valor) {
	return !isNaN(parseFloat(valor)) && isFinite(valor);
}



function PausarCronometro() {
	if (document.getElementById('btnPausar').value == "PAUSAR") {
		document.getElementById('btnPausar').value = "VOLTAR";
		this.evento = "pause";
	} else {
		document.getElementById('btnPausar').value = "PAUSAR";
		this.evento = "start";
	}
}

function ResetarCronometro() {
	document.getElementById('hor').readOnly = false;
	document.getElementById('min').readOnly = false;
	document.getElementById('seg').readOnly = false;
	document.getElementById('btnIniciar').disabled = false;
	document.getElementById('btnResetar').disabled = true;
	document.getElementById('btnPausar').disabled = true;
	document.getElementById('btnPausar').value = "PAUSAR";
	this.mostrarValor.value = "00:00:00";

	document.getElementById('mostrarValor').classList.remove('mostrarValor2');
	document.getElementById('mostrarValor').classList.add('mostrarValor');
	document.getElementById('exibe').classList.remove('Classexibe2');
	document.getElementById('exibe').classList.add('Classexibe');

	clearTimeout(this.contador);
}