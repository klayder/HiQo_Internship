const Escape = require('../src/escape.js');
const labyrinth=require('../src/labyrinth.json');



describe('Escape', () => {
    describe('Enter point', () => {
        const escape = new Escape(labyrinth.mainLabyrinth);

        it('Enter point must be on position x=1; y=0', () => {
            expect(escape.labyrinth[0][1]).to.equal(0);
        })
    });

    
});
