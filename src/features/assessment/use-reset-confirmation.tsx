"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { JourneyAction } from "./journey";
import styles from "./reset-confirmation.module.css";

/** Preserve in-memory answers until a visitor confirms a destructive reset. */
export function useResetConfirmation(
  hasAnswers: boolean,
  onAction: (action: JourneyAction) => void,
) {
  const [pending, setPending] = useState<JourneyAction | null>(null);
  const trigger = useRef<HTMLElement | null>(null);

  function requestAction(action: JourneyAction) {
    if (
      hasAnswers &&
      (action.type === "restart" || action.type === "pathway")
    ) {
      trigger.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;
      setPending(action);
    } else {
      onAction(action);
    }
  }

  return {
    requestAction,
    confirmation: pending ? (
      <ResetConfirmation
        restart={pending.type === "restart"}
        onConfirm={() => {
          setPending(null);
          onAction(pending);
        }}
        onCancel={() => {
          setPending(null);
          trigger.current?.focus();
        }}
      />
    ) : null,
  };
}

function ResetConfirmation({
  restart,
  onConfirm,
  onCancel,
}: {
  restart: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const element = dialog.current;
    element?.showModal();
    cancel.current?.focus();
    return () => {
      if (element?.open) element.close();
    };
  }, []);

  function close(action: () => void) {
    dialog.current?.close();
    action();
  }

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      onCancel={(event) => {
        event.preventDefault();
        close(onCancel);
      }}
    >
      <h2 id={`${id}-title`}>Clear your answers?</h2>
      <p id={`${id}-description`}>
        {restart ? "Restarting this assessment" : "Changing pathway"} will clear
        your answers. You can keep them and continue where you left off.
      </p>
      <div className={styles.actions}>
        <button ref={cancel} type="button" onClick={() => close(onCancel)}>
          Keep my answers
        </button>
        <button
          className={styles.confirm}
          type="button"
          onClick={() => close(onConfirm)}
        >
          {restart
            ? "Restart and clear answers"
            : "Change pathway and clear answers"}
        </button>
      </div>
    </dialog>
  );
}
