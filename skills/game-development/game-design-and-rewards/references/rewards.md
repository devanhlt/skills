# Reward and progression design

## Source boundaries

Primary basis: Travis Day, *Rewards In Video Games*, slides 1-53. Supporting basis: Schell, chapter 11, printed pp. 188-194 and 203-205 (especially the Reward lens on printed p. 191).

Day provides four practitioner lessons: preserve established rewards; balance deterministic and random delivery; prioritize a powerful player fantasy; and be generous. The supplied document is a slide deck, not a book or a transcript. Game screenshots establish the examples shown, but do not establish exact historical drop rates, patch mechanics, or missing spoken explanations.

The models, math, migration patterns, test metrics, and worked designs below are this skill's extensions. Do not attribute them verbatim to Day or Schell.

## 1. Identify the reward's job

First name the desired experience: recognition of mastery, build experimentation, access to content, discovery, expression, social recognition, or visible progress. A reward need not be an item or currency. Schell discusses several forms, including praise, score, extended play, access, spectacle, expression, and power.

Describe the underlying activity's appeal. If the activity is uninteresting, more loot may mask the problem rather than solve it. Day's discussion of overjustification is a reason to examine how external incentives interact with existing motivation, not proof that rewards always damage enjoyment.

Record: behavior -> reward -> player interpretation -> resulting choice. If the reward is numerically valuable but players cannot identify its effect, improve legibility or relevance before raising its quantity.

## 2. Preserve established expectations

Source: Day slides 4-10; examples include Diablo III Paragon, Paragon 2.0, and WoW Legion's honor system. Slide 10 explicitly warns about rewards falling away from the player.

Before a change, establish:
- What players believe they have earned or can continue earning.
- Whether the change removes power, access, accumulation, status, or a familiar cadence.
- Which invested players are affected and what substitutes genuinely preserve value.

Possible migration approaches include grandfathering, a conversion, equivalent access, a transition period, or a clear opt-in reset. These are design options, not universal requirements or claims about those games' exact patches.

A nerf may still be necessary for fairness or system health. Explain the problem and compare the harm of retaining the old design with the harm of changing it. Compensation should be evaluated by usefulness and player interpretation, not nominal currency equivalence alone.

## 3. Choose certainty and surprise deliberately

Source: Day slides 11-27. Examples shown include WoW badge/vendor structures and Diablo III loot, auction-house, crafting, and Kadala interfaces. The slide sequence alone does not provide the complete causal history.

| Delivery | Strength | Risk | Useful when |
|---|---|---|---|
| Deterministic | Planning, agency, reliable progress | Becomes a checklist; loses surprise | Essential access, chosen build, limited sessions |
| Random | Discovery, memorable upside, varied outcomes | Long droughts, duplicates, loss of agency | Optional variation with acceptable failure cost |
| Hybrid | Reliable floor with unexpected upside | Added complexity; one channel can obsolete the other | Both progress and discovery are central goals |

Do not assume the right answer is always a hybrid. Guaranteed quest tools may require no RNG. A short replayable roguelike may intentionally make adaptation to random rewards central.

For randomness specify what is random: occurrence, category, identity, quality, affixes, or timing. Several stacked random gates can make a nominally common reward practically inaccessible.

Check eligibility, duplicates, trade, salvage, inventory limits, selection weighting, and information shown to players. Distinguish obtaining any reward from obtaining a useful reward and from obtaining one exact target.

## 4. Check the unlucky tail, not just the mean

These probability formulas are mathematical extensions. They assume independent attempts, constant useful-success probability p, and no changing loot pool or pity rule.

For 0 < p <= 1:
- Expected attempts to first useful success: 1/p.
- Probability of no useful success after n attempts: (1-p)^n.
- Probability of at least one useful success by n: 1-(1-p)^n.
- Attempts for cumulative probability q: ceil(log(1-q)/log(1-p)), for 0<p<1 and 0<q<1.

At a 10% useful-success chance, expected attempts are 10, but 34.9% of players still have no success after 10 attempts. Reaching at least 90% cumulative success takes 22 attempts. An expectation is not a guarantee.

If every eligible run instead gives one token and a chosen useful item costs 10 tokens, access is guaranteed by run 10 under those assumptions. Specify whether random success consumes tokens, whether token ownership persists, and whether the guarantee is per account, slot, or item. This is an illustrative design, not a recommended universal rate.

If attempts take t minutes, express time as well as attempts. State whether queues, losses, daily caps, and inventory management are included. For changing probabilities, use the actual sequence or a simulation and report its assumptions; do not reuse the constant-p formula.

## 5. Create a strong fantasy without breaking choice

Source: Day slides 28-38; WoW and Diablo III item evolution, Reaper of Souls, Legion artifacts and legendary items. Slides 33-34 emphasize fantasy-led brainstorming rather than only numerical strength.

Describe the moment the reward enables before choosing its stat budget. A reward might alter a movement pattern, support a new ability combination, change targeting, or make an identity visible. Numeric upgrades still matter, but avoid reducing every item to a single arithmetic comparison if build variety is a goal.

Distinguish feeling powerful from making every option mathematically superior. Check:
- Does the effect create a distinctive action or decision?
- What constraint or situation gives it a role?
- Can another build remain attractive?
- In PvP, can opponents perceive and respond to it?
- Can the feedback celebrate power without concealing outcomes?

A spectacular item that makes all future encounters trivial may undermine the very mastery experience it should celebrate. Use the actual game's goals to resolve that tension.

## 6. Be generous with access to the enjoyable experience

Source: Day slides 39-52. Examples include raid structures, world quests, Mythic+ dungeons, Reaper of Souls, Ancient items, and seasons. Slide 48 contrasts difficulty finding interesting items with pursuing better versions of items already owned. Slide 52 favors addressing problems of abundance over persistent frustration at exclusion.

Ask whether players can experience the defining build or fantasy soon enough to appreciate it. Distinguish first functional access, breadth of experimentation, and later optimization. Giving more unusable drops may add cleanup work without increasing useful generosity.

Choose optional longer-term goals appropriate to scope: mastery, alternative builds, collection, optimization, or replay variation. Do not add seasons, expiration, or infinite upgrades automatically. More layers can devalue achievements and raise maintenance costs.

## 7. Review together and test

A reward specification should state:
- Player goal, motivating activity, and success condition.
- Trigger, eligibility, ownership, delivery, and feedback.
- Reward identity and actual usefulness.
- Cadence, probabilities or guarantee, duplicates, and recovery.
- Spending/upgrade path and effects on other rewards.
- Existing-player migration when changing a live system.
- Unknowns and a small test that could disprove the design.

Useful observations: time to first useful reward; drought distribution; share of drops used; duplicate burden; build experimentation; comprehension of progress; perceived fairness; enjoyment before and after rewards. Measure what the design claims to improve. A long session or retention increase alone does not establish that the reward experience improved.
