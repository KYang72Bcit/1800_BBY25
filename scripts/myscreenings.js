firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var currentUser = db.collection("users").doc(user.uid);

        //when uers change personal profile
        currentUser.get().then(userDoc => {
            //get basic user information from user file
            let name = userDoc.data().name;
            var picUrl = userDoc.data().profilepic;
            // let ongoingCondition = userDoc.data().ongoingCondition;
            // let familyHistory = userDoc.data().familyHistory;
            let age = 2021 - userDoc.data().yearOfBirth;
            var gender = userDoc.data().gender;
            var bodyHeight = userDoc.data().bodyHeight;
            var bodyWeight = userDoc.data().bodyWeight;
            var sreeningInDatabase = userDoc.data().screeninglist;
            //show username and profile picture in this page
            document.querySelector("#name").innerHTML = name;
            $("#profile").attr("src", picUrl);

            //selecting all the labels and inputs, stored in lists
            let labels = document.querySelectorAll('label');
            let inputs = document.querySelectorAll('input');

            //select section for gender, hear and dia, change according to unser input 
            let genderScreen = document.querySelector("#genderScreen");
            let heartScreen = document.querySelector('#heartScreen');
            let diaScreen = document.querySelector('#diaScreen');
            //if user is 60+ genral health screening change to senior screening
            if (age > 60) {
                labels[0].innerText = "Senior Health Screening";
                inputs[0].value = "seniorScreen";
                document.querySelector("#generalScreen").setAttribute('id', "seniorScreen1")
            }
            //hide women screening user is male 
            if (gender === "Male") {

                labels[2].innerText = "Essential Screening for Men";
                inputs[0].value = "manscreening";
                let genderscreening = document.querySelector("#womenScreen")
                document.querySelector("#womenScreen1").setAttribute('id',"manscreening1")
                genderscreening.setAttribute('id', "manscreening");
                genderscreening.setAttribute('value', "manscreening");

                


            }
            //hide heart screening and diabetis screening when not necessary
            let bmi = bodyWeight / Math.pow(bodyHeight / 100, 2);

            //if age is less than 40 or bmi is less than 30, hide heart or dia screenings 
            if (bmi < 30 || age < 40) {



                heartScreen.style.display = "none";
                diaScreen.style.display = "none";
            }

            document.querySelector("#screenings").addEventListener('submit', submitForm);

            // get the checked actually screenings from user, put them in an array
            function getScreeningArray() {
                const screenings = document.querySelectorAll(
                    'input.hello:checked');
                const screeningArray = [];
                screenings.forEach(element => {
                    if (element.checked === true) {
                        screeningArray.push(element.value);
                    }

                })
                return screeningArray;
            }
            // choose the screening catergories , not the actually screenings themselves
            const checkbox = document.querySelectorAll('.form-check-input:not([style="display: none"])'); //how to not select hidden element
            checkbox.forEach(element => {
                //for each catergories, add eventlistenor, let the list expand while clicking 
                element.addEventListener('change', function () {
                    show(element.value);
                })
            });

            function showlist(screeningArray) {
                console.log("showlist");
                let ListTemplate = document.getElementById("ListTemplate");
                
                screeningArray.forEach(test => {
                    let id = test.split(" ").join("-");
                    let text = test;
                    let newcard = ListTemplate.content.cloneNode(true);
                    newcard.querySelector('.datePicker').innerHTML = text;
                    newcard.querySelector('input').setAttribute("id",id);
                    document.getElementById('showlist').appendChild(newcard);


                })

            }
           

            //showing the template for screenings 
            function show(element) {
                //console.log(element);
                let CardTemplate = document.getElementById("CardTemplate");
                //accessing firebase file with the same name as element(screening category) 
                const screenings = db.collection("ScreenCategory").doc(element);
                screenings.get().then(screendoc => {
                    //get screening list from file 
                    let testlist = screendoc.data()[0];

                    //get every test from test list
                    testlist.forEach(test => {
                        //the test content is with spaces, remove the space and jion then so they can be put in value attribute
                        let value = test.split(" ").join("-");
                        let text = test;
                        let newcard = CardTemplate.content.cloneNode(true);
                        //show content 
                        newcard.querySelector('.test-name').innerHTML =
                            test;

                        //set value
                        newcard.querySelector('input').setAttribute("value",
                            value);
                        //set them by dfault checked
                        newcard.querySelector('input').setAttribute(
                            "checked", true);
                        //append to their position 
                        document.getElementById(element + 1).appendChild(newcard);

                    })

                })

            }
            //submit users selected screenings
            function submitForm(e) {
                e.preventDefault();
                //find all the clicked screening, stored in a list
                const screeningArray = getScreeningArray();
                showlist(screeningArray);
                const button = document.getElementById("setDate");
                console.log(button);
                button.style.display = "block"; 

                


            }
            const button = document.getElementById("setDate");
            button.addEventListener('click', submitData);

            //submit user selected screeening dates
            function submitData(e){
                e.preventDefault();
                
                const screeningArray = getScreeningArray();
                const screeningTime = [];
                screeningArray.forEach(test => {
                    let id = test.split(" ").join("-");
                    
                    let time = document.getElementById(`${id}`).value;
                    
                    screeningTime.push(time);
                    currentUser.collection("screenings").doc(test).set({
                        date: time
                    }).then(function(){
                        console.log("creating screening collection in user folder with dates");
                    })
                    

                })
                currentUser.update({
                    'screeningTime': screeningTime,
                     'screeninglist': screeningArray
                }).then(function () {
                    window.location.href = "home.html";
                    
                })

            }

        })



    } else {
        // No user is signed in.
    }
});