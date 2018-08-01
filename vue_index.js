var main = new Vue ({
    el: '#main',
    methods: {
         buttonToToggle: function () {

            var button = document.getElementById('button');
            if (button.innerHTML == "Read More") {
                //        x.style.display = 'block';
                button.innerHTML = 'Read Less';
            } else {

                button.innerHTML = 'Read More';
            }
        }
    }
    
})