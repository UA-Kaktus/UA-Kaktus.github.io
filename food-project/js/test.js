// let counter = 1;
// function User(name, age) {
//     this.firstName = name;
//     this.secondName = 'Vladimir';
//     this.age = age;
//     this.counter = counter;

//     this.sayHello = function() {
//         console.log('Hello, friend');
//     };
//     counter = counter + 1;
// }

// const alex = new User('Alex', 25);
// const ivan = new User('Ivan', 27);

// class Box {
//     constructor(width, height, name) {
//         this.width = width;
//         this.height = height;
//         this.boxName = name;
//         this.color = '#fff';
//     }

//     calc() {
//         return this.width * this.height;
//     }
//     sayHello(text) {
//         console.log(`Name of this box is "${this.boxName}" and we are saying you "${text}"`);
//     }
// }
// class doubleBox extends Box {
//     constructor(width, height, name, owner){
//         super(width*2, height, 'Default box');
//         this.name = `My name is ${name}`;
//         this.owner = owner;
//     }
// }

// const alexsBox = new doubleBox(30, "Alex's box", 'Alex');
// const yuriiBox = new doubleBox(30, 15, 'Yurii', 'Yura');

function User(name, age) {
    this.name = name;
    this.city = 'Kharkiv';
    let userAge = age;

    this.say = function() {
        console.log(`i'm saying my name is "${this.name}" and i'm ${userAge} years old`);
    };
    hello = function() {
        console.log(`my name is ${userAge}`);
    };
}
let alex = new User('Alex', 22);
alex.say();