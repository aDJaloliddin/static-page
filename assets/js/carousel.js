$(document).ready(function () {
  const leftSwitchValuesinPercents = {
    1: 100,
    2: 50,
    4: 25,
  };

  const startLeftValuesInPercents = {
    1: 300,
    2: 100,
    4: 0,
  };

  const endLeftValuesInPercents = {
    1: 1600,
    2: 800,
    4: 400,
  };

  $(".carousel").each((index, carousel) => {
    startCarousel($(carousel));
  });

  function startCarousel($carousel) {
    // transition duration in seconds
    let transitionDuration = 0.5;

    // flag for control actions
    let isMoving = false;

    const $content = $($carousel.find(".carousel__content")[0]);
    let carouselInnerWidth = Number(
      $(".carousel__inner").css("width").slice(0, -2)
    );
    let carouselItemWidth = Number(
      $(".carousel__item").css("width").slice(0, -2)
    );

    let countItemsInASlide = carouselInnerWidth / carouselItemWidth;
    let countSlides = $content.children().length - countItemsInASlide + 1;

    $(window).on("resize", () => {
      carouselInnerWidth = Number(
        $(".carousel__inner").css("width").slice(0, -2)
      );
      carouselItemWidth = Number(
        $(".carousel__item").css("width").slice(0, -2)
      );

      countItemsInASlide = carouselInnerWidth / carouselItemWidth;
      countSlides = $content.children().length - countItemsInASlide + 1;

      left = 0;
      slide = 1;
      switchToNextSlide();
    });

    let left = 0;
    let slide = 1;

    // control next button click
    $($carousel.find(".carousel__control_type_next")[0]).on("click", () => {
      if (!isMoving) {
        isMoving = true;
        switchToNextSlide();
        setTimeout(() => {
          isMoving = false;
        }, transitionDuration * 1000);
      }
    });

    function switchToNextSlide() {
      if ($content.css("transition") === "none 0s ease 0s") {
        $content.css("transition", `left ${transitionDuration}s`);
      }

      if (slide < countSlides) {
        left += leftSwitchValuesinPercents[countItemsInASlide];
        $content.css("left", `-${left}%`);
        slide++;
      }

      if (slide === countSlides) {
        setTimeout(() => {
          $content
            .css("transition", "none")
            .css("left", `-${startLeftValuesInPercents[countItemsInASlide]}%`);
          slide =
            startLeftValuesInPercents[countItemsInASlide] /
              leftSwitchValuesinPercents[countItemsInASlide] +
            1;
          left = startLeftValuesInPercents[countItemsInASlide];
        }, transitionDuration * 1000);
        slide++;
      }
    }

    // control prev button click
    $($carousel.find(".carousel__control_type_prev")[0]).on("click", () => {
      if (!isMoving) {
        isMoving = true;
        switchToPrevSlide();
        setTimeout(() => {
          isMoving = false;
        }, transitionDuration * 1000);
      }
    });

    function switchToPrevSlide() {
      if ($content.css("transition") === "none 0s ease 0s") {
        $content.css("transition", `left ${transitionDuration}s`);
      }

      if (slide > 1) {
        left -= leftSwitchValuesinPercents[countItemsInASlide];
        $content.css("left", `-${left}%`);
        slide--;
      }

      if (slide === 1) {
        setTimeout(() => {
          $content
            .css("transition", "none")
            .css("left", `-${endLeftValuesInPercents[countItemsInASlide]}%`);
          slide = 17;
          left = endLeftValuesInPercents[countItemsInASlide];
        }, transitionDuration * 1000);
        slide--;
      }
    }

    // set animation
    setInterval(() => {
      if (!isMoving) {
        isMoving = true;
        switchToNextSlide();
        setTimeout(() => {
          isMoving = false;
        }, transitionDuration * 1000);
      }
    }, 5000);

    // Start carousel for better performance
    switchToNextSlide();
  }
});
