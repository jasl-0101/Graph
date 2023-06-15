class Commit {
  constructor(date, count) {
      this.date = date;
      this.count = count;
  }
}
const currentDate = new Date(2022,05,15);

const commits = [new Commit(currentDate, 0)];

for (let i = 1; i < 357; i++) {
  const nextDate = new Date(commits[i - 1].date);
  nextDate.setDate(nextDate.getDate() + 1);
  commits.push(new Commit(nextDate, 0));
}


fetch("https://dpg.gg/test/calendar.json").then(response => response.json())
.then(data => {
  const dataArray = Object.entries(data).map(([date, count]) => ({ date, count }));
  dataArray.forEach(item => {
    const date = new Date(item.date)
      
      if(date >= currentDate){
        const differenceInMilliseconds = date- currentDate;
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        const countDay = Math.floor(differenceInMilliseconds/millisecondsPerDay);
        if(countDay >= 0 && countDay < commits.length){
          commits[countDay].count=item.count;
        }
      }
  })
    
})
.catch(error => {
  console.log('Произошла ошибка:', error);
});


const canvas = document.getElementById("matrix");
const context = canvas.getContext("2d");

const size = { width: 15, height: 15 };
const margin = 5;

const currentDayOfWeek = currentDate.getDay() === 0 ? 7 : currentDate.getDay();
let currentCol = 0;
let currentRow = currentDayOfWeek - 1;

setTimeout(draw, 1000);

function getColor(countCommit){
  if(countCommit === 0){
      return "#EEEDEF";
  }
  else if(countCommit >= 1 && countCommit <= 9){
      return "#ACD5F2";
  }
  else if(countCommit <= 19){
      return "#7FA8C9";
  }
  else if(countCommit <= 29){
      return "#527BA0";
  }
  else{
      return "#254E77";
  }
}

function draw(){
  for (let i = 0; i < commits.length; i++) {
    const commit = commits[i];
    
    if(currentRow >= 7){
        currentRow = 0;
        currentCol++;
    }
  
    context.fillStyle = getColor(commit.count);
    context.fillRect(currentCol * (size.width + margin), currentRow * (size.height + margin),  size.width, size.height);
    currentRow++;
  }
}
