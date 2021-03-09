var dog,database,foodStock,foodS,fedTime,lastFed,foodObj

function preload(){
  dogimage = loadImage("images/dogImg1.png")
  dha = loadImage("images/dogImg.png")
}

function setup() {
  createCanvas(5000, 4000);
  database = firebase.database()
 
  foodStock = database.ref("Food")
  foodStock.on("value",readStock)

  dog = createSprite(450,250,20,20)
  dog.shapeColor = "red"
  dog.addImage("im",dha)
  dog.scale = 0.2
  foodObj = new Food()
  feed = createButton("feed Marshall")
  feed.position(450,95)
  feed.mousePressed(feedDog)

  addFood = createButton("add more food")
  addFood.position(350,95)
  addFood.mousePressed(addFoods)
 

}


function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
  drawSprites();
  fill("white")
  title = createElement('h2')
  title.html("Feed the dog")
  title.position(550,400)

  
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.x = 330

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
} 

//function to add food in stock
function addFoods(){
  foodS++;
  
  database.ref('/').update({
    Food:foodS
  })
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function writeStock(x){
  if(x<=0){
  x=0
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })

}
function feedDog(){
  dog.addImage(dha);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}


function addFoods(){
  foodObj.updateFoodStock
  foodS++;
  foodObj.display()
  database.ref('/').update({
    Food:foodS
  })
}

