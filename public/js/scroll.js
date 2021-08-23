window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
    document.getElementById("mobileHeader").classList.add("header--sticky");
    document.getElementById("allHeader").classList.add("header--sticky");
  } else {
    document.getElementById("mobileHeader").classList.remove("header--sticky");
    document.getElementById("allHeader").classList.remove("header--sticky");
  }
}
