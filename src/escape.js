
class Escape {
    constructor(labyrinth) {
		this.labyrinth=labyrinth;
		this.startPosition=[0,1];
		this.currentPosition=this.startPosition;
		this.breadСrumbs=[];
		this.availableWays;
		this.labyrinthMap={};
		this.nextMove=null;
	}

	checkPass(posX,posY){
		if(posX<0||posY<0) 
			return false;
		return this.labyrinth[posY][posX]===0?true:false;
	}

	checkWays(){
		this.availableWays= {
				"top": this.checkPass(this.currentPosition[1],this.currentPosition[0]-1),
				"bottom": this.checkPass(this.currentPosition[1],this.currentPosition[0]+1),
				"left": this.checkPass(this.currentPosition[1]-1,this.currentPosition[0]),
				"right": this.checkPass(this.currentPosition[1]+1,this.currentPosition[0])
		};
		return this
	}


	checkMap(){
		let positionIndex=this.currentPosition.join(":");
		if(this.labyrinthMap[positionIndex]){
			this.availableWays=this.labyrinthMap[positionIndex];
		} else {
			this.checkWays();
			let prevPosition=this.breadСrumbs[0];
			if(prevPosition){
				this.availableWays[prevPosition.from]='back';
			}
		}
		return this
	}

	choseDirection(){
		for(let dir in this.availableWays){
			if(this.availableWays[dir]===true){
				this.nextMove=dir;
			}
		} 

		if(!this.nextMove){
			this.nextMove='back';
		}

		return this
	}

	makeMove(){
		let oppositeSide={
				'top'	:	'bottom',
				'bottom':	'top',
				'left'	: 	'right',
				'right'	: 	'left'
			},
			positionIndex=this.currentPosition.join(":"),
			breadСrumb={
				'from'	: 	oppositeSide[this.nextMove],
				'to'	: 	this.nextMove,
				'position' : 	positionIndex
			};

			this.breadСrumbs.unshift(breadСrumb);
			this.labyrinthMap[positionIndex]=this.availableWays;

			switch(this.nextMove) {
			  case 'top':  
			  	this.currentPosition[0]-=1;
			    break;
			  case 'bottom':  
			  	this.currentPosition[0]+=1;
			    break;
			  case 'left':  
			  	this.currentPosition[1]-=1;
			    break;
			  case 'right':  
			  	this.currentPosition[1]+=1;
			    break;

			  default:
			    
			    break
			}
			

		return this;
	}


	findeWayOut(){
		while(this.nextMove!='back'){
			this.nextMove=null;
			this.checkMap().choseDirection().makeMove();
		}
		
	}
	/*Need add method to backSteps if i go to the dead end*/

	
}

module.exports = Escape;
