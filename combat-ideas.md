# Combat Ideas
The main intent for these ideas is to create a system that separates the concepts of *Accuracy and Damage* and *Evasive and Tough* into their own build opportunities, with different numerical representations that (largely speaking) bring the game roughly back where it needs to be.

Yes, this is largely a pointless endeavour.

[Click here](https://andrew-heath.github.io/) to go back to the main page.

## What issues do I have?
It's long been known that Casters in DnD 5e have long been far more powerful than their Martial counterparts. Not only can they simply deal more damage [(Adventuring Day Fallacy)][advDayFal], there are spells that will trivialize or end encounters, and Martials simply do not have the number of interesting options as spells provide.

*But why don't you just play PF2e? They fixed all that!*

To an extent, PF2e does do exactly that. Martials now have interesting options for their actions, in buckets based on their class. Martials are the masters of single target damage, while spells are more suited for AOE damage or other, funky effects. And Martials have the best defences against attacks in the game.

*However,* I find that their changes to Casters have gone a little too far in reducing the efficacy of magic. This largely puts them in the position of setting up Martials for success for most of the tough encounters. They will still beat out Martials in clearing chaff, but I can't see why an encounter would include the numbers of enemies where that would matter, or if Martials would suffer many hits from those enemies in the first place. If they do use a single target effect, the damage is either half what a single Martial attack would result in for twice the Action cost, or the effect is likely halved anyway due to the accuracy issues.

This might possibly be solved by including Potency Runes for casters. But even then, I feel that Cantrips in particular are rather anemic. Hopefully the rules update in the later half of 2023 addresses this.

## So, anyway, what do I want?
Given that we are sticking with a 5e feel for combat, there are a few goals that I am trying to meet. We'll start off with some rough terms to help keep some things in mind.

 - **Miss** Attack doesn't connect, no damage is dealt.
 - **Graze** Attack connects, but where mitigation is more effective (half damage or double DR).
	 - Precision or Hit effects aren't applied.
	- Damage can be reduced to 0.
 - **Hit** Attack connects and results in normal damage and mitigation.
	 - Precision or Hit effects (Sneak Attack) can be applied here.
	 - Minimum damage effects will apply here (based on weapon, feature, maneuver).
 - **Pierce** Attack connects and results in reduced mitigation (halve DR or double weapon dice).
	 - Specialty Precision effects could apply here (weapon or maneuver based damage bonus).
	 - Minimum damage effects as per Hit.
 - **Crit** Attack connects and causes major damage. Damage is doubled before mitigation is applied, if it is.
	 - Bonus and Precision damage is unlikely to be doubled in this case (at least Sneak Attack won't be).
	 - Can alternatively maximize dice, then add bonus dice.

### *Accuracy* vs *Power*
While I enjoy the concept where STR or DEX can be used as your offensive statistic for Accuracy and Damage, I feel like these can be separated to create their own build strategies. A character that focuses on Accuracy should want to build their character out with choices that help maximize their ability to hit their target, and be rewarded for hitting above the minimum requirement. Alternatively, a character that focuses on Power should be building so that as long as their strikes connect, damage will be dealt, with lucky hits breaking through quite dangerously.

 - **Accurate Attack** *ex.* +6, 1d6+3 / +14, 2d6+7
	 - They should have high Hit modifiers and lower Damage Dice and Damage modifier.
	 - This should result in most attacks being Hits, with decent odds of Pierces on heavier armored opponents.
	 Rolling Hits will be a little less than where 5e currently sits, but Pierces will act like mini-Crits in a way.
	- In exchange, Hits will rely more on their conditional damage, and Grazes will basically be misses on heavily armored targets.
 - **Power Attack** *ex.* +3, 1d12+5 / +10, 2d12+11
	 - They should have low Hit modifiers and larger Damage Dice and Damage modifier.
	 - They should be dealing damage at every threshold possible. While a character focused on Dodging might be Grazed more often than not, their mitigation is low enough that it is still a solid hit. Conversely, heavily armored targets might be able to shrug off a Graze more easily, but also are much more likely to be Hit.
	 - In exchange, they are much less likely to Pierce or Crit, and characters based around Dodging might have the advantage just by attack failing to land.

#### Weapon Qualities, Features, and Maneuvers

Adding to the feel of both of these styles of attacks, there are a host of features that can expand the tactical utility of each. While the Rogue wants to make (at least) one accurate strike each turn to trigger their Sneak Attack, a Ranger might opt for attacking with two weapons swiftly to maximize their ability to reduce a target's DR or get a bonus Damage Die. Meanwhile, the Barbarian can maybe forgo a second strike to make one, but they get double the weapon dice and Strength bonus to really put the hurt on  the threat in their way. And then there's the middle ground, where a sword and board is moderately effective, but also sports a shield or other utility item.

 - **Accurate Features:** Two-Weapon Fighting, Feinting to make one attack more accurate, increase benefits of flanking, increase minimum damage on Hit, apply a Penalty to DR if an attack lands successfully.
 - **Power Features:** Power Attack for one attack with bonus damage, Pushing your target, chance to knock Prone, wrestling, Cleaving swings to damage multiple low-armor targets.

### *Evasive* vs *Tough*

This is the second half of the equation; the same concept above, but applied to defences. The nimble, flighty Rogue or Swashbuckler stays alive by using their wits, reactions, and positioning. On the other side, you'll have your brickhouse Barbarian or bulwark of a Fighter who may weather blow after blow, but can use their inhuman durability and determination to shrug the effects aside.

- **Evasive Defence** AC14, Graze TN 9, Pierce TN19, DR2 / AC 24, Graze TN 19, Pierce TN 29, DR6
  - An Accurate Attacker has rather normal odds of landing a Hit against such a target, while a minor amount goes through on a Graze.
  - A Power Attacker will be less likely to Hit, but still has a good chance to Graze. Said Graze does double an Accurate attack, though. And a Hit is barely mitigated.

- **Tough Defence** AC12, Graze TN 7, Pierce TN 22, DR 4 / AC 22, Graze TN 17, Pierce TN 27, 12
	- An Accurate Attacker is landing a Hit with most attacks, but the target's DR means that they have a reduced chance of triggering their conditional damage, while a Pierce is still somewhat often.
	- A Power Attacker is still landing an event number of Hits and Grazes, but now their grazes have to roll high to deal damage. Pierces are rare, but also are only a 50% increase in damage.

#### Armor Qualities, Features, and Maneuvers

And this is isn't including other ways that to alter these values. Shields can increase AC and thus shift these values. Armors can apply different augments to particular thresholds. Armors and Shields might even have once per round abilities to reduce an incoming Attack Roll or grant bonus Damage Reduction.

- **Evasive Features:** Once per round reduce Attack Roll, Reaction to move backwards one space in exchange for forcing Disadvantage on an attack roll, make an attack that comes with bonus movement to exit combat.
- **Tough Features:** Once per round reduce incoming Damage on top of DR, gain Resistance against certain Elements, Brace type maneuver to generate temporary hit points while drawing aggression.

## So what about Spellcasting?

That is a *really* good question.


[advDayFal]: ## "There are never a reasonable number of combats in a given adventuring day where characters will run out of their resources to make Martials outpace Casters."
