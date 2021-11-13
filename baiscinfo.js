function showImg(){
    const input = document.querySelector("#mypic-input");
    const profile = document.querySelector("#mypic-goes-here");

    input.addEventListener('change', function(e){
        var blob = URL.createObjectURL(e.target.files[0]);
        profile.src = blob;
    })
}