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

//initializing firebase
firebase.initializeApp(firebaseConfig);

var contactFormDB=firebase.database().ref('contactForm');

document.getElementById('contactForm').addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();

    var name=document.getElementById("name").value;
    // var profilePic=document.getElementById("profilePic").files[0];
    var phone=document.getElementById("phone").value;
    var email=document.getElementById("email").value;
    var datOfBirth=document.getElementById("date-of-birth").value;

    // console.log(name, phone, email, datOfBirth);

    saveMessages(name, phone, email, datOfBirth);

    setTimeout(function(){alert("User Info saved in database")},1000);

    document.getElementById("contactForm").reset();
}

const saveMessages = (name, phone, email, datOfBirth) => {
    var newContactForm = contactFormDB.child(name);

    newContactForm.set({
        name: name, 
        phone: phone,
        email: email, 
        datOfBirth:datOfBirth,
    })
}





