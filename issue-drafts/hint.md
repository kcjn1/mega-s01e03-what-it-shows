# booking-v3 shows a month-first hint to day-first tenants

33 unique reports in ticket #4471 cover this cause, across 3 tenants, received from 2026-04-17 to 2026-09-22.

booking-v3 prints MM/DD/YYYY while its form interprets the value in the tenant's day-first convention. People follow the hint and their booking lands on a different date. Report R-41230 from copper.studio describes a client arriving on 1 June instead of 6 January.

Reproduce using a day-first tenant with booking-v3: follow MM/DD/YYYY and enter 01/06/2026 for 6 January. The day-first form interprets this as 1 June.

Expected: the hint, validation and parser agree with the tenant's locale and intended date. Actual: the hint instructs users to supply the opposite ordering.

Count method: uniqueById, filter mergedInto === 4471, join the tenant directory, then groupByCause. Of these 33 reports, intake tagged 15 parser and 18 hint. This cause was incorrectly merged into #4471 and has no ticket of its own in the export.

Acceptance: localize the hint to the form's actual input contract and verify round trips for day-first and month-first tenants. Test booking-v2 as well. Keep this ticket separate from the shared-parser defect.
