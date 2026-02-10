import { useEffect, useCallback } from 'react';
import { onCLS, onINP, onLCP, Metric } from 'web-vitals';

/**
 * AnalyticsEvents Enum
 * Enforces consistent naming conventions for GA4 events across the application.
 */
export enum AnalyticsEvents {
  VIEW_ITEM = 'view_item',
  BEGIN_CHECKOUT = 'begin_checkout',
  ADD_TO_CART = 'add_to_cart',
  PURCHASE = 'purchase',
  SHARE_CONTENT = 'share',
  SEARCH = 'search',
  SIGN_UP = 'sign_up',
  LOGIN = 'login',
  GENERATE_LEAD = 'generate_lead',
  SELECT_CONTENT = 'select_content',
  PERFORMANCE_METRIC = 'performance_metric',
  EXCEPTION = 'exception'
}

export const useAnalytics = () => {
  // Determine environment for Debug Mode
  const isDev = process.env.NODE_ENV === 'development';

  /**
   * trackEvent
   * Sends a custom event to Google Analytics 4.
   */
  const trackEvent = useCallback((eventName: AnalyticsEvents, params?: Record<string, any>) => {
    // 1. Initialization Check
    if (typeof window === 'undefined' || !(window as any).gtag) {
      if (isDev) console.warn('GA4: window.gtag is not defined. Event not sent:', eventName);
      return;
    }

    // 5. Debug Mode Logging
    if (isDev) {
      console.groupCollapsed(`%c[Analytics] Event: ${eventName}`, 'color: #3b82f6; font-weight: bold;');
      console.log('Params:', params);
      console.groupEnd();
    }

    // Send event to GA4
    (window as any).gtag('event', eventName, params);
  }, [isDev]);

  /**
   * trackPageView
   * Manually updates the page path for Single Page Applications (SPAs).
   */
  const trackPageView = useCallback((url: string) => {
    if (typeof window === 'undefined' || !(window as any).gtag) {
      if (isDev) console.warn('GA4: window.gtag is not defined. Page view not sent:', url);
      return;
    }

    if (isDev) {
      console.log(`%c[Analytics] Page View: ${url}`, 'color: #10b981; font-weight: bold;');
    }

    // Retrieve Measurement ID from environment variables (Vite support)
    const measurementId = (import.meta as any).env?.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

    // Update config to trigger a page_view event with the new path
    (window as any).gtag('config', measurementId, {
      page_path: url,
    });
  }, [isDev]);

  /**
   * 4. Performance Tracking
   * Listens for Core Web Vitals (LCP, CLS, INP) and sends them as events.
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const sendToAnalytics = (metric: Metric) => {
      // GA4 standard 'value' parameter expects an integer.
      // CLS is usually a small decimal (e.g., 0.05), so we multiply by 1000 for better readability in standard reports.
      const value = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value);

      const params = {
        event_category: 'Web Vitals',
        event_label: metric.id, // Unique ID for this metric instance
        metric_name: metric.name,
        metric_value: metric.value, // Exact value sent as custom param
        metric_rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
        non_interaction: true, // Prevent this event from affecting bounce rate
        value: value 
      };

      if (isDev) {
        console.log(`%c[Analytics] Web Vital: ${metric.name}`, 'color: #f59e0b; font-weight: bold;', params);
      }

      if ((window as any).gtag) {
        (window as any).gtag('event', AnalyticsEvents.PERFORMANCE_METRIC, params);
      }
    };

    try {
      onCLS(sendToAnalytics);
      onINP(sendToAnalytics);
      onLCP(sendToAnalytics);
    } catch (err) {
      console.error('[Analytics] Failed to initialize web-vitals listeners', err);
    }
  }, [isDev]);

  return { trackEvent, trackPageView };
};