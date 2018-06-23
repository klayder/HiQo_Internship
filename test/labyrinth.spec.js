const Escape = require('../src/escape.js');
const labyrinth=require('../src/labyrinth.json');



describe('Escape', () => {
    describe('Enter point', () => {
        const escape = new Escape(labyrinth.mainLabyrinth);
        
        it('Enter point must be on position x=1; y=0', () => {
            expect(escape.labyrinth[0][1]).to.equal(0);
        })
    });

    describe('Check Pass', () => {
        const escape = new Escape(labyrinth.mainLabyrinth);
        	
        it('Must return true on position 1,0', () => {
            expect(escape.checkPass(1,0)).to.equal(true);
        })
        it('Must return false on position 0,0', () => {
            expect(escape.checkPass(0,0)).to.equal(false);
        })
        it('Must return true on position 1,1', () => {
            expect(escape.checkPass(1,1)).to.equal(true);
        })
        it('Must return false on position 2,2', () => {
            expect(escape.checkPass(2,2)).to.equal(false);
        })
       
    });

    describe('Check ways', () => {
        const escape = new Escape(labyrinth.mainLabyrinth);
        	escape.checkWays();
        it(`Can i go UP from position ${escape.currentPosition}
        	Must return 'false'`, () => {
            expect(escape.availableWays.top).to.equal(false);
        })
        it(`Can i go BOTTOM from position ${escape.currentPosition}
        	Must return 'true'`, () => {
            expect(escape.availableWays.bottom).to.equal(true);
        })
        it(`Can i go left from position ${escape.currentPosition}
        	Must return 'false'`, () => {
            expect(escape.availableWays.left).to.equal(false);
        })
        it(`Can i go right from position ${escape.currentPosition}
        	Must return 'false'`, () => {
            expect(escape.availableWays.right).to.equal(false);
        })
    });

    describe('Chose Dir', () => {
        const escape = new Escape(labyrinth.mainLabyrinth);

        	console.log(escape.currentPosition);
        	escape.currentPosition=[13,27];
        	escape.checkMap().choseDirection();
        	//escape.findeWayOut();
        	console.log(escape.breadСrumbs);
        	console.dir(escape.availableWays);
        	console.log(escape.currentPosition);
        	
       
        it('Must be bottom', () => {
            expect(escape.nextMove).to.equal('right');
        })
       
        
        
        
    });



    
});
