let currentUser;
let userID;
let container = document.getElementById("resultlist");

let pdfURL, storedTestName, storedTestDate, storedFileName;

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

                    a.setAttribute("href", pdfURL);
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
