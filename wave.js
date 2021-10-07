export class Wave {
  constructor(color, speed, total, bottom, top) {
    this.color  = color;
    this.speed  = speed;
    this.total  = total;
    this.bottom = bottom;
    this.top    = top;
  }

  resize(seaWidth, seaHeight) {
    this.seaWidth   = seaWidth;
    this.seaHeight  = seaHeight;
  
  
    // #1
    this.point  = [];
    this.gap    = Math.ceil(this.seaWidth / (this.total - 2));

    for( let i = 0; i < this.total; i++ ) {
      this.point[i] = {
        x: i * this.gap,
        y: this.getY(this.bottom, this.top),
      };
    }
  }

  draw(ctx) {
    // #3
    ctx.fillStyle = this.color;
    ctx.beginPath();

    let cur   = this.point[0];
    let prev  = cur

    let dots  = [];

    // #3
    ctx.moveTo(cur.x, cur.y);

    let prevCx = cur.x;
    let prevCy = cur.y;

    for(let i = 0; i < this.point.length; i++) {
      cur = this.point[ i ];

      const cx = (prev.x + prev.x) / 2;
      const cy = (prev.y + prev.y) / 2;

      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy,
      });

      prev    = cur;
      prevCx  = cx;
      prevCy  = cy;
    }

    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(this.seaWidth, this.seaHeight);
    ctx.lineTo(this.point[ 0 ].x, this.seaHeight);
    ctx.fill();

    return dots;
  }

  getY( bottom, top ) {
    // #2
    const min = this.seaHeight * (1 - bottom);
    const max = this.seaHeight * top;
    return min - Math.random() * max;
  }
}