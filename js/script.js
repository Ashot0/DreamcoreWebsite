"use strict";

window.onload = function () {
	const parallax = document.querySelector('.parallax');
	if (parallax) {
		const content = document.querySelector('.parallax__container')
		const bg = document.querySelector('.images-parallax__bg')
		const eyes = document.querySelector('.images-parallax__eyes')
		const glass = document.querySelector('.images-parallax__glass')

		const forBg = 40;
		const forEyes = 20;
		const forGlass = 10;

		const speed = 0.05;

		let positionX = 0, positionY = 0;
		let coordXprocent = 0, coordYprocent = 0;


		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;
			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);
			bg.style.cssText = `transform: translate(${positionX / forBg}%, ${positionY / forBg}%);`;
			eyes.style.cssText = `transform: translate(${positionX / forEyes}%, ${positionY / forEyes}%);`;
			glass.style.cssText = `transform: translate(${positionX / forGlass}%, ${positionY / forGlass}%);`;
			requestAnimationFrame(setMouseParallaxStyle);
		}

		setMouseParallaxStyle();

		parallax.addEventListener("mousemove", function (e) {

			const parallaxWidth = parallax.offsetWidth;
			const parallaxHeight = parallax.offsetHeight;

			const coordX = e.pageX - parallaxWidth / 2;
			const coordY = e.pageY - parallaxHeight / 2;

			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});


		let thresholdSets = [];
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}
		const callback = function (entries, observer) {
			const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
			setParallaxItemsStyle(scrollTopProcent);
		};
		const observer = new IntersectionObserver(callback, {
			threshold: thresholdSets
		});

		observer.observe(document.querySelector('.content'))

		function setParallaxItemsStyle(scrollTopProcent) {
			content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
			eyes.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
			glass.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
		}
	}
}