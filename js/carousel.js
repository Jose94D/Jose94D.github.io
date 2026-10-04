const LEGACY_TRACK_ID = 'img-track';

class ImageCarousel {
    constructor(container) {
        this.track = container.querySelector('.img-carousel-track');
        this.prevBtn = container.querySelector('.prev-btn');
        this.nextBtn = container.querySelector('.next-btn');
        this.slides = this.track.querySelectorAll('.project-screenshot');
        this.index = 0;

        this.prevBtn.addEventListener('click', () => this.goTo(this.index - 1));
        this.nextBtn.addEventListener('click', () => this.goTo(this.index + 1));
        this.render();
    }

    goTo(index) {
        const last = this.slides.length - 1;
        this.index = Math.min(Math.max(index, 0), last);
        this.render();
    }

    render() {
        this.track.style.transform = `translateX(-${this.index * 100}%)`;
        this.prevBtn.disabled = this.index === 0;
        this.nextBtn.disabled = this.index === this.slides.length - 1;
    }
}

document.querySelectorAll('.project-screenshot-container').forEach((container) => {
    if (container.querySelector(`#${LEGACY_TRACK_ID}`)) return;
    new ImageCarousel(container);
});