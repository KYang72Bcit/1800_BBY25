let currentUser;
let userID;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userID = user.uid;
        // console.log(userID);
        userEmail = user.email;
    } else {}
});

let fileURL, testName, testDate, comments;
let userEmail;
var testResults = db.collection("Test Results");

function submit() {
    //console.log(userID);
    testName = document.getElementById("testnamearea").value;
    //console.log(testName);
    testDate = document.getElementById("selectdate").value;
    //console.log(testDate);
    comments = document.getElementById("commentarea").value;

    const ref = firebase.storage().ref();
    const file = document.getElementById("testupload").files[0];
    const name = userID + "/" + testName + "-" + testDate + "-" +
        file.name;
    const metadata = {
        contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            fileURL = url;
            //console.log(fileURL);
            //console.log(typeof (fileURL));
            return testResults.doc(userID + testName + testDate).set({
                UserID: userID,
                FileName:file.name,
                UserEmail: userEmail,
                TestName: testName,
                TestDate: testDate,
                Comments: comments,
                StorageURL: fileURL,
                StoragePath: name
            })
        })
        .then(() => {
            alert("Test Result Saved");
        })
        .catch(console.error);

}
