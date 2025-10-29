/**
 * Event Bus for Micro-Frontend Communication
 * Enables decoupled communication between features
 */

type EventCallback<T = unknown> = (data: T) => void;
type EventMap = Record<string, EventCallback[]>;

class EventBus {
  private events: EventMap = {};

  /**
   * Subscribe to an event
   */
  on<T = unknown>(event: string, callback: EventCallback<T>): () => void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback as EventCallback);

    // Return unsubscribe function
    return () => this.off(event, callback as EventCallback);
  }

  /**
   * Unsubscribe from an event
   */
  off(event: string, callback: EventCallback): void {
    if (!this.events[event]) return;
    
    this.events[event] = this.events[event].filter((cb) => cb !== callback);
    
    if (this.events[event].length === 0) {
      delete this.events[event];
    }
  }

  /**
   * Emit an event
   */
  emit<T = unknown>(event: string, data?: T): void {
    if (!this.events[event]) return;
    
    this.events[event].forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event handler for "${event}":`, error);
      }
    });
  }

  /**
   * Subscribe to an event once
   */
  once<T = unknown>(event: string, callback: EventCallback<T>): void {
    const onceCallback: EventCallback<T> = (data) => {
      callback(data);
      this.off(event, onceCallback as EventCallback);
    };
    
    this.on(event, onceCallback);
  }

  /**
   * Clear all event listeners
   */
  clear(): void {
    this.events = {};
  }

  /**
   * Get all registered events
   */
  getEvents(): string[] {
    return Object.keys(this.events);
  }
}

// Singleton instance
export const eventBus = new EventBus();

// Event types for type safety
export const Events = {
  TASK_CREATED: 'task:created',
  TASK_UPDATED: 'task:updated',
  TASK_DELETED: 'task:deleted',
  THEME_CHANGED: 'theme:changed',
  USER_ACTION: 'user:action',
} as const;

export type EventType = typeof Events[keyof typeof Events];
