// .on is a listener which will keep listening to the gamestate from the database.
//when the gamestate is changed in the database,the function  passed as an argument to it is excuted.
//  here the function is directily written inside the .on() listener;

//"/" refers to the main database inside which the gameState is created.
//  value is an event when fired callback function will be excuted.
//callback will have reference to the data snapshot of the data of the node being referd by ref.
// val() is a function which extractes the value from the snapshot which is of gamestate and
// will be fetched and stored in our game variable i.e gameState.
class Game {
   constructor() { }
   // this function will read the database from the backend

   getState() {
      var gameStateRef = database.ref('gamestate');
      gameStateRef.on("value", function (data) {
         gameState = data.val();
      });

   }
   async start() {

      if (gameState == 0) {
         player = new Player();
         var playerCountRef = await database.ref('playercount').once("value");

         if (playerCountRef.exists()) {
            player.getCount();
         }
         form = new Form();
         form.display();
      }
      car1 = createSprite(300, 500);
      car1.addImage(carImg1);
      car2 = createSprite(500, 500);
      car2.addImage(carImg2);
      car3 = createSprite(700, 500);
      car3.addImage(carImg3);
      car4 = createSprite(900, 500);
      car4.addImage(carImg4);
      cars = [car1, car2, car3, car4];
   }

   play() {
      form.disappear();
      textSize(32);
      text("gameStart", 100, 100);
      //var xpos=150////chk this...remove

      Player.getPlayerInfo();
      background("black");                                             // give background
      if (allPlayers !== undefined) {

         image(trackImg, 0, -displayHeight * 4, displayWidth, displayHeight * 5);

         for (var i = 1; i <= playerCount; i++) {
            var playerIndex = "player" + i;
            x = allPlayers[playerIndex].xpos;                                ///chk
            y = displayHeight - allPlayers[playerIndex].distance;

            console.log(y)
            cars[i - 1].y = y;
            cars[i - 1].x = x;

            if (i === player.index) {

               // background("black")
               push();
               // cars[i-1].shapeColor="red"
               fill("red")
               text(allPlayers[playerIndex].name, cars[i - 1].x, cars[i - 1].y + 100);
               pop();
               camera.position.x = displayWidth / 2
               camera.position.y = cars[i - 1].y;

            } else {
               push();
               fill("yellow")
               textSize(20);
               text(allPlayers[playerIndex].name, cars[i - 1].x, cars[i - 1].y + 100);
               pop()
            }
         }
      }
      if (finish == false) {

         if (keyDown(UP_ARROW)) {
            player.distance += 50;
            player.update();
         }
         if (keyDown(LEFT_ARROW)) {
            player.xPos -= 5;
            player.update();
         }
         if (keyDown(RIGHT_ARROW)) {
            player.xPos += 5;
            player.update();
         }
      }
      if (player.distance > displayHeight * 5 - 80) {
         finish = true;

      }
   }
   //update function will update the gameState in the database to
   // a value passed to it inside the ()
   update(state) {
      database.ref('/').update({ gamestate: state })
      gameState = state;
   }

   end() {
      text("Play Again", displayWidth / 2, displayHeight / 2 + 500);
      /// reset();
      form.appear(); //chk
   }
}


// WE need to give xpositions to all the players in form and read them inngame.js
// And adjust track image height ...mult by 5 ie increase it to adjust
