
# d20-maths-calc

A simple HTML/JS calculator for running accuracy, damage, and dpr calculations for different d20 styles.

- [Click here](https://andrew-heath.github.io/dice-calculator.html) to check it out.
- [Click here](https://andrew-heath.github.io/combat-ideas.html) to see additional ideas and explanations of my intents.

## Current Features
This calculator is currently designed to calculate Accuracy, Damage, and DPR for an Accuracy vs DR alteration to DnD 5e base rules. Features taken into account include:

### TL;DR
```
Ability Scores: STR to Damage, DEX to Hit/EC, CON to HP/DR
+/-10 ranges for Crit (2x), Hit, Graze (1/2x), Miss (0)
Weapons: Finesse use Prof to Hit and Damage and 1/2 STR, but can TWF
         Balanced use Prof to Hit, 1/2 to Damage, and STR
         Heavy use 1/2 Prof to Hit and Damage, STR, and largest Dice
Armor: Light use Prof to EC and high Max DEX, 1/2 to DR and low Max CON
       Medium use Prof to EC and mid Max DEX, 1/2 to DR and mid Max CON
       Heavy use 1/2 Prof to EC and low Max DEX, Prof to DR and high Max CON
```


### Ruleset List
 - Strict Ability Score Purposes
	 - Strength applies to Weapon Damage
	 - Dexterity applies to Accuracy and AC (Renamed to **E**vasion **C**lass)
	 - Constitution applies to HP and DR
	 - Spellcasting Modifier applies to Spell Attack Damage
 - Proficiency is applied to more features, and in ways dependent on purpose.
 - Leverage the +/-10 ranges of PF2e to make a Miss/Graze/Hit/Crit system.
	 - **Hits** are when an attack meets or beats EC, dealing normal damage reduced by DR.
	 - **Grazes** are for attacks within -10 of EC, dealing half damage before being reduced by DR.
		 - *Precision damage like* Sneak Attack *or similar only apply on Hits or better, and only if at least 1 point of damage is dealt.*
     - **Misses** are attacks that roll lower than a Graze, and deal no damage.
     - **Criticals** are attacks beyond +10 of EC, and deal double damage before applying DR.
  - Weapon Classifications now have different applications of Proficiency and Strength to damage.
	  - **Finesse** weapons are light weight and built for accuracy. They apply Proficiency to Attack and Damage, but only benefit from 1/2 of Strength to damage.
		  - *Light weapons allow for Two-Weapon Fighting, doubling number of attacks, but reducing the Proficiency applied to Attack and Damage rolls to 1/2.*
	  - **Balanced** weapons are your standard one handed weapons. They apply Proficiency to Attack Rolls, but only 1/2 Proficiency to Damage rolls. However, they still fully benefit from Strength to damage. Some can even be wielded like Finesse weapons, or like Heavy Weapons if used in two hands.
	  - **Heavy** weapons are your powerhouse weapons that benefit the most from Strength. They apply only 1/2 Proficiency to Attack and Damage rolls, but have the highest die values applied to them. Good for punching through DR.
	  - **Spells** that use Attack Rolls will apply Proficiency to Attack and Damage rolls. If the same target can be attacked multiple times by the spell (such as *Eldritch Blast*), then the spell follows the rules for Light weapons above. Spellcasting Ability Modifier is still only applied if the caster has a feature that allows it to be added.
	  - There are even rules for **Mechanical** and **Propulsive** ranged weapons, though they are currently under consideration.
  - Armor Classificactions now have different applications of Proficiency to EC and DR, and can leverage a Max Con stat to DR, in the inverse of Max Dex.
	  - **Light** armor focuses on dodging and forcing attacks to Miss or Graze more often than Hit. They leverage Proficiency to EC, have Max Dex of 4 or 5, but only use 1/2 Proficiency for DR and have a Max Con of 1.
		  - *Many Light Armors also have* Deflection, *1/r ability to increase your EC by an amount against an attack, to try and change a Crit to a Hit, Hit to Graze, or even a Graze to a Miss.*
	  - **Medium** armor sits in a middle ground, with higher EC than Heavy Armor and more DR than Light Armor. They leverage Proficiency to EC, but have a Max Dex of 2 or 3. They still use only 1/2 Proficiency for DR but have a Max Con of 3 or 2.
	  - **Heavy** armor leaves the user most likely to be struck, but even light weapons will cause minimal damage on Grazes. Heavy Armor uses only 1/2 Proficiency to EC, and with a Max Dex of 1, but uses Proficiency to DR and a Max Con of 4 or 5.
	  - Other armors like Natural Armor, Barbarian Unarmored, and *Mage Armor* will leverage their non-Dexterity values as DR. Monk Unarmored and similar will apply to EC, making them hard to pin down, but suffer full damage. Temporary boosts to AC will just add to EC instead.
	  - **Magic** bonuses apply to both EC and DR, and some special armor types might have slightly reduced base statistics to add uses of *Deflection* or *Absorption*.
	  - **Shields** come in a couple flavors, but apply a bonus to EC, while also having additional features.
		  - **Bucklers** only give +1 to EC, but give a use of *Deflection*, as mentioned in Light Armor. Having both allows two uses per round!
		  - **Heaters** are your standard shield that give +2 to EC, but also have *Absorption*, a 1/r ability to reduce the damage of an attack by a certain amount, which stacks with DR.
		  - **Towers** are even larger shields, that can apply speed penalties like Heavy Armor. They give a base +2 EC, but you can spend a Bonus Action to gain Cover, as can any ally standing near you.
  - As Accuracy is important, Advantage is updated to not only roll twice and take the higher, it will also reduce the target's DR by 1/2, making it more important to get. This may instead be leveraged as a separate status effect, to then be leveraged by other features.

## Future Ideas

**Armor and Weapon Builder**
Add a section for manually setting modifiers on Weapons and Armor: Prof Modifier, Str/Dex/Con Modifier, flat bonuses, etc. Sadly, it won't be persistent between refreshes, as I don't plan on making this leverage cookies or local storage, or anything beyond a simple HTML and JS file. Some changes might get baked in as settings that can be loaded, though. Ideas include:
- Removing Prof from Armor in favor of Static Bonuses and Max Dex and Max Con, or even removing Max Con
- Giving Heavy Armor 2x Prof to DR.
- Giving Heavy Weapons Prof to Damage instead of half, or giving them 2x Str.
- Allowing Finesse and Mechanical weapons to leverage Dex to Damage.

**Accuracy Range Modifiers**
Instead of leveraging only +/-10 ranges, add controls to different armor types to adjust how large their ranges for Grazes, Hits, and Crits are. Can also leverage on the offensive side to increase Crit Range (reducing Hit Range, akin to Champion ability). Examples include:
- Light Armor reduce the Graze range from -10 to -5, showing how they are good at dodging attacks.
- Increase Heavy keeps a Graze Range of -10, but might increase their Crit Threhold from +10 to +11 or +12.
- Particular Maneuvers or Weapons might have the same accuracy, but might get a Critical Hit on EC+9 instead of +10.

**Martial Maneuvers**
Eventually, there will be Martial abilities that Martial Classes can take to give them more interesting options in combat. They will function similarly to Battle Master Maneuvers; some will ride along with an attack, while some might take a whole action!
- Some will apply affects as attack **Riders**, applying a small debuff or a stronger one on a Failed Save.
- Some will require spending an attack to do, but gain some stronger benefit, or might have a use as a Bonus Action.
- Some might take your whole action, affecting a large number of allies or enemies.
- They will be split into different classifications of features, and each martial class gets access to different groups.
  - *Gladiator* is built around Frightening and Taunting foes, or generating Temp HP to rebuff damage.
  - *Leadership* is built around forgoing your attacks to have allies act in your stead, or taking a penalty to grant an ally a bonus.
  - *Bulwark* is designed for those using shields, based around improving their use and Taunting foes.
  - *Brute* is about leveraging Heavy weapons to bully and cleave enemies or punch through armor.
  - *Scoundrel* is designed to feint, disarm, or play dirty with your foe to create better openings for yourself.
- While classes might have access to two or three of these, Fighters gain access to **all** of them, and additional uses.
