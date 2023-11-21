// 0 = sucio y desocupado
// 1 = sucio y ocupado
// 2 = limpio y desocupado
// 3 = limpio y ocupado


// INICIO: Mostrar bodegas ya actualizarlas
let bateria= 2.5;
let matrizEstadoInicial = [];

// Define la matriz incial
function definirEstados() {
    for (let i = 0; i < 4; i++) {
        matrizEstadoInicial[i] = [Math.floor(Math.random()*4), i ];
    }
    matrizEstadoInicial.sort();
    console.log(matrizEstadoInicial);
};

// animacion HTML para las bodegas sucias
function bodegaSucia(numeroBodega) {
    for (let i = 0; i < 18; i++) {
        let bodega = document.getElementById("bodega_" + numeroBodega + "." + i);
        bodega.onload = ()=>{console.log("bodega " + numeroBodega);}
        bodega.className = "imagen";
        bodega.src= "./imagenes/basura.png";
    }
}

1
// Muestra estado e imágen de bodegas según la matriz inicial

function mostrarEstadosEnBodegas(matrizEstadoInicial) {
    for (let i = 0; i < matrizEstadoInicial.length; i++) {
        if (matrizEstadoInicial[i][0] === 0) {
            bodegaSucia(matrizEstadoInicial[i][1]);
            document.getElementById("estadoBodega"+matrizEstadoInicial[i][1]).textContent = "Sucio - Desocupado";
        }else if (matrizEstadoInicial[i][0] === 1) {
            document.getElementById("estadoBodega"+matrizEstadoInicial[i][1]).textContent = "Sucio - Ocupado"
            document.getElementById("B"+matrizEstadoInicial[i][1]).className = "bodega ocupada";
            bodegaSucia(matrizEstadoInicial[i][1])
            setTimeout(function(){
                document.getElementById("B"+matrizEstadoInicial[i][1]).className = "bodega";
           }, 8000)
        }else if (matrizEstadoInicial[i][0] === 2) {
            document.getElementById("estadoBodega"+matrizEstadoInicial[i][1]).textContent = "Limpio - Desocupado"
        }else if (matrizEstadoInicial[i][0] === 3) {
            document.getElementById("estadoBodega"+matrizEstadoInicial[i][1]).textContent = "Limpio - Ocupado"
            document.getElementById("B"+matrizEstadoInicial[i][1]).className = "bodega ocupada";
            setTimeout(function(){
                document.getElementById("B"+matrizEstadoInicial[i][1]).className = "bodega";
           }, 8000)
        }
    }
    setTimeout(function(){
        actualizarOcupados(matrizEstadoInicial)
        console.log(matrizEstadoInicial);
    }, 8000)
}
// Actualiza ocupados a desocupados depués de x segundos
function actualizarOcupados(matrizEstadoInicial) {
    for (let i = 0; i < matrizEstadoInicial.length; i++) {
        if (matrizEstadoInicial[i][0] === 1) {
            matrizEstadoInicial[i][0] = 0;
            document.getElementById("estadoBodega"+matrizEstadoInicial[i][1]).textContent = "Sucio - Desocupado";
        }else if (matrizEstadoInicial[i][0] === 3) {
            matrizEstadoInicial[i][0] = 2;
            document.getElementById("estadoBodega"+matrizEstadoInicial[i][1]).textContent = "Limpio - Desocupado"
        }
    }
}



// MITAD: Aspirar según el estado de la bodega en orden.

// Hace la animación de aspirado
async function animacionAspiradora(numeroBodega, i) {
    let bodega = document.getElementById("bodega_" + numeroBodega + "." + i);
        setTimeout(function(){
            bodega.onload = ()=>{console.log("creado");}
            document.getElementById("estadoAspiradora").textContent = "Aspirando";
            bodega.className= "imagen"
            bodega.src="./imagenes/ModeloAspiradoraCargando.png"
        }, 200)
        setTimeout(function(){
            bodega.src= "";
            bodega.className = "";
        }, 800)
}

// Limpiar bodega cuando está desocupada
async function limpiarBodegaDesocupada(numeroBodega,i) {
    document.getElementById("source").src= "./imagenes/CargadorAspiradora.png";
    if (i === 18) {
        actualizarEstado(numeroBodega)
        bateria--;
        console.log(bateria);
    }else{
        animacionAspiradora(numeroBodega, i)
        setTimeout(function(){
            limpiarBodegaDesocupada(numeroBodega, i+1)
        }, 800)
    }
}

// Limpiar bodega cuando está ocupada en el primer puesto
async function limpiarBodegaOcupada(numeroBodega,i) {
    document.getElementById("estadoAspiradora").textContent = "Esperando";
    setTimeout(()=>{
        document.getElementById("source").src= "./imagenes/CargadorAspiradora.png";
    if (i===18) {
        actualizarEstado(numeroBodega)
    }else{
        animacionAspiradora(numeroBodega, i)
        setTimeout(function(){
            limpiarBodegaDesocupada(numeroBodega, i+1)
        }, 800)
    }
    }, 8000)
}


async function limpiarMediaBodega(numeroBodega,i,x) {
    document.getElementById("source").src= "./imagenes/CargadorAspiradora.png";
    if (i==x) {
        actualizarEstado(numeroBodega)
        bateria = bateria - 0.5
        console.log(bateria);
    }else{
        animacionAspiradora(numeroBodega, i)
        setTimeout(function(){
            limpiarMediaBodega(numeroBodega, i+1,x)
        }, 800)
    }
}


// Animacion para bateria acabada y recargada
async function limpiarBodegaMediaBateria(numeroBodega){
    limpiarMediaBodega(numeroBodega, 0, 8);
        setTimeout(()=>{
            document.getElementById("source").src = "./imagenes/ModeloAspiradoraDescargada.png"
            document.getElementById("estadoAspiradora").textContent = "Cargando";
            setTimeout(()=>{
                document.getElementById("source").src = "./imagenes/ModeloAspiradoraCargando.png"
                setTimeout(()=>{
                    bateria = 2.5;
                    limpiarMediaBodega(numeroBodega, 8, 18);
                    actualizarEstado(numeroBodega)
                }, 1000);
            }, 5000);
        },7000);
}


//Animación de carga aspiradora
function aspiradoraCargando() {
        document.getElementById("source").src = "./imagenes/ModeloAspiradoraDescargada.png"
        document.getElementById("estadoAspiradora").textContent = "Cargando";
        setTimeout(()=>{
            document.getElementById("source").src = "./imagenes/ModeloAspiradoraCargando.png"
            setTimeout(()=>{
                bateria = 2.5;
            }, 1000);
        }, 5000);

}

// actualizar estado de bodega una vez ha sido limpiada
function actualizarEstado(numeroBodega) {
    for (let i = 0; i < matrizEstadoInicial.length; i++) {
        if (matrizEstadoInicial[i][1] === numeroBodega) {
            matrizEstadoInicial[i][0] = 2;
            document.getElementById("estadoBodega"+numeroBodega).textContent = "Limpio - Desocupado"
        }
    } 
}

// ELEGIR BODEGA CON LÓGICA SEGÚN ESTADO DE LAS BODEGAS
function elegirBodega(i) {
    if (i === 4) {
        console.log("terminó");
    } else {
        if (matrizEstadoInicial[i][0]=== 1) {
            if (bateria === 0.5) {
                setTimeout(()=>{
                    limpiarBodegaMediaBateria(matrizEstadoInicial[i][1])
                    setTimeout(()=>{
                        elegirBodega(i+1);
                    },22000)
                },8000)
            }else if(bateria === 0){
                aspiradoraCargando()
                setTimeout(()=>{
                    limpiarBodegaDesocupada(matrizEstadoInicial[i][1],0)
                    setTimeout(()=>{
                        elegirBodega(i+1);
                    },18000)
                },8000)
            }else{
                limpiarBodegaOcupada(matrizEstadoInicial[i][1],0)
                setTimeout(()=>{
                    elegirBodega(i+1);
                },25000)
            }
        } else if (matrizEstadoInicial[i][0]=== 0) {
            if (bateria === 0.5) {
                    limpiarBodegaMediaBateria(matrizEstadoInicial[i][1])
                    setTimeout(()=>{
                        elegirBodega(i+1);
                    },22000)
                
            }else if(bateria === 0){
                aspiradoraCargando()
                setTimeout(()=>{
                    limpiarBodegaDesocupada(matrizEstadoInicial[i][1],0)
                    setTimeout(()=>{
                        elegirBodega(i+1);
                    },18000)
                },6500)
            }else{
                limpiarBodegaDesocupada(matrizEstadoInicial[i][1],0)
                setTimeout(()=>{
                    elegirBodega(i+1);
                },18000)
            }
        }else{elegirBodega(i+1)}
    }
}


function calcularTiempo(matrizEstadoInicial) {
    let tiempo = 0;
    for (let i = 0; i < matrizEstadoInicial.length; i++) {
        if (matrizEstadoInicial[i][0] == 1 || matrizEstadoInicial[i][0] == 0) {
            tiempo++;
        }
    }
    return tiempo
}



function hola() {
    bateria = 0
    definirEstados()
    mostrarEstadosEnBodegas(matrizEstadoInicial)
    elegirBodega(0)
}
// hola()



function simulacion(i) {
    if (i === 3) {
        console.log("Simulación Terminada");
    }else{
        definirEstados()
        tiempo = calcularTiempo(matrizEstadoInicial)
        console.log(matrizEstadoInicial);
        mostrarEstadosEnBodegas(matrizEstadoInicial); 
        elegirBodega(0)
        setTimeout(()=>{
            simulacion(i+1)
        },22000*tiempo)
    } 
}





