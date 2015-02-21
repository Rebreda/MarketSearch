Router.map(function () {
    this.route('jsonData', {
        where: "server",
        path: '/json',
        action: function () {
            var obj = {
                cat: 'meow',
                dog: 'woof'
            };
            var headers = {
                'Content-type': 'application/json'
            };
            this.response.writeHead(200, headers);
            this.response.end(JSON.stringify(obj));
        }
    });
    this.route('home', {
        path: '/home',
        template: 'home'
    });
    this.route('/', {
        path: '/',
        template: 'home'
    });

});

Values = new Mongo.Collection("values");
if (Meteor.isClient) {
    Meteor.subscribe("values");

    Template.values.helpers({
        values: function () {
            return Values.find({}, {
                sort: {
                    createdAt: -1
                }
            });
        }
    });

    Template.profile.helpers({
        myUser: function () {
            return getUserInfo(this.owner);
        }
    });

    Template.input.events({
        "submit .data": function (e) {
            var text = e.target.text.value;
            Meteor.call("addValue", text);
            e.target.text.value = "";
            return false;
        }
    });
    Template.profile.helpers({
        post: function () {
            return Users.findOne(Session.get('selectedPostId'));
        }
    });
}

if (Meteor.isServer) {
    Meteor.publish("users");

}