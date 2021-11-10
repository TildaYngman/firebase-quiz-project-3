import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  orderBy,
  query,
} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";

//Add your own config content
const firebaseConfig = {
    apiKey: "AIzaSyB8NcKb3IMRUskYgs_Rnu4XYqAw1DxKKgc",
    authDomain: "project-3-75f66.firebaseapp.com",
    projectId: "project-3-75f66",
    storageBucket: "project-3-75f66.appspot.com",
    messagingSenderId: "1008609779505",
    appId: "1:1008609779505:web:dd6a0c1fab1aa87ab0da10",
    measurementId: "G-8Q41HCX2YH"
  };
  

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
window.addUser = (username, score) => {
  console.log("username", username, "score", score)
  addName(username, score)
}



  //Add to firebase
  async function addName(username, score){
    if (!username) return null;
      try {
        const docRef = await addDoc(collection(db, "users"), {
          username: username,
          score: score,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }
  
//   //Remove to firebase
//   async function deleteName(){
//     var id = this.getAttribute("data-id");
//     await deleteDoc(doc(db, "users", id));
//     displayNamesInList("listOfNames");
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

//Remove to firebase
async function deleteName() {
  var id = this.getAttribute("data-id");
  await deleteDoc(doc(db, "users", id));
  displayNamesInList("listOfNames");
}


//Get all from firebase
async function getNames() {
  // const users = await getDocs(collection(db, "users"));

  const docRef = collection(db, "users");
  const q = query(docRef, orderBy("score", "desc"));
  const names = await getDocs(q);
  console.log(names)
  return names;
  console.log(names)






  // return users;
};

function readInput(id) {
  if (!document.getElementById(id) && !document.getElementById(id).value) return null;

  return document.getElementById(id).value;
}




function clearContentOfElement(id) {
  if (!document.getElementById(id)) return null;
  document.getElementById(id).innerHTML = "";
}

function formatListItem(item) {
  return `<li>
              <h3>User name: ${item.username} score: ${item.score}</h3> 

              <button 
                class="deleteName" 
                data-id="${item.id}">
                DELETE
              </button>
            </li>`;
}
function clearInput(id) {
  if (!document.getElementById(id)) return null;
  document.getElementById(id).value = '';
}

function addNameToList(list, item) {
  if (!document.getElementById(list)) return null;
  document.getElementById(list).innerHTML += formatListItem(item);
};

function addEventListner() {
  if (!document.getElementById("addName")) return null;
  document.getElementById("addName").removeEventListener("click", addName);
  document.getElementById("addName").addEventListener("click", addName);

  if (!document.getElementsByClassName("deleteName")) return null;
  var elements = document.getElementsByClassName("deleteName");
  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", deleteName, false);
  }

  function clearInput(id){
    if(!document.getElementById(id)) return null;
    document.getElementById(id).value = '';
  }
  
  function addNameToList(list, item){
    if (!document.getElementById(list)) return null;
    document.getElementById(list).innerHTML += formatListItem(item);
  };
  
  function addEventListner(){
    if(!document.getElementById("addName")) return null;
      document.getElementById("addName").removeEventListener("click", addName);
      document.getElementById("addName").addEventListener("click", addName);
  
    if(!document.getElementsByClassName("deleteName")) return null;
    var elements = document.getElementsByClassName("deleteName");
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", deleteName, false);
    }
  };
  
  async function displayNamesInList(id){
    var namesInDb = await getNames();
    clearContentOfElement(id);
  
    namesInDb.forEach((doc) => {
      addNameToList('listOfNames', { id: doc.id, username: doc.data().username, score: doc.data().score });
    });
    
    addEventListner();
    return;
  }
  
  async function init(){
    await displayNamesInList("listOfNames");
    addEventListner();
  }
  init()};
