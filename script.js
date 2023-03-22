$('.owl-carousel').owlCarousel({
    loop:true,
    margin:55,
    nav:false,
    dots:false,
    autoWidth:true,
    items:5
});

/*------------------------------------------------------------*/

  var fullDate = "";
  var dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  var date = new Date();
  var day = date.getDate();
  var month = date.getMonth() +1;
  var year = date.getFullYear();
  var dayName = dayNames[date.getDay()-1];
  var dayOptions = document.querySelectorAll(".selDay option");
  dayOptions[0].innerText = dayNames[date.getDay()];
  dayOptions[1].innerText = dayNames[date.getDay()+1];
  dayOptions[2].innerText = dayNames[date.getDay()+2];

/*------------------------------------------------------------*/


var cards = document.querySelectorAll(".card");
var wrap = document.querySelector(".wrap");


for (var i = 0; i < cards.length; i++) {
  cards[i].onclick = function(){
    if (document.querySelector(".exp")) {
      coverBack(document.querySelector(".exp"));
    }

    for (var a = 0; a < cards.length; a++) {
      if (cards[a] != this) {
        cards[a].classList.remove("exp");
      }
    }
    this.classList.toggle("exp");
    if (this.classList.contains("exp")) {
      this.style.background = "transparent";
    }else {
      coverBack(this);
    }

  }
}

function coverBack(ths){
  ths.style.background = "url('" + ths.getAttribute('data-src') + "')";
  ths.style.backgroundPosition = "center";
  ths.style.backgroundSize = "cover";
  ths.style.backgroundRepeat = "no-repeat";
}





/*------------------------------------------------------------*/


var qnt = document.getElementById("qnt");
var price = document.getElementById("price");

jQuery('<div class="quantity-nav"><div class="quantity-button quantity-up">+</div><div class="quantity-button quantity-down">-</div></div>').insertAfter('.quantity input');
    jQuery('.quantity').each(function() {
      var spinner = jQuery(this),
        input = spinner.find('input[type="number"]'),
        btnUp = spinner.find('.quantity-up'),
        btnDown = spinner.find('.quantity-down'),
        min = input.attr('min'),
        max = input.attr('max');

      btnUp.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue >= max) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue + 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
        price.innerText = "$" + (qnt.value * 10);
      });

      btnDown.click(function() {
        var oldValue = parseFloat(input.val());
        if (oldValue <= min) {
          var newVal = oldValue;
        } else {
          var newVal = oldValue - 1;
        }
        spinner.find("input").val(newVal);
        spinner.find("input").trigger("change");
        price.innerText = "$" + (qnt.value * 10);
      });
    });




/*------------------------------------------------------------*/


    var sessions = document.querySelectorAll(".session");
    var selectSeat = document.getElementById("selectSeat");
    var seatsWrap = document.querySelector(".seatsWrap");


    for (var i = 0; i < sessions.length; i++) {
      sessions[i].onclick = function(){
        for (var a = 0; a < sessions.length; a++) {
          sessions[a].classList.remove("chosen");
        }
        this.classList.add("chosen");
        selectSeat.style.background = "var(--theme)";
        selectSeat.style.color = "#ffdfdf";
        selectSeat.style.pointerEvents = "auto";
      }
    }



    selectSeat.onclick = function(){
      sessionSelWrap.style.display = "none";
      seatsWrap.style.display = "block";
      back.onclick = backToSessions;
      ticketWrapper.scrollTop = 200;
    }


/*------------------------------------------------------------*/

var col1 = document.querySelector(".col1");
var col2 = document.querySelector(".col2");
var back = document.getElementById("backToFilm");
var sessionSelWrap = document.querySelector(".sessionSelWrap");

back.onclick = backToFilm;

function backToFilm(){
  wrap.classList.remove("fade");
  setTimeout(function(){wrap.style.display = "flex";},10);
  ticketPage.classList.remove("scale");
  stck1.style.width = "0%";
  pr2.classList.remove("done");
  for (var i = 0; i < sessions.length; i++) {
    sessions[i].classList.remove("chosen");
  }
  selectSeat.style.background = "rgba(255,255,255,0.03)";
  selectSeat.style.color = "#de5858";
  selectSeat.style.pointerEvents = "none";
}

function backToSessions(){
  seatsWrap.style.display = "none";
  sessionSelWrap.style.display = "block";
  back.onclick = backToFilm;
  for (var i = 0; i < seats.length -3; i++) {
    seats[i].classList.remove("selectedSeat");
    seats[i].innerHTML = "";
  }
  complete.style.background = "rgba(255,255,255,0.03)";
  complete.style.color = "var(--theme)";
  complete.style.pointerEvents = "none";
  selectedCount = 0;
}






/*------------------------------------------------------------*/


var seatsDiv = document.querySelector(".seats");
var seats = document.querySelectorAll(".seat");
var complete = document.getElementById("complete");
var seatInfo = document.querySelector(".seatInfo");
var selDayBox = document.querySelector(".selDay");
var selectedCount = 0;
var seatLimit;
var filmName = "";
var seatNumbers = "";



for (var i = 0; i < seats.length -3; i++) {

  seats[i].onclick = function(){
  if(this.classList.contains("full") == false) {
    if (this.classList.contains("selectedSeat")) {
      this.classList.remove("selectedSeat");
      this.innerHTML = "";
      selectedCount--;
      controlBtn();
    }else {
      if (selectedCount == qnt.value) {
        alert("You Selected Your Seats");
      }else {
        selectedCount++;
        this.classList.add("selectedSeat");
        this.innerHTML = "<i class='fa-solid fa-user'></i>";
        controlBtn();
      }
     }
    }
   }
  }

function controlBtn(){
  if (selectedCount == qnt.value) {
    complete.style.background = "var(--theme)";
    complete.style.color = "#ffdfdf";
    complete.style.pointerEvents = "auto";
  }else {
    complete.style.background = "rgba(255,255,255,0.03)";
    complete.style.color = "var(--theme)";
    complete.style.pointerEvents = "none";
  }
}


var ticketWrapper = document.querySelector(".ticketWrapper");
var ticketPage = document.querySelector(".ticketPage");
complete.onclick = function(){

  for (var j = 0; j < seats.length-3; j++) {
    if (seats[j].classList.contains("selectedSeat")) {
      seatNumbers += (j+1) + ",";
    }
  }
  seatNumbers = seatNumbers.substr(0,seatNumbers.length-1);

  var barcode = Math.floor(Math.random()*(999999999-100000000)) + 100000000;

  var selectedSession = document.querySelector(".chosen").innerText;

  if (selDayBox.selectedIndex == 0) {
    fullDate = (day+1) + "/" + month + "/" + year + "  " + selectedSession;
  }else if (selDayBox.selectedIndex == 1) {
    fullDate = (day+2) + "/" + month + "/" + year + "  " + selectedSession;
  }else {
    fullDate = (day+3) + "/" + month + "/" + year + "  " + selectedSession;
  }

  ticketWrapper.classList.add("ticketDiv");
  ticketPage.classList.add("fns");
  ticketWrapper.innerHTML = "";
  ticketWrapper.innerHTML = '<div class="ticketContent"><span id="filmName"><b>Film:</b> ' + filmName + '</span><span id="seatNumbers"><b>Seats:</b> ' + seatNumbers + '</span><span id="date"><b>Date:</b> ' + fullDate + '</span><div class="barcode">' + barcode + '</div></div><div class="lastOpt"><span>Completed Successfully. We have sent detail to your email and phone.</span><button id="home" onclick="location.reload();">Home</button></div>';

  stck2.style.width = "100%";
  pr3.classList.add("done");
}






/*------------------------------------------------------------*/


var gtBtns = document.querySelectorAll(".getTicket");
var pr2 = document.querySelector(".pr2");
var pr3 = document.querySelector(".pr3");
var stck1 = document.querySelector(".stck1");
var stck2 = document.querySelector(".stck2");


for (var i = 0; i < gtBtns.length; i++) {
  gtBtns[i].onclick = function(){
    filmName = this.parentElement.parentElement.parentElement.children[2].innerText;
    this.classList.remove("exp");
    coverBack(this);


    wrap.classList.add("fade");
    setTimeout(function(){wrap.style.display = "none";},300);
    ticketPage.classList.add("scale");


    stck1.style.width = "100%";
    pr2.classList.add("done");
  }
}
