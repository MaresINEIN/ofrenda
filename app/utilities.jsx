export async function crearDedicatoria(autor, img, mensaje, seteador) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "autor": autor,
    "img":img,
    "mensaje": mensaje
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    fetch("http://192.168.1.183:4000/Nueva_dedicatoria", requestOptions)
    .then(response => response.json())
    .then(result => {
        seteador(result)
    })
    .catch(error => reject('error', error));
}

export async function obtenerDedicatorias(seteador) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://192.168.1.183:4000/Obtener_dedicatorias", requestOptions)
        .then(response => response.json())
        .then(result => seteador(result))
        .catch(error => console.log('error', error));
    
}