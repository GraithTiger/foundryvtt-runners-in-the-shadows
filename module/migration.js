/**
 * Perform a system migration for the entire World, applying migrations for Actors, Items, and Compendium packs
 * @return {Promise}      A Promise which resolves once the migration is completed
 */
export const migrateWorld = async function() {
  ui.notifications.info(`Applying RITS Actors migration for version ${game.system.data.version}. Please be patient and do not close your game or shut down your server.`, {permanent: true});

  // Migrate World Actors
  for ( let a of game.actors.contents ) {
    if (a.type === 'character') {
      try {
        const updateData = _migrateActor(a);
        if ( !isObjectEmpty(updateData) ) {
          console.log(`Migrating Actor entity ${a.name}`);
          await a.update(updateData, {enforceTypes: false});
        }
      } catch(err) {
        console.error(err);
      }
    }

    // Migrate Token Link for Character and Crew
    if (a.type === 'character' || a.type === 'crew') {
      try {
        const updateData = _migrateTokenLink(a);
        if ( !isObjectEmpty(updateData) ) {
          console.log(`Migrating Token Link for ${a.name}`);
          await a.update(updateData, {enforceTypes: false});
        }
      } catch(err) {
        console.error(err);
      }
    }

  }

  // Migrate Actor Link
  for ( let s of game.scenes.contents ) {
    try {
      const updateData = _migrateSceneData(s);
      if ( !isObjectEmpty(updateData) ) {
        console.log(`Migrating Scene entity ${s.name}`);
        await s.update(updateData, {enforceTypes: false});
      }
    } catch(err) {
      console.error(err);
    }
  }

  // Set the migration as complete
  game.settings.set("rits", "systemMigrationVersion", game.system.version);
  ui.notifications.info(`RITS System Migration to version ${game.system.version} completed!`, {permanent: true});
};


/* -------------------------------------------- */

/**
 * Migrate a single Scene entity to incorporate changes to the data model of it's actor data overrides
 * Return an Object of updateData to be applied
 * @param {Object} scene  The Scene data to Update
 * @return {Object}       The updateData to apply
 */
export const _migrateSceneData = function(scene) {
  const tokens = foundry.utils.deepClone(scene.tokens);
  return {
    tokens: tokens.map(t => {
      t.actorLink = true;
      t.actorData = {};
      return t;
    })
  };
};

/* -------------------------------------------- */

/* -------------------------------------------- */
/*  Entity Type Migration Helpers               */
/* -------------------------------------------- */

/**
 * Migrate the actor attributes
 * @param {Actor} actor   The actor to Update
 * @return {Object}       The updateData to apply
 */
function _migrateActor(actor) {

  const skillsMap = new Map([
    ['insight', 'intuition'],
    ['prowess', 'body'],
    ['resolve', 'willpower'],
    ['tinker', 'engineer'],
    ['hunt', 'stalk'],
    ['skirmish', 'fight'],
    ['sway', 'influence']
  ]);

  let updateData = {}
  const _actor = actor._source;
  // Migrate Attribute & Skill names
  const attributes = game.system.model.Actor.character.attributes;
  updateData['system'] = {"attributes": {}};
  for ( let attribute_name of Object.keys(_actor.system.attributes || {}) ) {
    let newAttrName = skillsMap.get(attribute_name);;
    // switch (attribute_name) {
    //   case "insight":
    //     newAttrName = "intuition";
    //     break;
    //   case "prowess":
    //     newAttrName = "body";
    //     break;
    //   case "resolve":
    //     newAttrName = "willpower";
    //     break;
    // }

    if (typeof newAttrName === "string"){
      updateData.system.attributes[newAttrName] = _actor.system.attributes[attribute_name];
      updateData.system.attributes[newAttrName].label = attributes[newAttrName].label;
      updateData.system.attributes[`-=${attribute_name}`] = null;
    }
    let skills = {};
    for ( let skill_name of Object.keys(_actor.system.attributes[attribute_name]['skills']) ) {
      let newSkillName = skillsMap.get(skill_name);
      // switch (skill_name) {
      //   case "tinker":
      //     newSkillName = "engineer";
      //     break;
      //   case "hunt":
      //     newSkillName = "stalk";
      //     break;
      //   case "skirmish":
      //     newSkillName = "fight";
      //     break;
      //   case "sway":
      //     newSkillName = "influence";
      //     break;
      // }

      let value = _actor.system.attributes[attribute_name].skills[skill_name].value;
      if (typeof value !== 'number'){
        value = parseInt(value)
      }

      if (typeof newSkillName === "string"){
        skills[newSkillName] = _actor.system.attributes[attribute_name].skills[skill_name];
        skills[newSkillName].label = attributes[(typeof newAttrName === "string")? newAttrName : attribute_name].skills[newSkillName].label;
        skills[newSkillName].value = value;
        skills[`-=${skill_name}`] = null;
      }
      else {
        skills[skill_name] = _actor.system.attributes[attribute_name].skills[skill_name];
        skills[skill_name].label = attributes[(typeof newAttrName === "string")? newAttrName : attribute_name].skills[skill_name].label;
        skills[skill_name].value = value;
      }
    }
    if (typeof newAttrName === "string"){
      updateData.system.attributes[newAttrName].skills = undefined;
      updateData.system.attributes[newAttrName].skills = skills;
    }
    else {
      updateData.system.attributes[attribute_name] = {"skills": skills};
    }
  }
  
  //Update Effects
  updateData['effects'] = [];
  for (let effect of _actor.effects) {
    let changes = [];
    for (let change of effect.changes) {
      let key = change.key;
      for (let name of skillsMap.keys()){
        key = key.replaceAll(name, skillsMap.get(name));
      }
      changes.push({"key": key, "mode": change.mode, "value": change.value});
    }
    updateData.effects.push({"_id": effect._id, "changes": changes});
  }

  //Update Healing Clock to number
  if (typeof _actor.system['healing-clock'] !== "number"){
    updateData.system["healing-clock"] = parseInt(_actor.system['healing-clock']);
  }

  return updateData;
}
/* -------------------------------------------- */


/**
 * Make Token be an Actor link.
 * @param {Actor} actor   The actor to Update
 * @return {Object}       The updateData to apply
 */
function _migrateTokenLink(actor) {

  let updateData = {}
  updateData['prototypeToken.actorLink'] = true;

  return updateData;
}

/* -------------------------------------------- */