import React from "react";
import styles from "./PlayerControls.module.css";

export default function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  onReset,
  currentStep,
  totalSteps,
  speed,
  onSpeedChange,
  onRandomize,
  customInput,
  onCustomInputChange,
  onCustomInputSubmit,
  showCustomInput = true,
  inputPlaceholder = "e.g. 2, 5, 8, 12, 16",
  extraControls = null,
}) {
  const isFirstStep = currentStep <= 0;
  const isLastStep = currentStep >= totalSteps - 1;

  const speedOptions = [
    { label: "0.5x", value: 1600 },
    { label: "1x", value: 900 },
    { label: "1.5x", value: 500 },
    { label: "2x", value: 250 },
  ];

  return (
    <div className={styles.controlsWrapper}>
      <div className={styles.playbackRow}>
        {/* Playback action buttons */}
        <div className={styles.actionButtonGroup}>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onReset}
            title="Reset to beginning"
            aria-label="Reset"
          >
            ↺
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onPrev}
            disabled={isFirstStep}
            title="Previous step"
            aria-label="Previous step"
          >
            ⏮
          </button>
          <button
            type="button"
            className={`${styles.iconButton} ${styles.primaryPlayButton}`}
            onClick={onPlayPause}
            title={isPlaying ? "Pause" : "Play automatically"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <button
            type="button"
            className={styles.iconButton}
            onClick={onNext}
            disabled={isLastStep}
            title="Next step"
            aria-label="Next step"
          >
            ⏭
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className={styles.stepBadge}>
          <span className={styles.stepLabel}>Step</span>
          <span className={styles.stepValue}>
            {totalSteps === 0 ? 0 : currentStep + 1} / {totalSteps}
          </span>
        </div>

        {/* Speed Selector */}
        <div className={styles.speedSelector}>
          <span className={styles.controlLabel}>Speed:</span>
          <div className={styles.speedPills}>
            {speedOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                className={`${styles.speedPill} ${
                  speed === opt.value ? styles.speedPillActive : ""
                }`}
                onClick={() => onSpeedChange(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Randomize Generator */}
        {onRandomize && (
          <button
            type="button"
            className={styles.randomButton}
            onClick={onRandomize}
            title="Generate a new randomized array"
          >
            🎲 Randomize
          </button>
        )}
      </div>

      {/* Optional Custom Input & Extra Controls Row */}
      {(showCustomInput || extraControls) && (
        <div className={styles.customInputRow}>
          {showCustomInput && (
            <form
              className={styles.inputForm}
              onSubmit={(e) => {
                e.preventDefault();
                if (onCustomInputSubmit) onCustomInputSubmit();
              }}
            >
              <label htmlFor="algo-custom-input" className={styles.controlLabel}>
                Input Array:
              </label>
              <input
                id="algo-custom-input"
                type="text"
                className={styles.textInput}
                value={customInput}
                onChange={(e) => onCustomInputChange(e.target.value)}
                placeholder={inputPlaceholder}
              />
              <button type="submit" className={styles.applyButton}>
                Apply
              </button>
            </form>
          )}

          {extraControls && (
            <div className={styles.extraControlsContainer}>
              {extraControls}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
