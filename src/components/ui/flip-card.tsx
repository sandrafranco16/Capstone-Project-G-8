"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type Ref,
} from "react";

import { cn } from "@/lib/cn";

import styles from "./flip-card.module.css";

const FLIP_SPRING = { stiffness: 150, damping: 22, mass: 0.9 };
const TILT_SPRING = { stiffness: 240, damping: 24, mass: 0.6 };
const LIFT_SPRING = { stiffness: 320, damping: 26 };

type ToggleLabels = {
  /** Visible text on the toggle. */
  text: string;
  /** Accessible name, e.g. "Show Hemna Goyal's profile". */
  label: string;
};

export type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  showBack: ToggleLabels;
  showFront: ToggleLabels;
  /** Maximum hover tilt in degrees; 0 disables tilt and glare. */
  tiltMax?: number;
  className?: string;
};

/**
 * Two-sided card that turns on its vertical axis. Clicking anywhere on the card
 * flips it for pointer users; each face also has a real button for keyboard and
 * assistive-technology users, and focus follows the flip. Reduced-motion users
 * get a crossfade instead of a rotation.
 */
export function FlipCard({
  front,
  back,
  showBack,
  showFront,
  tiltMax = 5,
  className,
}: FlipCardProps) {
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const frontToggleRef = useRef<HTMLButtonElement>(null);
  const backToggleRef = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);

  const turn = useSpring(0, FLIP_SPRING);
  const tiltX = useSpring(0, TILT_SPRING);
  const tiltY = useSpring(0, TILT_SPRING);
  const lift = useSpring(1, LIFT_SPRING);
  const sheen = useSpring(0, LIFT_SPRING);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const rotateY = useTransform(() => turn.get() + tiltY.get());
  const transform = useMotionTemplate`perspective(1400px) scale(${lift}) rotateX(${tiltX}deg) rotateY(${rotateY}deg)`;
  const glareXPct = useMotionTemplate`${glareX}%`;
  const glareYPct = useMotionTemplate`${glareY}%`;

  useEffect(() => {
    turn.set(flipped ? 180 : 0);
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (flipped ? backToggleRef : frontToggleRef).current?.focus();
  }, [flipped, turn]);

  function toggle(fromKeyboard: boolean) {
    moveFocus.current =
      fromKeyboard ||
      rootRef.current?.contains(document.activeElement) === true;
    setFlipped((value) => !value);
  }

  function rest() {
    tiltX.set(0);
    tiltY.set(0);
    lift.set(1);
    sheen.set(0);
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || tiltMax === 0 || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    tiltX.set((0.5 - y) * 2 * tiltMax);
    tiltY.set((x - 0.5) * 2 * tiltMax);
    glareX.set(x * 100);
    glareY.set(y * 100);
    lift.set(1.015);
    sheen.set(1);
  }

  function onCardClick(event: MouseEvent<HTMLDivElement>) {
    // Links, buttons and text selection inside the card keep their own behaviour.
    if ((event.target as Element).closest("a, button")) return;
    if (window.getSelection()?.toString()) return;
    toggle(false);
  }

  const rotorStyle = reduceMotion
    ? undefined
    : ({
        transform,
        "--flip-glare-x": glareXPct,
        "--flip-glare-y": glareYPct,
        "--flip-sheen": sheen,
      } as MotionStyle);

  return (
    <div
      ref={rootRef}
      className={cn(styles.card, className)}
      data-flipped={flipped || undefined}
      data-fade={reduceMotion || undefined}
      onClick={onCardClick}
      onPointerMove={onPointerMove}
      onPointerLeave={rest}
    >
      <motion.div className={styles.rotor} style={rotorStyle}>
        <div
          className={cn(styles.face, styles.front)}
          aria-hidden={flipped}
          inert={flipped}
        >
          {front}
          <FlipToggle
            ref={frontToggleRef}
            labels={showBack}
            onToggle={toggle}
          />
          <span className={styles.glare} aria-hidden="true" />
        </div>
        <div
          className={cn(styles.face, styles.back)}
          aria-hidden={!flipped}
          inert={!flipped}
        >
          {back}
          <FlipToggle
            ref={backToggleRef}
            labels={showFront}
            onToggle={toggle}
          />
          <span className={styles.glare} aria-hidden="true" />
        </div>
      </motion.div>
    </div>
  );
}

function FlipToggle({
  ref,
  labels,
  onToggle,
}: {
  ref: Ref<HTMLButtonElement>;
  labels: ToggleLabels;
  onToggle: (fromKeyboard: boolean) => void;
}) {
  return (
    <button
      ref={ref}
      type="button"
      className={styles.toggle}
      aria-label={labels.label}
      // detail is 0 for Enter/Space activation, so focus should follow the flip.
      onClick={(event) => onToggle(event.detail === 0)}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M21 12a9 9 0 1 1-2.64-6.36" />
        <path d="M21 3v6h-6" />
      </svg>
      {labels.text}
    </button>
  );
}
