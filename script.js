async function vote(option) {
    await fetch("https://e4mzzubz5a.execute-api.us-east-1.amazonaws.com/prod", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ vote: option }) 
    });
    getResults();
}
