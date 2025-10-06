import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getFirestore, collection, doc, getDoc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyB6kFYRJi50nGM-MAUpGk7RA01aBDZ6qyI",
	authDomain: "cinestar-bmunoz.firebaseapp.com",
	projectId: "cinestar-bmunoz",
	storageBucket: "cinestar-bmunoz.firebasestorage.app",
	messagingSenderId: "240796683847",
	appId: "1:240796683847:web:b28728a3459ef821706b62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


//------------------------
async function getCine() {
	const id = new URLSearchParams(window.location.search).get('id')

	if(!id) return
													  //Filtrar por id interno 
	const colleccion = query(collection(db, "cines"), where("id", "==", id));
  	const documentos = await getDocs(colleccion);

//------------------------------------------------
								//posicion 0 (por que es unico ID)
	const cinescrudo = documentos.docs[0];
	const cines = cinescrudo.data();

		//recorido de tarifas
		let tarifashtml = ``
		cines.tarifas.forEach((t, index) => {
			tarifashtml += `
							<div class="fila ${index % 2 === 0 ? 'impar' : ''}">
								<div class="celda-titulo">${t.DiasSemana}</div>
								<div class="celda">${t.Precio}</div>
							</div>			
			`
		});

		//recorrido Pelicula Horario
		let peliHorarioHtml = ``

		cines.peliculas.forEach((ph, index) => {
			peliHorarioHtml +=`
			<div class="fila ${index % 2 === 0 ? 'impar' : ''}">
				<div class="celda-titulo">${ph.Titulo}</div>
				<div class="celda">${ph.Horarios}</div>
			</div>
			`
		});


        let html = `
                <h2>${cines.RazonSocial}</h2>
				<div class="cine-info">
					<div class="cine-info datos">
						<p>${cines.Direccion}</p>
						<p>Teléfono: ${cines.Telefonos}</p>
						<br/>
						<div class="tabla">
							${tarifashtml} 
						</div>
						<div class="aviso">
							<p>A partir del 1ro de julio de 2016, Cinestar Multicines realizará el cobro de la comisión de S/. 1.00 adicional al tarifario vigente, a los usuarios que compren sus entradas por el aplicativo de Cine Papaya para Cine Star Comas, Excelsior, Las Américas, Benavides, Breña, San Juan, UNI, Aviación, Sur, Porteño, Tumbes y Tacna.</p>
						</div>
					</div>
					<img src="img/cine/${cines.id}.2.jpg"/>
					<br/><br/><h4>Los horarios de cada función están sujetos a cambios sin previo aviso.</h4><br/>
					<div class="cine-info peliculas">
						<div class="tabla">
							<div class="fila">
								<div class="celda-cabecera">Películas</div>
								<div class="celda-cabecera">Horarios</div>
							</div>
							${peliHorarioHtml}							
						</div>
					</div>
				</div>
				<div>
					<img style="float:left;" src="img/cine/${cines.id}.3.jpg" alt="Imagen del cine"/>
					<span class="tx_gris">Precios de los juegos: desde S/1.00 en todos los Cine Star.<br/>
						Horario de atención de juegos es de 12:00 m hasta las 10:30 pm. 
						<br/><br/>
						Visitános y diviértete con nosotros. 
						<br/><br/>
						<b>CINESTAR</b>, siempre pensando en tí. 
					</span>		
				</div>
				
			</div>
		</div>
		<div class="clearbox"><br/></div>
            `
        document.getElementById('contenido-interno').innerHTML = html

}

        

getCine()