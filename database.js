import {getDatabase, ref, child, remove, get, set, update} from "https://www.gstatic.com/firebasejs/10.1.0/firebase-database.js";



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-analytics.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyBxYZhhDT3S0SyuotIHKnKKZrSzsUTL-Xs",
    authDomain: "monkhood-contact-form-data.firebaseapp.com",
    databaseURL: "https://monkhood-contact-form-data-default-rtdb.firebaseio.com",
    projectId: "monkhood-contact-form-data",
    storageBucket: "monkhood-contact-form-data.appspot.com",
    messagingSenderId: "322791740359",
    appId: "1:322791740359:web:5e2b98145531d639813fe2",
    measurementId: "G-B8TCVDW6HC"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const db=getDatabase();






var userNo=0;
var tbody=document.getElementById('tbody1');

var userList=[];

function AddItem(profilePic, name, phone, email, dateOfBirth){
    let trow = document.createElement("thead");
    let td1=document.createElement("td");
    let td2=document.createElement("td");
    let td3=document.createElement("td");
    let td4=document.createElement("td");
    let td5=document.createElement("td");
    // let td6=document.createElement("td");

    userList.push([name, phone, email, dateOfBirth]);

    td1.innerHTML=++userNo;
    td2.innerHTML=name;
    td3.innerHTML=phone;
    td4.innerHTML=email;
    td5.innerHTML=dateOfBirth;
    // td6.innerHTML=profilePic;

    trow.appendChild(td1);
    // trow.appendChild(td6);
    trow.appendChild(td2);
    trow.appendChild(td3);
    trow.appendChild(td4);
    trow.appendChild(td5);

    var controlDiv = document.createElement("div");

    controlDiv.innerHTML='<button type="button" class="database-btn1" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes(null)">Add user</button>';
    controlDiv.innerHTML+='<button type="button" class="database-btn2" data-toggle="modal" data-target="#exampleModalCenter" onclick="FillTboxes('+userNo+')">Edit record</button>';

    trow.appendChild(controlDiv);
    

    tbody.appendChild(trow);
    
}

var ModName = document.getElementById('NameMod');
var ModPhone = document.getElementById('PhoneMod');
var ModEmail = document.getElementById('EmailMod');
var ModDate = document.getElementById('DateMod');

var addButton = document.getElementById('AddModBtn');
var updateButton = document.getElementById('UpdateModBtn');
var deleteButton = document.getElementById('DeleteModBtn');


function FillTboxes(index){
    if(index===null){
        ModName.value = "";
        ModPhone.value = "";
        ModEmail.value = "";
        ModDate.value = "";

        addButton.style.display="inline-block";
        updateButton.style.display="none";
        deleteButton.style.display="none";
    }

    else{
        --index;
        ModName.value = userList[index][0];
        ModPhone.value = userList[index][1];
        ModEmail.value =userList[index][2];
        ModDate.value = userList[index][3];

        addButton.style.display="none";
        updateButton.style.display="inline-block";
        deleteButton.style.display="inline-block";
    }
}

window.FillTboxes=FillTboxes;

function Select_AllData(){
    document.getElementById('tbody1').innerHTML="";
    userNo=0;
    firebase.database().ref('contactForm').once('value', function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var name = childSnapshot.val().name;
            var phone = childSnapshot.val().phone;
            var email = childSnapshot.val().email;
            var dateOfBirth = childSnapshot.val().dateOfBirth;
        });
    });

}

window.onload=Select_AllData;

function AddAllItems(user){
    userNo=0;
    tbody.innerHTML="";

    user.forEach(element => {
        AddItem(element.profilePic, element.name, element.phone, element.email, element.dateOfBirth);
    });
}

function getAllDataOnce(){
    const dbRef = ref(db);
    get(child(dbRef, "contactForm"))
    .then((snapshot)=>{
        var users=[];
        snapshot.forEach(element => {
            users.push(element.val());
        });

        AddAllItems(users);
    })
}

function AddUser(){
    set(ref(db, "contactForm/"+ ModName.value),{
        name: ModName.value, 
        phone: ModPhone.value,
        email: ModEmail.value,
        dateOfBirth: ModDate.value
    })

    alert("User added to the database successfully!");
    window. location. reload();
}
window.AddUser=AddUser;

function UpdateUser(){
    update(ref(db, "contactForm/"+ ModName.value),{
        name: ModName.value, 
        phone: ModPhone.value,
        email: ModEmail.value,
        dateOfBirth: ModDate.value
    })

    alert("User data updated in the database successfully!");
    window. location. reload();
}
window.UpdateUser=UpdateUser;


function DeleteUser(){
    remove(ref(db, "contactForm/"+ ModName.value));

    alert("User data deleted from the database successfully!");
    window. location. reload();
}
window.DeleteUser=DeleteUser;




window.onload=getAllDataOnce;


