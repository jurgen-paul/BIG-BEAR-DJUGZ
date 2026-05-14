/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import {Video} from './types';

/** Base URL for static files. */
const staticFilesUrl =
  'https://www.gstatic.com/aistudio/starter-apps/veo3-gallery/';

/** Videos for the gallery. */
export const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: "Scene 1: The Mysterious Glowing Book",
    videoUrl:
      staticFilesUrl + 'Animals_in_Nature_Bear_and_River.mp4',
    description: `A peaceful forest morning. Big Bear Djugs, a large and gentle grizzly bear with a friendly face, stretches and yawns outside his cozy cave. As the sun peeks through the pine trees, he spots a mysterious, glowing book lying in the grass. The book’s title glows in soft gold: "The Book of Learning." Djugs tilts his head in curiosity, wondering what magical adventures this book holds.`,
  },
  {
    id: '2',
    title: "Scene 3: Math in the Meadow",
    videoUrl: staticFilesUrl + 'Nature_Monkeys.mp4',
    description: `In a bright, flowery meadow, Big Bear Djugs and Mila are helping the Forest Friends. A group of playful rabbits are trying to gather berries for the winter. Mila shows Djugs how to count the berries in groups of five. Djugs carefully picks up a single berry with his large paw, concentrated on getting the math right. "One, two, three... and two more makes five!" he says with a proud rumble.`,
  },
  {
    id: '3',
    title: "Scene 4: Reading by the River",
    videoUrl:
      staticFilesUrl + 'Animals_in_Nature_Bear_and_River.mp4',
    description: `Djugs and Tiko the squirrel sit by a rushing blue river, studying a torn map. Tiko is confused, but Djugs points to the letters on a wooden signpost. "R-I-V-E-R," Djugs reads aloud slowly. He learns that following the clues requires patience and reading the signs of nature. The map begins to glow, revealing a secret path toward the Forest Library.`,
  },
  {
    id: '4',
    title: "Scene 5: Science in the Forest Lab",
    videoUrl: staticFilesUrl + 'Kyoto_Serenity_From_Scene_to_Postcard.mp4',
    description: `Inside the hollowed-out trunk of a giant ancient oak tree, Professor Pine’s Forest Lab is filled with magical jars and glowing plants. Djugs watches in awe as Mila explains how sunlight and water make a small seed grow. They plant a tiny seed in a pot of rich soil, and with a bit of "science magic," a vibrant green sprout emerges, reaching toward the light.`,
  },
  {
    id: '5',
    title: "Scene 6: The Forest Storm Rescue",
    videoUrl: staticFilesUrl + 'Video_Game_Trailer_Sci_Fi_Urban_Chasemp4.mp4',
    description: `Dark clouds gather and a sudden storm blows through the forest. High in a swaying tree, a baby bird's nest is in danger! Big Bear Djugs remembers his lessons. He uses math to judge the distance and science to know where the branches are strongest. With a brave heart, he climbs up to safely catch the falling nest just in time, showing that learning helps us be heroes.`,
  },
  {
    id: '6',
    title: "Scene 8: The Forest Celebration",
    videoUrl: staticFilesUrl + 'Fluffy_Characters_Picnic_in_a_Mushroom_Forest.mp4',
    description: `The storm has passed, and the forest is full of joy. The Forest Friends have thrown a grand party to celebrate their new knowledge. Big Bear Djugs wears a special "Friendly Teacher Badge" pinned to a sash. There are music, dancing, and delicious berry treats for everyone. Djugs realizes that learning is the greatest adventure of all, and sharing it with friends makes it even better.`,
  },
];
