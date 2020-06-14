window.addEventListener('load', ()=>{
	if(window.innerWidth < 780){
		/* navbar animation */
		const burgerBtn = document.querySelector('.burger-btn')
		const nav = document.querySelector('.nav')
		let collapsed = true
		burgerBtn.addEventListener('click', ()=>{
			if(collapsed){
				nav.style.height = "auto"
				collapsed = !collapsed
			}else {
				nav.style.height = "7vh"
				collapsed = !collapsed
			}
		})

		const links = document.querySelectorAll('.menu-link')
		links.forEach(link => {
			link.addEventListener('click', ()=>{
				nav.style.height = "7vh"
			})
		})
	}

})