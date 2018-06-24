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

    describe('Can finde way out', () => {
        const	escape1 = new Escape(labyrinth.mainLabyrinth),
        		escape2 = new Escape(labyrinth.labyrinthWithoutExit);
        	
        		escape1.findeWayOut();
        		escape2.findeWayOut();
        
        it('Out position must be [30,5]', () => {
            expect(JSON.stringify(escape1.currentPosition)).to.equal(JSON.stringify([30,5]));
        })
        it('Curren position must be same like start position', () => {
            expect(JSON.stringify(escape2.currentPosition)).to.equal(JSON.stringify([0,1]));
        })
   });
});
