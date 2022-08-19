/* ========== select all elements from html ========= */
let noteIcon = document.querySelector(".note-icon");
let formPopup = document.querySelector(".main-popup");
let addBtn = document.querySelector(".addNewBtn");
let title = document.querySelector("#title");
let description = document.querySelector("#description");
let dateText = document.querySelector(".date");
let closeBtn = document.querySelector(".close-btn ");
let cancelBtn = document.querySelector(".canceled");
let cardsDiv = document.querySelector(".cards");
let formTitle = document.querySelector(".form-title");
let FormAlert = document.querySelector("#form_alerts");
let deleteAllBtn = document.querySelector(".deleteAll");
let darkmodeToggle = document.querySelector(".darkmode");

let card = {};
let idEdit,
  isEdit = false;
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const cards = JSON.parse(localStorage.getItem("cards") || "[]");

/*=========== remove and add class to show and hide form popup ===============*/
noteIcon.addEventListener("click", () => {
  formPopup.classList.add("open");
  formTitle.innerHTML = "Add New Note";
  addBtn.innerHTML = "Add Note";
  title.value = "";
  description.value = "";
});

function removeClass(element, action) {
  element.addEventListener("click", () => {
    action.classList.remove("open");
  });
}
removeClass(closeBtn, formPopup);
removeClass(cancelBtn, formPopup);



/*======== add new card by form when click form-btn =========*/
addBtn.addEventListener("click", addNewNote);


function addNewNote(e) {
  e.preventDefault();

  let titleValue = title.value.trim(),
    descValue = description.value.trim();
  if (titleValue && descValue) {
    let date = new Date();
    let month = months[ date.getMonth() ];
    let dateValue = `${date.getDate()} ${month} ${date.getFullYear()}`;
    let noteInfo = {
      title: titleValue,
      desc: descValue,
      date: dateValue
    };
    if (isEdit) {
      cards[ idEdit ] = noteInfo;
      isEdit = false;
    } else {
      cards.push(noteInfo);
    }
    localStorage.setItem("cards", JSON.stringify(cards));
    showNotes();
    successSubmit();
  } else {
    faildSubmit();
  }
}

function faildSubmit() {
  FormAlert.innerHTML = `<div class="alert alert-danger alert_form">Please Fill All Inputs</div>`;
  document.querySelector(".alert_form").style.top = "15px";
  setTimeout(() => {
    document.querySelector(".alert_form").style.top = "-150px";
  }, 3000);
}

function successSubmit() {
  FormAlert.innerHTML = `<div class="alert alert-success alert_form">Note Added Successfully</div>`;
  document.querySelector(".alert_form").style.top = "15px";
  setTimeout(() => {
    document.querySelector(".alert_form").style.top = "-150px";
  }, 2000);
}

// display cards if found
function showNotes() {
  document.querySelectorAll(".parent-column").forEach((card) => card.remove());
  if (!cards) return;

  cards.forEach((card, idx) => {
    let note = `
        <div class="parent-column col-lg-3 col-md-6 col-12 mb-3  h-200">
            <div class="add-note">
              <h3 class="title"> ${card.title}</h3>
              <p class="description">${card.desc}</p>
            </div>
            <div class="info">
            <hr>
              <div class="row justify-content-between">
                <div class="col-10 date">${card.date}</div>
                <div class="col-2 icons">
                  <i class='bx bx-dots-vertical-rounded bx-sm dots-edit'></i>
                  <ul class="settings list-unstyled ">
                    <li onclick="editNote(${idx}, '${card.title}', '${card.desc}')"><i class='bx bx-edit bx-xs'></i> Edit</li>
                    <li onclick="deleteNote(${idx})"><i class='bx bx-trash-alt bx-xs'></i> Delete</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
    `;

    cardsDiv.insertAdjacentHTML("beforeend", note);
    title.value = "";
    description.value = "";
  });
}
showNotes();

/* ================== Edit the note selected by ID ==================*/
function editNote(idNote, titleValue, descValue) {
  isEdit = true;
  idEdit = idNote;
  noteIcon.click();
  formTitle.innerHTML = "Update Note";
  addBtn.innerHTML = "Update";
  FormAlert.innerHTML = `<div class="alert alert-success alert_form">Note Updated Successfully</div>`;
  title.value = titleValue;
  description.value = descValue;
}

/* ================== delete note Selected by ID ==================*/
function deleteNote(idNote) {
  cards.splice(idNote, 1);
  localStorage.setItem("cards", JSON.stringify(cards));
  showNotes();
}

// delete all data
function deleteAllData() {
  cards.splice(0);
  localStorage.setItem("cards", JSON.stringify(cards));
  showNotes();

}

deleteAllBtn.addEventListener("click", deleteAllData);


// start dark && light mode
let bodyBg = document.querySelector("body");
let toggleBtn = document.querySelector(".toggleBtn");

toggleBtn.addEventListener("click", () => {
  if (bodyBg.classList.contains("toggle")) {
    darkModeFunc();
  } else {
    lightModeFunc();
  }
});

// check if light checked in localstorage
if (localStorage.getItem("notes-theme") !== null) {
  if (localStorage.getItem("notes-theme") === "light") {
    darkModeFunc();
  } else {
    lightModeFunc();
  }
}

function darkModeFunc() {
  localStorage.setItem("notes-theme", "light");
  bodyBg.classList.remove("toggle");
  toggleBtn.innerHTML = `<i class='bx bx-moon bx-md'></i> Dark`;
};
function lightModeFunc() {
  localStorage.setItem("notes-theme", "dark");
  bodyBg.classList.add("toggle");
  toggleBtn.innerHTML = `<i class='bx bx-sun bx-md'></i> Light`;
}