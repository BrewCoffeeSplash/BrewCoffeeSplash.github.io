

window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    e.prompt();
});

// document.getElementById("lightblue").body.style.backgroundImage = "/image/lightblue.jpg";
// document.getElementById("lightgold").body.style.backgroundImage = "/image/lightgold.jpg";

//1
// var button = document.getElementById("lightblue");
// var body = document.getElementsByTagName("body");

// button.getElementById("lightblue").addEventListener("click", function () {
//     body[0].style.backgroundImage = "url('/image/lightblue.jpg')"
// });

//2 Works
var button1 = document.getElementById("lightblue");
button1.addEventListener("click", function () {
    document.body.style.backgroundImage = "url(images/lightblue.jpg)";
});

var button1 = document.getElementById("lightgold");
button1.addEventListener("click", function () {
    document.body.style.backgroundImage = "url(images/lightgold.jpg)";
});

//3 Test a button
// document.getElementById("click").addEventListener("click", function () {
//     document.getElementById("pwainfo").innerHTML = "Hello World";
// });
// var button = document.getElementById("click");
// var body = document.getElementsByTagName("body");

// button.addEventListener("click", function () {
//     body[0].style.backgroundImage = "url('http://www.w3schools.com/css/trolltunga.jpg')"
// }); 

//4 Empty event listener example, DOMContententLoaded = click, etc
// document.addEventListener('DOMContentLoaded', function() {
//   // do stuff here

// }, false);





//onclick...issues
// function lightblue(){
//     body.style.backgroundImage = "url('/image/lightblue.jpg')"
// }


//push capabilities
(function () {
    function urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/')
            ;
        const rawData = window.atob(base64);
        return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
    }
    //push received or fail
    async function subscribeToPushNotifications(registration) {
        if ('pushManager' in registration) {
            const options = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U'),
            };

            const status = await pushStatus;

            if (status) {
                try {
                    const subscription = await registration.pushManager.subscribe(options);
                    //Received subscription
                } catch (e) {
                    console.error('Push registration failed', e);
                }
            }
        }
    }

    // push capabilities test
    const pushStatus = new Promise(resolve => {
        Notification.requestPermission(result => {
            const el = document.createElement('div');
            el.classList.add('push-info');

            // if (result !== 'granted') {
            //     el.classList.add('inactive');
            //     el.textContent = 'Push blocked';
            //     resolve(false);
            // } else {
            //     el.classList.add('active');
            //     el.textContent = 'Push active';
            //     resolve(true);
            // }

            // document.body.appendChild(el);
        });
    });

    //reg service worker w/ catch for fail
    async function registerServiceWorker() {
        try {
            const registration = await navigator.serviceWorker.register('service-worker.js');
            subscribeToPushNotifications(registration);
        } catch (e) {
            console.error('ServiceWorker failed', e);
        }
    }

    //reg service worker
    if ('serviceWorker' in navigator) {
        try {
            registerServiceWorker();
        } catch (e) {
            console.error(e);
        }
    }



})();
