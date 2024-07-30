const scrollToSections = (optionsData, targetSelector) => {
	const links = document.querySelectorAll(targetSelector || 'a[href^="#"]')
	const { block, behavior, inline } = optionsData
	const options = {
		block: block || 'start',
		behavior: behavior || 'smooth',
		inline: inline || 'nearest' 
	}
links.forEach(link => {
	link.addEventListener('click', evt => {
		evt.preventDefault()
		const targetSectionSelector = link.getAttribute('href')

		if (targetSectionSelector !== '#') {
			const targetSection = document.querySelector(targetSectionSelector)
			targetSection.scrollIntoView(options)
		}else {
			console.warn('Секция: ' + '"' + link.textContent + '"' + ' не найдена')
		}
	})
})}
scrollToSections({
	behavior: 'smooth',
	block: 'start',
	inline: 'center'
})
const runparticipantsSlider = () => {
	const participantsSlider = document.querySelector('.participants__slider')
	const participantsSliderWrap = document.querySelector('.participants__slider-wrap')
	const participantsSliderItems = document.querySelectorAll('.participants__item')
	const participantsPrevbutton = document.querySelector('.participants__button--prev')
	const participantsNextbutton = document.querySelector('.participants__button--next')
	const participantsCurrent = document.querySelector('.participants__buttons-text-active')
	const participantsAll = document.querySelector('.participants__buttons-text')
	let participantsCurrentLine = 0
	let participantsCurrentSlide = 1
	const renderdate = () => {
		participantsCurrent.textContent = participantsCurrentSlide
		participantsAll.textContent = participantsSliderItems.length
	}
	const driveSlides = (where) => {
		const slideWidth = participantsSliderItems[0].offsetWidth + 20
		if (where === 'prev') {
			if (participantsCurrentSlide > 1) {
				participantsCurrentSlide--
				participantsCurrentLine -= slideWidth
				participantsSliderWrap.style.cssText = `transform: translateX(-${participantsCurrentLine}px)`
			}
		}
		if (where === 'next') {
			if (participantsCurrentSlide < participantsSliderItems.length) {
				participantsCurrentSlide++
				participantsCurrentLine += slideWidth
				participantsSliderWrap.style.cssText = `transform: translateX(-${participantsCurrentLine}px)`
			}
			if (participantsCurrentSlide === participantsSliderItems.length) {
				participantsCurrentLine = 0
				participantsCurrentSlide = 0
				renderdate()
				driveSlides('next')
			}
		}
		renderdate()
	}
	participantsPrevbutton.addEventListener('click', () => {
		driveSlides('prev')
	})
	participantsNextbutton.addEventListener('click', () => {
		driveSlides('next')
	})
	renderdate()
	setInterval(() => {driveSlides('next')}, 4000)
}
runparticipantsSlider()
const runStagesSlider = () => {
	const stagesSlider = document.querySelector('.stages__slider')
	const stagesList = document.querySelector('.stages__list')
	const stagesListItems = document.querySelectorAll('.stages__list-item')
	const prevbutton = document.querySelector('.stages__button--prev')
	const nextbutton = document.querySelector('.stages__button--next')
	const stagesPaginationsEl = document.querySelector('.stages__paginations')
	const quantity = Math.floor(stagesList.scrollWidth / stagesListItems[0].offsetWidth)
	stagesPaginationsEl.textContent = ''
	let stagesCurrentLine = 0
	let stagesCurrentSlide = 0
	const renderPagination = () => {
		const quantity = Math.floor(stagesList.scrollWidth / stagesListItems[0].offsetWidth)
		stagesPaginationsEl.textContent = ''
		for (let i = 0; i < quantity; i++) {
			const item = document.createElement('div')
			item.classList.add('stages__paginations-item')

			stagesPaginationsEl.insertAdjacentElement('beforeend',item)
		}
		const paginationsItems = document.querySelectorAll('.stages__paginations-item')
		for (let i = 0 ; i < paginationsItems.length; i++) {
			paginationsItems[i].classList.remove('stages__paginations-item--active')
			if (i === stagesCurrentSlide) {
				paginationsItems[i].classList.add('stages__paginations-item--active')
			}
		}
	}
	const driveSlides = (where) => {
		const slideWidth = stagesListItems[0].offsetWidth
		prevbutton.classList.remove('button--disabled')
		nextbutton.classList.remove('button--disabled')
		if (where === 'prev') {
			if (stagesCurrentSlide > 0) {
				stagesCurrentSlide--
				stagesCurrentLine -= slideWidth
				stagesList.style.cssText = `transform: translateX(-${stagesCurrentLine}px)`
			} else {
				prevbutton.classList.add('button--disabled')
				stagesCurrentSlide = 0
			}
		}
		if (where === 'next') {
			if (stagesCurrentSlide < quantity - 1) {
				stagesCurrentSlide++
				stagesCurrentLine += slideWidth
				stagesList.style.cssText = `transform: translateX(-${stagesCurrentLine}px)`
			} else {
				nextbutton.classList.add('button--disabled')
			}
			if (stagesCurrentSlide === stagesListItems.length) {
				stagesCurrentLine = 0
				stagesCurrentSlide = 0
				renderPagination()
				driveSlides('next')
			}
		}
		renderPagination()
	}
	prevbutton.addEventListener('click', () => {
		driveSlides('prev')
	})
	nextbutton.addEventListener('click', () => {
		driveSlides('next')
	})
	driveSlides('prev')
	renderPagination()
}
runStagesSlider()
