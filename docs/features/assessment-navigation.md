# Assessment pathway URLs

`AssessmentNavigation` keeps the journey's selected pathway aligned with the
validated `path` query parameter. Selecting a pathway replaces the current URL
with its identifier; **Change pathway** removes that parameter. Other query
parameters and the fragment are preserved. Neither answers nor results are
written to the URL or storage.

The wrapper uses the [Next.js native history integration](https://nextjs.org/docs/app/getting-started/linking-and-navigating#native-history-api)
and `useSearchParams`. Replacing the current entry avoids creating a trail of
discarded assessments. URL changes and browser restoration select a fresh
journey; repeated or unknown `path` values show the chooser. A user-triggered
pathway change focuses the new question or chooser heading. Ordinary answers,
Back and result edits do not change the URL or remount the journey.

DOM tests cover pathway selection, unrelated parameters/fragments, direct and
invalid URLs, restored query state, focus and retained answers while the URL is
unchanged. The Next.js search-parameter subscription is mocked in these tests;
real-browser history and narrow-screen checks remain part of issue #67.
