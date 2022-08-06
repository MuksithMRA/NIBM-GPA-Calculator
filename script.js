const form = document.querySelector("form");
const inputs = document.querySelectorAll(".form-control");
const calculate_btn = document.querySelector("#calculate");
let gpa_s = [];
let module_data = [];

$.getJSON("/module_data.json", function (data, textStatus, jqXHR) {
  module_data = data;
});

calculate_btn.addEventListener("click", function () {
  gpa_s = [];
  inputs.forEach((element) => {
    if (element.value == "" || element.value > 4.0 || element.value < 0.0) {
      element.classList.add("is-invalid");
      element.focus();
    } else {
      element.classList.remove("is-invalid");
      gpa_s.push(element.value);
    }
  });

  if (gpa_s.length == inputs.length) {
    $("#result-modal").modal("show");
    $("#result-modal .modal-body #final-GPA").text(
      calculateFinalGpa().toFixed(2)
    );
  }
});

function calculateFinalGpa() {
  let tot_up = 0;
  let tot_credit = 0;
  for (let index = 0; index < gpa_s.length; index++) {
    tot_credit += module_data[index].credit;
    tot_up += gpa_s[index] * module_data[index].credit;
  }

  if (tot_up > 0) {
    final_gpa = tot_up / tot_credit;
    if (final_gpa >= 3.8) {
      $("#result-modal .modal-body img").attr("src", "/img/distinction.jpg");
      $("#result-modal .modal-body #grade").text("Distinction");
      $("#result-modal .modal-body #grade").addClass("text-success");
      $("#result-modal .modal-body #motivation").text(
        "You are the Best  , Well Done !"
      );
    } else if (final_gpa >= 3.3) {
      $("#result-modal .modal-body img").attr("src", "/img/pass.jpg");
      $("#result-modal .modal-body #grade").text("Pass");
      $("#result-modal .modal-body #grade").addClass("text-success");
      $("#result-modal .modal-body #motivation").text(
        "Congratulation Work More Hard !"
      );
    } else {
      $("#result-modal .modal-body img").attr("src", "/img/fail.jpg");
      $("#result-modal .modal-body #grade").text("Fail");
      $("#result-modal .modal-body #grade").addClass("text-danger");
      $("#result-modal .modal-body #motivation").text(
        "It's Ok , Let's Try again !"
      );
    }
    return final_gpa;
  }
  return 0;
}

$("#clearBtn").click(function (e) {
  e.preventDefault();
  inputs.forEach((element) => {
    element.value = "";
    element.classList.remove("is-invalid");
  });
});
