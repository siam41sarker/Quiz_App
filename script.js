const myBtn = document.querySelector(".MyBtn button");
const rules = document.querySelector(".rules");
const exitBtn = document.querySelector(".exitBtn");
const cont = document.querySelector(".cont")
const questions = document.querySelector(".Questions");
const timePart = document.querySelector(".time_section .seconds");
const scrollingPart = document.querySelector(".Questions .scrolling");
const Result_box = document.querySelector(".Result_box");
const scoreX = document.querySelector(".score");
const restart1 = document.querySelector(".Result_button .restart1");
const timeLeft = document.querySelector(".timeLeft");
let FooterButton = document.querySelector(".FooterButton");
myBtn.onclick = ()=>
    {
        rules.classList.add("activeRules");
    }
exitBtn.onclick = ()=>
    {
        rules.classList.remove("activeRules");
    }
cont.onclick = ()=>
    {
        rules.classList.remove("activeRules");
        questions.classList.add("activeQuiz");
        showQuestions(0);
        setTimingPart(15);
        setScrollingPart(0);
    }
let ques_count = 0;
let TimeCounter;
let scrollCounter;
let timeValue = 15;
let scrollValue =0;
let scoreCount = 0;
let rightAnswer=0;
let wrongAnswer=0;
let wr=0;
FooterButton.onclick = ()=>
        {
            if(ques_count<questionsOption.length-1)
                {
                    ques_count++;
                    showQuestions(ques_count);
                    clearInterval(TimeCounter);
                    setTimingPart(timeValue);
                    clearInterval(scrollCounter);
                    setScrollingPart(scrollValue);
                    FooterButton.style.display = "none";
                }
            else
                {
                   
                    console.log("You've completed all the questions.");
                    showResultBox();

                }
        }
function showQuestions(index)
    {
        let quest = document.querySelector(".xyz");
        let myOptions = document.querySelector(".myOptions");
        let footerLeft = document.querySelector(".footerLeft");
        let qstSpan ='<span class="ques">'+questionsOption[index].index+". "+questionsOption[index].question+"</span>";
        quest.innerHTML = qstSpan;
        let optionTag = '<div class="options"><span>'+questionsOption[index].options[0]+'</span></div>'+'<div class="options"><span>'+questionsOption[index].options[1]+'</span></div>'+'<div class="options"><span>'+questionsOption[index].options[2]+'</span></div>'+'<div class="options"><span>'+questionsOption[index].options[3]+'</span></div>';
        myOptions.innerHTML = optionTag;
        let total_question = "<p>"+questionsOption[index].index+" out of "+questionsOption.length+" Questions.</p>";
        footerLeft.innerHTML = total_question;
        let optionTaken = myOptions.querySelectorAll(".options");
        let i;
        for(i=0;i<optionTaken.length;i++)
            {
                optionTaken[i].setAttribute("onclick","optionSelected(this)")
            }
    }
let tickIcon = '<div class="tick icon"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="cross icon"><i class="fa-solid fa-circle-xmark"></i></div>';
function optionSelected(ans)
    {
        clearInterval(TimeCounter);
        clearInterval(scrollCounter);
        FooterButton.style.display = "block";
        let selected = ans.textContent;
        let correctAns = questionsOption[ques_count].answer;
        let option_list = document.querySelector(".myOptions");
        let optionSorted = option_list.children.length;
        let i;
        if(selected==correctAns)
            {
                rightAnswer++;
                console.log(scoreCount);
                ans.classList.add("corrected");
                console.log("Answer is correct.");
                ans.insertAdjacentHTML("beforeend",tickIcon);
            }
        else
            {
                wr++;
                wrongAnswer+=0.5;
                ans.classList.add("wrongAns");
                console.log("Wrong answer.");
                ans.insertAdjacentHTML("beforeend",crossIcon);
                let m;
                for(m=0;m<optionSorted;m++)
                    {
                        if(option_list.children[m].textContent==correctAns)
                            {
                                option_list.children[m].setAttribute("class","options corrected");
                                option_list.children[m].insertAdjacentHTML("beforeend",tickIcon);
                            }
                    }
            }
        for(i=0;i<optionSorted;i++)
            {
                option_list.children[i].classList.add("disabled");
            }  
        if(questionsOption[ques_count].index==questionsOption.length)
                    {
                        FooterButton.textContent = "result";
                    }
       
    }
function setTimingPart(value)
    {
        TimeCounter = setInterval(timerFunc,1000);
        function timerFunc()
            {
                timePart.textContent = value;
                value--;
                if(value<9)
                    {
                        let perfectaTime = timePart.textContent;
                        timePart.textContent = "0"+perfectaTime;
                    }
                if(value<0)
                    {
                        FooterButton.style.display = "block";
                        timePart.textContent = "00";
                        clearInterval(TimeCounter); 
                        let option_off =document.querySelector(".myOptions");
                        let n;
                        for(n=0;n<option_off.children.length;n++)
                            {
                                option_off.children[n].classList.add("disabled");
                            }
                        if(questionsOption[ques_count].index==questionsOption.length)
                            {
                                    FooterButton.textContent = "result";
                            }
                        alert("Time's up! You can't select any option.");
                        
                    }
            }
    }
function setScrollingPart(scroll_value)
    {
        scrollCounter = setInterval(scrollFunc,50);
        function scrollFunc()
            {
                scrollingPart.style.width = scroll_value+"px";
                scroll_value++;
                if(scroll_value>319)
                    {
                        clearInterval(scrollCounter);
                    }
            }
    }
function showResultBox()
    {
        rules.classList.remove("activeRules");
        questions.classList.remove("activeQuiz");
        Result_box.classList.add("activeResult");
        scoreCount=rightAnswer-wrongAnswer;
        if(scoreCount>=20)
            {
                let scoringPart ='<p style="color:#155724;font-weight:bold;margin-left:47px;">Correct Answer: '+rightAnswer+'</p><p style="color:#721c24;font-weight:bold;margin-left:47px;">Wrong Answer:  '+wr+'</p>'+'<span style="color:#155724;font-weight:bold;">'+'Congratulations! </span><span style="margin-left:-2px">'+"You've got  "+'<p style="display:inline">'+scoreCount+'</p> out of <p style="display:inline">'+questionsOption.length+"</p></span>";                
                scoreX.innerHTML=scoringPart;
            }
        else if(scoreCount>=10 && scoreCount<20)
            {
                let scoringPart ='<p style="color:#155724;font-weight:bold;margin-left:47px;">Correct Answer: '+rightAnswer+'</p><p style="color:#721c24;font-weight:bold;margin-left:47px;">Wrong Answer:  '+wr+'</p>'+'<span style="color:#4f2082;font-weight:bold;">'+'Good Effort! </span><span style="margin-left:-2px">'+"You've got  "+'<p style="display:inline">'+scoreCount+'</p> out of <p style="display:inline">'+questionsOption.length+"</p></span>";
                scoreX.innerHTML=scoringPart;
            }
        else
            {
                if(scoreCount<0)
                    {
                        scoreCount=0;
                    }
                let scoringPart ='<p style="color:#155724;font-weight:bold;margin-left:47px;">Correct Answer: '+rightAnswer+'</p><p style="color:#721c24;font-weight:bold;margin-left:47px;">Wrong Answer:  '+wr+'</p>'+'<span style="color:#721c24;font-weight:bold;">'+'Sorry! </span><span style="margin-left:-2px">'+"You've got  "+'<p style="display:inline">'+scoreCount+'</p> out of <p style="display:inline">'+questionsOption.length+"</p></span>";
                scoreX.innerHTML=scoringPart;
            }
    }
restart1.onclick = ()=>
    {
            window.location.reload();
    }
