document.addEventListener('DOMContentLoaded', function() {
            // Video va taomlar navigatsiyasi
            const foodItems = document.querySelectorAll('.food-item');
            const mainVideo = document.getElementById('mainVideo');
            const videoTitle = document.getElementById('videoTitle');
            
            foodItems.forEach(item => {
                item.addEventListener('click', function() {
                    // Faol elementni o'zgartirish
                    document.querySelector('.food-item.active').classList.remove('active');
                    this.classList.add('active');
                    
                    // Yangi video manbasini olish
                    const newVideoSrc = this.getAttribute('data-video');
                    const newTitle = this.getAttribute('data-title');
                    
                    // Video o'zgarish animatsiyasi
                    mainVideo.style.opacity = '0';
                    
                    setTimeout(() => {
                        mainVideo.src = newVideoSrc;
                        mainVideo.load();
                        mainVideo.play();
                        videoTitle.textContent = newTitle;
                        mainVideo.style.opacity = '1';
                    }, 500);
                });
            });
            
            // Kontakt formasi
            const contactForm = document.getElementById('contactForm');
            const successAlert = document.getElementById('successAlert');
            const errorAlert = document.getElementById('errorAlert');
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const name = document.getElementById('name').value;
                const phone = document.getElementById('phone').value;
                const message = document.getElementById('message').value;
                
                // Telegram bot orqali yuborish
                const botToken = '7953468031:AAFkePTW1W2-9orzIxZJWvvB4FPatjhRhQk'; // O'z bot tokeningizni qo'ying
                const chatId = '7445142075'; // O'z chat IDingizni qo'ying
                const text = `Yangi xabar:\nIsm🧍‍♂️: ${name}\nTelefon📞: ${phone}\nXabar💬: ${message}`;
                
                fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: text
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.ok) {
                        // Muvaffaqiyatli yuborildi
                        successAlert.style.display = 'block';
                        errorAlert.style.display = 'none';
                        contactForm.reset();
                        
                        // 5 soniyadan keyin xabarni yashirish
                        setTimeout(() => {
                            successAlert.style.display = 'none';
                        }, 5000);
                    } else {
                        // Xatolik yuz berdi
                        errorAlert.style.display = 'block';
                        successAlert.style.display = 'none';
                        
                        // 5 soniyadan keyin xabarni yashirish
                        setTimeout(() => {
                            errorAlert.style.display = 'none';
                        }, 5000);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    errorAlert.style.display = 'block';
                    successAlert.style.display = 'none';
                    
                    // 5 soniyadan keyin xabarni yashirish
                    setTimeout(() => {
                        errorAlert.style.display = 'none';
                    }, 5000);
                });
            });
            
            // Smooth scrolling
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                });
            });
        });