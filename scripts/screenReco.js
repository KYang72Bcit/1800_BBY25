function selectScreenings(){
    function displayCheckups(){
        
    }
    
    const screenings = document.querySelectorAll('.screening > input');
    screenings.forEach(element=>{
        if (element.checked === true){
            displayCheckups(element);

        }
    })

}

