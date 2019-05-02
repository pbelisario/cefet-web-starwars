// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução


$('document').ready(function(){
    // Pega o ultimo filmo do local storage, [
    // caso nao exista, selecione o EP 1
    let lastMovie = localStorage.getItem("lastMovie")
    if (lastMovie == null) lastMovie = "4/"
    MovieSelector(lastMovie)
});

// Seleciona os botoes para adicionar um EventListener
let buttons = document.getElementsByClassName("episode")
for (let i=0; i < buttons.length; i++)
{
    currentButton = buttons[i]
    buttons[i].addEventListener("click", (currentButton) => {
        // Qual filme foi clicado
        let whichMovie = currentButton.path[0].getAttribute("data-link")
        // Toque o filme selecionado
        MovieSelector(whichMovie)
    }, false)
}


function MovieSelector (whichMovie)
{
    $(".reading-animation")[0].innerText = ""
    localStorage.setItem("lastMovie", whichMovie)
    $.ajax({ url: "https://swapi.co/api/films/"+whichMovie, success: (result) => {
        let number = "I"
        if (result.episode_id == 2) number = "II"
        else if (result.episode_id == 3) number = "III"
        else if (result.episode_id == 4) number = "IV"
        else if (result.episode_id == 5) number = "V"
        else if (result.episode_id == 6) number = "VI"
        else if (result.episode_id == 7) number = "VII"

        let title = "Episode " + number + "\n" + result.title.toUpperCase()
        $(".reading-animation")[0].innerText=title+"\n\n"+result.opening_crawl        
    }
    })
}