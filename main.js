let menu = document.querySelector('#menu-icon');
	let navbar = document.querySelector('.navbar');
	 
	menu.onclick = () => {
	    navbar.classList.toggle('active');
	}
	 
	window.onscroll = () => {
	    navbar.classList.remove('active');
	}

	document.addEventListener("DOMContentLoaded", () => {
		const images = document.querySelectorAll('.shop-image img, .box-image img');
	
		images.forEach((image) => {
			image.addEventListener('click', () => {
				const enlargeImage = document.createElement('div');
				enlargeImage.classList.add('enlarge-image');
				enlargeImage.style.position = 'fixed';
				enlargeImage.style.background = 'rgba(255, 255, 255, 0.9)';
				enlargeImage.style.backdropFilter = 'blur(10px)';
				enlargeImage.style.padding = '20px';
				enlargeImage.style.display = 'flex';
				enlargeImage.style.flexDirection = 'row';
				enlargeImage.style.alignItems = 'flex-start';
				enlargeImage.style.justifyContent = 'center';
				enlargeImage.style.top = '0';
				enlargeImage.style.left = '0';
				enlargeImage.style.width = '100vw';
				enlargeImage.style.height = '100vh';
				enlargeImage.style.zIndex = '1000';
	
				const closeButton = document.createElement('button');
				closeButton.textContent = '×';
				closeButton.style.position = 'absolute';
				closeButton.style.top = '20px';
				closeButton.style.right = '20px';
				closeButton.style.background = 'rgba(0, 0, 0, 0.5)';
				closeButton.style.color = '#fff';
				closeButton.style.borderRadius = '50%';
				closeButton.style.width = '40px';
				closeButton.style.height = '40px';
				closeButton.style.display = 'flex';
				closeButton.style.alignItems = 'center';
				closeButton.style.justifyContent = 'center';
				closeButton.style.fontSize = '24px';
				closeButton.style.cursor = 'pointer';
				enlargeImage.appendChild(closeButton);
	
				const imgContainer = document.createElement('div');
				imgContainer.style.width = '50%';
				imgContainer.style.marginRight = '20px';
	
				const enlargedImg = document.createElement('img');
				enlargedImg.src = image.src;
				enlargedImg.style.width = '100%';
				enlargedImg.style.height = 'auto';
				enlargedImg.style.objectFit = 'contain';
				imgContainer.appendChild(enlargedImg);
				enlargeImage.appendChild(imgContainer);
	
				const infoContainer = document.createElement('div');
				infoContainer.style.width = '50%';
				infoContainer.style.padding = '10px';
	
				const imageInfo = image.closest('.shopbox, .box');
				if (!imageInfo) return;
	
				const titleText = imageInfo.querySelector('h3')?.textContent || 'No title';
				const priceText = imageInfo.querySelector('span')?.textContent || 'No price';
				const descriptionText = imageInfo.getAttribute('data-description') || 'No description available.';
	
				const title = document.createElement('h2');
				title.textContent = titleText;
				title.style.marginBottom = '1rem';
	
				const price = document.createElement('p');
	price.textContent = `Price: ${priceText}`;  // Use backticks for template literals
	price.style.marginBottom = '1rem';
	
	const description = document.createElement('p');
	description.textContent = `Description: ${descriptionText}`;  // Use backticks for template literals
	description.style.marginBottom = '1rem';
	
				// Add "Buy Now" button
				const buyNowButton = document.createElement('button');
				buyNowButton.textContent = 'Buy Now';
				buyNowButton.style.padding = '10px 20px';
				buyNowButton.style.backgroundColor = '#4caf50';
				buyNowButton.style.color = 'white';
				buyNowButton.style.border = 'none';
				buyNowButton.style.borderRadius = '5px';
				buyNowButton.style.cursor = 'pointer';
				buyNowButton.style.fontSize = '16px';
				buyNowButton.addEventListener('click', () => {
					const itemDetails = { title: titleText, price: priceText, imageSrc: image.src };
					localStorage.setItem('selectedItem', JSON.stringify(itemDetails));
					window.location.href = 'payment.html';
				});
	
				infoContainer.appendChild(title);
				infoContainer.appendChild(price);
				infoContainer.appendChild(description);
				infoContainer.appendChild(buyNowButton);
				enlargeImage.appendChild(infoContainer);
	
				document.body.appendChild(enlargeImage);
	
				const closeModal = () => {
					enlargeImage.remove();
					document.removeEventListener('keydown', handleEscapeKey);
				};
	
				const handleEscapeKey = (e) => {
					if (e.key === 'Escape') closeModal();
				};
	
				document.addEventListener('keydown', handleEscapeKey);
				closeButton.addEventListener('click', closeModal);
				enlargeImage.addEventListener('click', (e) => {
					if (e.target === enlargeImage) closeModal();
				});
			});
		});
	
		// Cart logic
		const cartButtons = document.querySelectorAll('.bx-cart');
	
		cartButtons.forEach((button) => {
			button.addEventListener('click', (event) => {
				const shopBox = event.target.closest('.box, .shopbox');
				const title = shopBox.querySelector('h3')?.textContent || 'No title';
				const price = shopBox.querySelector('span')?.textContent || 'No price';
				const imageSrc = shopBox.querySelector('img')?.src || '';
	
				let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
				if (cartItems.some((item) => item.title === title)) {
					alert('This item is already in the cart.');
					return;
				}
	
				const cartItem = { title, price, imageSrc };
				cartItems.push(cartItem);
				localStorage.setItem('cartItems', JSON.stringify(cartItems));
	
				const existingPopup = document.querySelector('.cart-popup');
				if (existingPopup) existingPopup.remove();
	
				const popup = document.createElement('div');
				popup.classList.add('cart-popup');
				popup.textContent = 'Successfully added to cart';
				popup.style.position = 'fixed';
				popup.style.bottom = '20px';
				popup.style.right = '20px';
				popup.style.padding = '10px 20px';
				popup.style.backgroundColor = '#4caf50';
				popup.style.color = '#fff';
				popup.style.borderRadius = '5px';
				popup.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
				popup.style.zIndex = '1000';
				popup.style.fontSize = '16px';
	
				document.body.appendChild(popup);
	
				setTimeout(() => {
					popup.remove();
				}, 3000);
			});
		});
	});