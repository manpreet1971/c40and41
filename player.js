class Player
{
    constructor()
    {
      this.index =null;
      this.distance=0;
      this.name=null;
      this.xPos=100;
    }

    getCount()
    {
      var playerCountRef=database.ref('playercount');
      playerCountRef.on("value",function (data) {
      playerCount= data.val() });
   
    }

    updateCount(playerCount)
    {
        database.ref('/').update({playercount:playerCount})
    }

    update(){
      var playerIndex="player"+this.index
      database.ref(playerIndex).set({name:this.name,distance:this.distance,xpos:this.xPos})
      console.log(playerIndex);
    }

    static getPlayerInfo(){
      var playerDataRef=database.ref('/')
      playerDataRef.on("value",data=>{
        allPlayers=data.val();
      })
      console.log(allPlayers)

    }
}