let questions = [
    {
        "id": 1000001,
        "question": "What is your marital status?",
        "answers": [
            {"answer": "Single",
            "nextQuestion": 1000002},
            {"answer": "Married",
            "nextQuestion": 1000003}]
    },
    {
        "id": 1000002,
        "question": "Are you planning on getting married next year?",
        "answers": [
            {"answer": "Yes",
            "nextQuestion": false},
            {"answer": "No",
            "nextQuestion": false}]
    },
    {
        "id": 1000003,
        "question": "How long have you been married?",
        "answers": [
            {"answer": "Less than a year",
            "nextQuestion": false},
            {"answer": "More than a year",
            "nextQuestion": 1000004}]
    },
    {
        "id": 1000004,
        "question": "Have you celebrated your one year anniversary?",
        "answers": [
            {"answer": "Yes",
            "nextQuestion": false},
            {"answer": "No",
            "nextQuestion": false}]
    },
]

let option1 = document.querySelector('.option1');
let option2 = document.querySelector('.option2');
let question = document.querySelector('.question');
let btn = document.querySelector('.btn');
let select = document.querySelector("#question");
let current = questions[0];
let nextId;

option1.textContent = current["answers"][0]["answer"];
option2.textContent = current["answers"][1]["answer"];
question.textContent = current["question"];
btn.onclick = (event) => {
    event.preventDefault();
    if(question.textContent === current["question"] && select.value === current["answers"][0]["answer"]) {
        nextId = current["answers"][0]["nextQuestion"];
        console.log(nextId);
    } else if (question.textContent === current["question"] && select.value === current["answers"][1]["answer"]) {
        nextId = current["answers"][1]["nextQuestion"];
        console.log(nextId);
    }
    let nextObj = (function(q) {
        for (let i = 0; i < q.length; i++) {
            if(q[i]["id"] === nextId) {
                current = q[i];
                question.textContent = current["question"];
                option1.textContent = current["answers"][0]["answer"];
                option2.textContent = current["answers"][1]["answer"];
            };

            };
    }(questions))
}

let result = [];
let tempRes = [];
let tempObj = {};
let nextQuestionId = 0;

function findWays(arr) {
    while(!arr[arr.length-1]["answers"][1]["passed"]) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]["id"] === nextQuestionId) {
                if (arr[i]["answers"][0]["nextQuestion"] === false && arr[i]["answers"][1]["nextQuestion"] === false) {
                    tempObj[arr[i]["question"]] = arr[i]["answers"][0]["answer"] + "/" + arr[i]["answers"][1]["answer"];
                    tempRes.push(tempObj);
                    result.push(tempRes);
                    tempObj = {};
                    tempRes = [];
                    arr[i]["answers"][0]["passed"] = true;
                    arr[i]["answers"][1]["passed"] = true;
                    i = 0;
                    nextQuestionId = 0;
                } else if (!arr[i]["answers"][0]["passed"]) {
                    tempObj[arr[i]["question"]] = arr[i]["answers"][0]["answer"];
                    tempRes.push(tempObj);
                    if(arr[i]["answers"][0]["nextQuestion"]) {
                        nextQuestionId = arr[i]["answers"][0]["nextQuestion"];
                    } else {
                        result.push(tempRes);
                        tempRes = [];
                    }
                    arr[i]["answers"][0]["passed"] = true;
                    tempObj = {};
                    i = 0;
                } else if(!arr[i]["answers"][1]["passed"]) {
                    tempObj[arr[i]["question"]] = arr[i]["answers"][1]["answer"];
                    tempRes.push(tempObj);

                    if(arr[i]["answers"][1]["nextQuestion"]) {
                        nextQuestionId = arr[i]["answers"][1]["nextQuestion"];
                    } else {
                        result.push(tempRes);
                        tempRes = [];
                    }
                    arr[i]["answers"][1]["passed"] = true;
                    tempObj = {};
                    i = 0;
                }
            } else if (!arr[i]["answers"][0]["passed"]) {
                if (arr[i]["answers"][0]["nextQuestion"] === false && arr[i]["answers"][1]["nextQuestion"] === false) {
                    tempObj[arr[i]["question"]] = arr[i]["answers"][0]["answer"] + "/" + arr[i]["answers"][1]["answer"];
                    tempRes.push(tempObj);
                    result.push(tempRes);
                    tempObj = {};
                    tempRes = [];
                    arr[i]["answers"][0]["passed"] = true;
                    arr[i]["answers"][1]["passed"] = true;
                    i = 0;
                } else if(!arr[i]["answers"][0]["passed"]) {
                    tempObj[arr[i]["question"]] = arr[i]["answers"][0]["answer"];
                    tempRes.push(tempObj);
                    if(arr[i]["answers"][0]["nextQuestion"]) {
                        nextQuestionId = arr[i]["answers"][0]["nextQuestion"];
                    } else {
                        result.push(tempRes);
                        tempRes = [];
                    }
                    arr[i]["answers"][0]["passed"] = true;
                    tempObj = {};
                    i = 0;
                } else if (!arr[i]["answers"][1]["passed"]) {
                    tempObj[arr[i]["question"]] = arr[i]["answers"][1]["answer"];
                    tempRes.push(tempObj);
                    if(arr[i]["answers"][1]["nextQuestion"]) {
                        nextQuestionId = arr[i]["answers"][1]["nextQuestion"];
                    } else {
                        result.push(tempRes);
                        tempRes = [];
                    }
                    arr[i]["answers"][1]["passed"] = true;
                    tempObj = {};
                    i = 0;
                }
            }
            console.log(JSON.stringify(result));
            console.log(tempRes);
            console.log(nextQuestionId);
        }
    }
    
}
    
findWays(questions)


// {"What is your marital status?": ["Single", "Married"]}
// {"Are you planning on getting married next year?": ["Yes", "No"]}
// {"How long have you been married?": ["Less than a year", "More than a year"]}
// {"Have you celebrated your one year anniversary?": ["Yes", "No"]}

// {paths: {number: 3, list: [
// [{"What is your marital status?": "Single"},
// {"Are you planning on getting married next year?": "Yes/No"}],
// [{"What is your marital status?": "Married"},
// {"How long have you been married?": "Less than a year"}],
// [{"What is your marital status?": "Married"},
// {"How long have you been married?": "More than a year"},
// {"Have you celebrated your one year anniversary?": "Yes/No"}],
// ]}}