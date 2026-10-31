# Shared date parser swaps day and month for day-first tenants

379 unique reports in ticket #4471 cover this cause, across 11 tenants, received from 2026-04-01 to 2026-10-04.

The shared parser assumes MM/DD/YYYY even where the tenant uses day-first dates. For example, report R-41200 from harbour.dental describes 7 April becoming 4 July.

Expected: interpret dates using the tenant's declared locale and explicit input contract. Actual: month-first parsing reverses ambiguous day/month values.

Reproduce with a day-first tenant through the app or email path, using 07/04/2026. Check that the resulting booking and invitation preserve 7 April. Include booking-v2 form coverage and unambiguous invalid-input handling.

Count method: uniqueById, filter mergedInto === 4471, join the tenant directory, then groupByCause. Intake labels are guesses: 356 were tagged parser and 23 hint. Five reports described as one-day moves remain in this group under the supplied classification; investigate their symptoms separately without inventing a third confirmed cause.

Acceptance: date interpretation follows the tenant's contract; regression coverage includes day-first and month-first tenants. Fixing this parser does not resolve the separate booking-v3 hint defect.
