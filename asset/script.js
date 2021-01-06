class TimeblockObj {
  constructor(hour, todo) {
    this.hour = hour;
    this.todo = todo;
  }
}



window.onload = function() {
  var currentTimeblocks = getCurrentTimeblocks();
  var currentTime = moment();



  displayCurrentDate(currentTime);
  displayTimeblockRows(currentTime);




  document.querySelector('.container')
    .addEventListener('click', function(event) {
      containerClicked(event, currentTimeblocks);
    });
  setTimeblockText(currentTimeblocks);
};


function getCurrentTimeblocks() {
 var currentTimeblocks = localStorage.getItem('timeblockObjects');
  return currentTimeblocks ? JSON.parse(currentTimeblocks) : [];
}



function displayCurrentDate(currentTime) {
  document.getElementById('currentDay')
    .textContent = currentTime.format('dddd, MMMM Do');
}


// functions for displaying all timeblock rows //
function displayTimeblockRows(currentTime) {
  var currentHour = currentTime.hour();
  //working hours are 8-4 or 8-16//
  for (let i = 8; i <= 16; i ++) {
    var timeblock = createTimeblockRow(i);
    var hourCol = createCol(createHourDiv(i), 1);
    var textArea = createCol(createTextArea(i, currentHour), 10);
    var saveBtn = createCol(createSaveBtn(i), 1);
    appendTimeblockColumns(timeblock, hourCol, textArea, saveBtn);
    document.querySelector('.container').appendChild(timeblock);
  }
}

function createTimeblockRow(hourId) {
  var timeblock = document.createElement('div');
  timeblock.classList.add('row');
  timeblock.id = `timeblock-${hourId}`;
  return timeblock;
}

function createCol(element, colSize) {
  var col = document.createElement('div');
  col.classList.add(`col-${colSize}`,'p-0');
  col.appendChild(element);
  return col;
}

function createHourDiv(hour) {
  var hourCol = document.createElement('div');
  hourCol.classList.add('hour');
  hourCol.textContent = formatHour(hour);
  return hourCol;
}

function formatHour(hour) {
  var hourString = String(hour);
  return moment(hourString, 'h').format('hA');
}

function createTextArea(hour, currentHour) {
  var textArea = document.createElement('textarea');
  textArea.classList.add(getTextAreaBackgroundClass(hour, currentHour));
  return textArea;
}

function getTextAreaBackgroundClass(hour, currentHour) {
  return hour < currentHour ? 'past' 
    : hour === currentHour ? 'present' 
    : 'future';
}

function createSaveBtn(hour) {
  var saveBtn = document.createElement('button');
  saveBtn.classList.add('saveBtn');
  saveBtn.innerHTML = '<i class="fas fa-save"></i>';
  saveBtn.setAttribute('data-hour', hour);
  return saveBtn;
}

function appendTimeblockColumns(timeblockRow, hourCol, textAreaCol, saveBtnCol) {
  var innerCols = [hourCol, textAreaCol, saveBtnCol];
  for (let col of innerCols) {
    timeblockRow.appendChild(col);
  }
}

// functions for saving to local storage //
function containerClicked(event, timeblockList) {
  if (isSaveButton(event)) {
    var timeblockHour = getTimeblockHour(event);
     var textAreaValue = getTextAreaValue(timeblockHour);
    placeTimeblockInList(new TimeblockObj(timeblockHour, textAreaValue), timeblockList);
    saveTimeblockList(timeblockList);
  }
}

function isSaveButton(event) {
  return event.target.matches('button') || event.target.matches('.fa-save');
}

function getTimeblockHour(event) {
  return event.target.matches('.fa-save') ? event.target.parentElement.dataset.hour : event.target.dataset.hour;
}

function getTextAreaValue(timeblockHour) {
  return document.querySelector(`#timeblock-${timeblockHour} textarea`).value;
}

function placeTimeblockInList(newTimeblockObj, timeblockList) {
  if (timeblockList.length > 0) {
    for (let savedTimeblock of timeblockList) {
      if (savedTimeblock.hour === newTimeblockObj.hour) {
        savedTimeblock.todo = newTimeblockObj.todo;
        return;
      }
    }
  } 
  timeblockList.push(newTimeblockObj);
  return;
}

function saveTimeblockList(timeblockList) {
  localStorage.setItem('timeblockObjects', JSON.stringify(timeblockList));
}

function setTimeblockText(timeblockList) {
  if (timeblockList.length === 0 ) {
    return;
  } else {
    for (let timeblock of timeblockList) {
      document.querySelector(`#timeblock-${timeblock.hour} textarea`)
        .value = timeblock.todo;
    }
  }
}