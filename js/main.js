class Visita {
    constructor(Nom, Ape, Doc) {
        this.Nom = Nom;
        this.Ape = Ape;
        this.Doc = Doc;
    }
}

let oMensaje = document.getElementById("divMje");

function Registrar() {

    let ListaNegra = [
        {id:1, nombre:"Omega", DNI:"12345678", Motivo:"Escapó de Kamino", Foto: "https://static.wikia.nocookie.net/esstarwars/images/c/c6/OmegaDisneyPlusAvatar.png"},
        {id:2, nombre:"Fennec Shand", DNI:"33333333", Motivo:"Cazarrecompensas en contra del Imperio", Foto:"https://static.wikia.nocookie.net/esstarwars/images/9/9f/TBBF_Fennec_Shand.png"},
        {id:3, nombre:"Capitán Rex", DNI:"44444444", Motivo:"No cumplió con la Orden 66", Foto:"https://static.wikia.nocookie.net/esstarwars/images/8/89/Captain_Rex_old.png"},
    ];

    let vs_Nombre = document.getElementById('firstName');
    let vs_Apellido = document.getElementById('lastName');
    let vs_DNI = document.getElementById('DNI');

    var buscarListaNegra = ListaNegra.filter(item => item.DNI == vs_DNI.value);

    //console.log(buscarListaNegra);

    let result = document.getElementById("resultado");

    if (buscarListaNegra.length != 0)
    {
        oMensaje.innerHTML = '<br><div class="alert alert-danger" role="alert">Alerta revisar el aviso! Aplicar Orden 66</div>';
        //alert("Alerta revisar el aviso");
        var dni = buscarListaNegra[0].DNI;
        var nombre = buscarListaNegra[0].nombre;
        var motivo = buscarListaNegra[0].Motivo;
        var foto = buscarListaNegra[0].Foto;
        result.innerHTML = `<div class="card" style="width: 18rem;"><img class="card-img-top" src="${foto}" ><div class="card-body"><h5 class="card-title">${nombre}</h5><p class="card-text">"${motivo}"</p></div></div>`;
    }else{
        oMensaje.innerHTML = '<br><div class="alert alert-success" role="alert">Registro de visita realizado.</div>';
        //alert("Visita Registrada");
        result.innerHTML = `<div class="card"><img class="card-img-top img-thumbnail" src="https://m.media-amazon.com/images/I/41Hh5ZiV2DL._AC_.jpg" width="50px" ><div class="card-body"><h5 class="card-title">Registrado:<br>  ${vs_Nombre.value} ${vs_Apellido.value}</h5><p class="card-text">"${vs_DNI.value}"</p></div></div>`;

        GuardarVisita(vs_Nombre.value, vs_Apellido.value, vs_DNI.value);
        
        vs_Nombre.value = "";
        vs_Apellido.value = "";
        vs_DNI.value = "";
    }
    GetVisitas();
}

function GuardarVisita(oNom, oApe, oDoc)
{
    let NuevaVisita = new Visita(oNom, oApe, oDoc);
    let visitas = JSON.parse(localStorage.getItem("visita")) || [];
    visitas.push(NuevaVisita);
    localStorage.setItem("visita", JSON.stringify(visitas));
}

function GetVisitas()
{
    let visitas = JSON.parse(localStorage.getItem("visita")) || [];
    let tablarow = "";
    for (const visita of visitas) 
    {
        tablarow += `<tr><th scope="row">1</th><td>${visita.Nom}</td><td>${visita.Ape}</td><td>${visita.Doc}</td></tr>`;
    }
    document.getElementById('ListaVisitas').innerHTML = tablarow;
}


function Validar(){
    let valCampos = "";
    let vs_Nombre = document.getElementById('firstName').value;
    let vs_Apellido = document.getElementById('lastName').value;
    let vs_DNI = document.getElementById('DNI').value;
    if (vs_Nombre == "")
    {
        valCampos = valCampos + " Ingrese Nombre.";
    }else{
        valCampos = valCampos + " ";
    }
    if (vs_Apellido == "")
    {
        valCampos = valCampos + " Ingrese Apellido.";
    }else{
        valCampos = valCampos + " ";
    }
    if (vs_DNI == "")
    {
        valCampos = valCampos + " Ingrese DNI.";
    }else{
        valCampos = valCampos + " ";
    }

    var compare=/^[0-9]+$/;
    if(vs_DNI.match(compare)){
        valCampos = valCampos + " ";
    } else {
        valCampos = valCampos + " Ingrese números en DNI.";
    }


    return valCampos;
}

function Ini()
{
    var validacion = Validar();
    if (validacion)
    {
        //console.log(validacion);
        if (validacion.trim().length > 0)
        {
            oMensaje.innerHTML = `<br><div class="alert alert-warning" role="alert">${validacion}</div>`;
            //alert(validacion);
            return;
        }else{
            oMensaje.innerHTML = '';
            Registrar();
        }
    }else{
        return;
    }
}

document.getElementById("btn_RegistrarValidar").onclick = Ini;

function ListarBaseDatosImperio_Personas()
{
    /*
    fetch('https://swapi.py4e.com/api/people/')
    .then(respuesta => respuesta.json())
    .then(data => {
        console.log(data.results);
    })
    */
    
    fetch('https://swapi.py4e.com/api/people/')
    .then(respuesta => respuesta.json())
    .then(data => {
        let contenido = "";
        for (const post of data.results)
        {
            contenido += `<div class="col">
            <div class="card h-100">
            <div class="card-body">
                <h5 class="card-title">${post.name}</h5>
                <p class="card-text text-start">
                <br>
                Año nacimiento: ${post.birth_year}<br> 		
                Color ojos: ${post.eye_color}<br>
                Género: ${post.gender}<br>
                Color Cabello: ${post.hair_color}<br>
                Altura: ${post.height}<br>
                Masa: ${post.mass}<br>
                Color Piel:${post.skin_color}<br>
                </p>
            </div>
            <div class="card-footer">
                <small class="text-body-secondary">Última actualización: ${post.edited}</small>
            </div>
            </div>
            </div>`;
        }
        document.getElementById("resultadoBDImperio").innerHTML = contenido;
    })
}

ListarBaseDatosImperio_Personas();
