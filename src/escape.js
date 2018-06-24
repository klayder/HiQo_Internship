
class Escape {
    constructor(labyrinth) {
		this.labyrinth=labyrinth;
		this.startPosition=[0,1];
		this.currentPosition=[0,1];
		this.breadСrumbs=[];
		this.availableWays;
		this.branchesCont;
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
		this.branchesCont=0;
		for(let dir in this.availableWays){
			if(this.availableWays[dir]===true){
				this.nextMove=dir;
				this.branchesCont++;
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
				'right'	: 	'left',
				'back'	: 	'dead end'
			},
			positionIndex=this.currentPosition.join(":"),
			breadСrumb={
				'from'	: 	oppositeSide[this.nextMove],
				'to'	: 	this.nextMove,
				'position' 	: 	positionIndex,
				'branch'	: 	this.branchesCont>1?true:false
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
			    this.goBack();
			    break
			}
			

		return this;
	}

	goBack(){
		let breadСrumb=this.breadСrumbs.shift();
		while(!breadСrumb.branch){
			breadСrumb=this.breadСrumbs.shift();
			if(this.breadСrumbs.length==0){
				breadСrumb.branch=true;
			}
		}
		this.labyrinthMap[breadСrumb.position][breadСrumb.to]='dead end';
		this.currentPosition=breadСrumb.position.split(":").map((item)=>{return +item});
	}


	findeWayOut(){
			this.checkMap().choseDirection().makeMove();
		while(this.currentPosition[0]!=this.labyrinth.length-1
			&&this.currentPosition[0]!=0
			&&this.currentPosition[1]!=this.labyrinth.length-1
			&&this.currentPosition[1]!=0){
					this.nextMove=null;
					this.checkMap().choseDirection().makeMove();

		}
		if(this.currentPosition.join(':')==this.startPosition.join(':')){
			console.log('No way out...');
		} else {
			console.log('I finde way out, you can use my map!');
			
		}

	}
}

module.exports = Escape;
