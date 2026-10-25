# Mechanics, balance, and economies

Source basis: Schell, chapters 10-12; printed pp. 129-219, particularly pp. 136-150, 171-205. The specification and analysis tables are applied synthesis.

## Model mechanics before tuning numbers

Describe space; objects; their attributes and states; actions; rules; skill demands; and chance. Separate the actions available at the input level from the strategies that emerge from combinations of actions.

For a feature, a compact state model often suffices:

| Field | Specify |
|---|---|
| Starting state | What must already be true? |
| Information | What does each player know? What remains hidden? |
| Action | What can the player intentionally choose? |
| Cost | Resources, risk, time, opportunity cost |
| Transition | What changes, in what order? |
| Outcome | Success, failure, partial result, or cancellation |
| Feedback | How does the player understand the result? |
| Next choice | What meaningful decision becomes available? |

Do not hide a rules problem behind improved presentation. Conversely, do not rebalance a system when players simply cannot understand its current state.

## Meaningful choices

Inspect the options players actually consider. A list of options is not evidence of strategic depth.
- Dominance: Is one choice better across the situations that matter?
- Context: Can changing circumstances make a different choice appropriate?
- Information: Can players understand enough to evaluate the tradeoff?
- Consequence: Does the choice change something they care about?
- Timing: Is there time to decide, given the intended skill test?

Tradeoffs can involve safety versus reward, immediate versus future value, specialization versus flexibility, or certainty versus upside. These are examples, not a requirement to add all four.

## Balance serves the experience

Schell examines fairness, challenge, choice, skill/chance, mental/physical demands, competition/cooperation, duration, rewards, punishments, freedom, complexity, and imagination/detail. Select the dimensions involved in the actual problem.

Fairness does not require identical roles. Asymmetric options need useful situations, readable strengths and weaknesses, and appropriate responses. PvE power fantasy and competitive PvP have different constraints.

Avoid treating difficulty as a single number. Inspect mastery demands, feedback, failure cost, information, and recovery. A confusing interface can look like high difficulty without creating interesting challenge.

Prefer interaction-driven depth over multiplying exceptions. An exception can be worthwhile when it creates meaningful outcomes; document its learning and implementation cost.

## Tune with a model

Write the relationship you expect, expose relevant parameters, and compare prediction with observation. Change one causal hypothesis at a time when practical.

Schell discusses doubling/halving as a way to find a perceptible range quickly (printed pp. 201-202). Use large changes in isolated prototypes where appropriate, then narrow the range. It is not a recommendation to double live prices or remove half of established player value without evaluating consequences.

An average can conceal the problem: inspect beginners versus experts, solo versus groups, different builds, and unlucky players. Use actual telemetry when supplied; otherwise propose measurements.

## Economy review

Map creation, acquisition, storage, transfer, spending, and removal of each relevant resource. The ledger below extends the book's economy discussion into a practical review.

| Resource | Sources | Uses/removal | Transfer rules | Capacity/expiry | Player purpose |
|---|---|---|---|---|---|
| Example: crafting shards | Salvage, milestones | Crafting and upgrades | Bound to account | No expiry assumed | Agency over a chosen build |

Check whether rewards have useful destinations and whether earning/spending choices are meaningful. Look for stockpiling, compulsory chores, obsolete rewards, unintended bypasses, collusion, and inflation. Do not add sinks solely to consume excess currency; tie costs to an experience goal.

Evaluate an item in context: a small upgrade to a frequently used ability can matter more than a large improvement to an irrelevant statistic. Purchasing power, time saved, and build usefulness are separate forms of value.

## Punishment and recovery

Make the cause and avoidability of losses understandable. Compare the intended tension with the cost of retrying. Consider whether a positive incentive could achieve the desired behavior with less frustration. Preserve intentional stakes in games whose experience depends on risk.

## Puzzle review

Check whether players understand the goal, can begin experimenting, recognize progress, and encounter a learnable increase in challenge. Distinguish a missing clue from a genuinely interesting deduction. Hints can preserve progress without revealing the entire solution. A puzzle's answer should feel justified by the information available.
