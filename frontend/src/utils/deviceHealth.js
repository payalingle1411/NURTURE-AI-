/**
 * Nurture AI - Browser Motion Sensor Helper
 *
 * Uses the browser DeviceMotion API.
 * This does NOT access the phone's system step counter.
 */

export const isMotionSupported = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return (
    window.isSecureContext &&
    "DeviceMotionEvent" in window
  );
};

export const requestMotionPermission = async () => {
  try {
    if (
      typeof window === "undefined" ||
      !window.isSecureContext
    ) {
      console.error(
        "Device motion requires HTTPS."
      );
      return false;
    }

    const MotionEvent = window.DeviceMotionEvent;

    if (!MotionEvent) {
      console.error(
        "DeviceMotionEvent is not available."
      );
      return false;
    }

    if (
      typeof MotionEvent.requestPermission ===
      "function"
    ) {
      const permission =
        await MotionEvent.requestPermission();

      console.log(
        "Motion permission:",
        permission
      );

      return permission === "granted";
    }

    return true;

  } catch (error) {
    console.error(
      "Motion permission error:",
      error
    );

    return false;
  }
};

export const startMotionTracking = (onMotion) => {
  if (
    typeof window === "undefined" ||
    !window.isSecureContext ||
    !("DeviceMotionEvent" in window)
  ) {
    console.error(
      "Device motion requires HTTPS."
    );

    return () => {};
  }

  const handleMotion = (event) => {
    const acceleration =
      event.accelerationIncludingGravity;

    if (!acceleration) {
      return;
    }

    const x = Number(acceleration.x ?? 0);
    const y = Number(acceleration.y ?? 0);
    const z = Number(acceleration.z ?? 0);

    const magnitude = Math.sqrt(
      x * x +
      y * y +
      z * z
    );

    onMotion({
      x,
      y,
      z,
      magnitude,
      timestamp: Date.now(),
    });
  };

  window.addEventListener(
    "devicemotion",
    handleMotion,
    {
      passive: true,
    }
  );

  console.log(
    "Device motion tracking started."
  );

  return () => {
    window.removeEventListener(
      "devicemotion",
      handleMotion
    );

    console.log(
      "Device motion tracking stopped."
    );
  };
};