const MAX_HIGH_SCORES = 6;
const HIGH_SCORES = 'highScores';

class HighScoreClass{
    constructor(name, score){
        this.name = name;
        this.score = score;

    }
//SCORES

    //Guardar Score
    checkHighScore()
    {
        const finalScore = document.getElementById('finalScore');
        const mostRecentScore = localStorage.getItem('mostRecentScore');

        console.log("chequeando score");
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

        finalScore.innerText=mostRecentScore;

        //Mirar el valor mas peque de la lista
        const lowestScore = highScores[MAX_HIGH_SCORES-1]?.player1K??0;
        if(this.score > lowestScore)
        {
            this.saveHighScores(highScores);
            this.showHighScores();
        }
        
    }
    saveHighScores(highScores)
    {
        const data = {
            name: this.name,
            score: this.score
        }
        console.log("salvando score");

        //Add to list
        highScores.push(data);

        //Sort the list
        highScores.sort((a,b) => b.score - a.score);

        //Select new list
        highScores.splice(MAX_HIGH_SCORES);

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
    
}