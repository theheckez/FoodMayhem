const MAX_HIGH_SCORES = 6;
const HIGH_SCORES = 'highScores';

class HighScoreClass {
    constructor(scene){
        this.scene = scene;
    }
    /*
    createStorage()
    {
        const finalScore = document.getElementById('finalScore');
        //const mostRecentScore = localStorage.getItem("name", "score");
        const mostRecentScore = localStorage.getItem('mostRecentScore');

        console.log("chequeando score");

        finalScore.innerText=mostRecentScore;
    }*/
//SCORES
    //Guardar Score
    checkHighScore(name, score)
    {
        
        const finalScore = document.getElementById('finalScore');
        //const mostRecentScore = localStorage.getItem("name", "score");
        const mostRecentScore = localStorage.getItem('mostRecentScore');

        console.log("chequeando score");
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        finalScore.innerText=mostRecentScore;
        //const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        //console.log(highScores);
        //Mirar el valor mas peque de la lista
        const lowestScore = highScores[MAX_HIGH_SCORES-1]?.score??0;

        if(highScores.length == 0)
        {
            this.notificar();
            this.saveNewHighScores(name, score, highScores);
            //this.showHighScores();
        }else{
            var i = 0;
            while(i < highScores.length)
            {
                console.log("recorriendo bucle");
                if(highScores[i].name == name)
                {
                    console.log("existe nombre en la lista");
                    if(score > highScores[i].score)
                    {
                        this.notificar(); //notificar de nuevo record
                        this.updateAHighScores(i, score, highScores);
                        //this.showHighScores();
                    }
                    else i++; console.log("puntuacion del jugador es menor");
                    return;
                } else i++;
            }
            if(i == highScores.length) //se ha terminado de recorrer el bucle: no esta en la lista
            {
                console.log("no esta en la lista");
                if(score > lowestScore) //se pone por delante si es mayor
                {
                    this.notificar();
                    this.saveNewHighScores(name, score, highScores);
                    //this.showHighScores();
                }
            }
        }
        /*
        if(this.score > lowestScore) //se pone por delante si es mayor
        {
            this.saveHighScores(highScores);
            this.showHighScores();
        }*/
        
    }
    saveNewHighScores(name, score, highScores)
    {
        const data = {
            name: name,
            score: score
        }
        console.log("salvando nuevo score");

        //Add to list
        highScores.push(data);

        //Sort the list
        highScores.sort((a,b) => b.score - a.score);

        //Select new list
        highScores.splice(MAX_HIGH_SCORES);

        //Save to local
        localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));    
    }
    updateAHighScores(pos, newscore, highScores)
    {
        console.log("actualizando");
        
        highScores[pos].score = newscore;

        //Sort the list
        highScores.sort((a,b) => b.score - a.score);

        //Select new list
        //highScores.splice(MAX_HIGH_SCORES);

        //Save to local
        localStorage.setItem(HIGH_SCORES, JSON.stringify(highScores));    
    }
    showHighScores()
    {
        const highScores = JSON.parse(localStorage.getItem(HIGH_SCORES)) || [];
        const highScoresList = document.getElementById(HIGH_SCORES);

        highScoresList.innerHTML = highScores.map((score) => `<li>${score.score}-${score.name}`).join("");
        console.log(highScoresList);
    }
    notificar()
    {
        console.log("notificando");
        const texto = {
            origin: 'center',
            x: 400,
            y: 450,
            style: {
                fontFamily: 'estilo',
                color: '#ffff00',
                fontSize: 20,
                textAlign: 'center',
                justifyContent: 'center'
            }
        }
        this.scene.make.text(texto).setText("New High Score!");
        //make.text(texto);
    }
    
}
