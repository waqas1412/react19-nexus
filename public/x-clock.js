/**
 * Custom Element: <x-clock>
 * A web component that displays a live clock
 * Demonstrates React 19's improved Custom Elements support
 */

class XClock extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.intervalId = null;
  }

  connectedCallback() {
    this.render();
    this.startClock();
  }

  disconnectedCallback() {
    this.stopClock();
  }

  startClock() {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  stopClock() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    
    const timeElement = this.shadowRoot.querySelector('.time');
    const dateElement = this.shadowRoot.querySelector('.date');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: system-ui, -apple-system, sans-serif;
        }
        
        .clock-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .time {
          font-size: 48px;
          font-weight: bold;
          color: white;
          margin: 0;
          font-variant-numeric: tabular-nums;
        }
        
        .date {
          font-size: 18px;
          color: rgba(255, 255, 255, 0.9);
          margin: 8px 0 0 0;
        }
        
        .label {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.7);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 16px 0 0 0;
        }
      </style>
      
      <div class="clock-container">
        <p class="label">Current Time</p>
        <p class="time">--:--:--</p>
        <p class="date">--/--/----</p>
      </div>
    `;
  }
}

// Register the custom element
customElements.define('x-clock', XClock);
