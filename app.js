// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDG5WdXy2WaeyKDCbU0UX8noW2Cqq8K63M",
    authDomain: "examenunidad2-ceb94.firebaseapp.com",
    projectId: "examenunidad2-ceb94",
 
  });
 
  var db = firebase.firestore();
   //Codigo para agregar registros a mi colección
   function agregar(){
    var curp = document.getElementById('curp').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var edad = document.getElementById('edad').value;
    var domicilio = document.getElementById('domicilio').value;
    var municipio = document.getElementById('municipio').value;
  
    console.log(curp,nombre, apellido,edad,domicilio,municipio);
      db.collection("users").add({
      curp: curp,
      first: nombre,
      last: apellido,
      age: edad,
      domicilio:domicilio,
      municipio: municipio,
      })
      .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          document.getElementById('curp').value = '';
          document.getElementById('nombre').value = '';
          document.getElementById('apellido').value = '';
          document.getElementById('edad').value = '';
          document.getElementById('domicilio').value = '';
          document.getElementById('municipio').value = '';
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
}

//Codigo para Leer o Mostrar registros de mi colección
//Leer el id de la tabla
var tabla = document.getElementById('tabla');

db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = ''; //Limpiar mi tabla
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().last}`);
      tabla.innerHTML += `
      <tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().curp}</td>
          <td>${doc.data().first}</td>
          <td>${doc.data().last}</td>
          <td>${doc.data().age}</td>
          <td>${doc.data().domicilio}</td>
          <td>${doc.data().municipio}</td>

        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().curp}','${doc.data().first}','${doc.data().last}','${doc.data().age}','${doc.data().domicilio}','${doc.data().municipio}')">Editar</button></td>
      </tr>
      `
      });
  });

  //borrar documento
  function eliminar(id){
      db.collection("users").doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
      }).catch((error) => {
          console.error("Error removing document: ", error);
      });
  }

  //Editar Documento
  function editar(id, curp, nombre, apellido, edad, domicilio,municipio){
      console.log(id);
      var curp = document.getElementById('curp').value = curp;
      var nombre = document.getElementById('nombre').value = nombre;
      var apellido = document.getElementById('apellido').value = apellido;
      var edad = document.getElementById('edad').value = edad;
      var domicilio = document.getElementById('domicilio').value = domicilio;
      var municipio = document.getElementById('municipio').value = municipio;
      var boton = document.getElementById('boton');
      boton.innerHTML = 'Editar';

      boton.onclick = function(){
          var washingtonRef = db.collection("users").doc(id);

          var curp = document.getElementById('curp').value;
          var nombre = document.getElementById('nombre').value;
          var apellido = document.getElementById('apellido').value;
          var edad = document.getElementById('edad').value;
          var domicilio = document.getElementById('domicilio').value;
          var municipio = document.getElementById('municipio').value;

          // Set the "capital" field of the city 'DC'
          return washingtonRef.update({
              curp: curp,
              first: nombre,
              last: apellido,
              age: edad,
              domicilio: domicilio,
              municipio: municipio,
          })
          .then(() => {
              console.log("Document successfully updated!");
              boton.innerHTML = 'Agregar';
              window.location.reload();
          })
          .catch((error) => {
              // The document probably doesn't exist.
              console.error("Error updating document: ", error);
          });
      }
  }
