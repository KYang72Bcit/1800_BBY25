
function showTest() {
    let CardTemplate = document.getElementById("CardTemplate");
    const screenings = db.collection("ScreenCategory");
    const userScreeningCategory = getScreeningArray();
    userScreeningCategory.forEach(element => {
        screenings.doc(element).get().then(screendoc=>{
            //get test list from ScreenCatergory
            let testlist = screendoc.data()[0];
            testlist.forEach(test=>{
                
                //get every test from test list
                let value = test.split(" ").join("-");
                let text = test;
                let newcard = CardTemplate.content.cloneNode(true);
                newcard.querySelector('.test-name').innerHTML = test;
                //console.log( newcard.querySelector('.test-name'));
                
                newcard.querySelector('input').setAttribute("value", value);
                newcard.querySelector('input').setAttribute("checked", true);
                document.getElementById("screening-list").appendChild(newcard);
                


            })


        });

        


    })



}
const availableCategery = ["dental","diaScreen","general","heartScreen","seniorScreen","womenScreen"];
availableCategery.forEach(category=>{
    
    document.getElementById(category).addEventListener('click',show(category));
})

var checkbox = document.querySelector("input.hello");

checkbox.addEventListener('change', function() {
  if (this.checked) {
    console.log("Checkbox is checked..");
  } else {
    console.log("Checkbox is not checked..");
  }
});
// document.querySelector("#dental").addEventListener('click',showDental);
// document.querySelector("#diaScreen").addEventListener('click',showdiaScreen);
// document.querySelector("#general").addEventListener('click',showgeneral);
// document.querySelector("#heartScreen").addEventListener('click',showheartScreen);
// document.querySelector("#seniorScreen").addEventListener('click',showseniorScreen);
// document.querySelector("#womenScreen").addEventListener('click',womenScreen);

function show(element) {
    let CardTemplate = document.getElementById("CardTemplate");
    const screenings = db.collection("ScreenCategory").doc(element);
    screenings.get().then(screendoc =>{
        let testlist = screendoc.data()[0];
            testlist.forEach(test=>{
                
                //get every test from test list
                let value = test.split(" ").join("-");
                let text = test;
                let newcard = CardTemplate.content.cloneNode(true);
                newcard.querySelector('.test-name').innerHTML = test;
                //console.log( newcard.querySelector('.test-name'));
                
                newcard.querySelector('input').setAttribute("value", value);
                newcard.querySelector('input').setAttribute("checked", true);
                document.getElementById(element + 1).appendChild(newcard);

    })



//     const userScreeningCategory = getScreeningArray();
//     userScreeningCategory.forEach(element => {
//         screenings.doc(element).get().then(screendoc=>{
//             //get test list from ScreenCatergory
//             let testlist = screendoc.data()[0];
//             testlist.forEach(test=>{
                
//                 //get every test from test list
//                 let value = test.split(" ").join("-");
//                 let text = test;
//                 let newcard = CardTemplate.content.cloneNode(true);
//                 newcard.querySelector('.test-name').innerHTML = test;
//                 //console.log( newcard.querySelector('.test-name'));
                
//                 newcard.querySelector('input').setAttribute("value", value);
//                 newcard.querySelector('input').setAttribute("checked", true);
//                 document.getElementById(element + 1).appendChild(newcard);
                


//             })

//         });
        


//     })


// }

