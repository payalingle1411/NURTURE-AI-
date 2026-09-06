/**
 * Simple browser-based activity/step estimator.
 *
 * This is an estimation algorithm.
 * It is NOT the phone's actual system step counter.
 *
 * It works only while the webpage is open and
 * device motion events are being received.
 */

let stepCount = 0;

let lastMagnitude = 0;
let lastStepTime = 0;

let peakDetected = false;

/*
 * Configuration
 */
const STEP_THRESHOLD = 2.2;

/*
 * Prevent counting the same movement multiple times.
 */
const MIN_STEP_INTERVAL = 300;

/*
 * Reset the activity tracker.
 */
export const resetActivityTracker = () => {
  stepCount = 0;
  lastMagnitude = 0;
  lastStepTime = 0;
  peakDetected = false;
};

/*
 * Process one device-motion event.
 */
export const processMotion = (motion) => {
  if (!motion) {
    return stepCount;
  }

  const magnitude = Number(
    motion.magnitude || 0
  );

  const now =
    Number(motion.timestamp) || Date.now();

  /*
   * Ignore the first sensor value.
   */
  if (lastMagnitude === 0) {
    lastMagnitude = magnitude;
    return stepCount;
  }

  /*
   * Difference between current and previous
   * acceleration magnitude.
   */
  const difference = Math.abs(
    magnitude - lastMagnitude
  );

  /*
   * Detect a movement peak.
   */
  if (difference > STEP_THRESHOLD) {
    peakDetected = true;
  }

  /*
   * Count one step after a detected movement
   * and enough time has passed since the previous step.
   */
  if (
    peakDetected &&
    now - lastStepTime >= MIN_STEP_INTERVAL
  ) {
    stepCount += 1;

    lastStepTime = now;

    peakDetected = false;
  }

  lastMagnitude = magnitude;

  return stepCount;
};

/*
 * Return current estimated steps.
 */
export const getStepCount = () => {
  return stepCount;
};