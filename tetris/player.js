class Player
{
    constructor()
    {
    this.pos = {x: 0, y:0};
    this.matrix = null;
    this.score = 0;
    }

    move(dir) 
    {
        this.pos.x += dir;
        if (collide(arena, this)) {
            this.pos.x -= dir;
        }
    }

    rotate(dir) 
    {
        const pos = this.pos.x;
        let offset = 1;
        rotate(this.matrix, dir);
        while (collide(arena, this)) {
            this.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.matrix[0].length) {
                rotate(this.matrix, -dir);
                this.pos.x = pos;
                return;
            }
        }
    }

    drop() 
    {
        this.pos.y++;
        if (collide(arena, this)) {
            this.pos.y--;
            merge(arena, this);
            playerReset();
            arenaSweep();
            updateScore();
        }
        dropCounter = 0;
    }

    dropBottom() 
    {
        while ((collide(arena, this) === false)) {
            this.pos.y++;
        }
            this.pos.y--;
            merge(arena, this);
            playerReset();
            arenaSweep();
            updateScore();
        
        dropCounter = 0;
    }


}

    
