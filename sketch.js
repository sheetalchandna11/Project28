const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var bodies = [];
let boy, boyimage;

function preload() {
	boyimage = loadImage("boy.png");
}

function setup() {
	createCanvas(1600, 700);

	engine = Engine.create();
	world = engine.world;

	boy = createSprite(200, 620);
	boy.addImage("boy", boyimage);
	boy.scale = 0.1;

	//Create the Bodies Here.
	ground = new Ground(width / 2, height, width, 50);
	bodies.push(ground);

	wallR = new Ground(1600, height / 2, 50, height);
	bodies.push(wallR)

	wallL = new Ground(0, height / 2, 50, height);
	bodies.push(wallL)

	topWall = new Ground(width / 2, 0, width, 50);
	bodies.push(topWall)

	tree = new Tree(width / 2, 400);
	bodies.push(tree);

	stone = new Stone(150, 560);
	bodies.push(stone);

	launcher = new Launcher(stone.body, { x: 150, y: 567.5 });
	bodies.push(launcher);

	mango1 = new Mango(850, 140);
	bodies.push(mango1);

	mango2 = new Mango(575 + 180, 315);
	bodies.push(mango2);

	mango3 = new Mango(640 + 180, 190);
	bodies.push(mango3);

	mango4 = new Mango(570 + 180, 200);
	bodies.push(mango4);

	mango5 = new Mango(675 + 180, 270);
	bodies.push(mango5);

	mango6 = new Mango(485 + 180, 310);
	bodies.push(mango6);

	Engine.run(engine);
}


function draw() {
	rectMode(CENTER);
	background("lightblue");

	textSize(25);
	fill("black")
	text("Drag the stone to shoot!!", 200, height / 4);
	text("Press 'R' key to reset the stone!!", 200, 200);

	drawSprites();

	for (let i = 0; i < bodies.length; i++) {
		bodies[i].display();
	}

	detectColission(stone, mango1);
	detectColission(stone, mango2);
	detectColission(stone, mango3);
	detectColission(stone, mango4);
	detectColission(stone, mango5);
	detectColission(stone, mango6);

}

function keyPressed() {
	if (key == 'r') {
		Body.setPosition(stone.body, { x: 150, y: 560 });
		launcher.attach(stone.body);
	}
}


function mouseDragged() {
	if (launcher.constraint.bodyA)
		Body.setPosition(stone.body, { x: mouseX, y: mouseY });
}

function mouseReleased() {
	launcher.fly();
}

function detectColission(stone, mango) {
	let distance = dist(stone.body.position.x, stone.body.position.y, mango.body.position.x, mango.body.position.y);
	console.log(stone.radius);
	if (distance <= stone.radius + mango.radius) {
		Body.setStatic(mango.body, false);
	}
}