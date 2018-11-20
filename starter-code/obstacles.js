// Obstacles
class Obstacle {
    constructor (image, x, y, width, height, speed) {
        this.img = new Image(); 
        this.img.src = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
    }
}



// Borders/limits for the basket
