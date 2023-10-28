# FoundryVTT Runners in the Shadows character and crew sheets

<p align="center">
<img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/GraithTiger/foundryvtt-runners-in-the-shadows"> <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/GraithTiger/foundryvtt-runners-in-the-shadows"> <img alt="GitHub All Releases" src="https://img.shields.io/github/downloads/GraithTiger/foundryvtt-runners-in-the-shadows/total" /> <img alt="GitHub Release Date" src="https://img.shields.io/github/release-date/GraithTiger/foundryvtt-runners-in-the-shadows?label=latest%20release" /> 
</p>
<p align="center">
<img alt="GitHub" src="https://img.shields.io/github/license/GraithTiger/foundryvtt-runners-in-the-shadows"> <a href="https://github.com/GraithTiger/foundryvtt-runners-in-the-shadows/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/GraithTiger/foundryvtt-runners-in-the-shadows"></a> <a href="https://github.com/GraithTiger/foundryvtt-runners-in-the-shadows/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/megastruktur/foundryvtt-blades-in-the-dark"></a> <a href="https://github.com/GraithTiger/foundryvtt-runners-in-the-shadows/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/GraithTiger/foundryvtt-runners-in-the-shadows"></a> 
</p>

If you like our work - use the system, use it all, and may the shadows cover your way.

## Usage
`"Item" - all playbooks, crew types, upgrades, items, abilities, upgrades, etc.`

- To reset reputation, exp, etc counters just click on the label name.
- Health clock can be reset by clicking on "Healing" table header.
- To add items you can click a corresponding link or drag items from compendium/game to the sheet.
- All "playbook/crew" specific items are prefixed with first letters

- I don't want the "playbook/crew items" to be prepopulated, so the character sheet contains less "compendium" info.
- To see the description of Playbook, Vice, Background, etc you can just click added item and see all the info in the popup.
- When adding a new item you can hower a "question-circle" icon to see the item's description.
- To add Custom abilities just add a new "Foundry Item" of the corresponding type and fill all the necessary info. Then drag it to the sheet or add via button on a sheet.

Playbooks:
- (Fc) Face
- (Hk) Hacker
- (Mc) Muscle
- (Pk) Punk
- (Rg) Rigger
- (Sn) Snake
- (Tr) Trigger

Supernatural Playbooks:
- (Ad) Adept
- (Mg) Mage
- (Tc) Techno

Crew Types:
- (AS) Assassins
- (CR) Couriers
- (CT) Cult
- (MC) Mercs
- (RD) Radicals
- (SH) Shadows

## Screenshots

### Character Sheet, Crew Sheet and Playbook
![alt screen][screenshot_all]

### Compendium
![alt screen][screenshot_compendium]

### Rolls
![alt screen][screenshot_roll_1]
![alt screen][screenshot_roll_2]

## Clocks
Clocks are now here!
- To add clock go to Actors tab and create a new Actor of type "🕛 clock".
- To share it to other players just drag it to a scene.

### Operators list
- `addition` - is added when item is attached and substracted when removed
- `attribute_change` - changes the "attribute" to value and when removed - uses the "attribute_default" to restore

## Supported Languages
- English

## Troubleshooting
- If you can't find the drag-n-dropped item, refer to "All Items" tab on each sheet.

## Credits
- This work is based on:
  - Runners in the Shadows (found at https://markcleveland.itch.io/runners-in-the-shadows), by Mark Cleveland Massengale
  - Blades in the Dark (found at http://www.bladesinthedark.com/), product of One Seven Design, developed and authored by John Harper, and licensed for our use under the Creative Commons Attribution 3.0 Unported license (http://creativecommons.org/licenses/by/3.0/).
- Some assets were taken from here (thank you  timdenee and joesinghaus): https://github.com/joesinghaus/Blades-in-the-Dark


[screenshot_all]: ./images/screenshot_all.png "screenshot_all"
[screenshot_compendium]: ./images/screenshot_compendium.png "screenshot_compendium"
[screenshot_roll_1]: ./images/screenshot_roll_1.png "screenshot_roll_1"
[screenshot_roll_2]: ./images/screenshot_roll_2.png "screenshot_roll_2"
