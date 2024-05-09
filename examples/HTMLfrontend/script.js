window.onload = function() {

    loadQuestions();

    let getCall = document.getElementById('getCall');
    let postCall = document.getElementById('postCall');

    getCall.addEventListener('click', async (e)=>{
        let result = await fetch('http://localhost:3001/');
        let data = await result.json();
        document.getElementById('getResponse').innerHTML = JSON.stringify(data);
    });
    postCall.addEventListener('click', async (e)=>{
        let newReviewQuestion = {
            data: {
                topic: document.querySelector('input[name="topic"]').value,
                question: document.querySelector('input[name="question"]').value
            }
        };
        console.log(newReviewQuestion);

        let result = await fetch('http://localhost:3001/', {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify(newReviewQuestion)
        });
        let data = await result.json();
        console.log(data);
        loadQuestions();
    });



}

async function loadQuestions() {
    let result = await fetch('http://localhost:3001');
    let data = await result.json();
    document.getElementById('questions').innerHTML = JSON.stringify(data);
}