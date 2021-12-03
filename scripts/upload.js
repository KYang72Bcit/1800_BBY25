let currentUser;
let userID;
let container = document.getElementById("resultlist");
let pdfURL, storedTestName, storedTestDate, storedFileName;

let fileURL, testName, testDate, comments;
let userEmail;
var testResults = db.collection("Test Results");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userID = user.uid;
        userEmail = user.email;
    } else {}
});

//when a user clicks submit to upload a test result
function submit() {
    //saving in progress ubtton appear
    document.getElementById("saving").style.display = "grid";

    //store the value entered in each area
    testName = document.getElementById("testnamearea").value;
    testDate = document.getElementById("selectdate").value;
    comments = document.getElementById("commentarea").value;

    //get the data that's uploaded in input="file" area
    const ref = firebase.storage().ref();
    const file = document.getElementById("testupload").files[0];
    const name = userID + "/" + testName + "-" + testDate + "-" +
        file.name;
    const metadata = {
        contentType: file.type
    };

    //store the file in firebase storage
    const task = ref.child(name).put(file, metadata);
    task
        //get the URL to the file storage
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            fileURL = url;

            //create a document under the collection "testResults" including the URL
            return testResults.doc(userID + testName + testDate).set({
                UserID: userID,
                FileName: file.name,
                UserEmail: userEmail,
                TestName: testName,
                TestDate: testDate,
                Comments: comments,
                StorageURL: fileURL,
                StoragePath: name
            })
        })
        .then(() => {
            //change saving in progress modal to saved modal
            document.getElementById("saving").style.display = "none";
            document.getElementById("saved").style.display = "grid";
        })
        .then(() => {
            //reload the page to get the test results appear immediately
            location.reload();
        })
        .catch(console.error);

}

//when user is signed in
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        userID = user.uid;
        console.log("hi");
        console.log(userID);

        //find where UserID field equals user.uid under collection "Test Results"
        db.collection("Test Results").where("UserID", "==", userID)
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    //creating HTML elements with the data retrieved
                    storedTestName = doc.data().TestName;
                    console.log("TestName: " + storedTestName);
                    storedTestDate = doc.data().TestDate;
                    console.log("TestDate: " + storedTestDate);
                    pdfURL = doc.data().StorageURL;
                    console.log(pdfURL);
                    storedFileName = doc.data().FileName;
                    console.log(storedFileName);

                    let a = document.createElement("a");
                    let div = document.createElement("div");
                    let firstCharacter = document.createElement("span");
                    let fileName = document.createElement("span");
                    let testDate = document.createElement("span");
                    let testName = document.createElement("span");

                    a.setAttribute("href", pdfURL);
                    a.setAttribute("class", "card");
                    a.setAttribute("target", "_blank");

                    div.setAttribute("class", "circle");

                    firstCharacter.innerHTML = storedTestName.charAt(0).toUpperCase();
                    firstCharacter.setAttribute("class", "firstletter");

                    fileName.innerHTML = storedFileName;
                    fileName.setAttribute("class", "storedFileName");

                    testDate.innerHTML = "Test Date: " + storedTestDate;
                    testDate.setAttribute("class", "storedDate");

                    testName.innerHTML = "Test Name: " + storedTestName;
                    testName.setAttribute("class", "storedName");

                    container.append(a);
                    a.append(div);
                    div.appendChild(firstCharacter);
                    a.append(testName);
                    a.append(fileName);
                    a.append(testDate);
                })
            })

    } else {}
});

//css style for media query - appear as two different tabs in mobile size
document.querySelector(".uploadbutton").addEventListener("click", function () {
    document.querySelector(".resultspanel").style.cssText = "display:none!important";
    document.querySelector(".contents").style.cssText = "display:grid!important";

})
document.querySelector(".testresultbutton").addEventListener("click", function () {
    document.querySelector(".resultspanel").style.cssText = "display:grid!important";
    document.querySelector(".contents").style.cssText = "display:none!important";
})
var x = window.matchMedia("(min-width: 720px)");
function myFunction(x) {
    if (x.matches) { // If media query matches
        document.querySelector(".resultspanel").style.cssText = "display:grid";
        document.querySelector(".contents").style.cssText = "display:grid";
    }
}

myFunction(x); // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes