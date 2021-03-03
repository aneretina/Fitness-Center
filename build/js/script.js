'use strict';

(function () {

  var trainersItem = document.querySelectorAll('.trainers__item');
  var trainersLeft = document.querySelector('.trainers__button-left');
  var trainersRight = document.querySelector('.trainers__button-right');
  var trainers = document.querySelector('.trainers');

  var reviews = document.querySelector('.reviews');
  var reviewsItem = document.querySelectorAll('.reviews__item');
  var reviewsLeft = document.querySelector('.reviews__button-left');
  var reviewsRight = document.querySelector('.reviews__button-right');

  var bannerBtn = document.querySelector('.banner__button');

  var abonements = document.querySelector('.abonements');
  var abonementsDuration = document.querySelectorAll('.abonements__duration-item');
  var abonementsLists = document.querySelectorAll('.abonements__list');
  var stepSize = 0;
  var startIndex = 0;
  var endIndex = 0;

  function changeDurationContent() {
    abonementsDuration.forEach(function (element) {
      element.addEventListener('click', function (evt) {
        var target = evt.target;
        if (target && target.classList.contains('abonements__duration-item')) {
          for (var i = 0; i < abonementsDuration.length; i++) {
            if (target === abonementsDuration[i]) {
              for (var j = 0; j < abonementsLists.length; j++) {
                abonementsLists[j].classList.add('abonements-hidden');
                abonementsLists[j].classList.remove('abonements-show');
                abonementsDuration[j].classList.remove('active');
              }
              if (abonementsLists[i].classList.contains('abonements-hidden')) {
                abonementsLists[i].classList.remove('abonements-hidden');
                abonementsLists[i].classList.add('abonements-show');
                target.classList.add('active');
              }
            }
          }
        }
      });
    });
  }

  if (abonements) {
    changeDurationContent();
  }


  function moveToNext() {
    if (endIndex < trainersItem.length) {
      showSlide(trainersItem, startIndex += stepSize, endIndex += stepSize);
    }
  }

  function moveToPrev() {
    if (startIndex > 0) {
      showSlide(trainersItem, startIndex -= stepSize, endIndex -= stepSize);
    }
  }

  function showSlide(slides, current, key) {
    for (var j = 0; j < slides.length; j++) {
      slides[j].style.display = 'none';
    }

    for (var i = current; i < key; i++) {
      if (slides[i]) {
        slides[i].style.display = 'flex';
      }
    }
  }

  function changetrainersSlider() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      switchSliderTrainers(1, trainersItem, trainersLeft, trainersRight);
    } else if (window.matchMedia('(max-width: 1199px)').matches) {
      switchSliderTrainers(2, trainersItem, trainersLeft, trainersRight);
    } else {
      switchSliderTrainers(4, trainersItem, trainersLeft, trainersRight);
    }
  }

  if (trainers) {
    changetrainersSlider();
    trainersLeft.addEventListener('click', moveToPrev);
    trainersRight.addEventListener('click', moveToNext);
    window.addEventListener('resize', changetrainersSlider);
  }

  function switchSliderTrainers(step, slides) {
    startIndex = 0;
    endIndex = step;
    stepSize = step;
    showSlide(slides, startIndex, endIndex);
  }


  function switchSliderReviews(step, slides) {
    startIndex = 0;
    endIndex = step;
    stepSize = 1;
    showSlide(slides, startIndex, endIndex);
  }

  if (reviews) {
    switchSliderReviews(1, reviewsItem, reviewsLeft, reviewsRight);
    reviewsLeft.addEventListener('click', moveToPrev);
    reviewsRight.addEventListener('click', moveToPrev);
  }

  bannerBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    abonements.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

})();
