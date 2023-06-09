const html = document.querySelector('html');
const body = document.querySelector('body');
const inner = document.querySelector('.inner');

window.onload = () => {
  // HEADER
  let header = document.querySelector('.header');
  if (header) {
    function headerFix() {
      if (document.body.scrollTop >= 20 || document.documentElement.scrollTop >= 20) {
        header.classList.add('--scroll');
      }
      else {
        header.classList.remove('--scroll');
      }
    }
    headerFix();
    document.addEventListener('scroll', headerFix);
  }

  // ANCHORE
  const smoothLinks = document.querySelectorAll('a[href^="#"]');

  for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
      e.preventDefault();

      const id = smoothLink.getAttribute('href');

      document.querySelector(id).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }

  // SIDE-PANEL
  let sidePanel = document.querySelector('.side-panel');
  let sidePanelClose = document.querySelector('.side-panel__close');

  if (sidePanel) {
    sidePanelClose.addEventListener('click', () => {
      sidePanel.classList.add('--closed');
    })
  }

  // CHECK
  class Check {
    static addError(element, message) {
      element.classList.add(Check.classError);

      if (message) {
        element.querySelector('.check__message').innerText = message;
      }
    }

    constructor(element) {
      this.element = element;
      this.input = this.element.input = this.element.querySelector('.check__input');
      this.type = this.input.type;
      this.checkChecked();
      this.onClick();

      this.element.input = this.input;
    }

    onClick() {
      this.element.addEventListener('click', (event) => {
        this.element.classList.remove('--error');
        if (event.target.closest('[data-popup]') || this.element.classList.contains('--disabled')) {
          return false;
        }
        if (this.type == 'checkbox') {
          this.element.classList.toggle('--checked');
          this.checked = this.input.getAttribute('checked');

          if (this.checked) {
            this.input.removeAttribute('checked');
          } else {
            this.input.setAttribute('checked', 'checked');
          }

        } else if (this.type == 'radio') {
          if (this.element.closest('--checked')) {
            return false;
          }

          this.name = this.input.name;
          let parent = this.element.closest('.checks') ? this.element.closest('.checks') : this.element.closest('form') ? this.element.closest('form') : document.body;
          let radios = parent.querySelectorAll('.check input[type="radio"][name="' + this.name + '"]');
          radios.forEach(radio => {
            radio.removeAttribute('checked');
            radio.closest('.check').classList.remove('--checked');
          });
          this.element.classList.add('--checked');
          this.input.setAttribute('checked', 'checked');
        }
      });
    }

    checkChecked() {
      if (this.input.getAttribute('checked')) {
        this.element.classList.add('--checked');
      }
    }
  }

  // CHECK INIT
  let checks = document.querySelectorAll('.check');
  if (checks) {
    checks.forEach((check) => {
      new Check(check);
    });
  }

  // FANCYBOX SETUP
  Fancybox.bind("[data-fancybox]", {
    defaultDisplay: 'flex',
    dragToClose: false,
    autoFocus: false,
  });

  // GALLERY SLIDER
  let gallerySlider = document.querySelector('.gallery__slider');
  if (gallerySlider) {
    let gallerySliderSwiper = new Swiper(gallerySlider, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      speed: 900,
      navigation: {
        prevEl: '.gallery__slider-arrow.swiper-button-prev',
        nextEl: '.gallery__slider-arrow.swiper-button-next',
      },
      pagination: {
        el: '.gallery__slider-pagination.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {

        1025: {
          spaceBetween: 76,
          slidesOffsetBefore: -100,
          centeredSlides: true,
          initialSlide: 1,
        },
      }
    });
  }

  // REVIEWS SLIDER
  let reviewsSlider = document.querySelector('.reviews__slider');
  if (reviewsSlider) {
    let reviewsSliderSwiper = new Swiper(reviewsSlider, {
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 900,
      navigation: {
        prevEl: '.reviews__slider-arrow.swiper-button-prev',
        nextEl: '.reviews__slider-arrow.swiper-button-next',
      },
      pagination: {
        el: '.reviews__slider-pagination.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1025: {
          slidesPerView: 3,
          spaceBetween: 30,
          centeredSlides: true,
          initialSlide: 1,
        },
      }
    });
  }

  // QUIZ
  class Quiz {
    currentStep = null
    currentIndex = null
    classStepActive = '--active'

    constructor(element) {
      this.element = element

      if (!this.element) return false

      this.steps = this.element.querySelectorAll('.quiz__step')
      this.nextBtns = this.element.querySelectorAll('.quiz__btn-next')
      this.prevBtns = this.element.querySelectorAll('.quiz__btn-prev')

      const firstStep = this.steps[0]
      this.setCurrentStep(firstStep, 0)

      for (const button of this.nextBtns) {
        button.addEventListener('click', () => {
          this.goNextStep()
        })
      }

      for (const button of this.prevBtns) {
        button.addEventListener('click', () => {
          this.goPrevStep()
        })
      }
    }

    goNextStep() {
      const nextIndex = this.currentIndex + 1
      const nextStep = this.steps[nextIndex]

      this.removeCurrentStep()

      if (nextStep) {
        this.setCurrentStep(nextStep, nextIndex)
      }
    }

    goPrevStep() {
      const prevIndex = this.currentIndex - 1
      const prevStep = this.steps[prevIndex]

      if (prevIndex != null) {
        this.removeCurrentStep()
        this.setCurrentStep(prevStep, prevIndex)
      }
    }

    setCurrentStep(step, index) {
      this.currentStep = step
      this.currentIndex = index

      this.currentStep.classList.add(this.classStepActive)
    }

    removeCurrentStep() {
      this.currentStep.classList.remove(this.classStepActive)
    }
  }

  new Quiz(document.querySelector('.quiz'))

  // MAP
  let map = document.querySelector('#map');
  if (map && ymaps) {
    ymaps.ready(mapInit);

    function mapInit() {
      let mapPosition, mapPlaceholder;

      mapPosition = map.getAttribute('data-map');
      mapPosition = mapPosition.split(',');

      for (let i = 0; i < mapPosition.length; i++) {
        mapPosition[i] = Number(mapPosition[i]);
      }

      mapPlaceholder = map.getAttribute('data-map');
      mapPlaceholder = mapPlaceholder.split(',');

      let ymap = new ymaps.Map(map, {
        center: [mapPosition[0], mapPosition[1]],
        controls: [],
        zoom: 16,
      });

      let placemark = new ymaps.Placemark(mapPlaceholder, {
      }, {
        iconLayout: 'default#image',
        iconImageHref: '_/uploads/icons/placemark.svg',
        iconImageSize: [36, 52],
      }, {});
      ymap.geoObjects.add(placemark);

      ymap.behaviors.disable('scrollZoom');

      function setMapPostion() {
        let dw = window.innerWidth;

        if (dw >= 1281) {
          ymap.setCenter([mapPosition[0], mapPosition[1] - -0.004]);
        } else if (dw <= 1280 && dw >= 1025) {
          ymap.setCenter([mapPosition[0], mapPosition[1] - -0.005]);
        } else if (dw <= 1024 && dw >= 768) {
          ymap.setCenter([mapPosition[0] - 0.002, mapPosition[1] - -0.003]);
        } else if (dw <= 767) {
          ymap.setCenter([mapPosition[0] - 0.002, mapPosition[1]]);
        } else {
          ymap.setCenter(mapPosition);
        }
      }

      setMapPostion();
      window.addEventListener('resize', () => {
        setMapPostion();
      });
    }
  }

  // VALIDATOR
  let fields = document.querySelectorAll('.field');
  fields.forEach((field) => {
    field.wrap = field.querySelector('.field__wrap');
    field.area = field.querySelector('.field__area');

    field.addEventListener('focusin', () => {
      field.classList.remove('--error');
    })

    if (field.classList.contains('--name')) {
      field.area.addEventListener('input', () => {
        field.area.value = field.area.value.replace(/[^\D]/g, '');
      });

    } else if (field.classList.contains('--tel')) {
      field.area.mask = IMask(field.area, {
        mask: '+{7} (000) 000-00-00',
        lazy: true
      });
      field.area.addEventListener('focusin', () => {
        field.area.mask.updateOptions({
          lazy: false
        })
      });
      field.area.addEventListener('focusout', () => {
        field.area.mask.updateOptions({
          lazy: true
        })
      })
    } {
      field.area.addEventListener('field', () => {
      });
    }
  });

  let validateForms = document.querySelectorAll('form');
  let modalThanks = document.getElementById('modal-thanks');

  if (validateForms) {
    validateForms.forEach((form) => {
      let btnSubmit = form.querySelector('.btn-submit');
      let fieldsRequired = form.querySelectorAll('.field.--required');
      let popupModalForm = form.querySelector('.modal__form');
      let popupSendOkAttr = form.getAttribute('data-message-ok');

      btnSubmit.addEventListener('click', (event) => {
        let errors = 0;

        if (fieldsRequired.length > 0) {
          fieldsRequired.forEach((field) => {
            let value = field.area.value;

            if (field.classList.contains('--name')) {
              if (value.length < 2) {
                errors++;
                field.classList.add('--error');
              } else {
                field.classList.remove('--error');
              }
            }

            if (field.classList.contains('--tel')) {
              if (value.length < 18) {
                errors++;
                field.classList.add('--error');
              } else {
                field.classList.remove('--error');
              }
            }
          })
        }

        if (errors == 0) {
          let xhr = new XMLHttpRequest();
          let formData = new FormData(form);
          xhr.open('POST', 'order.php');
          xhr.send(formData);

          xhr.onload = function () {
            Fancybox.close();

            Fancybox.show([{
              src: '#modal-thanks',
              type: 'inline'
            }]);

          }
          event.preventDefault();

        } else {
          event.preventDefault();
        }
      })
    })
  }
}