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

  var bannerBtn = document.querySelector('.banner__content a');

  var abonements = document.querySelector('.abonements');
  var abonementsDuration = document.querySelectorAll('.abonements__duration-item');
  var abonementsLists = document.querySelectorAll('.abonements__list');
  var inputTel = document.querySelector('#tel-field');

  var stepSize;
  var currentIndex;
  var keyIndex;

  var currentIndexReviews;
  var keyIndexReviews;

  var xDown = null;
  var yDown = null;
  var maxHeight = 0;

  if (abonements) {
    abonementsDuration.forEach(function (element) {
      element.addEventListener('click', function (evt) {
        evt.preventDefault();
        changeAbonements(evt);
      });

      element.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 13) {
          evt.preventDefault();
          changeAbonements(evt);
        }
      });
    });
  }

  function changeAbonements(evt) {
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
  }

  function onSlidesHandler(slides, current, key) {
    for (var j = 0; j < slides.length; j++) {
      slides[j].style.display = 'none';
    }

    for (var i = current; i < key; i++) {
      if (slides[i]) {
        slides[i].style.display = 'flex';
      }
    }
  }

  function switchSlidesTrainers(step, slides) {
    currentIndex = 0;
    keyIndex = step;
    stepSize = step;
    onSlidesHandler(slides, currentIndex, keyIndex);
  }


  function changeTrainersSlider() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      switchSlidesTrainers(1, trainersItem, trainersLeft, trainersRight);
    } else if (window.matchMedia('(max-width: 1199px)').matches) {
      switchSlidesTrainers(2, trainersItem, trainersLeft, trainersRight);
    } else {
      switchSlidesTrainers(4, trainersItem, trainersLeft, trainersRight);
    }
  }

  if (trainers) {
    changeTrainersSlider();
    if (trainersLeft) {
      trainersLeft.classList.remove(('visually-hidden'));
      trainersLeft.addEventListener('click', function () {
        if (currentIndex > 0) {
          onSlidesHandler(trainersItem, currentIndex -= stepSize, keyIndex -= stepSize);
        }
      });
    }

    if (trainersRight) {
      trainersRight.classList.remove(('visually-hidden'));
      trainersRight.addEventListener('click', function () {
        if (keyIndex < trainersItem.length) {
          onSlidesHandler(trainersItem, currentIndex += stepSize, keyIndex += stepSize);
        }
      });
    }
    window.addEventListener('resize', changeTrainersSlider);
  }

  function changeReviewsSlides(step, slides) {
    currentIndexReviews = 0;
    keyIndexReviews = step;
    onSlidesHandler(slides, currentIndexReviews, keyIndexReviews);
  }

  if (reviews) {
    changeReviewsSlides(1, reviewsItem, reviewsLeft, reviewsRight);
    if (reviewsRight) {
      reviewsRight.classList.remove(('visually-hidden'));
      reviewsRight.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (keyIndexReviews < reviewsItem.length) {
          onSlidesHandler(reviewsItem, currentIndexReviews += 1, keyIndexReviews += 1);
        }
      });
    }

    if (reviewsLeft) {
      reviewsLeft.classList.remove(('visually-hidden'));
      reviewsLeft.addEventListener('click', function (evt) {
        evt.preventDefault();
        if (currentIndexReviews > 0) {
          onSlidesHandler(reviewsItem, currentIndexReviews -= 1, keyIndexReviews -= 1);
        }
      });
    }
  }

  trainers.addEventListener('touchstart', handleTouchStart, false);
  trainers.addEventListener('touchmove', handleTouchMoveTrainers, false);

  reviews.addEventListener('touchstart', handleTouchStart, false);
  reviews.addEventListener('touchmove', handleTouchMoveReviews, false);

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
  }

  function handleTouchMoveTrainers(evt) {
    if (!xDown || !yDown) {
      return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        if (currentIndex > 0) {
          onSlidesHandler(trainersItem, currentIndex -= 1, keyIndex -= 1);
        }
      } else {
        if (keyIndex < trainersItem.length) {
          onSlidesHandler(trainersItem, currentIndex += 1, keyIndex += 1);
        }
      }
    }
    xDown = null;
    yDown = null;
  }

  function handleTouchMoveReviews(evt) {
    if (!xDown || !yDown) {
      return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        if (currentIndex > 0) {
          onSlidesHandler(reviewsItem, currentIndex -= 1, keyIndex -= 1);
        }
      } else {
        if (keyIndex < reviewsItem.length) {
          onSlidesHandler(reviewsItem, currentIndex += 1, keyIndex += 1);
        }
      }
    }
    xDown = null;
    yDown = null;
  }

  bannerBtn.addEventListener('click', function (evt) {
    evt.preventDefault();
    abonements.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });

  function adjustSlider() {
    if (reviewsItem) {
      for (var i = 0; i < reviewsItem.length; i++) {
        if (maxHeight < reviewsItem[i].clientHeight) {
          maxHeight = reviewsItem[i].clientHeight;
        }
      }

      for (var j = 0; j < reviewsItem.length; j++) {
        reviewsItem[j].style.minHeight = maxHeight + 'px';
      }
    }
  }

  adjustSlider();

  /* eslint-disable no-undef */
  /* eslint-disable new-cap */

  IMask(inputTel, {mask: '+{7}(000)000-00-00'});
})();
