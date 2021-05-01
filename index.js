import('https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.7.8/lottie.min.js').then(module => {

    let lottieArr =  document.querySelectorAll('sketro-animation');

    Array.from(lottieArr).map((dataEl,i)=>{

        let lottieId  = dataEl.getAttribute('id').split('-')[1];
        let lottieEl = document.querySelector(`#sketro-${lottieId}`);

        let iconMenu = lottie.loadAnimation({
            container: lottieEl, // the dom element that will contain the animation
            renderer: 'svg',
            loop: false,
            autoplay: false,
            path: `https://sketchdbmin.herokuapp.com/lottieCode/?id=${lottieId}` // the path to the animation json
        });

        let played = false;

        window.addEventListener('scroll',()=>{
     
            if (!played) {

                 if (isInViewport(lottieEl)) {
                    played = true;
                 
                    playAndLoop(iconMenu)
                }
            }

        })


        iconMenu.addEventListener('data_ready',()=> {
            if (isInViewport(lottieEl) ) {
                if (!played) {
            
                    played = true;
                    playAndLoop(iconMenu)
                }
            }
        });

    })


    function isInViewport(el) {
        let percentVisible = 80;
        let
            rect = el.getBoundingClientRect(),
            windowHeight = (window.innerHeight || document.documentElement.clientHeight);

        return !(
            Math.floor(100 - (((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100)) < percentVisible ||
            Math.floor(100 - ((rect.bottom - windowHeight) / rect.height) * 100) < percentVisible
        )
    };



   function playAndLoop(el) {

       el.playSegments([-30, 120], true);
       el.addEventListener('complete',()=>{
           el.playSegments([0, 120], true)
        });
}




});