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
        // console.log(userID);
        userEmail = user.email;
    } else {}
});

function submit() {
    document.getElementById("saving").style.display = "grid";

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
            document.getElementById("saving").style.display = "none";
            document.getElementById("saved").style.display = "grid";
        })
        .then(() => {
            location.reload();
        })
        .catch(console.error);

}

    // // Links to other pages from the menu:
    // document.getElementById("resultsBtn").onclick = function () {
    //     location.href = "upload.html";
    //   }
    //   document.getElementById("profileBtn").onclick = function () {
    //     location.href = "myProfile.html";
    //   }

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
    
                        a.setAttribute("href", "./test_results.html");
                        a.setAttribute("class","card");
                        a.setAttribute("target","_blank");
    
                        div.setAttribute("class","circle");
    
                        firstCharacter.innerHTML = storedTestName.charAt(0).toUpperCase();
                        firstCharacter.setAttribute("class","firstletter");
    
                        fileName.innerHTML = storedFileName;
                        fileName.setAttribute("class","storedFileName");
    
                        testDate.innerHTML = "Test Date: " + storedTestDate;
                        testDate.setAttribute("class","storedDate");
    
                        testName.innerHTML = "Test Name: " + storedTestName;
                        testName.setAttribute("class","storedName");
    
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



    document.querySelector(".uploadbutton").addEventListener("click", function(){
            document.querySelector(".resultspanel").style.cssText = "display:none!important";
            document.querySelector(".contents").style.cssText = "display:grid!important"; 

    } )

    document.querySelector(".testresultbutton").addEventListener("click", function(){
            document.querySelector(".resultspanel").style.cssText = "display:grid!important";
            document.querySelector(".contents").style.cssText = "display:none!important"; 
    } )


    var x = window.matchMedia("(min-width: 720px)");

    function myFunction(x) {
        if (x.matches) { // If media query matches
            document.querySelector(".resultspanel").style.cssText = "display:grid";
            document.querySelector(".contents").style.cssText = "display:grid"; 
        } 
      }


      
      myFunction(x); // Call listener function at run time
      x.addListener(myFunction) // Attach listener function on state changes
