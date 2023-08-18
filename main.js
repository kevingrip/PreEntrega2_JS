const empanadas = [
    { id: 1, catalogo: "Jamon y Queso", tipo: "Clasicas", precioHorno: 200, precioFrita: 250 },
    { id: 2, catalogo: "Carne", tipo: "Clasicas", precioHorno: 200, precioFrita: 250 },
    { id: 3, catalogo: "Pollo", tipo: "Clasicas", precioHorno: 200, precioFrita: 250 },
    { id: 4, catalogo: "Verdura", tipo: "Clasicas", precioHorno: 200, precioFrita: 250 },
    { id: 5, catalogo: "4 quesos", tipo: "Especial", precioHorno: 300, precioFrita: 350 },
    { id: 6, catalogo: "Roquefort", tipo: "Especial", precioHorno: 300, precioFrita: 350 },
    { id: 7, catalogo: "Vacio y provoleta", tipo: "Especial", precioHorno: 300, precioFrita: 350 },
    { id: 8, catalogo: "Champignon", tipo: "Especial", precioHorno: 300, precioFrita: 350 }
];

const promo = [
    {tipo: "docena al horno", precio: 2200},
    {tipo: "docena frita", precio: 2600}
];

const cocina = ["Horno","Frita"]

let descuentoDocenas = (precioTotal,precioPromo,cantDocenas,restantes,cantidad) => (precioTotal-(precioPromo*cantDocenas)-(restantes*(precioTotal/cantidad)));

let pedirDescuento = (cantidad,oferta,docenas) => {
    if (cantidad[1] >= 12){
        moduloClasica = cantidad[1] % 12;
        descuento = descuentoDocenas(cantidad[0],oferta.precio,docenas,moduloClasica,cantidad[1]);
    }else{
        descuento = parseInt(0);
    };
    return descuento
}

let pedirGustos = (preparacion,ingresaCantidad,infoHorno,infoFrita,gustosPedidos,cantidadPedidos) => {

    let sumaCantidad = 0;
    let sumaPrecioClasica = 0;
    let sumaPrecioEspecial =0;
    let cantClasica = 0;
    let cantEspecial = 0;
    let posCatalogo = 0;

    while (sumaCantidad < ingresaCantidad) {

        if (posCatalogo == 0){
            gustosPedidos.push('\n'+preparacion+':\n');
            cantidadPedidos.push('')
        } 

        const sabores = empanadas[posCatalogo];

        let cantidadOrdenada = prompt(`Empanadas disponibles: ${ingresaCantidad-sumaCantidad}\n Ingrese cantidad de empanadas de ${sabores.catalogo} `);

        if (cantidadOrdenada == ""){
            cantidadOrdenada = parseInt(0); 
        }else{
            cantidadOrdenada = parseInt(cantidadOrdenada);
        }
        if (sabores.tipo == 'Clasicas'){
            if (preparacion == 'Horno'){
                sumaPrecioClasica += sabores.precioHorno*cantidadOrdenada;
            }else{
                sumaPrecioClasica += sabores.precioFrita*cantidadOrdenada;
            }
            cantClasica += cantidadOrdenada;
            
        }else{
            if (preparacion == 'Horno'){
                sumaPrecioEspecial += sabores.precioHorno*cantidadOrdenada;
            }else{
                sumaPrecioEspecial += sabores.precioFrita*cantidadOrdenada;
            }
            cantEspecial += cantidadOrdenada;
        }
        sumaCantidad += cantidadOrdenada;
        posCatalogo +=  1;

        if (cantidadOrdenada > 0 ){
            gustosPedidos.push(sabores.catalogo);
            cantidadPedidos.push(' x' + cantidadOrdenada);
        };

        if (sumaCantidad > ingresaCantidad){
            alert("Error: Seleccionó mas empanadas que las solicitadas. Reintente nuevamente");
            ingresaCantidad = parseInt(prompt(`Reingrese cantidad de empanadas (${preparacion})`));
            cantidadOrdenada = 0;
            sumaCantidad = 0;
            posCatalogo = 0;
            sumaPrecioClasica = 0;
            sumaPrecioEspecial = 0;
            cantClasica = 0;
            cantEspecial =0;
        }
        if (sumaCantidad < ingresaCantidad && posCatalogo == totalCatalogo){
            cantidadOrdenada = 0;
            sumaCantidad = 0;
            posCatalogo = 0;
            sumaPrecioClasica = 0;
            sumaPrecioEspecial = 0;
            cantClasica = 0;
            cantEspecial =0;
            alert("Error: Seleccionó menos empanadas que las solicitadas. Reintente nuevamente");
            ingresaCantidad = parseInt(prompt(`Reingrese cantidad de empanadas (${preparacion})`));
        }
    };
    if (preparacion == "Horno"){
        infoHorno[0] = sumaPrecioClasica;
        infoHorno[1] = cantClasica;
        infoHorno[2] = sumaPrecioEspecial;
        infoHorno[3] = cantEspecial;
    }else{
        infoFrita[0] = sumaPrecioClasica;
        infoFrita[1] = cantClasica;
        infoFrita[2] = sumaPrecioEspecial;
        infoFrita[3] = cantEspecial;
    };
}

let verLista = (tipoEmpanada) => {

    let mostrarLista = '';

    let empanadasLista = empanadas.filter ((item) => item.tipo === tipoEmpanada);

    mensajePrincipal = `Empanadas ${tipoEmpanada} disponibles \n\nHorno/Frita`;

    empanadasLista.forEach((empanada) => {
        mostrarLista += `$${empanada.precioHorno} / $${empanada.precioFrita}       ${empanada.catalogo}\n`;
    });

    alert(`${mensajePrincipal}\n${mostrarLista}`);
}

let contadorPromo = 1;
let totalCatalogo = 0;
let descuento = 0;
const tipoUnico = [];
const datosHorno = [0,0,0,0];
const datosFrita = [0,0,0,0];
let validacionCantidad = 0;
let repeticiones = 0;
let textoPromo = '';
const precioDocenaHorno = promo [0];
const precioDocenaFrita = promo [1];
let moduloClasica = 0;
const guardaGustosPedidos = [];
const guardaCantidadPedidos = [];
let mostrarPedidos = '';

alert("Tienda de empanadas \n Promociones unicamente manteniendo la misma cocción en empanadas clasicas")

const variedadEmpanadas = empanadas.map((empanada) => empanada.tipo);

for (let index = 0; index < variedadEmpanadas.length; index++) {
    if (!tipoUnico.includes(variedadEmpanadas[index])){
    tipoUnico.push(variedadEmpanadas[index]);
    }    
}

tipoUnico.forEach (tipo => {
    verLista(tipo);
});

promo.forEach(element => {
    promocion = `Promo ${contadorPromo}: ${element.tipo} es $${element.precio}\n`;
    textoPromo += promocion;
    contadorPromo += 1;
});

alert(textoPromo);

for (let index = 0; index < empanadas.length; index++) {
    totalCatalogo += 1;
}

//validacion para que el programa se reinicie cuando no piden empanadas
while (validacionCantidad == 0){
    for (let index = 0; index < cocina.length; index++){
        let pidoEmpanadas = prompt(`Ingrese cantidad de empanadas (${cocina[index]})`);

        if (pidoEmpanadas > 0){
            validacionCantidad += 1
            tipoCoccion = cocina[index];
            pedirGustos(tipoCoccion,pidoEmpanadas,datosHorno,datosFrita,guardaGustosPedidos,guardaCantidadPedidos);
        }else{
            repeticiones +=1
            if (repeticiones == 2){
                alert("Debe indicar cuantas empanadas quiere ordenar. Reintente nuevamente");
                repeticiones = 0;
            }
        }
    };
}

//alert (`HORNO Precio clasica: ${datosHorno[0]},Cant clasica: ${datosHorno[1]},Precio especial: ${datosHorno[2]},Cant especial:${datosHorno[3]}`);
//alert (`FRITA Precio clasica: ${datosFrita[0]},Cant clasica: ${datosFrita[1]},Precio especial: ${datosFrita[2]},Cant especial:${datosFrita[3]}`);

let docenasHorno = Math.floor(datosHorno[1] / 12);
let docenasFritas = Math.floor(datosFrita[1] / 12);

let descuentoHorno = pedirDescuento(datosHorno,promo [0],docenasHorno);
let descuentoFrita = pedirDescuento(datosFrita,promo [1],docenasFritas);

if (descuentoHorno > 0){
    alert (`Descuento por docena (${cocina[0]}): ${descuentoHorno}`);
};

if (descuentoFrita > 0){
alert (`Descuento por docena (${cocina[1]}): ${descuentoFrita}`);
};

let precioFinalHorno = datosHorno[0] + datosHorno[2] - descuentoHorno;
let precioFinalFrita = datosFrita[0] + datosFrita[2] - descuentoFrita;

if ((descuentoFrita == 0) & (descuentoHorno == 0)){
    alert (`${cocina[0]}: $${datosHorno[0]+datosHorno[2]}\n    ${cocina[1]}: $${datosFrita[0]+datosFrita[2]}\n ------------------------------------\n   Total: $${precioFinalHorno+precioFinalFrita}`);
}else{
    if ((descuentoFrita == 0) & (descuentoHorno > 0)){
        alert (`${cocina[0]}: $${datosHorno[0]+datosHorno[2]}  - $${descuentoHorno} (descuento)\n    ${cocina[1]}: $${datosFrita[0]+datosFrita[2]}\n ---------\n   Total: $${precioFinalHorno+precioFinalFrita}`);
    }else{
        if ((descuentoFrita > 0) & (descuentoHorno == 0)){
            alert (`${cocina[0]}: $${datosHorno[0]+datosHorno[2]}\n    ${cocina[1]}: $${datosFrita[0]+datosFrita[2]}  - $${descuentoFrita} (descuento)\n ---------\n   Total: $${precioFinalHorno+precioFinalFrita}`);
        }else{
            alert (`${cocina[0]}: $${datosHorno[0]+datosHorno[2]}  - $${descuentoHorno} (descuento)\n    ${cocina[1]}: $${datosFrita[0]+datosFrita[2]}  - $${descuentoFrita} (descuento)\n ---------\n   Total: $${precioFinalHorno+precioFinalFrita}`);
        }
    }
}

for (let index = 0; index < guardaGustosPedidos.length; index++) {
    mostrarPedidos = mostrarPedidos + guardaGustosPedidos[index] +  guardaCantidadPedidos[index] + '\n'; 
}

let verPedido = prompt("Si desea ver el pedido, escriba 'SI'");
verPedido = verPedido.toUpperCase()

if (verPedido == 'SI'){
    alert (mostrarPedidos)
};

