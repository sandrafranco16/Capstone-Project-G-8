# Confirming assessment resets

With one or more in-memory answers, **Change pathway** and **Retake this pathway**
open a native modal dialog before resetting. **Keep my answers** or Escape closes
it without changing the pathway, question, result or answers, and returns focus
to the trigger. The keep action receives initial focus. Confirming runs the
original action once; the journey's existing heading-focus behavior follows.

With no answers, pathway changes proceed immediately. Normal answering, Back,
result review and individual answer editing do not show this dialog. No stored
draft, answer submission, unload prompt or scoring change is added.

DOM tests check the keep/confirm/Escape flows, result retention, focus and
unanswered bypass. The modal open/close API is stubbed in jsdom; actual browser
focus containment and phone layout require the browser checks tracked in #67.
