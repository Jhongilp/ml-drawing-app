class SketchPad {
  constructor(container, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
      background-color: white;
      box-shadow: 0 0 10px 2px black;
    `;
    container.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");

    this.paths = [];
    this.isDrawing = false;

    this.#addEventListeners();
  }

  #addEventListeners() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getMouse(evt);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    this.canvas.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.#getMouse(evt);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        console.log(this.paths);
        this.#redraw();
      }
    };

    this.canvas.onmouseup = () => {
      this.isDrawing = false;
    };
  }

  #redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);
  }

  #getMouse = (evt) => {
    const rect = this.canvas.getBoundingClientRect();
    return [
      Math.round(evt.clientX - rect.left),
      Math.round(evt.clientY - rect.top),
    ];
  };
}
