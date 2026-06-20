import type { Ritual, RitualPresentation, RitualWords } from "./types";

type DirectUseReviewDecision = {
  presentation?: Partial<RitualPresentation>;
  ritualWords?: RitualWords[];
  searchMetadata?: Partial<Ritual["searchMetadata"]>;
  cleanup?: "whitehurstFlower" | "moonBook";
};

const WOODWARD_DIRECT_USE_REVIEWS: Record<string, DirectUseReviewDecision> = {
  "ritual-woodward-center-at-counter": {},
  "ritual-woodward-kitchen-table-intention": {
    presentation: {
      practice:
        "Clear a small space on the kitchen table or counter. Set down the empty bowl, cup, pot, plate, or serving dish that will hold the work. Place one small paper beside it. Write one plain sentence naming what this kitchen act is for: welcome, steadiness, repair, warmth, courage, patience, release, or blessing. Read the sentence once. Put the paper under or beside the vessel while the kitchen action begins. Close by folding the paper and putting it in the household record, recycling it, or placing it under the vessel until the table is cleared.",
    },
  },
  "ritual-woodward-bowl-focus-stirring": {
    presentation: {
      intention: "Let a real bowl action carry the purpose through the food or vessel.",
    },
  },
  "ritual-woodward-bread-table-offering": {
    presentation: {
      practice:
        "Choose bread already present in the household: a slice, roll, small loaf, toast, or bread already being prepared. Place the bread on a plate at the center of the table. Touch the plate and name what the household is being fed tonight: steadiness, welcome, repair, patience, warmth, or memory. Share the bread as part of the table, or let it sit as the visible offering for the rite. Close by eating it, wrapping it for later, or returning it to earth or compost according to household practice.",
      intention: "Make bread a visible household offering.",
      whyThisFits:
        "Bread, plate, and table let household care become a visible offering without adding a recipe.",
    },
    searchMetadata: {
      tags: ["woodward", "bread", "grain", "table", "offering"],
      keywords: [
        "woodward",
        "bread",
        "grain",
        "table",
        "offering",
        "plate",
        "kitchen table",
        "household offering",
      ],
      materials: ["bread", "grain", "plate"],
    },
  },
  "ritual-woodward-window-water-bowl": {},
  "ritual-woodward-shared-cup-pause": {
    presentation: {
      practice:
        "Choose an ordinary drink already suitable for the table: water, warm water, juice, milk, tea, or another familiar household drink. Pour it into one shared pitcher or two separate cups. Set the cup or cups on the table. Come to center. Name the purpose of the pause: welcome, patience, repair, listening, or simple company. Drink when the pause is ready to become part of the body. Close by washing the cup or cups and returning them to their place.",
      intention: "Let a shared drink become a small vessel for connection.",
    },
  },
  "ritual-woodward-enoughness-bowl": {
    presentation: {
      practice:
        "Set an empty bowl at the center of the table. Choose one ordinary object already in the kitchen: a piece of fruit, wrapped sweet, clean spoon, folded note, bread end, or pantry object. Place it in the bowl. Name one way the household has enough for this hour. Leave the bowl on the table through the meal, conversation, or quiet hour. Close by eating, saving, washing, composting, or returning the object according to what it is.",
    },
  },
  "ritual-woodward-seasonal-food-marker": {
    presentation: {
      practice:
        "Choose one seasonal food already in the kitchen or already planned for the table. Place it on a plate or in a bowl. Name what the season is doing: arriving, ripening, resting, darkening, brightening, returning, or letting go. Let the food or object remain through the meal or quiet moment. If it is eaten, let it become part of the seasonal marker. If it is not eaten, save, compost, or discard it according to what it is.",
      intention: "Let one seasonal thing mark the moment without importing a recipe or holiday obligation.",
    },
  },
  "ritual-woodward-clear-table-closing": {},
  "ritual-woodward-kept-kitchen-object": {
    presentation: {
      practice:
        "Choose one ordinary kitchen object that will keep being used: a cup, bowl, spoon, jar, cloth, serving dish, pot, or pan. Clean it in the ordinary way. Set it on the table. Come to center. Put one hand near or on the object. Name the household job it is being given: hold welcome, remember this season, steady the table, bless a shared drink, or serve the next meal cleanly. Breathe once over or near the object. Return it to use or storage.",
    },
  },
  "ritual-woodward-pot-of-tending": {
    presentation: {
      practice:
        "Use a pot, pan, or serving bowl already involved in a planned soup, stew, grain, beans, lentils, vegetables, or warm dish. Stand at the stove, counter, or table. Come to center. Place one hand near the pot or bowl. Name the kind of tending being asked of the meal: steadiness, warmth, patience, repair, or nourishment. Stir or fold three slow times if stirring is part of the actual preparation. Continue cooking or serving according to the recipe you already know. Close by covering the pot, serving the food, or washing the vessel when the meal is done.",
    },
  },
  "ritual-woodward-welcome-served-simply": {
    presentation: {
      practice:
        "Choose one simple thing already appropriate to offer: water, a piece of fruit, bread, a small sweet, or a non-edible token on a plate. Set it on the table between you and the person being welcomed, or in the place where welcome is being made. Name the offering as an invitation, not a claim. Offer it openly. Close by clearing the plate or cup and putting the table back in order.",
      intention: "Make welcome visible at the table.",
      whyThisFits:
        "A simple offering on a plate or in a cup lets welcome be visible without turning invitation into a claim.",
      questionToCarry: "How can welcome be offered plainly?",
    },
  },
  "ritual-woodward-repeated-recipe-memory": {
    presentation: {
      practice:
        "Choose one food, drink, or table object already meaningful to the household. Open the household grimoire, notebook, or Moon & Table note. Record the name of the dish or object, the date, who was present, where it was served, what season or moon moment surrounded it, and one sentence about what the table held. Read the sentence aloud once if that helps mark the memory. Close the record and return it to its place.",
      intention: "Preserve the household memory around food.",
    },
  },
  "ritual-woodward-candle-beside-bowl": {},
};

const HOUSE_WITCH_DIRECT_USE_REVIEWS: Record<string, DirectUseReviewDecision> = {
  "ritual-house-witch-spiritual-hearth-recognition": {
    presentation: {
      headline: "Recognize the Heart of the Home",
      practice:
        "Stand or kneel before the physical place you have chosen as the spiritual hearth. Place a small bowl of salt, a small bowl of water, a small bowl of mixed kitchen herbs or spices, a candle in a holder, matches, a heatproof dish, and a small bowl of olive or vegetable oil within reach. Take three slow breaths. Hold your hands toward the hearth and name it as the home's center. Bow to the hearth. Touch the salt and scatter a few grains toward the hearth. Touch the water and flick a few drops toward the hearth. Stir the herbs or spices and waft their scent toward the hearth. Light the candle, hold it toward the hearth, and name the flame as part of the hearth recognition. Place the candle on or near the hearth. Touch one fingertip to the oil and lightly mark the hearth or its symbolic marker. Bow once more. Close by snuffing the candle.",
    },
  },
  "ritual-house-witch-bank-the-inner-flame": {
    presentation: {
      practice:
        "Do this after the day's kitchen or household work is finished and before bed. Sit or stand in the kitchen, at the hearth place, or by a candle if one is already lit. Relax your body. Look back over the day from waking to this moment without judging it. Notice the feelings that remain. Close your eyes and take three slow breaths; with each exhale, let worry or irritation move out of you. Feel yourself here, now, in the home. Name that the day is being banked until morning. If using a candle, snuff or blow it out. If not using a candle, turn off the kitchen or hearth light, or close the door if you are at a threshold.",
      questionToCarry: "What can be banked until morning?",
    },
  },
  "ritual-house-witch-kitchen-sacred-flame": {
    presentation: {
      practice:
        "Place a candle in a holder or an oil lamp in the kitchen work spot. Before beginning kitchen or table work, stand before the flame. Light it. Name the kitchen work the flame is opening. Let the flame mark the kitchen as sacred while you work nearby. When the kitchen work is finished or you leave the room, extinguish the flame to close.",
    },
  },
  "ritual-house-witch-consecrate-candle-fuel": {},
  "ritual-house-witch-cauldron-harmony": {
    presentation: {
      headline: "Hold Harmony in the Cauldron",
      practice:
        "Place a small cauldron or heat-safe bowl on the physical analogue of the spiritual hearth or on the kitchen shrine. Pour enough salt or sand into the bottom to hold a candle securely, about an inch and a half if the candle is tall. Set a pale blue candle upright in the salt or sand. Light the candle. Name the peace, rest, renewal, or harmony the hearth vessel is being asked to hold. Leave the cauldron and candle on the hearth place or shrine. Extinguish the candle when the rite is complete.",
    },
  },
  "ritual-house-witch-cauldron-blessing": {
    presentation: {
      practice:
        "Clean and purify the cauldron or hearth vessel before use. Place it at the hearth place, kitchen shrine, or table. Stand or sit before it. Put both hands near it or on it. Name the work of change the vessel is being welcomed to hold. If using herbs, sprinkle a few fresh or dried herbs inside that represent blessing or welcome to you. Leave the vessel in its hearth place when finished.",
    },
  },
  "ritual-house-witch-doorstep-cleansing": {
    presentation: {
      practice:
        "Combine one cup water, one tablespoon vinegar, one tablespoon salt, and three whole cloves in a bowl or bucket. Leave the mixture to steep in a sunny place for at least one hour. Bring the bowl or bucket and a washing cloth to the threshold or doorstep. Dip the cloth in the liquid and wash the threshold or doorstep. As you wash, visualize unwanted energy dissipating from the surface. Say: \"I hereby cleanse this threshold of negative energy.\" Repeat regularly or as needed. Close by pouring out the wash water and letting the threshold dry.",
    },
  },
  "ritual-house-witch-house-blessing-circuit": {
    presentation: {
      practice:
        "Repair what needs repair, then thoroughly clean walls, floors, windows, cupboards, stairs, and other neglected places. Move counterclockwise through the house while cleaning, finishing by sweeping dirt out the back door and shaking dust rags or emptying wash water out the back door as appropriate. Begin the blessing at the physical analogue of the spiritual hearth. Light purification incense in a censer or heatproof bowl with sand. Carry the incense clockwise through each room, wafting smoke into cupboards and behind doors, and name the air-and-fire blessing for each room. Return the incense to the hearth. Light a candle in a holder and carry it clockwise through each room, naming the light blessing as it moves through the house. Return the candle to the hearth. Add a pinch of salt to a small cup of water. Carry it clockwise through each room. Touch the outside and inside of each doorframe, and the frame of each window and cupboard, with salt water; draw a simple blessing symbol if that belongs to the rite. Name the water-and-salt blessing for each place touched. Return the water to the hearth. Stand at the hearth and name the house as blessed and returned to itself.",
    },
  },
  "ritual-house-witch-bless-one-room": {
    presentation: {
      practice:
        "Sit in the room and think about its identity. Choose either a white candle or a candle in the color that fits the room's energy. Gather a candle in a holder, matches or lighter, a small cup of water, a pinch of salt for the water, a 4-inch by 4-inch square of cloth, one small amethyst or clear quartz, a pinch of salt for the pouch, one penny or other coin, and about ten inches of narrow ribbon. Light the candle and place it in the center of the room. Name the room as blessed by the flame. Add a pinch of salt to the water. Dip your finger in it and draw a line along the room threshold, naming the threshold as part of the room's blessing. Place the stone, pouch salt, and coin on the cloth, naming each one for harmony, steadiness, and enough. Gather the corners of the cloth and tie it closed with the ribbon. Pass the bundle above, not through, the candle flame and name it as sealed in the room's light. Hang the bundle above the door or place it somewhere in the room where it can continue to bless the room. Name the room as held and the work as closed. Extinguish the candle.",
    },
  },
  "ritual-house-witch-purify-person-at-home": {
    presentation: {
      headline: "Release Through Salt and Flame",
    },
  },
  "ritual-house-witch-purify-one-room": {
    presentation: {
      practice:
        "Physically clean the room first: return things to their places, then vacuum, sweep, dust, polish, or otherwise remove dirt as needed. Put a teaspoon of purifying incense on a charcoal tablet in a censer or heatproof bowl with sand, or use one stick of purchased purifying incense. Light the incense and name what the smoke is carrying out of the room. Place the bowl or censer in the middle of the room. Let the smoke fill the space; if desired, walk counterclockwise around the room to disperse it. When the room feels purified, light a candle in the middle of the room and name the flame blessing for what remains. Let the candle burn down, or extinguish it when the rite is complete. When the flame is out, leave the room clean and undisturbed for a while.",
    },
  },
  "ritual-house-witch-create-small-sacred-space": {
    presentation: {
      practice:
        "Gather incense in a censer, a candle in a holder, matches or a lighter, a small cup of water, and a small dish of salt, sand, or earth. Place them at the edge or center of the space you want to define. Take a minute to arrive fully in the moment. Light the incense, move it around the perimeter of the space, and say: \"I bless this space with air.\" Light the candle, move it around the perimeter of the space, and say: \"I bless this space with fire.\" Carry the cup of water around the perimeter and say: \"I bless this space with water.\" Carry the salt, sand, or earth around the perimeter and say: \"I bless this space with earth.\" If moving is difficult, turn in place and raise each element toward the four directions instead. With each element, visualize its energy moving outward and pushing away what does not belong in the working space. Return the elements to the starting place. Stand in the space and say: \"I call upon the power of the spiritual hearth to bless this space.\" Close by naming the space's purpose in one plain sentence, then extinguish the flame and incense when the work is complete.",
    },
  },
  "ritual-house-witch-bless-kitchen-tool": {
    presentation: {
      practice:
        "Choose one appliance or kitchen tool that is used often. If it needs physical cleaning or purification, do that first. Stand before it and touch it with both hands, or let your hands hover beside it. Open yourself to its energy: what it does, how often it serves the kitchen, and what kind of work it helps the household do. Say a simple blessing: name the tool, thank it for the work it does, thank it for being part of the household, and bless it. If desired, draw a small circle or hearth-flame symbol on it with plain water, water with a pinch of salt, or a dry finger. Let the mark dry or fade on its own.",
      whyThisFits:
        "Touch, thanks, blessing, and a small mark let the kitchen tool be recognized as part of the hearth's work.",
    },
  },
  "ritual-house-witch-household-grimoire-entry": {
    presentation: {
      practice:
        "Open the household grimoire, notebook, binder, or Moon & Table note. Record the date, the place in the home, the ritual or household action just performed, the materials used, any words spoken, who was present, and the weather or household mood if it mattered. Add one sentence about what felt different afterward. If the action involved food, record the dish or recipe name. Close the book or note and put it back in its household place.",
    },
  },
  "ritual-house-witch-food-with-awareness": {
    presentation: {
      practice:
        "Choose food you were already going to prepare. Before beginning, pause at the kitchen counter or stove and name who the food is for. Choose one main action to carry the magic: washing vegetables, adding salt, stirring, kneading, pouring, or serving. Keep attention on that action. If stirring, move clockwise when inviting warmth, harmony, or support; move counterclockwise only when the household intention is release or clearing. Speak one short line from the heart or keep the work wordless. Finish by serving or setting the food down with attention to the care it carries. Do not add ingredients or substitutions for magical reasons unless the recipe already allows them.",
      bestWindow:
        "During normal cooking, especially when food is being made for oneself, both of you, or chosen family.",
    },
  },
};

const BUCKLAND_DIRECT_USE_REVIEWS: Record<string, DirectUseReviewDecision> = {
  "ritual-buckland-candle-prepare-table": {
    presentation: {
      whyThisFits:
        "This keeps the Buckland table structure intact: quiet place, altar candles, incense, working candles, and a clear reverse-order close.",
    },
  },
  "ritual-candlelight-buckland-steadying-blue-meditation": {
    presentation: {
      bestWindow:
        "Any uninterrupted quiet period; the day candle may follow the day-color table.",
      whyThisFits:
        "The candle pattern gives quiet meditation a visible steadying shape and a clear reverse-order close.",
    },
  },
  "ritual-candlelight-buckland-releasing-habit-surrounded": {
    presentation: {
      whyThisFits:
        "The habit gets a visible center while the surrounding white candles move inward over time.",
    },
  },
  "ritual-candlelight-buckland-tending-home-settling": {
    presentation: {
      practice:
        "Set two altar candles at the back of the table. Set the petitioner candle in the center. Set the pink candle above the petitioner candle. Set the light-blue candle at the lower left and the orange candle at the lower right. Light the altar candles. Light incense. Sit for a moment and get clear about the disturbed condition being tended. Light the petitioner candle and say: \"This candle represents [Name]. As it burns, so burns its spirit.\" Light the light-blue, pink, and orange candles in that order. Name, in your own words, the peace, patience, affection, and warmth being called back into the house. End by saying: \"The home is peace; peace is the home.\" Sit for three to five minutes concentrating on settling the condition. Repeat your own wording and the final exact source line a second time, sit for three to five minutes, repeat them a third time, and sit for three to five minutes again. Extinguish the candles. Repeat on three consecutive nights.",
      whyThisFits:
        "The candle colors and three-night repetition give the disturbed condition a held place while peace, patience, affection, and warmth are named back into the home.",
    },
    ritualWords: [
      {
        mode: "source_exact_short",
        text: "This candle represents [Name]. As it burns, so burns its spirit.",
        citationLabel: "Buckland, Practical Candleburning Rituals",
        sourceLocation: "PDF p. 22",
        useContext: "spoken",
        note: "Short source line adapted for direct-use neutrality at user request.",
      },
      {
        mode: "source_exact_short",
        text: "The home is peace; peace is the home.",
        citationLabel: "Buckland, Practical Candleburning Rituals",
        sourceLocation: "PDF pp. 22-23",
        useContext: "spoken",
        note: "Short source line preserved verbatim.",
      },
    ],
  },
  "ritual-candlelight-buckland-marking-seven-night-increase": {
    presentation: {
      whyThisFits:
        "The seven-night structure lets readiness build visibly, one added purple flame at a time.",
    },
  },
  "ritual-candlelight-buckland-protecting-boundary-circle": {
    presentation: {
      headline: "Set the Boundary Light",
      practice:
        "Orient the table so the altar candles are at the back edge and the book or working text rests at the front edge. Set two altar candles at the back of the table, with any altar figure between them. Set the incense or censer forward of the altar figure, between the altar candles and the working candles. Set the petitioner candle in the center. Place white candle No. 1 above and to the right of the petitioner candle, white candle No. 2 immediately left of the petitioner candle, white candle No. 3 immediately right of the petitioner candle, and white candle No. 4 below and to the left of the petitioner candle. Place red candle No. 1 above and to the left of the petitioner candle, red candle No. 2 outside white candle No. 2 on the left, red candle No. 3 outside white candle No. 3 on the right, and red candle No. 4 below and to the right of the petitioner candle. Light altar candles Nos. 1 and 2. Light incense. Light the petitioner candle while picturing the petitioner dressed in white. Light white candles Nos. 1, 2, 3, and 4 while thinking of purity and truth. Light red candles Nos. 1, 2, 3, and 4 while thinking of strength, health, and power. Name, in your own words, what the circle is being asked to hold within it. Let the candles burn down until they go out.",
      bestWindow:
        "When a protective boundary wants a complete candle circle rather than a quick threshold act.",
      whyThisFits:
        "The white-and-red candle circle gives the named self or purpose a complete boundary of light.",
    },
  },
  "ritual-candlelight-buckland-remembering-photo-peace-light": {
    presentation: {
      practice:
        "Set two altar candles at the back of the table. Place a photograph of the deceased before the astral candle if one is being used. Set the astral candle for the deceased and one light-blue candle. Light the altar candles. Light incense. Light the astral candle while remembering the person as you knew them best. Light the light-blue candle while thinking of peace and tranquility. Name, in your own words, the peaceful memory the light is being asked to hold. Let the candles burn for a half hour, then extinguish them. Repeat every night for at least nine nights; continue longer only if the rite still asks for it.",
      whyThisFits:
        "The photograph, astral candle, blue candle, and nightly repetition make a plain container for remembrance without making claims about the dead.",
    },
  },
  "ritual-candlelight-buckland-blessing-object-in-light": {
    presentation: {
      headline: "Bless the Object in Light",
      practice:
        "Set two altar candles at the back of the table. Set one white candle to the left, the talisman or object in the center, and the purpose-colored candle to the right. Light the altar candles. Light incense. Light the white candle. Light the purpose-colored candle. Take up the object by the edge. Pass it three times through the white candle flame, turning it so both sides are touched by flame, and say: \"By fire do I cleanse this Talisman of any and all impurities that may dwell within it.\" Pass it three times through the incense smoke and say: \"And by the Gods I cense and cleanse it to be ready for my purpose.\" Hold it firmly in the dominant hand and name, in your own words, the work the object is being consecrated to carry. Pass it three times through the purpose candle flame. Lay it between the white candle and the purpose candle. Extinguish the flames. Let the object remain undisturbed for three hours before it is carried, worn, or returned to its place.",
      bestWindow:
        "When an object is being marked for a clear role and can receive fire, smoke, word, and rest.",
      whyThisFits:
        "White flame, incense, purpose flame, spoken words, and a rest period mark the object for its work.",
    },
  },
  "ritual-buckland-candle-courage-circle": {
    presentation: {
      practice:
        "Set two altar candles at the back of the table. Set the petitioner candle in the center. Set the white candle above the petitioner candle. Set orange candle No. 1 to the left, orange candle No. 2 below, and orange candle No. 3 to the right. Light the altar candles. Light incense. Concentrate on conquering fear. Light the petitioner candle while thinking of the petitioner. Light the white candle while thinking of strength and purity. Light orange candles Nos. 1, 2, and 3 while thinking of self-confidence, ability to overcome fear, and strength of personality. Name, in your own words, the courage being placed around the fear. Sit for five minutes in meditation. Extinguish the flames. Repeat every night for nine nights.",
      whyThisFits:
        "Fear gets a center while courage, confidence, and strength are placed around it for nine nights.",
    },
  },
  "ritual-buckland-candle-welcome-joy": {
    presentation: {
      whyThisFits:
        "The repeated inward movement of the red candles gives joy and warmth a visible way to come nearer.",
    },
  },
  "ritual-buckland-candle-purify-self": {
    presentation: {
      headline: "Purify the Self by Candle",
      practice:
        "Set two altar candles at the back of the table. Set the petitioner candle in the center. Set the pink candle above it and the white candle below it. Light the altar candles. Light incense. Light the petitioner candle and think of the petitioner. Light the pink candle and think of honor, uprightness, and morality. Light the white candle and think of sincerity, truth, and purity. Name, in your own words, the sincerity, truth, and symbolic purification the candles are holding. Sit quietly for five minutes thinking of symbolic purification. Say the same line a second time. Sit quietly for five minutes. Say it a third time. Sit quietly for five minutes again. Extinguish the candles. Repeat every three days for as long as desired.",
      whyThisFits:
        "The pink and white candles hold purification as sincerity, truth, and uprightness rather than shame.",
    },
  },
  "ritual-buckland-candle-clear-words": {
    presentation: {
      whyThisFits:
        "The three white candles give truth and clear speech a repeated form without turning the rite toward control.",
    },
  },
  "ritual-buckland-candle-dream-door": {
    presentation: {
      headline: "Open the Dream Door",
      practice:
        "Set two altar candles at the back of the table. Set the day candle at the front right. Set the petitioner candle in the center. Set the light-blue candle above-left of the petitioner candle. Set the white candle above-right of the petitioner candle. Set the orange candle below the petitioner candle. Light the altar candles. Light the day candle. Light incense. Light the petitioner candle and say: \"Here is [Name], the subject of this rite.\" Light the light-blue candle and say: \"Here burn Tranquility and Patience, necessary for the accomplishment of the desire.\" Light the orange candle and name, in your own words, the dream subject or desire it is being lit to hold. Light the white candle and say: \"For Truth in all that it sees, is this flame lit.\" Close your eyes for a few minutes and picture the petitioner or yourself surrounded by white light. Open your eyes and name, in your own words, what may be shown in the dream and carried back. Sit quietly for a few moments. Extinguish the candles. Perform at night before going to bed, when dreams are desired.",
      whyThisFits:
        "The bedtime candle sequence opens a dream container with tranquility, patience, desire, truth, and a clear flame close before sleep.",
    },
    ritualWords: [
      {
        mode: "source_exact_short",
        text: "Here is [Name], the subject of this rite.",
        citationLabel: "Buckland, Practical Candleburning Rituals",
        sourceLocation: "PDF p. 89",
        useContext: "spoken",
        note: "Short source line preserved verbatim.",
      },
      {
        mode: "source_exact_short",
        text: "Here burn Tranquility and Patience, necessary for the accomplishment of the desire.",
        citationLabel: "Buckland, Practical Candleburning Rituals",
        sourceLocation: "PDF p. 89",
        useContext: "spoken",
        note: "Short source line preserved verbatim.",
      },
      {
        mode: "source_exact_short",
        text: "For Truth in all that it sees, is this flame lit.",
        citationLabel: "Buckland, Practical Candleburning Rituals",
        sourceLocation: "PDF p. 89",
        useContext: "spoken",
        note: "Short source line adapted for direct-use neutrality at user request.",
      },
    ],
  },
};

const MAGICAL_HOUSEHOLD_DIRECT_USE_REVIEWS: Record<
  string,
  DirectUseReviewDecision
> = {
  "ritual-magical-household-center-house-mind": {
    presentation: {
      headline: "Center the House",
      whyThisFits:
        "This gives household magic a bodily beginning: hands, room, one named intention, and a touch that closes the gathering.",
    },
  },
  "ritual-magical-household-return-hearth": {
    presentation: {
      practice:
        "Choose the household stand-in for the hearth: a candle on the table, a small lamp, or the place where household warmth gathers. Set it in its usual place. Sit or stand nearby. Light the candle or turn on the lamp. Name one thing the home is holding tonight. Stay for three breaths. Close by extinguishing the candle or turning off the lamp when the moment is complete.",
      whyThisFits:
        "The candle, lamp, or warm gathering place lets the home return to its center without requiring an actual hearth.",
    },
  },
  "ritual-magical-household-sit-beside-flame": {
    presentation: {
      headline: "Sit With the Flame",
      practice:
        "Set one candle on a stable table, or sit beside a hearth flame if one is already present. Light the candle if using one. Sit where you can see the flame. Name one fear, worry, or restless thought that belongs to this moment. Look at the flame for nine slow breaths. Let the flame be present without asking it for an omen. Look away, feel your feet or hands, and extinguish the candle to close.",
      whyThisFits:
        "Fire-gazing becomes a short steadying rite here: one flame, one named worry, nine breaths, and a clear close.",
    },
  },
  "ritual-magical-household-threshold-stand": {
    presentation: {
      headline: "Renew the Threshold",
      whyThisFits:
        "The doorway holds both directions of the boundary: what is welcomed inward and what is left outside.",
    },
  },
  "ritual-magical-household-door-guardian-object": {
    presentation: {
      headline: "Set the Doorway Guardian",
      practice:
        "Choose one object already acceptable near the door: a bell, ribbon, small wreath, clean stone, key, or other household marker. Hold it at the threshold. Name the kind of guarding it will do: quiet, welcome, boundary, or reminder. Place the object near the door. Close by touching the doorframe once.",
      whyThisFits:
        "A single household object gives the doorway a visible job without turning the entry into clutter.",
    },
  },
  "ritual-magical-household-key-door": {
    presentation: {
      headline: "Hang the Key at the Door",
      practice:
        "Choose an old key, spare key, or symbolic key. Stand at the doorway. Hold the key in both hands and name what it guards: the privacy of the home, the quiet of the room, or the welcome of the threshold. Hang or place the key near the entrance. Touch the door once to close.",
      whyThisFits:
        "The key makes opening and closing visible, giving the entrance a small symbol for privacy, welcome, and boundary.",
    },
  },
  "ritual-magical-household-wash-windows-clear": {
    presentation: {
      practice:
        "Choose one window, mirror, or glass door pane. Wash it with the ordinary cleaner for that surface. Move from the center outward, or from top to bottom if that is how the glass cleans best. As the glass clears, name what can leave the house with the streaks: stale feeling, old argument, worry, or dullness. Dry the glass and put the cloth away to close.",
      whyThisFits:
        "The window or mirror becomes a real household opening: cleaned, named, dried, and returned to clarity.",
    },
  },
  "ritual-magical-household-working-rug": {
    presentation: {
      whyThisFits:
        "The rug, cloth, or mat gives the work a visible place to begin, hold its object, and close.",
    },
  },
  "ritual-magical-household-table-legs": {
    presentation: {
      headline: "Bless the Four Corners of the Table",
      whyThisFits:
        "Touching each leg or corner lets the table hold stability, food, conversation, and rest as one household surface.",
    },
  },
  "ritual-magical-household-green-living-room": {
    presentation: {
      headline: "Tend the Room Through the Plant",
      practice:
        "Choose one known plant already living in the room. Look at its leaves, soil, pot, and light. Do only the care it actually needs: water, turn, trim dead matter, wipe dust from leaves, or leave it alone. Place one hand near the pot and name the atmosphere you are tending: calm, welcome, clarity, or rest. Close by returning the watering can, cloth, or trimmings to their place.",
      whyThisFits:
        "One plant carries the room's living atmosphere through ordinary care: leaf, soil, light, and a named quality.",
    },
  },
  "ritual-magical-household-sweep-house-clean": {
    presentation: {
      whyThisFits:
        "Sweeping, dusting, or wiping gives release a direction through the room and out through the ordinary cleaning close.",
    },
  },
  "ritual-magical-household-four-elements-purification": {
    presentation: {
      headline: "Carry the Four Elements Through the House",
      practice:
        "Physically clean the rooms first. Open the inside doors and windows that can be opened for the rite. Gather a small bowl of salt, incense or another air symbol, one candle in a holder, and a small bowl of clean water. Begin near the main room or table. Carry the salt through the rooms and lightly gesture with it as the earth part of the working. Carry the incense or air symbol as the air part. Carry the lit or unlit candle as the fire part. Carry the water as the water part and flick only a few drops where the surface allows it. Return to the starting place. Close the open windows and doors when the house has aired and settled.",
      whyThisFits:
        "The house is purified by an ordered circuit of earth, air, fire, and water after ordinary cleaning has made the rooms ready.",
    },
  },
  "ritual-magical-household-leave-old-rooms-clear": {
    presentation: {
      headline: "Leave the Old Room Clear",
      whyThisFits:
        "The final sweep gives the old room a clean ending so what is finished can stay behind.",
    },
  },
  "ritual-magical-household-altar-place": {
    presentation: {
      headline: "Choose the Altar Place",
      whyThisFits:
        "A small cleared surface and one marking object give household magic a place that is distinct without being grand.",
    },
  },
  "ritual-magical-household-household-altar-tending": {
    presentation: {
      whyThisFits:
        "Dusting, removing, returning, and centering one object keeps the household altar alive without letting it become storage.",
    },
  },
};

const GREEN_GARDEN_DIRECT_USE_REVIEWS: Record<string, DirectUseReviewDecision> = {
  "ritual-green-garden-welcome-existing-plant": {
    presentation: {
      whyThisFits:
        "The rite begins with what is already alive in the home: pot, soil, leaves, light, ordinary care, and three breaths of recognition.",
    },
  },
  "ritual-green-garden-one-green-check-in": {
    presentation: {
      headline: "Check In With One Green Thing",
      whyThisFits:
        "This keeps plant care honest and small: look first, tend only what is needed, and leave the plant's place clean.",
    },
  },
  "ritual-green-garden-elements-sensing": {
    presentation: {
      headline: "Sense the Four Elements Around a Plant",
      whyThisFits:
        "The plant becomes a quiet way to notice earth, air, fire, and water as real conditions in the room.",
    },
  },
  "ritual-green-garden-plant-witness-greeting": {
    presentation: {
      whyThisFits:
        "The greeting treats the plant as a living witness: approached, observed, thanked, and left whole.",
    },
  },
  "ritual-green-garden-rededicate-plant-corner": {
    presentation: {
      headline: "Rededicate the Plant Place",
      practice:
        "Stand in the plant corner, windowsill, shelf, balcony container, or table space you want to reorient. Look at the plants and objects already there. Name, out loud or silently, what in this space still belongs. Name what no longer belongs. Remove trash, dead plant matter already detached, old labels, empty pots, or objects that no longer serve the plant place. Thank the old use of the space. Name the new purpose of the plant place in one sentence. Wipe the table, tray, sill, or shelf if it needs cleaning. Return the plants or objects that remain. Close by leaving the named purpose with the plants.",
      whyThisFits:
        "The plant place is reviewed, cleared, thanked, and given one new purpose without forcing a larger reset.",
    },
  },
  "ritual-green-garden-root-kitchen-scrap": {
    presentation: {
      practice:
        "Choose a kitchen scrap suited for regrowth, such as the base of celery, bok choy, cabbage, or a bulb onion root end. Use a clean scrap from food already being prepared. Place it root-end down in a shallow cup, jar, or small bowl with enough water to cover the root end but not drown the whole piece. Set the vessel on a windowsill or bright table. Change the water every day or two. Each time you change the water, name the regrowth you are waiting for. When roots show clearly, either transfer it to potting soil in a small container or close the experiment by composting it with thanks.",
      bestWindow:
        "When cooking leaves a suitable clean scrap and there is a bright place to watch it root.",
      whyThisFits:
        "A kitchen scrap becomes a visible threshold between discard and new growth through water, window light, and daily attention.",
    },
  },
  "ritual-green-garden-winter-indoor-green": {
    presentation: {
      whyThisFits:
        "The indoor plant carries a living thread through the resting season by receiving only the care it actually needs.",
    },
  },
  "ritual-green-garden-window-vessel-threshold": {
    presentation: {
      headline: "Set a Green Threshold at the Window",
      practice:
        "Choose one small plant suited to the light at the window. Place it in a stable pot or tray with drainage protection. Set it on the windowsill, window table, or window box where it can receive the light and air it needs. Turn the pot so the plant faces the light. Touch the pot and name the window as the place where this plant meets house and sky. Close by checking the pot, tray, and surface below it.",
      whyThisFits:
        "The window becomes a living threshold where pot, light, air, house, and sky meet.",
    },
  },
  "ritual-green-garden-garden-blessing": {
    presentation: {
      headline: "Bless the Plant Place",
      practice:
        "Use this for a small indoor plant place, container grouping, balcony planter, or garden bed that has already been physically cleaned. Gather simple representations of air, fire, water, and earth: moving air from an open window or fan, sunlight or an unlit candle as a fire symbol, a small cup of water, and a small dish of soil or the soil already in the pot. Place the four representations around or beside the plant place. Stand or sit before the plant place. Touch or gesture toward air, fire, water, and earth in that order. As each element is acknowledged, picture it supporting the plants in ordinary ways. Close by naming the plant place's purpose in one sentence and putting away any cup, dish, or candle symbol that should not remain there.",
      whyThisFits:
        "The blessing stays close to what plants actually live by: air, fire, water, earth, and a named place.",
    },
  },
  "ritual-green-garden-compost-old-leaf": {
    presentation: {
      practice:
        "Choose plant matter that is already dead, fallen, trimmed for ordinary care, or finished from a household plant or garden. Hold the dead leaf, spent bloom, or small trimming over a compost container, yard-waste bowl, or garden soil. Name what has finished and what it can feed next. Place the plant matter in compost, yard waste, or soil according to the household's normal plant-disposal practice. Wash your hands if soil, sap, compost, or plant residue touched your skin.",
      whyThisFits:
        "The dead leaf or spent bloom is returned as part of the cycle, not treated as failure.",
    },
  },
  "ritual-green-garden-welcome-new-plant": {
    presentation: {
      practice:
        "Before bringing a new plant fully into the household plant place, identify it and learn its care needs. Set the plant in its pot or nursery container on a tray or table. Look it over for stress, pests, soil condition, and water need. Do not repot immediately unless ordinary plant care calls for it. Touch the pot. Name the plant as known before it joins the household place. If the plant needs water, water it according to its care needs. If it does not, leave it alone. Put the plant in its chosen place and record its name and care needs.",
      intention: "Welcome a new plant into the home with attention, not impulse.",
      whyThisFits:
        "The plant is welcomed by being known first: name, pot, condition, care needs, and chosen place.",
    },
  },
  "ritual-green-garden-safe-offering-attention": {
    presentation: {
      headline: "Offer Attention, Not Obligation",
      practice:
        "Choose one plant or small plant place. Do not bring extra offerings unless the plant actually needs water. Stand or sit near the plant. Give it one minute of full attention: look at its color, new growth, soil, pot, and light. If the plant needs water, water it. If it does not, simply stay with it. Hum, sing softly, or speak one sentence of thanks if that feels natural. Close by leaving the plant clean, stable, and undisturbed.",
      whyThisFits:
        "Attention becomes the offering, and actual care matters more than adding objects to the plant.",
    },
  },
  "ritual-green-garden-harvest-gratitude": {
    presentation: {
      headline: "Thank the Harvest Without Taking More",
      practice:
        "Use this when there is already a plant harvest, fallen seed, finished bloom, kitchen herb clipping, or produce from a plant you are already tending. Do not take extra material for the ritual. Hold the harvest or place it on the table. Name where it came from: pot, window, balcony, garden bed, farmer, or household plant place. Thank the plant or plant place for what it gave. Record the date, plant or produce name, and how the household will use or preserve it. If the material will not be used, return it to compost or plant waste with thanks.",
      whyThisFits:
        "The harvest is marked as relationship: received, named, recorded, used, preserved, or returned.",
    },
  },
  "ritual-green-garden-record-page": {
    presentation: {
      headline: "Make the Green Record",
      practice:
        "Open the household green record, binder, notebook, or Moon & Table note. Make one entry for a plant or plant place. Record the date; plant name if known; where it lives; light, water, soil, and pot notes; what changed since the last entry; and what care was given today. Add one sentence about the plant's energy or mood as you sensed it, without treating that sentence as prophecy. Add a photo only if that is already part of the household record practice. Close the record and return it to its place.",
      intention: "Keep the plant relationship in memory and care.",
      whyThisFits:
        "The record turns plant tending into household memory: date, place, condition, care, and one sensed sentence.",
    },
  },
  "ritual-green-garden-living-energy-beside-plant": {
    presentation: {
      headline: "Stand Beside the Living Green",
      practice:
        "Choose one living plant or small garden place. Do not cut, pluck, or harvest anything. Stand or sit beside it. Center yourself and feel your own energy inside your body. Reach your attention toward the plant place as a neighbor, not as a source to drain. Ask silently whether this is a good moment to stand with its living energy. If the answer feels like no, thank it and stop. If the answer feels open, breathe with the plant for five slow breaths. Imagine standing next to its living vitality rather than pulling it into yourself. Thank the plant and close by leaving it whole.",
      whyThisFits:
        "The rite keeps contact non-extractive: stand near the plant's vitality, breathe with it, thank it, and leave it whole.",
    },
  },
  "ritual-green-garden-meditation": {
    presentation: {
      headline: "Sit Where the Garden Can Speak",
      practice:
        "Choose a place near a plant, container garden, plant shelf, balcony planter, or outdoor garden where you can sit without damaging the plants. Sit comfortably. Center and ground. Let your thoughts become quieter. Let the energy of the plant place move around you without trying to force a message. If you feel stirred, listen for image, emotion, or thought, but do not treat it as certainty. If nothing comes, let the meditation simply be time beside the garden. When you are finished, thank the plant place. Touch the ground, pot, floor, or table to return fully to the room. Record one sentence only if a sentence is useful.",
      whyThisFits:
        "The garden is allowed to be present without performing; the close returns attention to pot, ground, floor, or table.",
    },
  },
};

const WHITEHURST_FLOWER_METHOD_DIRECT_USE_REVIEWS: Record<
  string,
  DirectUseReviewDecision
> = {
  "whitehurst-flower-on-the-table": {
    presentation: {
      headline: "Set One Flower on the Table",
      practice:
        "Choose one household flower. Put it in a small vase or bowl and set it at the table. Name what this table moment is marking in one sentence. Let the flower witness the meal, evening, or work period. Close by leaving the flower in place until the table is next cleared.",
      whyThisFits:
        "One flower, one vessel, and one sentence are enough to let the table be witnessed without making a larger rite.",
    },
  },
  "whitehurst-vase-as-witness": {
    presentation: {
      headline: "Let the Vase Witness the Room",
      practice:
        "Place a bouquet or single flower in fresh water. Hold the vase briefly with both hands and name the atmosphere it is asked to witness: welcome, repair, courage, tenderness, or celebration. Set the vase where the household will pass it more than once. Close when the vase is set down and the flowers are left to do their work.",
      whyThisFits:
        "The vase gives the chosen atmosphere a visible place in the room, held by flower, water, and repeated passing.",
    },
  },
  "whitehurst-bowl-of-petals": {
    presentation: {
      headline: "Put Petals in a Bowl",
      practice:
        "Place petals or one whole blossom in a small bowl. Set the bowl at the table or altar-place. Name the purpose in one plain sentence. Leave the bowl where it can mark the place. Close by touching the rim once and letting the bowl stay still.",
      whyThisFits:
        "Petals and bowl give a purpose a small place to rest without needing explanation.",
    },
  },
  "whitehurst-bouquet-with-intention": {
    presentation: {
      headline: "Send the Intention Into the Bouquet",
      practice:
        "Put a purchased or gathered bouquet in water. Sit or stand before it until the room settles. Bring one household intention to mind and let the feeling of it move toward the blossoms. Set the bouquet where it can be seen. Close by stepping away without adding a second intention.",
      whyThisFits:
        "The bouquet receives one intention before placement, then carries it through visible presence.",
    },
  },
  "whitehurst-blossom-contemplation": {
    presentation: {
      headline: "Sit With the Blossom",
      practice:
        "Sit or stand near a living blossom or fresh flower. Let your body settle and look at the flower until the moment becomes quiet. Present one concern, question, or desire silently. Listen without forcing an answer. Close by thanking the flower and writing one phrase if something should be remembered.",
      whyThisFits:
        "The flower receives the question first, giving attention a quieter place before the mind answers.",
    },
  },
  "whitehurst-short-spoken-purpose": {
    presentation: {
      headline: "Speak the Flower's Purpose Once",
      practice:
        "Put one flower where you can see it. Breathe until the sentence is simple. Name aloud what the flower is here to hold. Repeat the sentence once more, softer. Close by leaving the flower in place and refusing to elaborate.",
      whyThisFits:
        "The spoken sentence enters the flower and stays there, without turning into a speech or charm.",
    },
  },
  "whitehurst-journal-after-flower": {
    presentation: {
      headline: "Record What the Flower Held",
      whyThisFits:
        "The record gives the flower's work one line of household memory before the feeling turns into summary.",
    },
  },
  "whitehurst-ask-before-gathering": {
    presentation: {
      headline: "Ask Before Gathering",
      whyThisFits:
        "The gathering begins with attention and restraint: ask, wait for openness or closure, take only what is needed, and thank the plant.",
    },
  },
  "whitehurst-small-offering": {
    presentation: {
      headline: "Return Thanks to the Flower",
      practice:
        "After gathering a flower or receiving its help, return to the plant or its place. Offer clean water or another simple token. Name thanks plainly. Do not make the offering large. Close when the offering is placed or poured and the plant is left alone.",
      whyThisFits:
        "The rite closes the exchange by returning a small measure of care to the plant or its place.",
    },
  },
  "whitehurst-choose-by-affinity": {
    presentation: {
      headline: "Let the Flower Choose First",
      whyThisFits:
        "Attraction becomes part of selection before correspondence turns the choice into lookup.",
    },
  },
  "whitehurst-ask-the-flower-here": {
    presentation: {
      headline: "Ask the Flower That Is Here",
      practice:
        "When the exact flower is not in the flower list, sit with the available flower instead. Look at it without trying to identify a perfect meaning. Ask inwardly what it is offering. Write one practical phrase from the answer. Close by using that phrase as the flower's working meaning for this household rite.",
      bestWindow: "When the available flower is not covered by the flower list.",
      whyThisFits:
        "The present flower is allowed to speak before the book becomes a limit.",
    },
  },
  "whitehurst-receive-flower-quality": {
    presentation: {
      headline: "Receive the Flower's Quality",
      practice:
        "Sit or stand with a blossom. Name the quality being asked for: confidence, elegance, steadiness, clarity, or another quality that belongs to this flower rite. Look at the flower and ask it to share that quality. Stay until the asking feels complete. Close by offering clean water at the roots or by refreshing the vase water.",
      bestWindow: "When a flower quality is needed before a task or threshold.",
      whyThisFits:
        "One named quality is received through attention to the flower and closed with water at root or vase.",
    },
  },
};

const WHITEHURST_FLOWER_CORRESPONDENCE_DIRECT_USE_REVIEWS: Record<
  string,
  DirectUseReviewDecision
> = {
  "whitehurst-aster-threshold": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Place Aster at the Threshold",
      whyThisFits:
        "Aster gives a beginning a visible edge: flower, threshold, named first step, and crossing.",
    },
  },
  "whitehurst-chamomile-room": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Set Chamomile for the Room",
      whyThisFits:
        "Chamomile makes gentleness visible in the gathering place before anyone explains anything.",
    },
  },
  "whitehurst-carnation-beside-memory": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Set Carnation Beside the Memory",
      whyThisFits:
        "Carnation holds memory beside the life still being lived, with one blessing for each.",
    },
  },
  "whitehurst-pressed-forget-me-not": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Press the Forget-Me-Not",
      whyThisFits:
        "The pressed flower lets remembrance become small, dated, and kept without becoming a long story.",
    },
  },
  "whitehurst-freesia-clarity-bouquet": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Let Freesia Hold the Question",
      whyThisFits:
        "Freesia stands beside the question while clarity is given room to arrive.",
    },
  },
  "whitehurst-geranium-truth": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Ask Geranium for the Truth",
      whyThisFits:
        "Geranium gives truth a flower, a table, and one honest sentence instead of an argument.",
    },
  },
  "whitehurst-heather-memory-place": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Make a Heather Memory Place",
      whyThisFits:
        "Heather turns memory into a small place for gratitude, learning, and one night of attention.",
    },
  },
  "whitehurst-hydrangea-boundary-bowl": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Let Hydrangea Hold the Boundary",
      whyThisFits:
        "Hydrangea gives sensitivity a boundary at the table or entry without fear.",
    },
  },
  "whitehurst-iris-message": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Set Iris Beside the Message",
      whyThisFits:
        "Iris holds the bridge between words and receiver while the message is read, folded, sent, or set down.",
    },
  },
  "whitehurst-lilac-remembers-house": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Let Lilac Remember the House",
      whyThisFits:
        "Lilac bridges sweetness the house has known before with sweetness being invited now.",
    },
  },
  "whitehurst-daisy-clears-table": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Clear the Table With Daisies",
      whyThisFits:
        "Daisies give the table permission to return to one clear thing.",
    },
  },
  "whitehurst-dandelion-wish-breath": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Give the Wish to Dandelion",
      whyThisFits:
        "Dandelion turns a wish into offering through breath, seed logic, and release.",
    },
  },
  "whitehurst-marigold-offering-bowl": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Set Marigold in an Offering Bowl",
      whyThisFits:
        "Marigold gives honor and blessing a bright bowl at the table or altar-place.",
    },
  },
  "whitehurst-narcissus-morning-vase": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Wake the Morning Vase",
      whyThisFits:
        "Narcissus marks what is waking in the household through first light, vase, and one touch.",
    },
  },
  "whitehurst-pansy-reflection-bowl": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Float Pansy for Reflection",
      whyThisFits:
        "Pansy and still water give one reflective question a place to soften before an answer is written.",
    },
  },
  "whitehurst-rose-as-witness": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Let One Rose Witness the Words",
      whyThisFits:
        "The rose holds the center while words are spoken freely, received, and left in the room.",
    },
  },
  "whitehurst-flower-message": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Send One Flower as Message",
      whyThisFits:
        "A flower carries one clean message without persuasion: thanks, welcome, remembrance, apology, listening, or tenderness.",
    },
  },
  "whitehurst-return-flower-earth": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Return the Flower to Earth",
      practice:
        "When a ritual flower has faded, hold it briefly and name what is complete. Return it to compost, garden earth, or another place that can receive it. If outdoor return is not appropriate, wrap it and discard it respectfully. Close by washing or brushing off your hands and leaving the place.",
      whyThisFits:
        "The flower's work closes by naming completion and returning the spent blossom.",
    },
  },
  "whitehurst-single-blossom-altar": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Make a Single-Blossom Altar",
      whyThisFits:
        "One blossom in water keeps the altar simple enough for the purpose to stay clear.",
    },
  },
  "whitehurst-sunflower-opens-room": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Let Sunflower Open the Room",
      whyThisFits:
        "Sunflower turns the room toward warmth, light, and visible strength.",
    },
  },
  "whitehurst-tulip-thanks": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Put Thanks in the Tulip Vase",
      whyThisFits:
        "Tulip lets gratitude come before request by naming three blessings already present.",
    },
  },
  "whitehurst-tuberose-reading-table": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Set Tuberose on the Reading Table",
      whyThisFits:
        "Tuberose keeps intuition embodied at the table before a card pull, journal question, or check-in.",
    },
  },
  "whitehurst-water-lily-still-bowl": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Let Water Lily Cool the Moment",
      whyThisFits:
        "Water lily and still water cool the moment before speech, decision, or conversation.",
    },
  },
  "whitehurst-tend-flower-intention": {
    cleanup: "whitehurstFlower",
    presentation: {
      headline: "Tend the Flower, Tend the Intention",
      whyThisFits:
        "Plant care and intention care move in parallel: what the plant needs next, and what the intention needs next.",
    },
  },
};

const MOON_BOOK_DIRECT_USE_REVIEWS: Record<string, DirectUseReviewDecision> = {
  "candidate.moon_book.lunation_map_one_desire": {
    cleanup: "moonBook",
    presentation: {
      headline: "Map One Desire Through the Moon",
      whyThisFits:
        "The lunar cycle gives one desire four stations: beginning, building, fullness, and release.",
    },
  },
  "candidate.moon_book.new_moon_table_seed": {
    cleanup: "moonBook",
    presentation: {
      headline: "Set the Seed on the Dark Table",
      whyThisFits:
        "The dark bowl and folded paper give a new beginning a protected place before it has to grow.",
    },
  },
  "candidate.moon_book.new_moon_altar_base": {
    cleanup: "moonBook",
    presentation: {
      headline: "Build the Altar for One Lunar Cycle",
      whyThisFits:
        "One surface holds the month: lunar object, cloth, bowl, written focus, and enough space around them.",
    },
  },
  "candidate.moon_book.seed_pot_intention": {
    cleanup: "moonBook",
    presentation: {
      headline: "Plant the Intention Where It Can Grow",
      whyThisFits:
        "The intention is given a living thing to tend, plus one real action after the rite ends.",
    },
  },
  "candidate.moon_book.salt_bath_or_shower": {
    cleanup: "moonBook",
    presentation: {
      headline: "Wash the Old Month Off First",
      whyThisFits:
        "Water, salt, and a named release make the body a threshold before the new intention is set.",
    },
  },
  "candidate.moon_book.spell_motive_table": {
    cleanup: "moonBook",
    presentation: {
      headline: "Ask the Spell What It Really Wants",
      whyThisFits:
        "The three questions clarify desire before ritual force is given to it.",
    },
  },
  "candidate.moon_book.grimoire_after_spell": {
    cleanup: "moonBook",
    presentation: {
      headline: "Leave Pages Open for the Moon to Answer",
      whyThisFits:
        "The ritual gets a dated record and blank space for later evidence, images, and changes.",
    },
  },
  "candidate.moon_book.waxing_one_thread": {
    cleanup: "moonBook",
    presentation: {
      headline: "Follow One Thread While the Moon Grows",
      whyThisFits:
        "Waxing growth becomes motion: one thread, one object, and one real action at a time.",
    },
  },
  "candidate.moon_book.waxing_symbol_watch": {
    cleanup: "moonBook",
    presentation: {
      headline: "Let a Sign Find You Twice",
      whyThisFits:
        "The page holds a repeated symbol without forcing its meaning too early.",
    },
  },
  "candidate.moon_book.waxing_visible_step": {
    cleanup: "moonBook",
    presentation: {
      headline: "Take One Visible Step",
      whyThisFits:
        "The written intention becomes one small real action before the day ends.",
    },
  },
  "candidate.moon_book.full_moon_mirror": {
    cleanup: "moonBook",
    presentation: {
      headline: "Stand Where the Light Can Show You",
      whyThisFits:
        "Mirror, light, and one named truth let the full Moon reveal what has become visible.",
    },
  },
  "candidate.moon_book.full_moon_table_witness": {
    cleanup: "moonBook",
    presentation: {
      headline: "Put the Harvest on the Table",
      whyThisFits:
        "One object from the cycle becomes a witness to what ripened, even if the work is not finished.",
    },
  },
  "candidate.moon_book.full_moon_tarot_three_cards": {
    cleanup: "moonBook",
    presentation: {
      headline: "Pull Three Cards Under the Full Moon",
      whyThisFits:
        "The three cards give the full Moon a simple pattern: need, support, release or integration.",
    },
  },
  "candidate.moon_book.waning_release_one_extra": {
    cleanup: "moonBook",
    presentation: {
      headline: "Let One Extra Leave With the Light",
      whyThisFits:
        "The waning bowl holds one unnecessary weight overnight, then lets it leave plainly.",
    },
  },
  "candidate.moon_book.waning_rest_bowl": {
    cleanup: "moonBook",
    presentation: {
      headline: "Give the Work a Rest Bowl",
      whyThisFits:
        "The empty bowl makes rest part of the work instead of proof that the work failed.",
    },
  },
  "candidate.moon_book.waning_goodbye_note": {
    cleanup: "moonBook",
    presentation: {
      headline: "Say Goodbye to One Old Belief",
      whyThisFits:
        "The belief is named, thanked for what it tried to protect, and released through paper, water, or trash.",
    },
  },
  "candidate.moon_book.dark_moon_void_table": {
    cleanup: "moonBook",
    presentation: {
      headline: "Keep the Table Empty on Purpose",
      whyThisFits:
        "The empty table honors the void as a real phase instead of rushing to fill it.",
    },
  },
  "candidate.moon_book.dark_moon_dream_record": {
    cleanup: "moonBook",
    presentation: {
      headline: "Ask the Dark for One Image",
      whyThisFits:
        "The question is placed beside sleep, and the morning record stays as small as one image, feeling, word, or fragment.",
    },
  },
  "candidate.moon_book.dark_moon_rebirth_token": {
    cleanup: "moonBook",
    presentation: {
      headline: "Choose the Token That Survives the Dark",
      whyThisFits:
        "Three ordinary objects become one sign of what is allowed to return changed.",
    },
  },
  "candidate.moon_book.imperfect_timing_adaptation": {
    cleanup: "moonBook",
    presentation: {
      headline: "Use the Phase You Actually Have",
      whyThisFits:
        "The actual Moon phase shapes one honest adjustment instead of making timing perfection the gate.",
    },
  },
  "candidate.moon_book.cycle_close_and_begin_again": {
    cleanup: "moonBook",
    presentation: {
      headline: "Close the Lunation Before Starting Over",
      whyThisFits:
        "The cycle becomes memory through three closing lines before the next intention begins.",
    },
  },
};

const DOMINGUEZ_DIRECT_USE_REVIEWS: Record<string, DirectUseReviewDecision> = {
  "candidate.dominguez.astrology-journal-timing-record": {
    presentation: {
      headline: "Keep the Timing Beside the Work",
      whyThisFits:
        "The notebook keeps timing symbolic and specific: one real timing signal, one reason it matters, and less noise around the rite.",
    },
  },
  "candidate.dominguez.glyph-as-mark": {
    presentation: {
      headline: "Trace One Planetary Mark",
      whyThisFits:
        "A single glyph gives the ritual one planetary tone without turning the whole practice into an astrology lesson.",
    },
  },
  "candidate.dominguez.planetary-card-attunement": {
    presentation: {
      headline: "Set the Day's Planet on the Table",
      whyThisFits:
        "The card makes planetary timing visible through one glyph, one image, and one day of attention.",
    },
  },
  "candidate.dominguez.seven-day-planetary-cycle": {
    presentation: {
      headline: "Move Through the Seven Lights",
      whyThisFits:
        "A seven-day round lets each elder planet take one turn at the center of the table.",
    },
  },
  "candidate.dominguez.planetary-hour-support": {
    presentation: {
      headline: "Let the Hour Lend One Color",
      whyThisFits:
        "The planetary hour becomes one supporting mark or color, while the ritual purpose stays in charge.",
    },
  },
  "candidate.dominguez.moon-phase-timing-check": {
    presentation: {
      headline: "Choose What the Moon Is Doing",
      whyThisFits:
        "The Moon phase shapes the action as building, revealing, dissolving, or turning without overruling the reason for the rite.",
    },
  },
  "candidate.dominguez.moon-sign-tone": {
    presentation: {
      headline: "Let the Moon Sign Choose the Accent",
      practice:
        "Look up the Moon's sign. Choose one tone from that sign: beauty, detail, hearth, courage, depth, structure, dream, or another quality that belongs to it. Add that tone through one material, one word, or one gesture. Do not change the ritual's purpose; let the sign color how it is done.",
      whyThisFits:
        "The sign adds one tone through material, word, or gesture without taking over the ritual's purpose.",
    },
  },
  "candidate.dominguez.void-moon-softening": {
    presentation: {
      headline: "Let the Void Moon Make It Smaller",
      whyThisFits:
        "Void timing turns the rite toward review, dream, release, or quiet symbolic action instead of treating the moment as unusable.",
    },
  },
  "candidate.dominguez.aspect-before-peak": {
    presentation: {
      headline: "Begin While the Aspect Is Building",
      whyThisFits:
        "The ritual steps into the current before culmination, while the grimoire keeps the two planets and their purpose clear.",
    },
  },
  "candidate.dominguez.retrograde-foundation": {
    presentation: {
      headline: "Turn Retrograde Toward the Foundations",
      whyThisFits:
        "Retrograde timing gives the work a form for review, preparation, retracing, and what should wait.",
    },
  },
  "candidate.dominguez.change-details-not-date": {
    presentation: {
      headline: "Adjust the Table to the Sky You Have",
      whyThisFits:
        "When the date cannot move, the table can still lean with the moment through one or two ritual details.",
    },
  },
  "candidate.dominguez.conditions-as-outline": {
    presentation: {
      headline: "Let the Timing Give the Outline",
      whyThisFits:
        "The sky becomes a practical outline: one opening, one material gesture, one sentence, and one close.",
    },
  },
  "candidate.dominguez.planetary-representation": {
    presentation: {
      headline: "Give the Planet a Small Body",
      whyThisFits:
        "A glyph card, color, stone, word, or small object lets planetary support enter the table and leave when the rite is done.",
    },
  },
};

const ANAND_DIRECT_USE_REVIEWS: Record<string, DirectUseReviewDecision> = {
  "candidate.anand.practice_night_commitment": {
    presentation: {
      headline: "Give Practice Night a Place",
      whyThisFits:
        "The calendar gives shared practice a real time without making the night feel like homework.",
    },
  },
  "candidate.anand.read_the_steps_together": {
    presentation: {
      whyThisFits:
        "Reading once and keeping only three cue words lets the practice be understood without dragging the instructions into the room.",
    },
  },
  "candidate.anand.name_boundary_kindly": {
    presentation: {
      whyThisFits:
        "Yes, no, and maybe make the room clearer, warmer, and more alive before desire has to carry anything.",
    },
  },
  "candidate.anand.afterglow_grimoire": {
    presentation: {
      whyThisFits:
        "A date, sensation, image, and one remembered thing let the afterglow leave a trace before analysis flattens it.",
    },
  },
  "candidate.anand.make_circle_for_us": {
    presentation: {
      headline: "Make the Circle for the Two of You",
      whyThisFits:
        "Four markers, one center light, and one shared object let the room become a container for the practice.",
    },
  },
  "candidate.anand.light_shared_altar": {
    presentation: {
      whyThisFits:
        "One light and one relationship object gather the room before conversation, symbol work, or touch begins.",
    },
  },
  "candidate.anand.lay_markers": {
    presentation: {
      headline: "Mark the Practice Space",
      whyThisFits:
        "Four ordinary objects tell the room where the practice begins and where ordinary use returns afterward.",
    },
  },
  "candidate.anand.speak_purpose": {
    presentation: {
      headline: "Speak One Purpose",
      whyThisFits:
        "One plain sentence gives the ritual a reason to exist and keeps the night from carrying too many intentions.",
    },
  },
  "candidate.anand.melting_hug": {
    presentation: {
      whyThisFits:
        "A chosen embrace lets the body arrive before either person has to explain what has changed.",
    },
  },
  "candidate.anand.heart_salutation": {
    presentation: {
      headline: "Close With the Heart Salutation",
      whyThisFits:
        "A hand to the heart gives the practice a clean ending and honors what was present before the room changes back.",
    },
  },
  "candidate.anand.remember_time_magic": {
    presentation: {
      whyThisFits:
        "A remembered magical moment can lend one living quality to a practice that has gone dry or too practical.",
    },
  },
  "candidate.anand.tell_me_noticed": {
    presentation: {
      whyThisFits:
        "Noticing and appreciation turn attention into a gift without making the practice into a review.",
    },
  },
  "candidate.anand.laugh_room_open": {
    presentation: {
      whyThisFits:
        "Laughter, sound, or even the attempt loosens stiffness so the room can stop performing seriousness.",
    },
  },
  "candidate.anand.choose_shared_want": {
    presentation: {
      whyThisFits:
        "The shared overlap becomes the thing the ritual serves, even if that overlap is small.",
    },
  },
  "candidate.anand.say_desire_plainly": {
    presentation: {
      whyThisFits:
        "A desire small enough to say plainly is easier to carry into symbol work, altar placement, or shared practice.",
    },
  },
  "candidate.anand.draw_shared_sign": {
    presentation: {
      whyThisFits:
        "Two hands make one sign for the relationship, stopping before the symbol has to become clever or pretty.",
    },
  },
  "candidate.anand.place_symbol_altar": {
    presentation: {
      headline: "Place the Symbol on the Table",
      whyThisFits:
        "The drawn sign becomes a ritual object when it is placed, named, and allowed to gather the room around it.",
    },
  },
  "candidate.anand.shared_vision_question": {
    presentation: {
      whyThisFits:
        "The page separates private vision from shared vision, then lets only the mutual words move forward.",
    },
  },
  "candidate.anand.name_tonights_intention": {
    presentation: {
      whyThisFits:
        "Tonight gets one intention that can fit inside the actual room, instead of asking the evening to hold the whole future.",
    },
  },
  "candidate.anand.prepare_candlelit_room": {
    presentation: {
      whyThisFits:
        "Candle, symbol, water, and quiet mark the room as private before the next practice begins.",
    },
  },
  "candidate.anand.cross_day_night": {
    presentation: {
      whyThisFits:
        "Hands, water, and doorway make an ordinary threshold between the day and the shared ritual room.",
    },
  },
  "candidate.anand.speak_before_circle": {
    presentation: {
      whyThisFits:
        "Naming what might complicate connection lets tenderness enter the circle before the work begins.",
    },
  },
  "candidate.anand.clarify_nights_work": {
    presentation: {
      headline: "Clarify the Night's Work",
      whyThisFits:
        "Four answers make the practice legible: purpose, object, length, and close.",
    },
  },
  "candidate.anand.greet_as_sacred": {
    presentation: {
      whyThisFits:
        "The greeting recognizes the person in the room before performance, expectation, or technique can take over.",
    },
  },
  "candidate.anand.gaze_symbol_together": {
    presentation: {
      whyThisFits:
        "Looking at the symbol together lets it hold the room's direction before the rest of the practice unfolds.",
    },
  },
  "candidate.anand.come_back_room": {
    presentation: {
      whyThisFits:
        "Floor, place-name, water, and a small gesture help the body return after intensity.",
    },
  },
  "candidate.anand.water_between_us": {
    presentation: {
      headline: "Set Water Between You",
      whyThisFits:
        "The water becomes a visible witness for what the room is holding, then leaves cleanly at the close.",
    },
  },
  "candidate.anand.keep_symbol_warm": {
    presentation: {
      whyThisFits:
        "Returning to the symbol lets it gather memory across practice nights instead of ending as a one-time drawing.",
    },
  },
  "candidate.anand.partner_dance_witness": {
    presentation: {
      whyThisFits:
        "Chosen roles, one witness, and a clean close let the body be offered without turning the rite into performance.",
    },
  },
  "candidate.anand.shared_symbol_lovemaking": {
    presentation: {
      whyThisFits:
        "The shared symbol gives desire one visible place before touch carries the intention.",
    },
  },
  "candidate.anand.body_symbol_charge": {
    presentation: {
      whyThisFits:
        "The symbol receives body attention and then returns to the altar, journal, or bedside with a clear close.",
    },
  },
  "candidate.anand.magical_congress_container": {
    presentation: {
      whyThisFits:
        "Candle, water, symbol, body, and closing action give the explicit shared rite a bounded container.",
    },
  },
};

const SAINT_THOMAS_DIRECT_USE_REVIEWS: Record<string, DirectUseReviewDecision> = {
  "candidate.saint_thomas.grimoire_record_after_rite": {
    presentation: {
      headline: "Record the Spell Before It Scatters",
      whyThisFits:
        "The grimoire catches what happened, what was used, and what changed before the rite dissolves into ordinary memory.",
    },
  },
  "candidate.saint_thomas.intimate_altar_table": {
    presentation: {
      headline: "Set the Private Altar Before the Rite",
      whyThisFits:
        "A candle or lamp, clean cloth, and one body object give private work a visible center before anything moves.",
    },
  },
  "candidate.saint_thomas.confidence_sigil_candle": {
    presentation: {
      headline: "Mark Confidence Into One Small Light",
      whyThisFits:
        "The sigil lets confidence become a mark the body can stand near, held under light instead of explained.",
    },
  },
  "candidate.saint_thomas.figure_candle_body_kindness": {
    presentation: {
      headline: "Let One Harsh Body Thought Loosen",
      whyThisFits:
        "Paper, water, and a nearby light give one harsh thought a way out before the body has to answer it.",
    },
  },
  "candidate.saint_thomas.digital_boundary_container": {
    presentation: {
      headline: "Put the Screen Outside the Circle",
      whyThisFits:
        "The bowl and salt hold the attention-pull in one place so the body can return to the room.",
    },
  },
  "candidate.saint_thomas.desire_question_journal": {
    presentation: {
      headline: "Ask Desire What It Actually Wants",
      whyThisFits:
        "The page lets desire answer in three plain sentences before it gets turned into a plan.",
    },
  },
  "candidate.saint_thomas.flame_courage_invitation": {
    presentation: {
      headline: "Burn the Fear Before the Invitation",
      practice:
        "Write the fear that keeps the invitation small. Place the paper in a fire-safe dish. Touch a candle or lamp on, then burn the paper in the dish or tear it. Close when the dish is empty and the invitation has not been spoken yet.",
      whyThisFits:
        "Fear leaves first, so courage can arrive before the ask has to be made.",
    },
  },
  "candidate.saint_thomas.bedroom_leaf_blessing": {
    presentation: {
      headline: "Give the Bedroom One Clear Blessing",
      whyThisFits:
        "Water, leaf, and light give the bedroom one charge to hold through the night.",
    },
  },
  "candidate.saint_thomas.self_acceptance_ribbon": {
    presentation: {
      headline: "Tie Acceptance to One Private Object",
      whyThisFits:
        "Ribbon, garment, or private object lets acceptance become something the body can touch and return to.",
    },
  },
  "candidate.saint_thomas.cut_toxic_cycle_string": {
    presentation: {
      headline: "Cut One Cycle Down to One Line",
      whyThisFits:
        "Writing the cycle, cutting the string, and emptying the hands let the pattern stop receiving new thread.",
    },
  },
  "candidate.saint_thomas.mirror_glamour_self_gaze": {
    presentation: {
      headline: "Let the Mirror Receive the Bold Face",
      whyThisFits:
        "Adornment and one clean look let beauty be received before inspection starts arguing with it.",
    },
  },
  "candidate.saint_thomas.scarlet_bath_candle": {
    presentation: {
      headline: "Let the Bath Carry One Red Thread",
      whyThisFits:
        "Warm color, water, and light give wanting a softer door into the body.",
    },
  },
  "candidate.saint_thomas.first_date_threshold_blessing": {
    presentation: {
      headline: "Bless the Leaving Before the Date",
      whyThisFits:
        "The carried object and doorframe mark what crosses the threshold with you.",
    },
  },
  "candidate.saint_thomas.devil_death_table_naming": {
    presentation: {
      headline: "Place the Hard Thing Where It Can Be Seen",
      whyThisFits:
        "The table gives the hard image a place to be witnessed without letting it become a verdict.",
    },
  },
  "candidate.saint_thomas.just_sex_boundary_string": {
    presentation: {
      headline: "Tie the Private Intention Before It Mixes",
      whyThisFits:
        "The tied paper gives a private desire a clear edge and names what the rite is not asking for.",
    },
  },
  "candidate.saint_thomas.sex_positive_candle_prayer": {
    presentation: {
      headline: "Let One Candle Witness Pleasure",
      practice:
        "Set one candle or lamp on the table. Say a brief blessing for adult pleasure in your own words. Keep the words under one breath. Close by touching the table and letting the light stand without more explanation.",
      whyThisFits:
        "The light lets pleasure be blessed plainly, without defense or apology.",
    },
  },
  "candidate.saint_thomas.erotic_sigil_light": {
    presentation: {
      headline: "Give Private Desire One Sigil and One Light",
      practice:
        "Write the private desire as a short sentence. Reduce it into a mark. Place the mark under a candle or lamp with a little sweetness beside it if already in the house. Close by folding the mark away.",
      whyThisFits:
        "The sigil lets desire become a sign under light, not a demand on the room.",
    },
  },
  "candidate.saint_thomas.two_candles_desire_clarity": {
    presentation: {
      headline: "Let Two Lights Hold the Edge of Desire",
      whyThisFits:
        "Two lights make space for desire to become language before it becomes action.",
    },
  },
  "candidate.saint_thomas.apple_fantasy_container": {
    presentation: {
      headline: "Give the Fantasy One Apple",
      whyThisFits:
        "The apple holds fantasy as image and symbol, without turning it into an assignment.",
    },
  },
  "candidate.saint_thomas.private_object_consecration": {
    presentation: {
      headline: "Consecrate the Private Object Before Use",
      whyThisFits:
        "Cloth, light, and a named kind of care let the object belong to tending before use.",
    },
  },
  "candidate.saint_thomas.rose_fantasy_witness": {
    presentation: {
      headline: "Let the Rose Witness the Fantasy Once",
      whyThisFits:
        "The flower gives fantasy beauty and a boundary at the same time.",
    },
  },
  "candidate.saint_thomas.partner_shared_intention_light": {
    presentation: {
      headline: "Place One Shared Intention Between You",
      bestWindow: "Before shared private time or a connecting rite.",
      whyThisFits:
        "The light holds the shared phrase between two people before either one has to carry it alone.",
    },
  },
  "candidate.saint_thomas.dry_spell_water_release": {
    presentation: {
      headline: "Let Dry-Spell Fear Leave Through Water",
      whyThisFits:
        "The bowl gives scarcity or comparison a way out without making the body prove anything tonight.",
    },
  },
  "candidate.saint_thomas.paired_candle_repair": {
    presentation: {
      headline: "Give Repair Two Lights",
      whyThisFits:
        "Two lights and one clean sentence let repair have warmth without becoming a long talk.",
    },
  },
  "candidate.saint_thomas.jealousy_blue_candle_page": {
    presentation: {
      headline: "Give Jealousy One Blue Page",
      whyThisFits:
        "The blue object and closed notebook hold jealousy still enough to ask what it is guarding.",
    },
  },
  "candidate.saint_thomas.forgiveness_flower_bath": {
    presentation: {
      headline: "Let Forgiveness Touch Water Before Speech",
      whyThisFits:
        "Flower, cloth, and water let forgiveness be approached as contact before it becomes obligation.",
    },
  },
  "candidate.saint_thomas.clear_communication_goblet": {
    presentation: {
      headline: "Let Water Hold the Sentence First",
      whyThisFits:
        "The water holds the sentence before voice has to carry it into conversation.",
    },
  },
  "candidate.saint_thomas.long_distance_calendar_light": {
    presentation: {
      headline: "Mark Distance With One Calendar Light",
      whyThisFits:
        "The date marker and light give distance a point of return without trying to pull it closer.",
    },
  },
  "candidate.saint_thomas.level_up_three_lights": {
    presentation: {
      headline: "Set Three Lights for the Next Step",
      whyThisFits:
        "Three lights mark what has been, what is here, and what is asking to move one handspan forward.",
    },
  },
  "candidate.saint_thomas.honey_jar_relationship_tending": {
    presentation: {
      headline: "Let Sweetness Hold One Name",
      whyThisFits:
        "The jar holds one relationship quality with sweetness as tending, not control.",
    },
  },
  "candidate.saint_thomas.compassion_candle_sigil": {
    presentation: {
      headline: "Let Compassion Stand Under One Light",
      whyThisFits:
        "The mark lets compassion have a bounded place without swallowing the whole room.",
    },
  },
  "candidate.saint_thomas.three_month_marker": {
    presentation: {
      headline: "Mark the Relationship Without Pushing It",
      whyThisFits:
        "The object lets the stage be seen and learned from before anyone asks what must come next.",
    },
  },
  "candidate.saint_thomas.moving_in_room_blessing": {
    presentation: {
      headline: "Bless the Room as Shared Home",
      whyThisFits:
        "Clearing one area and naming one way the room may hold both people lets shared home begin in the room itself.",
    },
  },
  "candidate.saint_thomas.ambition_love_table_balance": {
    presentation: {
      headline: "Let Love and Ambition Share the Table",
      whyThisFits:
        "Two objects and one light let both devotions remain visible without eating each other.",
    },
  },
  "candidate.saint_thomas.basic_uncrossing_candle": {
    presentation: {
      headline: "Let One Crossed Thread Loosen",
      whyThisFits:
        "The light gives the crossed feeling a place to loosen without promising conquest or cure.",
    },
  },
  "candidate.saint_thomas.former_lover_release": {
    presentation: {
      headline: "Return the Old Lover to the Old Road",
      whyThisFits:
        "Paper, bowl or candle, and a movement outside the room let the old attachment leave the body's front room.",
    },
  },
  "candidate.saint_thomas.friendship_benefits_vessel": {
    presentation: {
      headline: "Give the Arrangement One Honest Vessel",
      whyThisFits:
        "The vessel holds the words that keep a casual adult connection kind, clear, and honest.",
    },
  },
  "candidate.saint_thomas.boundary_salt_line_page": {
    presentation: {
      headline: "Draw the Boundary as One Line",
      whyThisFits:
        "Salt and sentence make the line visible before it has to be defended.",
    },
  },
  "candidate.saint_thomas.light_shield_body_boundary": {
    presentation: {
      headline: "Let Light Show the Body's Edge",
      whyThisFits:
        "Light on the body makes the edge visible before entering, answering, or returning to a charged room.",
    },
  },
  "candidate.saint_thomas.breakup_boldness_mirror": {
    presentation: {
      headline: "Put Boldness On Before the Screen",
      whyThisFits:
        "Mirror and adornment let boldness arrive before the old digital story opens.",
    },
  },
  "candidate.saint_thomas.stitched_heart_mending": {
    presentation: {
      headline: "Stitch One Mending Into a Small Heart",
      whyThisFits:
        "The small heart lets mending become an object before it becomes a demand on anyone.",
    },
  },
  "candidate.saint_thomas.trust_object_journal": {
    presentation: {
      headline: "Let Trust Sit Beside One Object",
      whyThisFits:
        "The trusted object keeps the page grounded while trust names where it is present and where it is still learning.",
    },
  },
  "candidate.saint_thomas.unsent_contact_boundary": {
    presentation: {
      headline: "Let the Message Stay Unsent",
      whyThisFits:
        "The folded message and weighted cover let contact become contained before it becomes action.",
    },
  },
  "candidate.saint_thomas.bed_linen_reset": {
    presentation: {
      headline: "Reset the Bed Into Now",
      whyThisFits:
        "Sheets, water, flower, or cloth let the bed return to the present household after an ending or rupture.",
    },
  },
  "candidate.saint_thomas.home_after_intimacy_reset": {
    presentation: {
      headline: "Return the Room and Body After Intensity",
      whyThisFits:
        "Putting one thing back and washing the body turns intensity back toward ordinary care.",
    },
  },
  "candidate.saint_thomas.cynicism_candle_softening": {
    presentation: {
      headline: "Let Cynicism Sit Where Light Can Reach It",
      whyThisFits:
        "The second object keeps possibility in the same light as cynicism, without denying either one.",
    },
  },
  "candidate.saint_thomas.self_forgiveness_water_light": {
    presentation: {
      headline: "Let Self-Forgiveness Have Water and Light",
      whyThisFits:
        "Water and light let self-forgiveness become contact before it has to become explanation.",
    },
  },
  "candidate.saint_thomas.body_fluid_sigil_candle": {
    presentation: {
      whyThisFits:
        "The body mark, sigil, and candle keep the desire specific, visible, and bounded before it is folded away.",
    },
  },
  "candidate.saint_thomas.kink_desire_body_release": {
    presentation: {
      whyThisFits:
        "Rope, ribbon, light, and the body give kink shame a form that can be named and released without apology.",
    },
  },
  "candidate.saint_thomas.partner_body_intention": {
    presentation: {
      whyThisFits:
        "One shared intention is named before the body carries it, then returned to words at the close.",
    },
  },
};

const DIRECT_USE_REVIEW_DECISIONS: Record<string, DirectUseReviewDecision> = {
  ...WOODWARD_DIRECT_USE_REVIEWS,
  ...HOUSE_WITCH_DIRECT_USE_REVIEWS,
  ...BUCKLAND_DIRECT_USE_REVIEWS,
  ...MAGICAL_HOUSEHOLD_DIRECT_USE_REVIEWS,
  ...GREEN_GARDEN_DIRECT_USE_REVIEWS,
  ...WHITEHURST_FLOWER_METHOD_DIRECT_USE_REVIEWS,
  ...WHITEHURST_FLOWER_CORRESPONDENCE_DIRECT_USE_REVIEWS,
  ...MOON_BOOK_DIRECT_USE_REVIEWS,
  ...DOMINGUEZ_DIRECT_USE_REVIEWS,
  ...ANAND_DIRECT_USE_REVIEWS,
  ...SAINT_THOMAS_DIRECT_USE_REVIEWS,
};

function markReviewedForDirectUse(ritual: Ritual): Ritual {
  const recommendationMetadata = ritual.recommendationMetadata;

  return {
    ...ritual,
    status: "reviewed",
    availability: {
      ...ritual.availability,
      findable: true,
      directUseEligible: true,
      recommendationEligible: false,
    },
    recommendationMetadata: recommendationMetadata
      ? {
        ...recommendationMetadata,
        eligibility: {
          recommendable: false,
          missing: ["recommendation_review"],
        },
      }
      : undefined,
    reviewFlags: undefined,
  };
}

function cleanWhitehurstFlowerPresentation(
  presentation: RitualPresentation,
): RitualPresentation {
  return {
    ...presentation,
    practice: presentation.practice
      .replace(/\breviewed\s+/gi, "")
      .replace(/\bsafe seasonal\s+/gi, "seasonal ")
      .replace(/\banother safe\s+/gi, "another ")
      .replace(
        ", or place their image beside the bowl if the flower is not safe",
        "",
      )
      .replace(" only where release is ecologically appropriate", "")
      .replace("; otherwise use a dandelion image or journal drawing", "")
      .replace(" where safe", ""),
    bestWindow: presentation.bestWindow
      .replace(" and the place can receive it safely", "")
      .replace("source-supported ", ""),
  };
}

function cleanMoonBookPresentation(
  presentation: RitualPresentation,
): RitualPresentation {
  return {
    ...presentation,
    practice: presentation.practice
      .replace(" if safe", "")
      .replace(" if that is already safe for the plant", " if that belongs with the plant"),
  };
}

export function applySourceBackedDirectUseReview(rituals: Ritual[]): Ritual[] {
  return rituals.map((ritual) => {
    const decision = DIRECT_USE_REVIEW_DECISIONS[ritual.id];

    if (!decision) {
      return ritual;
    }

    const mergedPresentation = {
      ...ritual.presentation,
      ...decision.presentation,
    };

    return markReviewedForDirectUse({
      ...ritual,
      ...(decision.ritualWords ? { ritualWords: decision.ritualWords } : {}),
      searchMetadata: decision.searchMetadata
        ? {
            ...ritual.searchMetadata,
            ...decision.searchMetadata,
          }
        : ritual.searchMetadata,
      presentation:
        decision.cleanup === "whitehurstFlower"
          ? cleanWhitehurstFlowerPresentation(mergedPresentation)
          : decision.cleanup === "moonBook"
            ? cleanMoonBookPresentation(mergedPresentation)
          : mergedPresentation,
    });
  });
}
