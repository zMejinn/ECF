function animateSVG() {
    new Vivus('animated-circle', { duration: 200 }, function (obj) {
      obj.el.classList.add('finished');
      
      setTimeout(function(){
        obj.reset().play();
      }, 10000); 
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    animateSVG(); 
  });
  