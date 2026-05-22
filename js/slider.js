function initSliders() {
    document.querySelectorAll('.slider').forEach(slider => {
        const slides = slider.querySelectorAll('.slider__slide, .slider__slide--inactive');
        const prevBtn = slider.querySelector('.slider__button--prev');
        const nextBtn = slider.querySelector('.slider__button--next');
        
        if (!prevBtn || !nextBtn || slides.length <= 1) return;
        
        let current = 0;
        
        function show(n) {
            slides.forEach((slide, i) => {
                if (i === n) {
                    slide.classList.remove('slider__slide--inactive');
                    slide.classList.add('slider__slide');
                } else {
                    slide.classList.remove('slider__slide');
                    slide.classList.add('slider__slide--inactive');
                }
            });
        }
        
        prevBtn.onclick = () => {
            current = (current - 1 + slides.length) % slides.length;
            show(current);
        };
        
        nextBtn.onclick = () => {
            current = (current + 1) % slides.length;
            show(current);
        };
        
        show(0);
    });
}

document.addEventListener('DOMContentLoaded', initSliders);