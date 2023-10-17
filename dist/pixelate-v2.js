/**
 * Pixelate Class
 * This class provides methods to pixelate an image and reveal the original image on hover or click.
*/
class Pixelate {
    /**
     * Constructor initializes the pixelation process with the given element and options.
     * @param {HTMLImageElement} element - The image element to be pixelated.
     * @param {Object} options - Configuration options for pixelation.
     */
    constructor(element, options = {}) {
      this.element = element;
      this.options = { ...Pixelate.defaults, ...options };
      this.revealed = false;
      this.init();
    }
    
    /**
     * Default options for pixelation.
     */
    static get defaults() {
      return {
        value: 0.5,  // Adjust this value to control the default pixel size
        reveal: true,
        revealOnClick: false
      };
    }
  
    /**
     * Initializes the pixelation process, checks if the image is loaded and if the canvas is supported.
     */
    init() {
      if (!this.element.complete) {
        console.error('Image not loaded');
        return;
      }
  
      if (!document.createElement('canvas').getContext) {
        console.error('Canvas not supported');
        return;
      }
  
      this.createCanvas();
      this.addEventListeners();
      this.pixelate();
    }
    
     /**
     * Creates a canvas element, draws the pixelated image, and inserts the canvas into the DOM.
     */
     createCanvas() {
      const imgWidth = this.element.width;
      const imgHeight = this.element.height;
  
      this.canvas = document.createElement('canvas');
      this.canvas.width = imgWidth;
      this.canvas.height = imgHeight;
  
      this.ctx = this.canvas.getContext('2d');
      this.ctx.mozImageSmoothingEnabled = false;
      this.ctx.webkitImageSmoothingEnabled = false;
      this.ctx.imageSmoothingEnabled = false;
  
      const pixelatedWidth = imgWidth * this.options.value;
      const pixelatedHeight = imgHeight * this.options.value;
  
      this.ctx.drawImage(this.element, 0, 0, pixelatedWidth, pixelatedHeight);
      this.ctx.drawImage(this.canvas, 0, 0, pixelatedWidth, pixelatedHeight, 0, 0, imgWidth, imgHeight);
  
      this.element.style.display = 'none';
      this.element.parentNode.insertBefore(this.canvas, this.element);
  
      // Add this line to remove the original image element from the DOM
      this.element.parentNode.removeChild(this.element);
  }
  

    /**
     * Adds event listeners for revealing the image on click or hover.
     */
    addEventListeners() {
        if (this.options.revealOnClick) {
          this.canvas.addEventListener('click', () => this.toggleReveal());
        }
    
        if (this.options.reveal) {
          this.canvas.addEventListener('mousemove', (event) => this.reveal(event));
        }
      }
    
    /**
     * Toggles the state of the image between pixelated and revealed when clicked.
     */  
    toggleReveal() {
        if (this.revealed) {
            this.pixelate();
        } else {
            this.reveal();
        }
        this.revealed = !this.revealed;
    }

    /**
     * Reveals the original image pixel by pixel as the user hovers over the pixelated version.
     * @param {Event} event - The mousemove event.
     */
    reveal(event) {
        const imgWidth = this.element.width;
        const imgHeight = this.element.height;
        const pixelatedWidth = imgWidth * this.options.value;
        const pixelatedHeight = imgHeight * this.options.value;
    
        // Get the mouse position relative to the canvas
        const rect = this.canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
    
        // Calculate the area to reveal based on the mouse position
        const revealRadius = 20;  // Adjust the radius as needed
        const startX = Math.max(0, x - revealRadius);
        const startY = Math.max(0, y - revealRadius);
        const endX = Math.min(imgWidth, x + revealRadius);
        const endY = Math.min(imgHeight, y + revealRadius);
    
        // Draw the pixelated image first
        this.ctx.drawImage(this.element, 0, 0, pixelatedWidth, pixelatedHeight);
        this.ctx.drawImage(this.canvas, 0, 0, pixelatedWidth, pixelatedHeight, 0, 0, imgWidth, imgHeight);
    
        // Then overlay the revealed area on top of the pixelated image
        this.ctx.drawImage(this.element, startX, startY, endX - startX, endY - startY, startX, startY, endX - startX, endY - startY);
    }
    
    /**
     * Pixelates the image.
     */
    pixelate() {
        const imgWidth = this.element.width;
        const imgHeight = this.element.height;
        const pixelatedWidth = imgWidth * this.options.value;
        const pixelatedHeight = imgHeight * this.options.value;
    
        this.ctx.drawImage(this.element, 0, 0, pixelatedWidth, pixelatedHeight);
        this.ctx.drawImage(this.canvas, 0, 0, pixelatedWidth, pixelatedHeight, 0, 0, imgWidth, imgHeight);
    }
}
    
/**
 * Initializes the Pixelate class for each image with the data-pixelate attribute when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[data-pixelate]');
  images.forEach(img => {
      const pixelate = new Pixelate(img, {
          value: parseFloat(img.dataset.value),
          reveal: img.dataset.reveal === 'true',
          revealOnClick: img.dataset.revealOnClick === 'true'
      });
  
      if (pixelate.options.reveal) {
        img.addEventListener('mouseleave', () => pixelate.pixelate());
      }
    });
});