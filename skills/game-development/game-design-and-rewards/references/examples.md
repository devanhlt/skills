# Worked applications

These examples are original applications. Numbers are illustrative design assumptions, not extracted recommendations from the sources.

## Case 1: A useful drop that rarely arrives

Request: "Our PvE dungeon takes 20 minutes. Each clear has a 10% chance of a useful item. Players say they make no progress."

Diagnosis: Under independent constant-p attempts, expected time is 200 minutes, but about 34.9% of players still have no useful item after 200 minutes. Reaching 90% cumulative success requires 22 clears, or 440 minutes excluding queueing and failures. First confirm whether 10% means useful for the current build, rather than merely any item.

Proposal: Prototype a hybrid path. Give one persistent token per eligible clear; let 10 tokens purchase a selected useful item. Retain random drops as upside. In this example random drops do not consume accumulated tokens. This guarantees selected-item access by clear 10 for an eligible player who saves tokens; it also increases total supply and must be evaluated against progression goals.

Rules to settle: player eligibility; account versus character ownership; what qualifies for purchase; disconnect handling; duplicate salvage; trading; token persistence; interaction with existing balances.

Tradeoff: The guaranteed purchase reduces drought frustration but can make acquisition feel scheduled. Keep discovery meaningful through build options or optional variation rather than making the guaranteed item obsolete.

Test: Compare players' understanding of progress, time to a usable build, perceived fairness, duplicate burden, and interest in another run. Check new and advanced players separately. Do not conclude that a mathematical guarantee proves the dungeon is enjoyable.

Grounding: Day slides 11-27 and 39-52; Schell chapter 11. Token implementation and calculations are extensions.

## Case 2: A legendary that must feel powerful in PvP

Request: "Make a lightning sword feel overpowered without ruining ranked combat."

Proposal: Give it a recognizable chain-lightning opportunity rather than an unconditional damage advantage. For example, a charged strike arcs between tightly clustered opponents after a visible windup. Distinct sound and animation communicate the payoff. Spacing, interruption, or recovery timing supplies counterplay; exact rules depend on the combat system.

Why: A situational peak can support a strong fantasy while leaving room for other builds. Equalizing every item into a small damage modifier may preserve arithmetic similarity while losing identity.

Test: Observe whether users understand how to create the peak and opponents can identify a response. Compare performance by matchup and player skill, not aggregate win rate alone. Measure whether the sword crowds out other options. No damage or cooldown values are final without the actual model.

Grounding: Day slides 28-38; Schell chapters 10-11 and 13. Counterplay design is a synthesis, not a slide quote.

## Case 3: A live reward reduction

Request: "We need to remove an over-rewarding daily quest tomorrow."

Diagnosis: Separate unintended supply from the expectation players have formed. Identify what is being lost: currency, reliable progress, convenience, or access. Check the cost of leaving the quest unchanged and who is disproportionately affected by either decision.

Options: Rebalance future output while retaining earned balances; replace the quest with equivalent useful progress; or stage a transition if system health permits. Do not automatically preserve an exploitable loop indefinitely.

Deliverable: Before/after rules, affected cohorts, value comparison, communication points, migration rules, and observations that would trigger adjustment. Any compensation quantities remain assumptions until the economy is modeled.

Grounding: Day slides 4-10; Schell chapter 11. Specific transition mechanisms are extensions.

## Case 4: A vague new concept

Request: "Help me design a cozy exploration game with very little combat."

Assumption: A small single-player project with short sessions. First define the intended moment: noticing an unfamiliar landmark, choosing a route, making a discovery, and returning with a changed understanding of the place.

Small loop: observe -> choose a route -> navigate a light environmental obstacle -> discover something meaningful -> use the discovery to choose another destination. Rewards could be knowledge, access, expression, or relationships rather than random equipment.

Prototype: A small traversable map with two routes, recognizable landmarks, and one discovery that changes a later choice. Test whether people can choose intentionally, recognize the discovery's value, and explain why they want to continue. Do not add a battle pass or daily login reward to fix an unproven core loop.

Grounding: Schell chapters 2, 4, 7-9, 11, and 19.

## Compact feature specification

Use only fields that matter:

| Field | Content |
|---|---|
| Player experience | Desired feeling and meaningful behavior |
| Current problem | Observations separated from hypotheses |
| Entry conditions | Eligibility and relevant state |
| Rules | Trigger, action, cost, transition, outcome |
| Feedback | What communicates cause and consequence |
| Reward details | Usefulness, delivery, probability/guarantee, duplicates |
| Interactions | Challenge, other builds, economy, pacing, social effects |
| Migration | Treatment of existing progress if applicable |
| Unknowns | Assumptions that can change the recommendation |
| Test | Prototype, players, observations, revision criteria |
