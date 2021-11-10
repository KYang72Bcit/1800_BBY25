let currentUser, userID;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //console.log(user.uid);
        //currentUser = db.collection("users").doc(user.uid);
        userID = user.uid;
        userEmail = user.email;
        //console.log(typeof(userID));
    } else {}
});

//document.getElementById('testnamearea').addEventListener('change', getInput);

//function getInput(e) {
//testName = e.currentTarget.value;
//}
let fileURL, testName, testDate, comments;
let userEmail;
var testResults = db.collection("Test Results");

function submit() {
    console.log(userID);
    testName = document.getElementById("testnamearea").value;
    console.log(testName);
    testDate = document.getElementById("selectdate").value;
    console.log(testDate);
    comments = document.getElementById("commentarea").value;

    const ref = firebase.storage().ref();
    const file = document.getElementById("testupload").files[0];
    //uid + testName + testDate ?
    const name = userID + "/" + testName + "/" + testDate + "/" +
        file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            fileURL = url;
            console.log(fileURL);
            console.log(typeof (fileURL));
        })
        .then(alert("Test Result Saved"))
        .catch(console.error);

   // firebase.auth().onAuthStateChanged(user => {
        //if (user) {
            testResults.doc(userID+testName+testDate).set({
                UserID: userID,
                UserEmail: userEmail,
                TestName: testName,
                TestDate: testDate,
                Comments: comments,
                StoragePath: name
            });

        //} else {
            // No user is signed in.
           // console.log("no user signed in");
       // }
   // });

}
