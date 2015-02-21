Router.map(function () {
    this.route('home', {
        path: '/home',
        template: 'home'
    });
    this.route('/', {
        path: '/',
        template: 'home'
    });

});

if (Meteor.isClient) {
 
}

if (Meteor.isServer) {
}