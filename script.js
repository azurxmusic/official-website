document.addEventListener('DOMContentLoaded', function() {
    const contactSection = document.querySelector('section:has(h3 > a[href="#"])');
    const nav = document.querySelector('.navbar');
    let isActive = false;
  
    const observer = new IntersectionObserver((entries) => {
      const contactEntry = entries[0];
      const contactBottom = contactEntry.boundingClientRect.bottom;
      const triggerPoint = window.innerHeight * 0.2;
  
      // Scrolling DOWN past trigger point
      if (contactBottom < triggerPoint && !isActive) {
        nav.classList.remove('hiding');
        nav.classList.add('visible');
        isActive = true;
      } 
      // Scrolling UP - contact re-enters viewport
      else if (contactEntry.boundingClientRect.top >= 0 && isActive) {
        nav.classList.add('hiding');
        setTimeout(() => {
          nav.classList.remove('visible', 'hiding');
        }, 400); // Match this with CSS transition time
        isActive = false;
      }
    }, {
      threshold: 0,
      rootMargin: "0px 0px -20% 0px"
    });
  
    if (contactSection) observer.observe(contactSection);
  });