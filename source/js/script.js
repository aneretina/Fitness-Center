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

  var stepSize;
  var currentIndex;
  var keyIndex;


  if (abonements) {
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

  function switchSlides(step, slides) {
    currentIndex = 0;
    keyIndex = step;
    stepSize = step;
    showSlide(slides, currentIndex, keyIndex);
  }


  function changeTrainersSlider() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      switchSlides(1, trainersItem, trainersLeft, trainersRight);
    } else if (window.matchMedia('(max-width: 1199px)').matches) {
      switchSlides(2, trainersItem, trainersLeft, trainersRight);
    } else {
      switchSlides(4, trainersItem, trainersLeft, trainersRight);
    }
  }

  if (trainers) {
    changeTrainersSlider();
    if (trainersLeft) {
      trainersLeft.classList.remove(('visually-hidden'));
      trainersLeft.addEventListener('click', function () {
        if (currentIndex > 0) {
          showSlide(reviewsItem, currentIndex -= stepSize, keyIndex -= stepSize);
        }
      });
    }

    if (trainersRight) {
      trainersRight.classList.remove(('visually-hidden'));
      trainersRight.addEventListener('click', function () {
        if (keyIndex < trainersItem.length) {
          showSlide(trainersItem, currentIndex += stepSize, keyIndex += stepSize);
        }
      });
    }
    window.addEventListener('resize', changeTrainersSlider);
  }

  if (reviews) {
    switchSlides(1, reviewsItem, reviewsLeft, reviewsRight);
    if (reviewsRight) {
      reviewsRight.classList.remove(('visually-hidden'));
      reviewsRight.addEventListener('click', function () {
        if (keyIndex < reviewsItem.length) {
          showSlide(reviewsItem, currentIndex += stepSize, keyIndex += stepSize);
        }
      });
    }

    if (reviewsLeft) {
      reviewsLeft.classList.remove(('visually-hidden'));
      reviewsLeft.addEventListener('click', function () {
        if (currentIndex > 0) {
          showSlide(reviewsItem, currentIndex -= stepSize, keyIndex -= stepSize);
        }
      });
    }
  }

  bannerBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    abonements.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

})();
